import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/api";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Camera, User, Mail, Shield, Calendar, Trash2, LogOut } from "lucide-react";
import { uploadProfilePicture } from "@/utils/firebase";
import Navbar from '../components/navbar';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  dateOfBirth: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const { user: authUser, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const [profileData, setProfileData] = useState<User>({
    _id: '',
    fullName: '',
    email: '',
    role: 'user',
    dateOfBirth: '',
    profilePicture: '',
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    console.log('AuthUser:', authUser); // Check what data is coming in
    if (authUser) {
      setProfileData({
        _id: authUser._id,
        fullName: authUser.fullName,  // This might be undefined or null
        email: authUser.email,
        role: authUser.role,
        dateOfBirth: authUser.dateOfBirth ? new Date(authUser.dateOfBirth).toISOString().split('T')[0] : '',
        profilePicture: authUser.profilePicture,
        createdAt: authUser.createdAt,
        updatedAt: authUser.updatedAt
      });
      console.log('ProfileData after set:', profileData); // Check what was set
    }
  }, [authUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Upload to Firebase and get the image URL
      const imageUrl = await uploadProfilePicture(file, authUser._id);

      // Update profile with the new image URL
      await authAPI.updateProfile({ profilePicture: imageUrl });

      setProfileData(prev => ({
        ...prev,
        profilePicture: imageUrl
      }));

      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been successfully updated.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to update profile picture",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };  

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      await updateProfile({
        fullName: profileData.fullName,
        email: profileData.email,
        dateOfBirth: profileData.dateOfBirth,
        profilePicture: profileData.profilePicture
      });

      toast({
        title: "Profile Updated",
        description: "Your information has been saved successfully",
        variant: "default",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await authAPI.deleteProfile();
      await logout();
      navigate("/register");
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently removed",
        variant: "destructive",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete account";
      toast({
        title: "Deletion Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const inputFields = [
    { id: "fullName", label: "Full Name", type: "text", name: "fullName", icon: <User className="h-4 w-4 text-gray-500" /> },
    { id: "email", label: "Email", type: "email", name: "email", icon: <Mail className="h-4 w-4 text-gray-500" /> }
  ];

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#CED5FF]/50 via-white to-[#CED5FF]/50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#AA60EA]" />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 font-medium"
          >
            Loading your profile...
          </motion.p>
        </div>
      </div>
    );
  }

  // Format date for display
  const memberSince = new Date(profileData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CED5FF]/30 via-white to-[#CED5FF]/50">
      <Navbar />
      <motion.div 
        className="container mx-auto px-4 py-12 md:py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="flex flex-col items-center justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative"
          >
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage 
                src={profileData.profilePicture} 
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-[#AA60EA] to-[#9747FF] text-white text-4xl">
                {(profileData.fullName && profileData.fullName.length > 0)
                  ? profileData.fullName.charAt(0)
                  : "?"}
              </AvatarFallback>
            </Avatar>
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
            >
              <label htmlFor="profile-upload" className="cursor-pointer block w-8 h-8 bg-[#AA60EA] rounded-full flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
                <input
                  id="profile-upload"
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </motion.div>
          </motion.div>
          
          {profileData.fullName ? (
            <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-gray-800"
            >
                {profileData.fullName}
            </motion.h1>
          ) : (
            <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-gray-600"
            >
                Loading...
            </motion.h1>
          )}
          
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-gray-600 text-sm"
          >
            <Shield className="h-4 w-4" />
            <span className="capitalize">{profileData.role}</span>
            <span className="text-gray-400">•</span>
            <Calendar className="h-4 w-4" />
            <span>Member since {memberSince}</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <Tabs 
            defaultValue="personal" 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="bg-white px-6 pt-6">
              <TabsList className="grid w-full max-w-md mx-auto bg-[#F5F7FF] p-1 rounded-lg">
                <TabsTrigger 
                  value="personal" 
                  className="rounded-md data-[state=active]:bg-[#AA60EA] data-[state=active]:text-white transition-all duration-300"
                >
                  Personal Information
                </TabsTrigger>
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="personal" className="m-0 p-6">
                  <div className="space-y-8">
                    {inputFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                      >
                        <Label 
                          htmlFor={field.id} 
                          className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
                        >
                          {field.icon}
                          {field.label}
                        </Label>
                        <Input
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          value={profileData[field.name as keyof User]}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className="border-gray-200 focus:border-[#AA60EA] focus:ring-[#AA60EA]/20 rounded-lg py-2 transition-all duration-300"
                        />
                        <motion.div 
                          className="h-0.5 w-0 bg-[#AA60EA]" 
                          initial={false}
                          animate={{ width: profileData[field.name as keyof User] ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                    <div className="flex gap-4">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button
                          onClick={handleSaveChanges}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-[#AA60EA] to-[#9747FF] hover:from-[#9747FF] hover:to-[#AA60EA] text-white px-6 py-2 rounded-lg shadow-lg shadow-[#AA60EA]/20 transition-all duration-300"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Saving...</span>
                            </div>
                          ) : (
                            <span>Save Changes</span>
                          )}
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button
                          onClick={async () => {
                            await logout();
                            navigate("/");
                          }}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </motion.div>
                    </div>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button
                            variant="outline"
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300 flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Account
                          </Button>
                        </motion.div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="border-none bg-white rounded-xl shadow-2xl">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          transition={{ type: "spring", damping: 15 }}
                        >
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-bold text-gray-800">Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600">
                              This action cannot be undone. All your data will be permanently removed from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-6 gap-3">
                            <AlertDialogCancel className="border-gray-200 hover:bg-gray-50 text-gray-700 transition-all duration-300">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
                            >
                              Confirm Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </motion.div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center text-gray-500 text-sm mt-8"
        >
          <p className="flex justify-center items-center gap-1">
            <span>Need help?</span>
            <a href="/contact" className="text-[#AA60EA] hover:underline">Contact support</a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;