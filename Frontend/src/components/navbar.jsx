import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppBar, Toolbar, Button, Box, Avatar } from '@mui/material';
import Logo from '/src/assets/logo2.png';
import BabyCard from '/src/assets/birth.png';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isCardAnimating, setIsCardAnimating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [profilePicture, setProfilePicture] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Check if user has a profile picture and set it
    if (user && user.profilePicture) {
      setProfilePicture(user.profilePicture);
    } else {
      setProfilePicture(null); // Reset if no picture is found
    }
  }, [user])

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Handle baby card click animation
  const handleBabyCardClick = () => {
    setIsCardAnimating(true);
    setTimeout(() => setIsCardAnimating(false), 1000);
  };

  // Hide navbar on login page
  if (location.pathname === '/login') {
    return null;
  }

  const navItems = [
    { label: 'Home', href: '/home' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ];

  const curveVariants = {
    initial: { scale: 0, opacity: 0 },
    hover: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } }
  };

  const linkVariants = {
    initial: { color: '#6D6D6D', y: 0 },
    hover: { color: '#AA60EA', y: -3, transition: { type: 'spring', stiffness: 400 } }
  };

  const babyCardVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: { 
      rotate: [0, 15, -15, 10, -10, 5, -5, 0],
      scale: [1, 1.2, 1.2, 1.1, 1.1, 1.05, 1.05, 1],
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'fixed', width: '100%', zIndex: 1000, top: 0, fontFamily: 'Poppins, sans-serif' }}
    >
      <AppBar 
        position="fixed"
        sx={{
          background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 2, md: 5 }, py: 1, position: 'relative' }}>
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.1 }} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Vaccine Baby Logo" style={{ height: 'auto', width: 'auto' }} />
          </motion.div>

          {/* Navigation Links */}
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}>
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
                style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {/* Curved Background */}
                <AnimatePresence>
                  {hoveredItem === index && (
                    <motion.div
                      variants={curveVariants}
                      initial="initial"
                      animate="hover"
                      exit="initial"
                      style={{ position: 'absolute', width: '120%', height: '200%', backgroundColor: 'rgba(170, 96, 234, 0.1)', borderRadius: '50%', zIndex: -1, transformOrigin: 'center' }}
                    />
                  )}
                </AnimatePresence>

                {/* Link */}
                <motion.a
                  href={item.href}
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                  style={{ 
                    margin: '0 15px', 
                    textDecoration: 'none', 
                    color: scrolled ? '#333' : '#6D6D6D',
                    fontWeight: 500, 
                    cursor: 'pointer', 
                    transition: 'all 0.3s ease', 
                    position: 'relative', 
                    zIndex: 1 
                  }}
                >
                  {item.label}
                </motion.a>
              </motion.div>
            ))}
          </Box>

          {/* Profile Button with BabyCard and Avatar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* BabyCard Icon with Click Animation */}
            <motion.div
              variants={babyCardVariants}
              initial="initial"
              animate={isCardAnimating ? "animate" : "initial"}
              onClick={() => navigate('/baby')}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={BabyCard} 
                alt="Baby Card" 
                style={{ 
                  height: 28, 
                  width: 'auto',
                  filter: scrolled ? 'none' : 'brightness(1.2)'
                }} 
              />
            </motion.div>

            {/* Profile Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/profile')}
                sx={{
                  borderRadius: 20,
                  background: scrolled ? 'rgba(170, 96, 234, 0.1)' : 'rgba(206, 213, 255, 0)',
                  px: { xs: 2, md: 3 },
                  py: 1,
                  textTransform: 'none',
                  color: scrolled ? '#333' : 'white',
                  boxShadow: scrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(170, 96, 234, 0)',
                  '&:hover': { background: 'rgb(206, 213, 255)' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'all 0.3s ease',
                }}
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    style={{ width: 24, height: 24, borderRadius: '50%', border: scrolled ? '1px solid #333' : '1px solid #fff' }}
                  />
                ) : (
                  <Avatar 
                    sx={{ 
                      width: 24, 
                      height: 24,
                      border: scrolled ? '1px solid #333' : '1px solid #fff'
                    }}
                  />
                )}
                Profile
              </Button>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;