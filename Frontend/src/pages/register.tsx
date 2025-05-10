import React, { useRef, useState } from 'react';
import { TextField, Typography, Paper, Box, InputAdornment, CircularProgress, Snackbar, Alert, Avatar } from '@mui/material';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AddAPhoto, Check, Email, Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from "@/hooks/useAuth";

// Assuming these image paths exist - adjust as needed
import Registerimage from '/src/assets/registerimage1.png';
import Registerimage1 from '/src/assets/registerimage2.png';
import Registerimage2 from '/src/assets/registerimage3.png';
import Logo from '/src/assets/logo.png';

const RegisterPage = () => {
  // State management
  const [formData, setFormData] = useState({ name: '', email: '', password: '', profilePhoto: null });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', password: '' });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef(null);
  
  const navigate = useNavigate();
  
  // Mouse position tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const backgroundX = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);
  const backgroundY = useTransform(mouseY, [0, window.innerHeight], [-50, 50]);

  // Constant styles
  const styles = {
    background: 'white',
    text: '#301B52',
    subtext: '#666',
    card: 'white',
    cardShadow: '0 10px 30px rgba(0,0,0,0.1)',
    inputBg: '#f5f5f5',
    buttonGradient: 'linear-gradient(45deg, #aa60ea, #7c4dff)',
    inputStyles: {
      mb: 2, // Reduced margin bottom
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        background: '#f5f5f5',
      },
      '& .MuiInputLabel-root': { color: '#666' },
      '& .MuiOutlinedInput-input': { color: '#301B52' },
      position: 'relative',
      zIndex: 1,
    }
  };

  // Animation variants - consolidated
  const animations = {
    page: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.6 } },
      exit: { opacity: 0, transition: { duration: 0.3 } }
    },
    form: {
      hidden: { scale: 0.9, opacity: 0, y: 20 },
      visible: {
        scale: 1, opacity: 1, y: 0,
        transition: { 
          type: 'spring', stiffness: 100, damping: 15, 
          delay: 0.2, staggerChildren: 0.07, delayChildren: 0.2
        },
      }
    },
    item: {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0, opacity: 1,
        transition: { type: 'spring', stiffness: 100, damping: 10 }
      }
    },
    logo: {
      hidden: { scale: 0.8, opacity: 0, rotate: -5 },
      visible: {
        scale: 1, opacity: 1, rotate: 0,
        transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }
      },
      hover: { scale: 1.05, rotate: 5, transition: { type: 'spring', stiffness: 300, damping: 10 } }
    },
    character: {
      hidden: { x: -100, opacity: 0 },
      visible: {
        x: 0, opacity: 1,
        transition: { type: 'spring', stiffness: 50, damping: 20, delay: 0.4 }
      },
      hover: {
        y: [0, -15, 0],
        transition: { y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
      }
    },
    button: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.3 } },
      hover: {
        scale: 1.05,
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      tap: { scale: 0.95 }
    },
    photoUpload: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { delay: 0.3, duration: 0.4 } },
      hover: { 
        scale: 1.05,
        boxShadow: "0px 5px 15px rgba(170, 96, 234, 0.2)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }
    }
  };

  // Photo upload handling
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData({ ...formData, profilePhoto: file });
        setUploadComplete(true);
        
        // Show success notification
        setNotification({
          show: true,
          message: 'Photo uploaded successfully!',
          type: 'success'
        });
        
        // Hide notification after 3 seconds
        setTimeout(() => {
          setNotification({ ...notification, show: false });
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Form handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMouseMove = (event) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const errors = { name: '', email: '', password: '' };
    
    if (!formData.name) {
      errors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleRegister = async () => {
    setHasInteracted(true);
  
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append(
        'dateOfBirth',
        formData.dateOfBirth || new Date().toISOString().split('T')[0]
      );
      formDataToSend.append('role', 'user');
  
      if (formData.profilePhoto) {
        formDataToSend.append('profilePhoto', formData.profilePhoto);
      }
  
      console.log('Submitting FormData:', Object.fromEntries(formDataToSend.entries()));
  
      await register(formDataToSend); // Assuming register() handles FormData
  
      setNotification({
        show: true,
        message: 'Registration successful. Please login to continue.',
        type: 'success',
      });
    } catch (error) {
      console.error('Registration error:', error);
      setNotification({
        show: true,
        message: 'Connection error. Please try again later.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };
   

  // UI components - extracted for readability
    const renderInputField = (name, label, icon, type = 'text') => (
      <motion.div variants={animations.item}>
        <TextField
          fullWidth
          name={name}
          label={label}
          variant="outlined"
          type={name === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={formData[name]}
          onChange={handleChange}
          error={hasInteracted && !!formErrors[name]}
          helperText={hasInteracted && formErrors[name]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {icon}
              </InputAdornment>
            ),
            ...(name === 'password' && {
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="div" onClick={() => setShowPassword(!showPassword)}
                    sx={{ cursor: 'pointer', color: styles.subtext }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Box>
                </InputAdornment>
              )
            })
          }}
          sx={name === 'password' ? {...styles.inputStyles, mb: 3} : styles.inputStyles}
          size="small" // Make inputs smaller
        />
      </motion.div>
    );
  
    // Photo upload component - more compact
    const renderPhotoUpload = () => (
      <motion.div 
        variants={animations.photoUpload}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        style={{ marginBottom: '16px', position: 'relative', zIndex: 1 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: 'none' }}
        />
        
        <Box
          onClick={triggerFileInput}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '12px',
            background: styles.inputBg,
            transition: 'all 0.3s ease',
            border: '2px dashed rgba(170, 96, 234, 0.3)',
            '&:hover': {
              borderColor: 'rgba(170, 96, 234, 0.6)',
              background: 'rgba(170, 96, 234, 0.05)',
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            {photoPreview ? (
              <Avatar 
                src={photoPreview} 
                sx={{ 
                  width: 60, 
                  height: 60,
                  border: '3px solid #aa60ea',
                  boxShadow: '0 4px 10px rgba(170, 96, 234, 0.2)',
                }} 
              />
            ) : (
              <Avatar 
                sx={{ 
                  width: 60, 
                  height: 60, 
                  background: 'rgba(170, 96, 234, 0.1)',
                  color: '#aa60ea' 
                }}
              >
                <AddAPhoto />
              </Avatar>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {uploadComplete ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Check sx={{ color: '#4CAF50', mr: 0.5, fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                  Photo added
                </Typography>
              </Box>
            ) : (
              <Typography variant="caption" sx={{ color: styles.subtext }}>
                Add profile photo 
              </Typography>
            )}
          </Box>
        </Box>
      </motion.div>
    );

  return (
    <motion.div variants={animations.page} initial="initial" animate="animate" exit="exit">
      <Box
        onMouseMove={handleMouseMove}
        sx={{ display: 'flex', height: '100vh', position: 'relative', overflow: 'hidden', bgcolor: styles.background }}
      >
        {/* Animated Background Elements */}
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${Registerimage})`, backgroundSize: 'cover',
            backgroundPosition: 'center', x: backgroundX, y: backgroundY,
            scale: 1.1, opacity: 0.8,
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${Registerimage1})`, backgroundSize: 'cover',
            backgroundPosition: 'center', scale: 1.2, opacity: 0.7,
            x: useTransform(mouseX, [0, window.innerWidth], [-30, 30]),
            y: useTransform(mouseY, [0, window.innerHeight], [-30, 30]),
          }}
        />
        
        {/* Gradient Overlay */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />

        {/* Main Content */}
        <Box
          sx={{
            display: 'flex', height: '100vh', alignItems: 'center',
            justifyContent: 'space-between', padding: { xs: '5%', md: '10%' },
            position: 'relative', zIndex: 3, width: '100%',
          }}
        >
          {/* Character Animation */}
          <Box
            sx={{
              flex: 1, display: { xs: 'none', md: 'flex' },
              justifyContent: 'center', alignItems: 'center', position: 'relative',
            }}
          >
            <motion.div
              variants={animations.character}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ position: 'relative', maxWidth: '400px', zIndex: 2 }}
            >
              <motion.img
                src={Registerimage2}
                alt="Register Character"
                style={{
                  width: '130%', height: 'auto',
                  filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.2))',
                }}
              />
              
              {/* Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: 1, duration: 0.5 } }}
                style={{
                  position: 'absolute', top: -40, right: -20, background: styles.card,
                  borderRadius: 16, padding: '12px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  maxWidth: 200
                }}
              >
                <Typography variant="body2" sx={{ color: styles.text }}>
                  Join us today! Create your account in seconds.
                </Typography>
                <Box
                  sx={{
                    width: 20, height: 20, background: styles.card,
                    position: 'absolute', bottom: -8, left: '30%',
                    transform: 'rotate(45deg)',
                  }}
                />
              </motion.div>
            </motion.div>
          </Box>

          {/* Register Form - MODIFIED: Added marginTop to shift form up */}
          <Box
            sx={{
              flex: { xs: '1', md: '0.8' }, display: 'flex',
              justifyContent: 'center', alignItems: 'center',
              maxWidth: { xs: '100%', sm: '450px' }, height: '100%',
              mt: { xs: '-23%', sm: '-21%', md: '-20%' }, // Added negative margin top to move the form up
            }}
          >
            <motion.div
              initial="hidden" animate="visible" variants={animations.form}
              style={{ width: '100%' }}
            >
              <Paper
                elevation={10}
                sx={{
                  borderRadius: 4, 
                  p: { xs: 2, sm: 4 }, // Reduced padding
                  textAlign: 'center',
                  background: styles.card, 
                  boxShadow: styles.cardShadow,
                  overflow: 'visible', // Changed from 'auto' to 'visible'
                  position: 'relative',
                  maxHeight: '95vh',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Decorative Background Elements */}
                <Box 
                  sx={{
                    position: 'absolute', top: '-50%', right: '-20%',
                    width: '300px', height: '300px', borderRadius: '50%',
                    background: 'linear-gradient(45deg, rgba(170, 96, 234, 0.1), rgba(124, 77, 255, 0.05))',
                    zIndex: 0,
                  }}
                />
                <Box 
                  sx={{
                    position: 'absolute', bottom: '-30%', left: '-20%',
                    width: '250px', height: '250px', borderRadius: '50%',
                    background: 'linear-gradient(45deg, rgba(170, 96, 234, 0.05), rgba(124, 77, 255, 0.1))',
                    zIndex: 0,
                  }}
                />

                {/* Logo */}
                <motion.div variants={animations.logo} whileHover="hover">
                  <Box
                    sx={{
                      display: 'flex', justifyContent: 'center',
                      mb: 2, // Reduced margin
                      position: 'relative', zIndex: 1,
                    }}
                  >
                    <img src={Logo} alt="VaccineBaby Logo" style={{ width: '100px' }} /> {/* Smaller logo */}
                  </Box>
                </motion.div>

                {/* Welcome Text */}
                <motion.div variants={animations.item}>
                  <Typography
                    variant="h5" // Smaller heading
                    sx={{ mb: 0.5, color: styles.text, fontWeight: 'bold', position: 'relative', zIndex: 1 }}
                  >
                    Create Account
                  </Typography>
                </motion.div>

                <motion.div variants={animations.item}>
                  <Typography
                    variant="body2" // Smaller text
                    sx={{ mb: 2, color: styles.subtext, position: 'relative', zIndex: 1 }}
                  >
                    Enter your details to get started
                  </Typography>
                </motion.div>

                {/* Photo Upload - NEW COMPONENT */}
                {renderPhotoUpload()}

                {/* Input Fields */}
                {renderInputField('name', 'Full Name', <Person sx={{ color: styles.subtext }} />)}
                {renderInputField('email', 'Email', <Email sx={{ color: styles.subtext }} />)}
                {renderInputField('password', 'Password', <Lock sx={{ color: styles.subtext }} />)}

                {/* Register Button */}
                <motion.div 
                  variants={animations.button}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ width: '100%', position: 'relative', zIndex: 1 }}
                >
                  <Box
                    onClick={!isLoading ? handleRegister : undefined}
                    sx={{
                      borderRadius: 10, py: 1.2, // Reduced padding
                      background: styles.buttonGradient,
                      color: 'white', fontWeight: 'bold', fontSize: '0.9rem', // Smaller font
                      boxShadow: '0 4px 10px rgba(170, 96, 234, 0.3)',
                      cursor: isLoading ? 'default' : 'pointer',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Sign Up'}
                  </Box>
                </motion.div>

                {/* Login Link */}
                <motion.div variants={animations.item}>
                  <Typography variant="body2" sx={{ mt: 2, color: styles.subtext, position: 'relative', zIndex: 1 }}>
                    Already have an account?
                    <Box
                      component="span"
                      onClick={() => navigate('/')}
                      sx={{
                        color: '#aa60ea', marginLeft: 1, cursor: 'pointer', fontWeight: 'medium',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Log In
                    </Box>
                  </Typography>
                </motion.div>

                {/* Terms and Conditions */}
                <motion.div variants={animations.item}>
                  <Typography variant="caption" sx={{ mt: 2, display: 'block', color: styles.subtext, position: 'relative', zIndex: 1 }}>
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </Typography>
                </motion.div>
              </Paper>
            </motion.div>
          </Box>
        </Box>

        {/* Notification */}
        <Snackbar
          open={notification.show}
          autoHideDuration={6000}
          onClose={() => setNotification({ ...notification, show: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setNotification({ ...notification, show: false })}
            severity={notification.type as "error" | "warning" | "info" | "success"}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default RegisterPage;
