import React, { useState } from 'react';
import { TextField, Typography, Paper, Box, InputAdornment, CircularProgress, Snackbar, Alert } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

import Loginimage from '/src/assets/loginimage1.png';
import Loginimage1 from '/src/assets/Loginimage2.png';
import Loginimage2 from '/src/assets/Loginimage3.png';
import Logo from '/src/assets/logo.png';

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  // State management
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [hasInteracted, setHasInteracted] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

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
      mb: 3,
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
    }
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
    const errors = { email: '', password: '' };
    
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
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleLogin = async () => {
    setHasInteracted(true);
    
    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { email, password } = formData;
      
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Store user data
        localStorage.setItem('user', JSON.stringify({
          id: response.data._id,
          email: response.data.email,
          name: response.data.fullName,
          role: response.data.role,
          profilePicture: response.data.profilePicture,
        }));

        console.log('Login successful:', response.data);

        // Show success message
        setNotification({
          show: true,
          message: 'Login successful!',
          type: 'success'
        });

        // Navigate based on role
        if (response.data.role === 'midwife') {
          navigate('/midwife');
        } else {
          navigate('/home');
        }
      } else {
        throw new Error('No token received from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      setNotification({
        show: true,
        message: error.response?.data?.message || 'Login failed. Please check your credentials.',
        type: 'error'
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
        sx={name === 'password' ? {...styles.inputStyles, mb: 4} : styles.inputStyles}
      />
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
            backgroundImage: `url(${Loginimage})`, backgroundSize: 'cover',
            backgroundPosition: 'center', x: backgroundX, y: backgroundY,
            scale: 1.1, opacity: 0.8,
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${Loginimage1})`, backgroundSize: 'cover',
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
            mt: { xs: '-5%', sm: '-8%', md: '-10%' },
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
                src={Loginimage2}
                alt="Login Character"
                style={{
                  width: '100%', height: 'auto',
                  marginTop:'250px',
                  filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.2))',
                }}
              />
            </motion.div>
          </Box>

          {/* Login Form */}
          <Box
            sx={{
              flex: { xs: '1', md: '0.8' }, display: 'flex',
              justifyContent: 'center', alignItems: 'flex-start',
              paddingTop: { xs: '2%', sm: '3%' },
              maxWidth: { xs: '100%', sm: '450px' }, height: '100%',
            }}
          >
            <motion.div
              initial="hidden" animate="visible" variants={animations.form}
              style={{ width: '100%' }}
            >
              <Paper
                elevation={10}
                sx={{
                  borderRadius: 4, p: { xs: 3, sm: 5 }, textAlign: 'center',
                  background: styles.card, boxShadow: styles.cardShadow,
                  overflow: 'hidden', position: 'relative',
                }}
              >
                {/* Logo */}
                <motion.div variants={animations.logo} whileHover="hover">
                  <Box
                    sx={{
                      display: 'flex', justifyContent: 'center',
                      mb: 4, position: 'relative', zIndex: 1,
                    }}
                  >
                    <img src={Logo} alt="Logo" style={{ width: '120px' }} />
                  </Box>
                </motion.div>

                {/* Welcome Text */}
                <motion.div variants={animations.item}>
                  <Typography
                    variant="h4"
                    sx={{ mb: 1, color: styles.text, fontWeight: 'bold', position: 'relative', zIndex: 1 }}
                  >
                    Welcome Back
                  </Typography>
                </motion.div>

                <motion.div variants={animations.item}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 4, color: styles.subtext, position: 'relative', zIndex: 1 }}
                  >
                    Enter your credentials to access your account
                  </Typography>
                </motion.div>

                {/* Input Fields */}
                {renderInputField('email', 'Email', <Email sx={{ color: styles.subtext }} />)}
                {renderInputField('password', 'Password', <Lock sx={{ color: styles.subtext }} />)}

                {/* Forgot Password Link */}
                <motion.div variants={animations.item}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                    <Typography
                      variant="body2"
                      onClick={() => navigate('/forgot-password')}
                      sx={{
                        color: '#6EC6E9', cursor: 'pointer', fontWeight: 'medium',
                        '&:hover': { textDecoration: 'underline' },
                        position: 'relative', zIndex: 1
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  </Box>
                </motion.div>

                {/* Login Button */}
                <motion.div
                  variants={animations.button}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ width: '100%', position: 'relative', zIndex: 1 }}
                >
                  <Box
                    onClick={!isLoading ? handleLogin : undefined}
                    sx={{
                      borderRadius: 10, py: 1.5, background: styles.buttonGradient,
                      color: 'white', fontWeight: 'bold', fontSize: '1rem',
                      boxShadow: '0 4px 10px rgba(233, 110, 110, 0.3)',
                      cursor: isLoading ? 'default' : 'pointer',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
                  </Box>
                </motion.div>

                {/* Register Link */}
                <motion.div variants={animations.item}>
                  <Typography variant="body2" sx={{ mt: 3, color: styles.subtext, position: 'relative', zIndex: 1 }}>
                    Don't have an account?
                    <Box
                      component="span"
                      onClick={() => navigate('/register')}
                      sx={{
                        color: '#6EC6E9', marginLeft: 1, cursor: 'pointer', fontWeight: 'medium',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Sign Up
                    </Box>
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
            severity={notification.type}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default LoginPage;
