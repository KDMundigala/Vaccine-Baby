import React, { useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
// Updated Timeline imports
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { 
  CalendarMonth, 
  Chat, 
  BarChart, 
  QuestionAnswer,
  BabyChangingStation,
  Favorite,
  HealthAndSafety,
  Lightbulb,
  Diversity3,
  Notifications
} from '@mui/icons-material';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Refs for scroll-triggered animations
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const featuresRef = useRef(null);
  const timelineRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Check if elements are in view
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  
  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2
      }
    }
  };

  const cardsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  // Core values data
  const coreValues = [
    {
      icon: <Favorite fontSize="large" sx={{ color: '#FF6B8A' }} />,
      title: "Care",
      description: "We prioritize the well-being of every child and commit to supporting parents with compassion and understanding."
    },
    {
      icon: <HealthAndSafety fontSize="large" sx={{ color: '#4CAF50' }} />,
      title: "Safety",
      description: "Every feature and piece of advice is carefully vetted to ensure the highest standards of safety and reliability."
    },
    {
      icon: <Lightbulb fontSize="large" sx={{ color: '#FFB84D' }} />,
      title: "Innovation",
      description: "We continuously improve our platform with the latest research and technology to provide cutting-edge solutions."
    },
    {
      icon: <Diversity3 fontSize="large" sx={{ color: '#7986CB' }} />,
      title: "Inclusivity",
      description: "Our services are designed to support diverse families, parenting styles, and cultural approaches to childcare."
    }
  ];

  // Features data
  const features = [
    {
      icon: <CalendarMonth fontSize="large" sx={{ color: '#673AB7' }} />,
      title: "Smart Vaccination Scheduling",
      description: "Personalized vaccination schedules based on your child's age, complete with timely reminders sent directly to your device to ensure no important milestone is missed."
    },
    {
      icon: <Chat fontSize="large" sx={{ color: '#673AB7' }} />,
      title: "Expert Midwife Support",
      description: "Connect with certified midwives through our secure messaging platform for professional advice, reassurance, and answers to your most pressing parenting questions."
    },
    {
      icon: <BarChart fontSize="large" sx={{ color: '#673AB7' }} />,
      title: "Comprehensive Growth Tracking",
      description: "Monitor your child's development with easy-to-read charts and graphs that compare their growth against standard percentiles, helping you track progress effortlessly."
    },
    {
      icon: <QuestionAnswer fontSize="large" sx={{ color: '#673AB7' }} />,
      title: "Interactive Care & Nutrition Guide",
      description: "Access our extensive database of expert-verified information about age-appropriate nutrition, developmental milestones, and everyday care practices."
    }
  ];

  // Timeline data
  const timelineData = [
    {
      icon: <Notifications />,
      title: "Smart Reminders",
      description: "Never miss important vaccines with our intelligent notification system"
    },
    {
      icon: <BarChart />,
      title: "Growth Insights",
      description: "Visualize your child's development with interactive charts and personalized insights"
    },
    {
      icon: <Chat />,
      title: "24/7 Expert Access",
      description: "Connect with certified midwives whenever questions or concerns arise"
    },
    {
      icon: <QuestionAnswer />,
      title: "Knowledge Center",
      description: "Browse our extensive library of articles and resources for everyday parenting challenges"
    }
  ];

  return (
    <Box sx={{ 
      bgcolor: '#CED5FF',
      minHeight: '100vh',
      overflowX: 'hidden',
      pt: 2
    }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section with Parallax Effect */}
        <MotionBox
          style={{ opacity: headerOpacity, scale: headerScale }}
          sx={{ mb: 12, textAlign: 'center', position: 'relative', pt: 4 }}
        >
          <MotionBox
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            sx={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(103,58,183,0.2) 0%, rgba(206,213,255,0) 70%)',
              top: '-50px',
              right: '10%',
              zIndex: 0
            }}
          />
          
          <MotionBox
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            sx={{
              position: 'absolute',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(63,81,181,0.2) 0%, rgba(206,213,255,0) 70%)',
              bottom: '0px',
              left: '5%',
              zIndex: 0
            }}
          />
          
          <MotionTypography 
            variant="h2" 
            component="h1" 
            gutterBottom
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(90deg, #673AB7 0%, #3F51B5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              zIndex: 1,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Vaccine Baby
          </MotionTypography>
          
          <MotionTypography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 5, maxWidth: '800px', mx: 'auto', position: 'relative', zIndex: 1 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Your all-in-one digital companion for modern parenting, making childcare simpler, smarter, and more connected
          </MotionTypography>
          
          <MotionBox
            component={motion.div}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ position: 'relative', zIndex: 1 }}
          >
         
          </MotionBox>
        </MotionBox>

        {/* Mission Statement */}
        <MotionBox 
          ref={missionRef}
          variants={containerVariants}
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          sx={{ 
            mb: 12, 
            p: { xs: 4, md: 6 }, 
            borderRadius: 6,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(242,246,255,0.9) 100%)',
            boxShadow: '0px 20px 40px rgba(103, 58, 183, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background decorative elements */}
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '200px', 
            height: '200px', 
            borderRadius: '0 0 0 100%', 
            background: 'rgba(103, 58, 183, 0.05)', 
            zIndex: 0 
          }} />
          
          <Box sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '150px', 
            height: '150px', 
            borderRadius: '0 100% 0 0', 
            background: 'rgba(63, 81, 181, 0.05)', 
            zIndex: 0 
          }} />
          
          <Grid container spacing={5} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={6}>
              <MotionTypography 
                variant="h3" 
                component="h2" 
                gutterBottom
                variants={itemVariants}
                fontWeight="bold"
                sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
              >
                Our Mission
              </MotionTypography>
              
              <MotionTypography 
                variant="body1" 
                paragraph
                variants={itemVariants}
                sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
              >
                At Vaccine Baby, we're on a mission to transform the complex journey of early childcare into a seamless, supportive experience. We believe that every parent deserves easy access to reliable health information, professional guidance, and practical tools that simplify the critical first years of their child's life.
              </MotionTypography>
              
              <MotionTypography 
                variant="body1"
                paragraph
                variants={itemVariants}
                sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
              >
                In today's fast-paced world, parents are juggling countless responsibilities while trying to provide the best care for their children. Our platform consolidates essential health tracking, vaccination management, and expert support in one intuitive digital space, empowering parents to make informed decisions with confidence.
              </MotionTypography>
              
              <MotionTypography 
                variant="body1"
                variants={itemVariants}
                sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
              >
                Through innovative technology and compassionate expertise, we aim to reduce the anxiety and uncertainty of new parenthood, allowing families to focus on what truly matters—the joy of watching their little ones grow and thrive.
              </MotionTypography>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                component={motion.div}
                variants={itemVariants}
                sx={{
                  height: { xs: 250, md: 350 },
                  borderRadius: 6,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'linear-gradient(145deg, rgba(103,58,183,0.1) 0%, rgba(63,81,181,0.1) 100%)',
                  boxShadow: '0px 15px 30px rgba(103, 58, 183, 0.1)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  position: 'relative'
                }}
              >
                <BabyChangingStation 
                  sx={{ 
                    fontSize: { xs: 100, md: 140 }, 
                    color: 'primary.main', 
                    opacity: 0.7,
                    filter: 'drop-shadow(0px 10px 15px rgba(103, 58, 183, 0.3))'
                  }} 
                />
                
                {/* Animated floating circles */}
                <MotionBox
                  animate={{ 
                    y: [0, -15, 0], 
                    opacity: [0.7, 1, 0.7] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3, 
                    ease: "easeInOut" 
                  }}
                  sx={{
                    position: 'absolute',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(103, 58, 183, 0.1)',
                    top: '30%',
                    left: '20%'
                  }}
                />
                
                <MotionBox
                  animate={{ 
                    y: [0, 10, 0], 
                    opacity: [0.5, 0.8, 0.5] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                  sx={{
                    position: 'absolute',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'rgba(63, 81, 181, 0.1)',
                    bottom: '25%',
                    right: '25%'
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Vision Statement */}
        <MotionBox 
          ref={visionRef}
          variants={containerVariants}
          initial="hidden"
          animate={visionInView ? "visible" : "hidden"}
          sx={{ 
            mb: 12, 
            p: { xs: 4, md: 6 }, 
            borderRadius: 6,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(242,246,255,0.9) 100%)',
            boxShadow: '0px 20px 40px rgba(103, 58, 183, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Grid container spacing={5} alignItems="center" direction={isTablet ? "column-reverse" : "row"}>
            <Grid item xs={12} md={6}>
              <MotionBox
                component={motion.div}
                variants={itemVariants}
                sx={{
                  height: { xs: 250, md: 350 },
                  borderRadius: 6,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'linear-gradient(145deg, rgba(103,58,183,0.1) 0%, rgba(63,81,181,0.1) 100%)',
                  boxShadow: '0px 15px 30px rgba(103, 58, 183, 0.1)',
                  transform: 'perspective(1000px) rotateY(5deg)',
                  position: 'relative'
                }}
              >
                {/* Animated globe or network visualization */}
                <MotionBox
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  sx={{
                    width: { xs: 180, md: 220 },
                    height: { xs: 180, md: 220 },
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {/* Orbit rings */}
                  <Box sx={{ 
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px solid rgba(103, 58, 183, 0.2)',
                    transform: 'rotateX(70deg)'
                  }} />
                  
                  <Box sx={{ 
                    position: 'absolute',
                    width: '80%',
                    height: '80%',
                    borderRadius: '50%',
                    border: '2px solid rgba(103, 58, 183, 0.15)',
                    transform: 'rotateX(70deg) rotateZ(30deg)'
                  }} />
                  
                  <Box sx={{ 
                    position: 'absolute',
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    border: '2px solid rgba(103, 58, 183, 0.1)',
                    transform: 'rotateX(70deg) rotateZ(60deg)'
                  }} />
                  
                  {/* Center sphere */}
                  <Box sx={{ 
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #673AB7 0%, #3F51B5 100%)',
                    boxShadow: '0 0 20px rgba(103, 58, 183, 0.5)'
                  }} />
                  
                  {/* Orbiting dots */}
                  <MotionBox
                    animate={{ 
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 8, 
                      ease: "linear" 
                    }}
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      transform: 'rotateX(70deg)'
                    }}
                  >
                    <Box sx={{ 
                      position: 'absolute',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: '#673AB7',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }} />
                  </MotionBox>
                  
                  <MotionBox
                    animate={{ 
                      rotate: [0, -360]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 12, 
                      ease: "linear" 
                    }}
                    sx={{
                      position: 'absolute',
                      width: '80%',
                      height: '80%',
                      transform: 'rotateX(70deg) rotateZ(30deg)'
                    }}
                  >
                    <Box sx={{ 
                      position: 'absolute',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#3F51B5',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }} />
                  </MotionBox>
                </MotionBox>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionTypography 
                variant="h3" 
                component="h2" 
                gutterBottom
                variants={itemVariants}
                fontWeight="bold"
                sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
              >
                Our Vision
              </MotionTypography>
              
              <MotionTypography 
                variant="body1" 
                paragraph
                variants={itemVariants}
                sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
              >
                We envision a world where every parent has the resources they need to provide optimal care for their children during the most formative years of development. Vaccine Baby aspires to be the leading digital health companion for families globally, revolutionizing how parents access healthcare information and support.
              </MotionTypography>
              
              <MotionTypography 
                variant="body1"
                paragraph
                variants={itemVariants}
                sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
              >
                Our vision extends beyond just providing tools—we aim to create a connected community where healthcare professionals and parents collaborate seamlessly, breaking down traditional barriers to quality childcare guidance. By leveraging technology, we're working toward a future where:
              </MotionTypography>
              
              <MotionBox
                component="ul"
                variants={itemVariants}
                sx={{ pl: 2, fontSize: '1.1rem', lineHeight: 1.7 }}
              >
                <li>All children receive timely vaccinations and preventive care</li>
                <li>Parents have immediate access to trusted health professionals</li>
                <li>Key developmental milestones are tracked and celebrated</li>
                <li>Evidence-based information replaces confusion and misinformation</li>
              </MotionBox>
              
              <MotionTypography 
                variant="body1"
                variants={itemVariants}
                sx={{ fontSize: '1.1rem', lineHeight: 1.7, mt: 2 }}
              >
                Through our platform, we're committed to creating healthier futures for children worldwide, one family at a time.
              </MotionTypography>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Core Values */}
        <Box ref={valuesRef} sx={{ mb: 12 }}>
          <MotionTypography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 8, fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.5rem' } }}
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Our Core Values
          </MotionTypography>
          
          <Grid container spacing={4}>
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 50 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: '0px 20px 30px rgba(103, 58, 183, 0.15)' 
                  }}
                  sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0px 10px 30px rgba(103, 58, 183, 0.1)',
                    transition: 'all 0.4s ease',
                    background: 'rgba(255,255,255,0.9)',
                    p: 1
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 3,
                      gap: 2
                    }}>
                      <Box sx={{ 
                        p: 1.5, 
                        borderRadius: '50%', 
                        background: 'rgba(206,213,255,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        {value.icon}
                      </Box>
                      <Typography variant="h5" component="h3" fontWeight="bold">
                        {value.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box ref={featuresRef} sx={{ mb: 12 }}>
          <MotionTypography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 8, fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.5rem' } }}
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Features Designed for Modern Parents
          </MotionTypography>
          
          <MotionBox
            variants={cardsContainerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            component={Grid}
            container
            spacing={4}
          >
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <MotionCard
                  variants={cardVariants}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0px 15px 30px rgba(103, 58, 183, 0.2)' 
                  }}
                  sx={{ 
                    height: '100%',
                    borderRadius: 6,
                    overflow: 'hidden',
                    transition: 'all 0.4s ease',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(242,246,255,0.9) 100%)',
                    boxShadow: '0px 10px 30px rgba(103, 58, 183, 0.1)',
                    position: 'relative'
                  }}
                >
                  {/* Decorative corner */}
                  <Box sx={{ 
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 100,
                    height: 100,
                    background: 'rgba(206,213,255,0.5)',
                    borderRadius: '0 0 0 100%',
                    zIndex: 0
                  }} />
                  
                  <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          background: 'rgba(206,213,255,0.7)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <MotionBox
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 0.4, type: "spring" }}
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          background: 'rgba(103, 58, 183, 0.1)',
                        }}
                      />
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </MotionBox>

          {/* Features highlights section */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            sx={{ 
              mt: 6, 
              p: { xs: 3, md: 5 }, 
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 30px rgba(103, 58, 183, 0.1)'
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
              Why Parents Choose Vaccine Baby:
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      mt: 0.5
                    }}
                  >
                    1
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    <strong>Peace of Mind:</strong> Comprehensive tracking ensures you never miss critical health milestones for your child
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      mt: 0.5
                    }}
                  >
                    2
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    <strong>Time-Saving:</strong> All your child's health information organized in one intuitive, easy-to-access platform
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      mt: 0.5
                    }}
                  >
                    3
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    <strong>Expert Support:</strong> Instant access to qualified healthcare professionals when you need guidance most
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      mt: 0.5
                    }}
                  >
                    4
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    <strong>Personalized Experience:</strong> Tailored information and recommendations based on your child's specific needs
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      mt: 0.5
                    }}
                  >
                    5
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    <strong>Community Connection:</strong> Join a supportive network of parents sharing similar experiences
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      mt: 0.5
                    }}
                  >
                    6
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    <strong>Trusted Information:</strong> All content is medically verified and regularly updated with the latest research
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </MotionBox>
        </Box>

        {/* Journey Timeline */}
        <Box ref={timelineRef} sx={{ mb: 12 }}>
          <MotionTypography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 8, fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.5rem' } }}
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Supporting Your Parenting Journey
          </MotionTypography>

          <Box sx={{ 
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: isMobile ? '29px' : '50%',
              transform: isMobile ? 'translateX(0)' : 'translateX(-50%)',
              width: '4px',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(103,58,183,0.2) 0%, rgba(63,81,181,0.2) 100%)',
              borderRadius: '4px',
              zIndex: 0
            }
          }}>
            {timelineData.map((item, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, x: isMobile ? -20 : (index % 2 === 0 ? -50 : 50) }}
                animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? -20 : (index % 2 === 0 ? -50 : 50) }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                sx={{ 
                  display: 'flex',
                  flexDirection: isMobile ? 'row' : (index % 2 === 0 ? 'row' : 'row-reverse'),
                  mb: 6,
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {/* Timeline connector dot */}
                <Box sx={{ 
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 5px 15px rgba(103, 58, 183, 0.2)',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 2,
                  mx: isMobile ? 0 : 2
                }}>
                  <Box sx={{ 
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #673AB7 0%, #3F51B5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    {item.icon}
                  </Box>
                </Box>
                
                <Card sx={{ 
                  flex: 1,
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(103, 58, 183, 0.1)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: isMobile ? 'calc(100% - 80px)' : 'calc(50% - 50px)',
                  position: 'relative'
                }}>
                  {/* Triangle connector */}
                  <Box sx={{ 
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    [isMobile ? 'borderRight' : (index % 2 === 0 ? 'borderRight' : 'borderLeft')]: '10px solid rgba(255, 255, 255, 0.9)',
                    top: 20,
                    [isMobile ? 'left' : (index % 2 === 0 ? 'left' : 'right')]: -10,
                  }} />
                  
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </MotionBox>
            ))}
          </Box>
          
          {/* Timeline additional content */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            sx={{ 
              mt: 4, 
              p: { xs: 3, md: 5 }, 
              borderRadius: 4,
              background: 'linear-gradient(145deg, rgba(103,58,183,0.07) 0%, rgba(63,81,181,0.07) 100%)',
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight="bold">
              From Birth to Toddlerhood
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.8 }}>
              Vaccine Baby grows with your child, adapting to each developmental stage with age-appropriate tools, resources, and guidance. Our platform evolves as your little one does, ensuring you always have exactly what you need at every step of your parenting journey.
            </Typography>
          </MotionBox>
        </Box>

        {/* Purpose Statement */}
        <MotionBox 
          initial={{ opacity: 0, y: 40 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          sx={{ 
            mb: 12, 
            p: { xs: 4, md: 6 }, 
            borderRadius: 6,
            background: 'linear-gradient(145deg, rgba(103,58,183,0.12) 0%, rgba(63,81,181,0.12) 100%)',
            boxShadow: '0px 20px 40px rgba(103, 58, 183, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={12}>
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom
                fontWeight="bold"
                textAlign="center"
                sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
              >
                Our Purpose
              </Typography>
              
              <Box sx={{ 
                width: 80, 
                height: 4, 
                background: 'linear-gradient(90deg, #673AB7 0%, #3F51B5 100%)', 
                mx: 'auto',
                mb: 4,
                borderRadius: 2
              }} />
              
              <Typography 
                variant="body1" 
                paragraph
                sx={{ fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'center', maxWidth: 900, mx: 'auto' }}
              >
                In today's fast-paced world, parents are inundated with information yet often left feeling overwhelmed and under-supported. Vaccine Baby exists to solve this modern parenting challenge by creating a digital space that simplifies childcare through technology and expertise.
              </Typography>
              
              <Typography 
                variant="body1"
                paragraph
                sx={{ fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'center', maxWidth: 900, mx: 'auto' }}
              >
                Our purpose goes beyond providing tools—we're building a comprehensive ecosystem that empowers parents with knowledge, connects them with experts, and gives them confidence in their parenting decisions. By streamlining vaccination tracking, developmental monitoring, and professional consultations, we're addressing the real needs of today's families.
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{ fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'center', maxWidth: 900, mx: 'auto' }}
              >
                Through reliable technology and trusted expertise, we're reshaping how parents navigate the critical early years, ultimately contributing to healthier outcomes for children and less stress for their caregivers. Our ultimate goal is to help create a world where all children receive optimal care during their most formative years, regardless of their parents' background or circumstances.
              </Typography>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Call to Action */}
        <MotionBox
          ref={ctaRef}
          initial={{ opacity: 0, y: 50 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          sx={{
            textAlign: 'center',
            p: { xs: 5, md: 10 },
            borderRadius: 8,
            background: 'linear-gradient(145deg, #673AB7 0%, #3F51B5 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative elements */}
          <MotionBox
            animate={{ 
              rotate: [0, 360],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 15,
              ease: "linear"
            }}
            sx={{
              position: 'absolute',
              width: { xs: 200, md: 300 },
              height: { xs: 200, md: 300 },
              borderRadius: '50%',
              border: '40px solid rgba(255,255,255,0.1)',
              top: '-100px',
              right: '-100px'
            }}
          />
          
          <MotionBox
            animate={{ 
              rotate: [360, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20,
              ease: "linear"
            }}
            sx={{
              position: 'absolute',
              width: { xs: 150, md: 250 },
              height: { xs: 150, md: 250 },
              borderRadius: '50%',
              border: '30px solid rgba(255,255,255,0.1)',
              bottom: '-80px',
              left: '-80px'
            }}
          />
          
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, position: 'relative', zIndex: 1 }}>
            Begin Your Parenting Journey with Confidence
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 5, fontSize: '1.1rem', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
            Join thousands of parents who have discovered how Vaccine Baby transforms the way they manage their children's health needs. Our all-in-one platform gives you the tools, resources, and support you need to navigate the beautiful journey of parenthood.
          </Typography>
          
          <MotionButton 
            variant="contained" 
            size="large"
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ 
              borderRadius: 8, 
              px: 5, 
              py: 2, 
              backgroundColor: 'white', 
              color: '#673AB7',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              position: 'relative',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)'
              },
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
            }}
          >
            Get Started Now
          </MotionButton>
          
          <Typography variant="body2" sx={{ mt: 4, opacity: 0.8, position: 'relative', zIndex: 1 }}>
            Join parents who trust Vaccine Baby with their children's health tracking
          </Typography>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default About;