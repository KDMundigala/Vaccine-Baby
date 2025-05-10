import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid } from '@mui/material';
import Cardone from '/src/assets/card1.png';
import Cardtwo from '/src/assets/card2.png';
import Cardthree from '/src/assets/card3.png';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // <-- Add this import

// Create motion component for Grid items
const MotionGrid = motion(Grid);

function ComponentWithBackground() {
  // Animation controls
  const controls = useAnimation();
  const [activeIndices, setActiveIndices] = useState([]);
  const navigate = useNavigate(); // <-- Add this line

  // Memoize the handleCardClick function to prevent unnecessary re-renders
  const handleCardClick = useCallback((index, path) => {
    setActiveIndices(prev => [...prev, index]);
    // Navigate to the route
    navigate(path);
    // Reset after animation completes
    setTimeout(() => {
      setActiveIndices(prev => prev.filter(i => i !== index));
    }, 700);
  }, [navigate]);

  // Intersection Observer to detect when component is in view
  useEffect(() => {
    let observer;
    let animationStarted = false;

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animationStarted) {
          animationStarted = true;
          controls.start("visible")
            .then(() => {
              controls.start("float");
            });
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const target = document.querySelector(".card-container");
    if (target) observer.observe(target);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    },
    float: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 70,
        damping: 12,
        duration: 0.4
      }
    },
    float: {
      y: [0, -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
          repeatType: "mirror",
        }
      }
    }
  };

  const clickAnimation = {
    scale: [1, 1.08, 1],
    transition: {
      scale: {
        duration: 0.5,
        ease: "easeOut",
      }
    }
  };

  // Cards data with images and navigation paths
  const cards = [
    { img: Cardone, path: '/health-calculator' },    // Change '/route-one' to your actual route
    { img: Cardtwo, path: '/vaccination' },    // Change '/route-two' to your actual route
    { img: Cardthree, path: '/faq' } // Change '/route-three' to your actual route
  ];

  return (
    <Box
      sx={{
        backgroundImage: 'url(/src/assets/section8.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        padding: '4rem rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <motion.div
        className="card-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        style={{
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          top: '340px',
          willChange: 'transform',
        }}
      >
        <Grid 
          container 
          spacing={4}
          justifyContent="center" 
        >
          {cards.map((card, index) => (
            <MotionGrid 
              item 
              xs={12} 
              sm={4} 
              md={4} 
              key={index}
              variants={cardVariants}
              animate={activeIndices.includes(index) ? clickAnimation : undefined}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              onClick={() => handleCardClick(index, card.path)}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <motion.img 
                src={card.img} 
                alt={`Card ${index + 1}`}
                style={{ 
                  width: '100%', 
                  maxWidth: '310px',
                  filter: 'drop-shadow(0px 5px 10px rgba(0,0,0,0.12))',
                  willChange: 'transform, filter',
                }}
                whileHover={{
                  filter: 'drop-shadow(0px 8px 15px rgba(0,0,0,0.18))',
                  transition: { duration: 0.3 }
                }}
              />
            </MotionGrid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}

export default ComponentWithBackground;