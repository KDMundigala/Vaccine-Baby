import React, { useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import BackgroundImg from '/src/assets/section7.png';
import RightsideImg from '/src/assets/sectionimg2.png';
import LeftsideImg from '/src/assets/sectionimg1.png';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Create motion components for animations
const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

const BackgroundSection = () => {
  // Configurable props for text width and positioning
  const textWidth = '70%'; // You can adjust this value to reduce paragraph width
  const textMarginTop = '10px'; // Adjust to move text lower
  
  // Configurable variables for section positioning
  const visionSectionMarginTop = '230px'; // Adjust to move Vision section down
  const missionSectionMarginTop = '180px'; // Adjust to move Mission section down
  
  // New configurable variables for horizontal positioning
  const visionSectionMarginLeft = '-80px'; // Adjust to move Vision section left
  const missionSectionMarginRight = '80px'; // Adjust to move Mission section right

  // Animation controls
  const leftImageControls = useAnimation();
  const rightImageControls = useAnimation();
  const visionControls = useAnimation();
  const missionControls = useAnimation();
  const featuresHeadingControls = useAnimation();
  
  // Refs for intersection observer
  const [leftImageRef, leftImageInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [rightImageRef, rightImageInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [visionRef, visionInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [missionRef, missionInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [featuresHeadingRef, featuresHeadingInView] = useInView({ threshold: 0.2, triggerOnce: true });

  // Trigger animations when elements come into view
  useEffect(() => {
    if (leftImageInView) {
      leftImageControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      });
    }
    
    if (rightImageInView) {
      rightImageControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      });
    }
    
    if (visionInView) {
      visionControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
      });
    }
    
    if (missionInView) {
      missionControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
      });
    }
    
    if (featuresHeadingInView) {
      featuresHeadingControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
      });
    }
  }, [leftImageInView, rightImageInView, visionInView, missionInView, featuresHeadingInView, leftImageControls, rightImageControls, visionControls, missionControls, featuresHeadingControls]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '110vh', // Adjust height as needed
        fontFamily: '"Poppins", sans-serif', // Added Poppins as the default font family
      }}
    >
      {/* Main background image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '130%',
          backgroundImage: `url(${BackgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
        }}
      />
      
      {/* Left side image with animation */}
      <MotionBox
        ref={leftImageRef}
        initial={{ x: -100, opacity: 0 }}
        animate={leftImageControls}
        sx={{
          position: 'absolute',
          left: 0,
          bottom: -190,
          width: '25%',
          height: 'auto',
          zIndex: 2,
        }}
      >
        <img 
          src={LeftsideImg} 
          alt="Left decoration" 
          style={{ width: '110%', height: 'auto' }}
        />
      </MotionBox>
      
      {/* Right side image with animation */}
      <MotionBox
        ref={rightImageRef}
        initial={{ x: -100, opacity: 0 }}
        animate={rightImageControls}
        sx={{
          position: 'absolute',
          right: 0,
          top: 150,
          width: '25%',
          height: 'auto',
          zIndex: 2,
        }}
      >
        <img 
          src={RightsideImg} 
          alt="Right decoration" 
          style={{ width: '100%', height: 'auto' }}
        />
      </MotionBox>
      
      {/* Content Container */}
      <Container
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: '50px',
          paddingBottom: '50px',
          zIndex: 3,
          fontFamily: '"Poppins", sans-serif', // Added Poppins for container content
        }}
      >
        {/* Vision Section with animation */}
        <MotionGrid 
          ref={visionRef}
          initial={{ y: 50, opacity: 0 }}
          animate={visionControls}
          container 
          spacing={2} 
          sx={{ 
            mb: 10,
            marginTop: visionSectionMarginTop,
            marginLeft: visionSectionMarginLeft, // Apply horizontal positioning
            width: 'calc(100% + 50px)', // Compensate for the margin to maintain layout
          }}
        >
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ 
              width: textWidth,
              textAlign: 'center',
              mb: 2
            }}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2, fontFamily: '"Poppins", sans-serif' }}>
                Our Vision
              </Typography>
              <Box sx={{ marginTop: textMarginTop }}>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontFamily: '"Poppins", sans-serif' }}>
                To empower parents with easy access to trusted, comprehensive, and timely information, ensuring that children receive the best possible start in life by staying on track with their vaccinations, health, and development. We envision creating a digital space that offers busy parents the tools to manage their child's health efficiently, providing them with reliable, real-time updates, growth tracking, and expert advice all in one place.<p/>{' '}
                  <Typography component="span" sx={{ color: '#e91e63', display: 'inline', fontFamily: '"Poppins", sans-serif' }}>
                  "Providing parents with a simple, all-in-one health tracker."
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* Space for right character image */}
          </Grid>
        </MotionGrid>

        {/* Mission Section with animation */}
        <MotionGrid 
          ref={missionRef}
          initial={{ y: 50, opacity: 0 }}
          animate={missionControls}
          container 
          spacing={2} 
          direction="row-reverse"
          sx={{
            marginTop: missionSectionMarginTop,
            marginLeft: missionSectionMarginRight, // Apply horizontal positioning
            width: 'calc(100% + 50px)', // Compensate for the margin to maintain layout
          }}
        >
          <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ 
              width: textWidth,
              textAlign: 'center',
              mb: 2
            }}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2, fontFamily: '"Poppins", sans-serif' }}>
                Our Mission
              </Typography>
              <Box sx={{ marginTop: textMarginTop }}>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontFamily: '"Poppins", sans-serif' }}>
                At Vaccine Baby, our mission is to provide a digital space where parents can conveniently manage their children's health needs. From scheduling and tracking vaccinations to consulting with healthcare professionals and monitoring growth milestones, we aim to create a seamless experience that supports parents in providing<p/>{' '} 
                <Typography component="span" sx={{ color: '#e91e63', display: 'inline', fontFamily: '"Poppins", sans-serif' }}>
                the best care for their babies.
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            {/* Space for left character image */}
          </Grid>
        </MotionGrid>
        
        {/* Interactive Features Heading with animation */}
        <motion.div 
          ref={featuresHeadingRef}
          initial={{ y: 30, opacity: 0 }}
          animate={featuresHeadingControls}
          style={{ marginTop: '80px', width: '100%' }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 790,
              textAlign: 'left',
              mb: 12,
              width: '100%',
              maxWidth: '900px',
              fontSize: '2.5rem',
              color: '#222222',
              paddingLeft: '20rem',
              position: 'relative',
              zIndex: 5
            }}
          >
            Our Interactive <span style={{ color: '#a347ff', fontWeight: 600 }}>Features</span>
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default BackgroundSection;