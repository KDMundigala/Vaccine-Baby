import React from 'react'
import Navbar from '../components/navbar.jsx';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { Vaccines, ConnectWithoutContact, Calculate, HelpOutline } from '@mui/icons-material';

const FeatureComponent = () => {
  const features = [
    {
      title: 'Vaccinations',
      description: 'Smart tracking with predictive scheduling',
      icon: <Vaccines />,
      link: '/vaccination',
      color: '#8c52ff'
    },
    {
      title: 'Chat with Midwife',
      description: '24/7 virtual consultations with experts',
      icon: <ConnectWithoutContact />,
      link: '/chat',
      color: '#5e9bff'
    },
    {
      title: 'Growth Tracker',
      description: 'Interactive BMI & milestone predictions',
      icon: <Calculate />,
      link: '/health-calculator',
      color: '#ff6b6b'
    },
    {
      title: 'Baby Wisdom',
      description: 'AI-powered parenting guidance',
      icon: <HelpOutline />,
      link: '/faq',
      color: '#4ecdc4'
    }
  ];

  const floatingVariants = {
    float: {
      y: [-10, 10],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }
      }
    }
  };

  const orbVariants = {
    initial: { x: 0, y: 0 },
    animate: {
      x: ['0%', '100%', '0%'],
      y: [0, 100, 0],
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, #f8f9ff 0%, #f0f5ff 100%)',
        py: 10,
        px: { xs: 2, md: 8 }
      }}
    >
      {/* Animated background elements */}
      <motion.div 
        variants={orbVariants}
        initial="initial"
        animate="animate"
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '30vw',
          height: '30vw',
          background: 'linear-gradient(45deg, #8c52ff22, #5e9bff33)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              mb: 5,
              fontWeight: 900,
              background: 'linear-gradient(45deg, #8c52ff, #5e9bff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              letterSpacing: '-0.03em'
            }}
          >
            Our Services
            <Box component="span" sx={{ color: '#ff6b6b', WebkitTextFillColor: '#ff6b6b', ml: 3 }}>+</Box>
          </Typography>
        </motion.div>

        <Grid container spacing={6} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={6} key={index}>
              <motion.a
                href={feature.link}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  sx={{
                    minHeight: 320,
                    borderRadius: 6,
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    overflow: 'visible',
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover': {
                      '&:after': {
                        opacity: 1
                      }
                    }
                  }}
                >
                  {/* Hover effect layer */}
                  <Box
                    component="span"
                    sx={{
                      position: 'absolute',
                      inset: -2,
                      borderRadius: 8,
                      background: `linear-gradient(45deg, ${feature.color}33, transparent)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      zIndex: 0
                    }}
                  />

                  <CardContent sx={{ 
                    p: 4, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <motion.div
                      variants={floatingVariants}
                      animate="float"
                      style={{ marginBottom: 32 }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 40,
                          boxShadow: `0 8px 24px ${feature.color}33`
                        }}
                      >
                        {feature.icon}
                      </Box>
                    </motion.div>

                    <Typography
                      variant="h3"
                      sx={{
                        mb: 2,
                        fontWeight: 800,
                        textAlign: 'center',
                        fontSize: '1.5rem',
                        color: '#2d3748'
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: '#718096',
                        textAlign: 'center',
                        lineHeight: 1.6,
                        mb: 3,
                        fontSize: '1rem'
                      }}
                    >
                      {feature.description}
                    </Typography>

                    <motion.div
                      whileHover={{ x: 5 }}
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: 'inline-block',
                          width: 24,
                          height: 2,
                          background: feature.color,
                          mr: 1,
                          transition: 'width 0.3s ease'
                        }}
                      />
                      <Typography
                        variant="button"
                        sx={{
                          color: feature.color,
                          fontWeight: 700,
                          letterSpacing: '0.05em'
                        }}
                      >
                        Explore Now
                      </Typography>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.a>
            </Grid>
          ))}
        </Grid>        
      </Container>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            width: 8,
            height: 8,
            borderRadius: '50%'
          }}
          initial={{
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            scale: 0
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </Box>
  );
};

function Services() {
  return (
    <div>
        <Navbar />
        <FeatureComponent />
    </div>
  )
}

export default Services