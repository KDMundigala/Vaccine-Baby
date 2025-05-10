import React, { useState, useCallback, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import local assets
import backgroundImage from '/src/assets/hero.png';
import Landingimage1 from '/src/assets/herophoto1.png';  // First slide image
import Landingimage2 from '/src/assets/herophoto2.png';  // Second slide image
import Landingimage3 from '/src/assets/herophoto3.png';  // Third slide image

// Animation Keyframes - optimized with will-change for better performance
const slowSlideAnimation = keyframes`
  0% { 
    opacity: 0; 
    transform: translateX(-50px); 
    will-change: transform, opacity;
  }
  100% { 
    opacity: 1; 
    transform: translateX(0); 
    will-change: transform, opacity;
  }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); will-change: transform; }
  50% { transform: translateY(-10px); will-change: transform; }
  100% { transform: translateY(0px); will-change: transform; }
`;

// Custom theme with Poppins font
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#6B4EFF',
    },
  },
});

// Landing page content configurations - memoized to prevent unnecessary re-renders
const landingPages = [
  {
    headline1: "Your Baby's Health",
    headline2: "Our Priority!",
    description: "Stay ahead of your baby's immunization schedule with VaccineBaby. Our smart vaccination reminder service ensures you never miss an important vaccine. Get timely alerts, track progress, and give your little one the best protection for a healthy future.",
    image: Landingimage1,
    buttonColor: 'rgba(170, 96, 234, 1)',
    buttonText: 'Get Started',
    targetRoute: '/baby-details'
  },
  {
    headline1: "Your Baby's Immunizations",
    headline2: "Our Responsibility!",
    description: "VaccineTracker helps you stay on schedule with your baby's immunizations. Get notified on vaccine dates, monitor your baby's health, and ensure they are protected from preventable diseases.",
    image: Landingimage2,
    buttonColor: 'rgba(255, 127, 80, 1)', // Orange
    buttonText: 'Start Now',
    targetRoute: '/baby-details'
  },
  {
    headline1: "Smart",
    headline2: "Vaccination Alerts",
    description: "Never miss a vaccine again! Our system sends timely notifications, helps you manage schedules, and keeps your baby protected with cutting-edge technology.",
    image: Landingimage3,
    buttonColor: 'rgba(0, 200, 83, 1)', // Green
    buttonText: 'Ready to Begin',
    targetRoute: '/baby-details'
  }
];

// Styled Components with optimized transitions
const LandingContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '92vh',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#E6E6FA',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
  padding: theme.spacing(4),
}));

const SlideIndicatorsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '30px',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  zIndex: 10,
}));

const SlideIndicator = styled(Box)(({ theme, active }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: active ? '#6B4EFF' : '#E0E0E0',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: active ? 'scale(1.5)' : 'scale(1)',
  willChange: 'transform, background-color',
  '&:hover': {
    transform: 'scale(1.3)',
  }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: theme.spacing(4),
  willChange: 'contents',
}));

const TextSection = styled(Box)(({ theme }) => ({
  flex: 1,
  animation: `${slowSlideAnimation} 3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
  animationDelay: '0.5s',
  opacity: 0,
  transform: 'translateX(-50px)',
  willChange: 'transform, opacity',
}));

const ImageSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  animation: `${floatAnimation} 3s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
  willChange: 'transform',
}));

const VaccineBabyLanding = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Memoized page transition variants for better performance
  const pageVariants = useMemo(() => ({
    initial: (direction) => ({ 
      opacity: 0, 
      x: direction > 0 ? '100%' : '-100%',
      scale: 0.9,
      willChange: 'transform, opacity'
    }),
    in: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1], // Optimized cubic-bezier for smooth animation
        willChange: 'transform, opacity'
      }
    },
    out: (direction) => ({ 
      opacity: 0, 
      x: direction > 0 ? '-100%' : '100%',
      scale: 0.9,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1], // Optimized cubic-bezier
        willChange: 'transform, opacity'
      }
    })
  }), []);

  // Memoized headline animation variants
  const headlineVariants = useMemo(() => ({
    initial: { 
      opacity: 0, 
      y: 50,
      rotate: 2,
      willChange: 'transform, opacity'
    },
    hover: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1.05,
      transition: {
        delay: i * 0.05, // Reduced delay for smoother animation
        duration: 0.25,  // Slightly faster for better responsiveness
        ease: [0.4, 0.0, 0.2, 1], // Optimized cubic-bezier
        willChange: 'transform, opacity'
      }
    }),
    rest: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        delay: i * 0.05, // Reduced delay
        duration: 0.25,  // Slightly faster
        ease: [0.4, 0.0, 0.2, 1], // Optimized cubic-bezier
        willChange: 'transform, opacity'
      }
    })
  }), []);

  // Memoized current content
  const currentContent = useMemo(() => landingPages[currentPage], [currentPage]);

  // Memoized headline splits
  const headline1 = useMemo(() => currentContent.headline1.split(" "), [currentContent.headline1]);
  const headline2 = useMemo(() => currentContent.headline2.split(" "), [currentContent.headline2]);

  // Optimized page transition handler with useCallback
  const handlePageTransition = useCallback((pageIndex) => {
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  }, [currentPage]);

  // Optimized button click handler with useCallback
  const handleButtonClick = useCallback(() => {
    // First log which button was clicked
    switch(currentPage) {
      case 0:
        console.log('Learn more clicked');
        break;
      case 1:
        console.log('Get Started clicked');
        break;
      case 2:
        console.log('Start Now clicked');
        break;
      default:
        break;
    }
    
    // Then navigate to the target route
    navigate('/baby-details');
  }, [currentPage, navigate]);

  // Optimized mouse move handler with useCallback and throttling
  const handleMouseMove = useCallback((event) => {
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      const { clientX, clientY } = event;
      x.set(clientX);
      y.set(clientY);
    });
  }, [x, y]);

  // Optimized transform calculations with lower sensitivity for smoother motion
  const rotateX = useTransform(y, [0, window.innerHeight], [-5, 5]); // Reduced range from -10,10 to -5,5
  const rotateY = useTransform(x, [0, window.innerWidth], [5, -5]);  // Reduced range from 10,-10 to 5,-5

  return (
    <ThemeProvider theme={theme}>
      <LandingContainer onMouseMove={handleMouseMove}>
        {/* Slide Indicators */}
        <SlideIndicatorsContainer>
          {landingPages.map((_, index) => (
            <SlideIndicator 
              key={index}
              active={index === currentPage}
              onClick={() => handlePageTransition(index)}
            />
          ))}
        </SlideIndicatorsContainer>

        <Container>
          <AnimatePresence 
            mode="wait" 
            initial={false}
            custom={direction}
          >
            <motion.div
              key={currentPage}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              custom={direction}
              style={{ willChange: 'transform, opacity' }}
            >
              <ContentBox>
                <TextSection>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 1.2, // Slightly faster
                      ease: [0.4, 0.0, 0.2, 1], // Optimized cubic-bezier
                      delay: 0.3 // Slightly faster start
                    }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <Typography 
                      variant="h3" 
                      component="h1" 
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      sx={{ 
                        fontWeight: 900, 
                        marginBottom: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        perspective: '1000px',
                        '& span': {
                          display: 'flex',
                          gap: '10px'
                        },
                        '& .black-text': {
                          color: '#000'
                        },
                        '& .purple-text': {
                          background: 'linear-gradient(90deg, #6B4EFF 0%, #AA60EA 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }
                      }}
                    >
                      <span>
                        {headline1.map((word, index) => (
                          <motion.span
                            key={index}
                            custom={index}
                            variants={headlineVariants}
                            initial="initial"
                            animate={isHovered ? "hover" : "rest"}
                            className="black-text"
                            style={{
                              transformStyle: 'preserve-3d',
                              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                              willChange: 'transform'
                            }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </span>
                      <span>
                        {headline2.map((word, index) => (
                          <motion.span
                            key={index}
                            custom={index}
                            variants={headlineVariants}
                            initial="initial"
                            animate={isHovered ? "hover" : "rest"}
                            className="purple-text"
                            style={{
                              transformStyle: 'preserve-3d',
                              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                              willChange: 'transform'
                            }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </span>
                    </Typography>
                    
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ 
                        type: "tween", 
                        duration: 0.2, // Faster for better responsiveness
                        ease: [0.4, 0.0, 0.2, 1] // Optimized cubic-bezier
                      }}
                      style={{ willChange: 'transform' }}
                    >
                      <Typography 
                        variant="body1" 
                        component={motion.p}
                        sx={{ 
                          color: '#5A6B87', 
                          marginBottom: 3,
                          cursor: 'default'
                        }}
                      >
                        {currentContent.description}
                      </Typography>
                    </motion.div>
                    
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ 
                          type: "tween", 
                          duration: 0.2, // Faster for better responsiveness
                          ease: [0.4, 0.0, 0.2, 1] // Optimized cubic-bezier
                        }}
                        style={{ willChange: 'transform' }}
                      >
                        <Button 
                          variant="contained" 
                          color="primary" 
                          size="large"
                          onClick={handleButtonClick}
                          sx={{ 
                            textTransform: 'none', 
                            borderRadius: 2,
                            padding: '10px 24px',
                            backgroundColor: currentContent.buttonColor,
                            '&:hover': {
                              backgroundColor: '#5A39CC'
                            }
                          }}
                        >
                          {currentContent.buttonText}
                        </Button>
                      </motion.div>
                    </Box>
                  </motion.div>
                </TextSection>
                
                <ImageSection>
                  <motion.img 
                    src={currentContent.image}
                    alt="Parent and child" 
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8,
                      x: 200
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: 0
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -1.5, 1.5, 0], // Smoother rotation values
                      transition: {
                        type: "tween", 
                        duration: 0.4, // Slightly slower for smoother effect
                        ease: [0.4, 0.0, 0.2, 1] // Optimized cubic-bezier
                      }
                    }}
                    transition={{ 
                      duration: 0.8, // Slightly faster
                      ease: [0.4, 0.0, 0.2, 1] // Optimized cubic-bezier
                    }}
                    style={{ 
                      maxWidth: '110%', 
                      height: 'auto', 
                      borderRadius: '12px',
                      willChange: 'transform, opacity'
                    }} 
                  />
                </ImageSection>
              </ContentBox>
            </motion.div>
          </AnimatePresence>
        </Container>
      </LandingContainer>
    </ThemeProvider>
  );
};

export default VaccineBabyLanding;