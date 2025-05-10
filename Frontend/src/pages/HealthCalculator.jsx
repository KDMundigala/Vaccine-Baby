import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { healthAPI } from "@/api";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import Navbar from '../components/navbar.jsx';

const BabyBottle = () => {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 32]} />
        <meshStandardMaterial color="#CED5FF" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.4, 32]} />
        <meshStandardMaterial color="#AA60EA" />
      </mesh>
      {/* Liquid inside the bottle */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.8, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// New 3D baby model
const BabyModel = () => {
  return (
    <group>
      {/* Baby head */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#FFD6CC" />
      </mesh>
      {/* Baby body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.4, 0.8, 16, 16]} />
        <meshStandardMaterial color="#FFC8F0" />
      </mesh>
      {/* Baby arms */}
      <mesh position={[0.5, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.15, 0.5, 16, 16]} />
        <meshStandardMaterial color="#FFD6CC" />
      </mesh>
      <mesh position={[-0.5, 0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.15, 0.5, 16, 16]} />
        <meshStandardMaterial color="#FFD6CC" />
      </mesh>
      {/* Baby legs */}
      <mesh position={[0.25, -0.7, 0]} rotation={[0, 0, Math.PI / 12]}>
        <capsuleGeometry args={[0.15, 0.5, 16, 16]} />
        <meshStandardMaterial color="#FFD6CC" />
      </mesh>
      <mesh position={[-0.25, -0.7, 0]} rotation={[0, 0, -Math.PI / 12]}>
        <capsuleGeometry args={[0.15, 0.5, 16, 16]} />
        <meshStandardMaterial color="#FFD6CC" />
      </mesh>
      {/* Baby eyes */}
      <mesh position={[0.15, 0.8, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.15, 0.8, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Baby pupils */}
      <mesh position={[0.15, 0.8, 0.48]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#5733FF" />
      </mesh>
      <mesh position={[-0.15, 0.8, 0.48]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#5733FF" />
      </mesh>
      {/* Baby smile */}
      <mesh position={[0, 0.6, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.03, 16, 16, Math.PI]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
    </group>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const CalculatorSelection = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#CED5FF] via-white to-[#CED5FF] py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4 font-poppins"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Baby Health
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-[#AA60EA]"
            >
              Calculator
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-gray-600 mb-12 max-w-md mx-auto"
          >
            Track your baby's growth with our WHO-standard calculator
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <Card className="bg-white shadow-xl rounded-xl border border-[#CED5FF] backdrop-blur-sm bg-white/80 overflow-hidden relative">
            {/* Decorative baby silhouettes */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <svg viewBox="0 0 100 100" fill="#AA60EA">
                <path d="M50,15 C65,15 75,25 75,40 C75,50 65,60 50,60 C35,60 25,50 25,40 C25,25 35,15 50,15 Z M30,58 C35,64 42,68 50,68 C58,68 65,64 70,58 C70,75 60,85 50,85 C40,85 30,75 30,58 Z" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10 rotate-180">
              <svg viewBox="0 0 100 100" fill="#AA60EA">
                <path d="M50,15 C65,15 75,25 75,40 C75,50 65,60 50,60 C35,60 25,50 25,40 C25,25 35,15 50,15 Z M30,58 C35,64 42,68 50,68 C58,68 65,64 70,58 C70,75 60,85 50,85 C40,85 30,75 30,58 Z" />
              </svg>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="font-poppins text-2xl text-gray-800">
                  Choose an Option
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Select what you want to calculate
                </CardDescription>
              </CardHeader>
            </motion.div>
            
            <CardContent className="pt-4">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-4"
              >
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(170, 96, 234, 0.05)" }} 
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-[#AA60EA] to-[#9750D8] hover:from-[#9750D8] hover:to-[#8740C8] text-white rounded-lg h-16 text-lg font-medium shadow-md relative overflow-hidden group"
                    onClick={() => onSelect("weight")}
                  >
                    <motion.span
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9750D8]/0 via-[#9750D8]/30 to-[#9750D8]/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <div className="flex items-center justify-center">
                      <div className="bg-white/30 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 12h8"></path>
                        </svg>
                      </div>
                      <span>Weight Checking</span>
                     
                    </div>
                  </Button>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(170, 96, 234, 0.05)" }} 
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-[#AA60EA] to-[#9750D8] hover:from-[#9750D8] hover:to-[#8740C8] text-white rounded-lg h-16 text-lg font-medium shadow-md relative overflow-hidden group"
                    onClick={() => onSelect("height")}
                  >
                    <motion.span
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9750D8]/0 via-[#9750D8]/30 to-[#9750D8]/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <div className="flex items-center justify-center">
                      <div className="bg-white/30 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v20"></path>
                          <path d="M6 12h12"></path>
                        </svg>
                      </div>
                      <span>Height Checking</span>
                    </div>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex justify-center mt-8"
              >
                <div className="w-20 h-1 bg-gradient-to-r from-[#CED5FF] via-[#AA60EA] to-[#CED5FF] rounded-full" />
              </motion.div>
            </CardContent>
          </Card>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mt-8 text-gray-500 text-sm"
          >
            Accurate growth assessment based on WHO standards
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const HealthCalculator = () => {
  const { toast } = useToast();
  const [calculatorType, setCalculatorType] = useState(null);
  const [ageMonths, setAgeMonths] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [canRender3D, setCanRender3D] = useState(true);
  const [statusColors, setStatusColors] = useState({
    normal: "#22c55e", // green-500
    deficiency: "#f59e0b", // amber-500
    excess: "#ef4444", // red-500
  });

  useEffect(() => {
    try {
      require('@react-three/fiber');
      require('@react-three/drei');
      setCanRender3D(true);
    } catch (error) {
      console.error("3D rendering dependencies failed to load:", error);
      setCanRender3D(false);
    }
  }, []);

  const handleColorChange = (status, color) => {
    setStatusColors((prev) => ({
      ...prev,
      [status]: color,
    }));
  };

  const getStatusColor = (status, type) => {
    if (type === "weight") {
      if (status === "Normal Weight") return statusColors.normal;
      if (status.includes("Deficiency")) return statusColors.deficiency;
      return statusColors.excess;
    }
    if (type === "height") {
      return status === "Normal Height" ? statusColors.normal : statusColors.deficiency;
    }
    return "#000000"; // Fallback
  };

  const calculateHealth = async () => {
    if (ageMonths === "" || (calculatorType === "weight" && weight === "") || (calculatorType === "height" && height === "")) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate.",
        variant: "destructive",
      });
      return;
    }

    const age = Number(ageMonths);
    const weightValue = Number(weight);
    const heightValue = Number(height);

    if (isNaN(age) || age < 0 || (calculatorType === "weight" && age > 36) || (calculatorType === "height" && age > 60)) {
      toast({
        title: "Invalid Age",
        description: `Age must be between 0 and ${calculatorType === "weight" ? "36" : "60"} months.`,
        variant: "destructive",
      });
      return;
    }

    if (calculatorType === "weight" && (isNaN(weightValue) || weightValue <= 0)) {
      toast({
        title: "Invalid Weight",
        description: "Weight must be a positive number.",
        variant: "destructive",
      });
      return;
    }

    if (calculatorType === "height" && (isNaN(heightValue) || heightValue <= 0)) {
      toast({
        title: "Invalid Height",
        description: "Height must be a positive number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      let response;
      const data = {
        gender,
        age: age,
        weight: calculatorType === "weight" ? weightValue : undefined,
        height: calculatorType === "height" ? heightValue : undefined,
      };

      if (calculatorType === "weight") {
        response = await healthAPI.calculateWeight({ ...data, ageMonths: age });
      } else if (calculatorType === "height") {
        response = await healthAPI.calculateHeight({ ...data, ageMonths: age });
      }

      setResult({
        weightStatus: calculatorType === "weight" ? response.data.status : undefined,
        heightStatus: calculatorType === "height" ? response.data.status : undefined,
        bmi: response.data.bmi,
        weightPercentile: calculatorType === "weight" ? response.data.percentile : undefined,
        heightPercentile: calculatorType === "height" ? response.data.percentile : undefined,
      });
    } catch (error) {
      console.error("Health calculation error:", error);
      const errorMessage = error.response?.data?.error || "Failed to calculate health status.";
      toast({
        title: "Calculation Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!calculatorType) {
    return <CalculatorSelection onSelect={setCalculatorType} />;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#CED5FF] via-white to-[#CED5FF] py-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12 font-poppins relative"
          >
            {calculatorType === "weight" 
              ? (
                <motion.span>
                  Baby Weight{" "}
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-[#AA60EA]"
                  >
                    Calculator
                  </motion.span>
                </motion.span>
              )
              : (
                <motion.span>
                  Baby Height{" "}
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-[#AA60EA]"
                  >
                    Calculator
                  </motion.span>
                </motion.span>
              )
            }
            <motion.div 
              className="absolute w-24 h-2 bg-gradient-to-r from-transparent via-[#AA60EA] to-transparent bottom-0 left-1/2 transform -translate-x-1/2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.h1>

          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl border border-[#CED5FF] overflow-hidden">
                <CardHeader className="pb-2 border-b border-[#CED5FF]/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="font-poppins text-2xl text-gray-800">
                        Enter Baby's Information
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Provide details to assess your baby's {calculatorType}
                      </CardDescription>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(170, 96, 234, 0.05)" }} 
                      whileTap={{ scale: 0.95 }}
                      className="rounded-lg"
                    >
                      <Button
                        variant="outline"
                        className="border-[#AA60EA] text-[#AA60EA] hover:bg-[#AA60EA] hover:text-white transition-all duration-300"
                        onClick={() => setCalculatorType(null)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back
                      </Button>
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <motion.form
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      calculateHealth();
                    }}
                  >
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="age" className="text-gray-700 font-medium">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Age (months)
                        </span>
                      </Label>
                      <motion.div 
                        whileHover={{ scale: 1.02, boxShadow: "0 2px 10px rgba(170, 96, 234, 0.15)" }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        <Input
                          id="age"
                          type="number"
                          placeholder="Enter age in months"
                          value={ageMonths}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || Number(value) >= 0) setAgeMonths(value);
                          }}
                          min="0"
                          max={calculatorType === "weight" ? "36" : "60"}
                          className="border-[#CED5FF] focus:ring-[#AA60EA] h-12 focus:border-[#AA60EA]"
                        />
                      </motion.div>
                      <p className="text-xs text-gray-500 mt-1">
                        {calculatorType === "weight" 
                          ? "For babies up to 36 months old" 
                          : "For babies up to 60 months old"}
                      </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label className="text-gray-700 font-medium">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          Gender
                        </span>
                      </Label>
                      <motion.div 
                        whileHover={{ boxShadow: "0 2px 10px rgba(170, 96, 234, 0.15)" }}
                        className="bg-white/50 border border-[#CED5FF] rounded-lg p-3"
                      >
                        <RadioGroup
                          value={gender}
                          onValueChange={(value) => setGender(value)}
                          className="grid grid-cols-2 gap-2"
                        >
                          <motion.div 
                            whileHover={{ scale: 1.02 }} 
                            className={`flex items-center justify-center space-x-2 p-3 rounded-lg border ${
                              gender === "male" ? "bg-[#AA60EA]/10 border-[#AA60EA]" : "border-gray-200"
                            } cursor-pointer`}
                          >
                            <RadioGroupItem value="male" id="male" className="text-[#AA60EA]" />
                            <Label htmlFor="male" className="cursor-pointer font-medium">
                              <div className="flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={gender === "male" ? "#AA60EA" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="7" r="5"/>
                                  <path d="M12 12v8"/>
                                  <path d="M8 20h8"/>
                                </svg>
                                <span className="mt-1">Male</span>
                              </div>
                            </Label>
                          </motion.div>
                          <motion.div 
                            whileHover={{ scale: 1.02 }} 
                            className={`flex items-center justify-center space-x-2 p-3 rounded-lg border ${
                              gender === "female" ? "bg-[#AA60EA]/10 border-[#AA60EA]" : "border-gray-200"
                            } cursor-pointer`}
                          >
                            <RadioGroupItem value="female" id="female" className="text-[#AA60EA]" />
                            <Label htmlFor="female" className="cursor-pointer font-medium">
                              <div className="flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={gender === "female" ? "#AA60EA" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="10" r="5"/>
                                  <path d="M12 15v7"/>
                                  <path d="M9 18h6"/>
                                </svg>
                                <span className="mt-1">Female</span>
                              </div>
                            </Label>
                          </motion.div>
                        </RadioGroup>
                      </motion.div>
                    </motion.div>

                    {calculatorType === "weight" && (
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="weight" className="text-gray-700 font-medium">
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M8 12h8"></path>
                            </svg>
                            Weight (kg)
                          </span>
                        </Label>
                        <motion.div 
                          whileHover={{ scale: 1.02, boxShadow: "0 2px 10px rgba(170, 96, 234, 0.15)" }} 
                          whileTap={{ scale: 0.98 }}
                          className="relative"
                        >
                          <Input
                            id="weight"
                            type="number"
                            placeholder="Enter weight in kilograms"
                            value={weight}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || Number(value) > 0) setWeight(value);
                            }}
                            min="0.1"
                            step="0.1"
                            className="border-[#CED5FF] focus:ring-[#AA60EA] h-12 focus:border-[#AA60EA]"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            kg
                          </div>
                        </motion.div>
                        <p className="text-xs text-gray-500 mt-1">
                          For accurate results, enter weight to nearest 0.1 kg
                        </p>
                      </motion.div>
                    )}

                    {calculatorType === "height" && (
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="height" className="text-gray-700 font-medium">
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                              <path d="M12 2v20"></path>
                              <path d="M6 12h12"></path>
                            </svg>
                            Height (cm)
                          </span>
                        </Label>
                        <motion.div 
                          whileHover={{ scale: 1.02, boxShadow: "0 2px 10px rgba(170, 96, 234, 0.15)" }} 
                          whileTap={{ scale: 0.98 }}
                          className="relative"
                        >
                          <Input
                            id="height"
                            type="number"
                            placeholder="Enter height in centimeters"
                            value={height}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || Number(value) > 0) setHeight(value);
                            }}
                            min="0.1"
                            step="0.1"
                            className="border-[#CED5FF] focus:ring-[#AA60EA] h-12 focus:border-[#AA60EA]"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            cm
                          </div>
                        </motion.div>
                        <p className="text-xs text-gray-500 mt-1">
                          For accurate results, enter height to nearest 0.1 cm
                        </p>
                      </motion.div>
                    )}

                    <motion.div 
                      variants={itemVariants}
                      className="pt-4"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.03 }} 
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#AA60EA] to-[#9750D8] hover:from-[#9750D8] hover:to-[#8740C8] text-white h-14 text-lg font-medium shadow-md relative overflow-hidden"
                          disabled={loading}
                        >
                          <motion.span
                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9750D8]/0 via-[#9750D8]/30 to-[#9750D8]/0"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                          />
                          {loading ? (
                            <div className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                              Calculate {calculatorType === "weight" ? "Weight" : "Height"} Status
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                </CardContent>
              </Card>
            </motion.div>
  
            {/* Enhanced 3D Landscape Baby Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col h-full"
            >
              {!result ? (
                <Card className="h-full bg-gradient-to-br from-[#f0ebfd] to-white backdrop-blur-sm shadow-xl rounded-xl border border-[#CED5FF] overflow-hidden relative">
                  <CardContent className="flex flex-col items-center justify-center h-full p-6">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#AA60EA]/10"></div>
                      <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-[#CED5FF]/20"></div>
                      <div className="absolute right-1/3 bottom-1/4 w-20 h-20 rounded-full bg-[#AA60EA]/5"></div>
                    </div>
                    
                    {canRender3D ? (
                      <div className="w-full h-64 relative z-10 mb-6">
                        <motion.div
                          initial={{ rotateY: 0 }}
                          animate={{ rotateY: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="h-full w-full"
                        >
                          <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                            <Sparkles count={50} scale={10} size={1} speed={0.3} color="#AA60EA" />
                            <group>
                              {calculatorType === "weight" ? (
                                <BabyBottle />
                              ) : (
                                <motion.group
                                  initial={{ scale: 0.8 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                >
                                  <BabyModel />
                                </motion.group>
                              )}
                            </group>
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                          </Canvas>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="w-full h-64 relative z-10 mb-6 flex items-center justify-center">
                        <div className="p-8 rounded-full bg-[#AA60EA]/10 animate-pulse">
                          {calculatorType === "weight" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#AA60EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20.9472 14C20.27 18 16.7616 21 12.4848 21C7.55257 21 3.552 16.9706 3.552 12C3.552 7.02944 7.55257 3 12.4848 3C16.7616 3 20.27 6 20.9472 10H17.552" />
                              <path d="M12.5 8V16" />
                              <path d="M16.5 12H8.5" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#AA60EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="2" x2="12" y2="22" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
  
                    <div className="space-y-4 text-center relative z-10">
                      <motion.h3 
                        className="text-2xl font-semibold text-gray-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      >
                        Baby {calculatorType === "weight" ? "Weight" : "Height"} Assessment
                      </motion.h3>
                      
                      <motion.p 
                        className="text-gray-600 max-w-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      >
                        Fill in the details on the left to check if your baby's {calculatorType} is within 
                        the healthy range according to WHO standards.
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex space-x-2 justify-center"
                      >
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#AA60EA]/10 text-[#AA60EA]">
                          WHO Standards
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#CED5FF]/20 text-gray-700">
                          Professional Assessment
                        </span>
                      </motion.div>
                      
                      <motion.div
                        className="pt-4 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                      >
                        <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-[#CED5FF] shadow-md rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#AA60EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <polyline points="19 12 12 19 5 12"></polyline>
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full bg-white/90 backdrop-blur-sm shadow-xl rounded-xl border border-[#CED5FF] overflow-hidden">
                  <CardHeader className="pb-2 border-b border-[#CED5FF]/30">
                    <CardTitle className="font-poppins text-2xl text-gray-800">
                      Assessment Results
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Based on WHO standards for {gender === "male" ? "boys" : "girls"} at {ageMonths} months
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-6"
                    >
                      {/* Enhanced Result Visualization */}
                      <motion.div 
                        variants={itemVariants}
                        className="bg-gradient-to-br from-[#f8f7fe] to-white rounded-xl p-6 border border-[#CED5FF]/30 shadow-sm relative overflow-hidden"
                      >
                        {/* Decorative Elements */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#AA60EA]/5 z-0"></div>
                        <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-[#CED5FF]/10 z-0"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                              {calculatorType === "weight" ? "Weight Status" : "Height Status"}
                            </h3>
                            <div className="flex space-x-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#AA60EA]/10 text-[#AA60EA]">
                                {calculatorType === "weight" ? `${weight} kg` : `${height} cm`}
                              </span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#CED5FF]/20 text-gray-700">
                                {ageMonths} months
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="w-full md:w-1/2">
                              <div className="relative h-24 flex items-center justify-center">
                                <svg viewBox="0 0 100 100" className="w-24 h-24">
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="#E5E7EB"
                                    strokeWidth="10"
                                  />
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke={getStatusColor(
                                      calculatorType === "weight" 
                                        ? result.weightStatus 
                                        : result.heightStatus,
                                      calculatorType
                                    )}
                                    strokeWidth="10"
                                    strokeDasharray={`${
                                      calculatorType === "weight"
                                        ? (result.weightPercentile ?? 0) * 2.83
                                        : (result.heightPercentile ?? 0) * 2.83
                                    } 283`}
                                    strokeDashoffset="0"
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <p className="text-2xl font-bold">
                                    {calculatorType === "weight"
                                      ? `${Math.round(result.weightPercentile * 100) / 100}%`
                                      : `${Math.round(result.heightPercentile * 100) / 100}%`}
                                  </p>
                                </div>
                              </div>
                              <p className="text-center text-sm text-gray-600 mt-2">Percentile Rank</p>
                            </div>
                            
                            <div className="w-full md:w-1/2">
                              <div 
                                className="rounded-xl p-4 text-center"
                                style={{ 
                                  backgroundColor: `${getStatusColor(
                                    calculatorType === "weight" 
                                      ? result.weightStatus 
                                      : result.heightStatus,
                                    calculatorType
                                  )}15` 
                                }}
                              >
                                <div 
                                  className="rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: `${getStatusColor(
                                      calculatorType === "weight" 
                                        ? result.weightStatus 
                                        : result.heightStatus, 
                                      calculatorType
                                    )}30` 
                                  }}
                                >
                                  {calculatorType === "weight" ? (
                                    result.weightStatus === "Normal Weight" ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={statusColors.normal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                      </svg>
                                    ) : result.weightStatus.includes("Deficiency") ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={statusColors.deficiency} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                      </svg>
                                    ) : (
                                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={statusColors.excess} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="16"></line>
                                        <line x1="8" y1="12" x2="16" y2="12"></line>
                                      </svg>
                                    )
                                  ) : (
                                    result.heightStatus === "Normal Height" ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={statusColors.normal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                      </svg>
                                    ) : (
                                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={statusColors.deficiency} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                      </svg>
                                    )
                                  )}
                                </div>
                                <h3 
                                  className="text-xl font-bold mb-1"
                                  style={{ 
                                    color: getStatusColor(
                                      calculatorType === "weight" 
                                        ? result.weightStatus 
                                        : result.heightStatus, 
                                      calculatorType
                                    ) 
                                  }}
                                >
                                  {calculatorType === "weight" 
                                    ? result.weightStatus 
                                    : result.heightStatus}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {calculatorType === "weight" 
                                    ? result.weightStatus === "Normal Weight"
                                      ? "Your baby's weight is within the healthy range for their age."
                                      : result.weightStatus.includes("Deficiency")
                                        ? "Your baby's weight is below the typical range for their age."
                                        : "Your baby's weight is above the typical range for their age."
                                    : result.heightStatus === "Normal Height"
                                      ? "Your baby's height is within the healthy range for their age."
                                      : "Your baby's height is below the typical range for their age."
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
  
                      {result.bmi && (
                        <motion.div variants={itemVariants} className="rounded-lg border border-[#CED5FF]/30 p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-800">BMI Calculation</h3>
                            <span className="text-lg font-bold text-[#AA60EA]">{result.bmi}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            BMI is an additional reference point but is not the primary assessment method for babies.
                          </p>
                        </motion.div>
                      )}
  
                      <motion.div variants={itemVariants}>
                        <Card className="bg-[#F9F8FE] border-dashed border-[#AA60EA]/30">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="mt-1 bg-[#AA60EA]/10 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AA60EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="16" x2="12" y2="12"></line>
                                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">
                                  This calculator provides a general assessment based on WHO standards. Individual growth patterns can vary. Always consult with your pediatrician for personalized guidance.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
  
                      <motion.div variants={itemVariants} className="flex justify-center pt-2">
                        <Button
                          variant="outline"
                          className="border-[#AA60EA] text-[#AA60EA] hover:bg-[#AA60EA] hover:text-white transition-all duration-300"
                          onClick={() => setResult(null)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2"
                          >
                            <path d="M2.5 2v6h6M21.5 22v-6h-6M2 21.5l9-9M15 9l7-7" />
                          </svg>
                          Try Another Calculation
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCalculator;