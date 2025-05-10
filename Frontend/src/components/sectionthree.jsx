import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import backgroundImg from '/src/assets/section9.png';
import rightsideimg from '/src/assets/sectionthree.png';
import TalknowButtonImg from '/src/assets/talknow.png';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // Enhanced intersection observer for smoother animation triggering
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Slight delay to ensure smooth animation start
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handler for Talk Now button navigation
  const handleTalkNowClick = (e) => {
    e.preventDefault();
    navigate('/chat'); // Change '/talk-now' to your desired route
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          maxWidth: 'xl',
        }}
      >
        {/* Left side content with modern animations */}
        <Box sx={{ maxWidth: '55%', pl: 5, position: 'relative' }}>
          {/* Background gradient blob - modern UI element */}
          <Box
            sx={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52,152,219,0.1) 0%, rgba(255,255,255,0) 70%)',
              top: '-50px',
              left: '-50px',
              zIndex: 0,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 1.2s ease, transform 1.2s ease',
            }}
          />

          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              fontSize: { xs: '1.8rem', md: '2.9rem' },
              color: '#24292e',
              fontFamily: 'Poppins, sans-serif',
              position: 'relative',
              zIndex: 1,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)',
            }}
          >
            Talk with your <span style={{
              color: '#3498db',
              position: 'relative',
            }}>midwife</span>
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              mb: 4,
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: '90%',
              position: 'relative',
              zIndex: 1,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s, transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s',
              textAlign:'justify',
            }}
          >
            "Talk with your midwife anytime to get personalized advice on your baby’s health. Our platform allows you to easily connect with a midwife, track vaccinations, and manage your child's growth milestones. Stay informed and supported every step of the way."
          </Typography>
          
          {/* Talk now image button with modern animation */}
          <Box
            component="a"
            href="#"
            onClick={handleTalkNowClick}
            sx={{
              display: 'inline-block',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s, transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s',
              '&:hover': {
                transform: 'translateY(-5px)',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                width: '80%',
                height: '15px',
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                transform: 'translateX(-50%) scale(0.8)',
                opacity: 0,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              },
              '&:hover::before': {
                opacity: isVisible ? 0.6 : 0,
                transform: 'translateX(-50%) scale(1)',
              }
            }}
          >
            <img
              src={TalknowButtonImg}
              alt="Talk now"
              style={{
                maxWidth: '140px',
                filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))',
              }}
            />
          </Box>
        </Box>
        
        {/* Right side image with modern floating animation */}
        <Box
          sx={{
            maxWidth: '30%',
            height: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '100px',
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0) rotate(0deg)' : 'translateX(80px) rotate(5deg)',
            transition: 'opacity 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s, transform 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s',
          }}
        >
          {/* Background effect for the image */}
          <Box
            sx={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52,152,219,0.1) 0%, rgba(255,255,255,0) 70%)',
              zIndex: 0,
              opacity: isVisible ? 0.7 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 1s ease 0.5s, transform 1s ease 0.5s',
              animation: isVisible ? 'pulse 6s infinite alternate ease-in-out' : 'none',
            }}
          />
          
          <img
            src={rightsideimg}
            alt="Midwife cartoon character"
            style={{
              maxHeight: '90%',
              objectFit: 'contain',
              filter: 'drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.1))',
              animation: 'modernFloat 6s ease-in-out infinite',
              zIndex: 1,
              position: 'relative',
            }}
          />
        </Box>
      </Container>

      {/* CSS for modern animations */}
      <style jsx>{`
        @keyframes modernFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-15px) rotate(0deg);
          }
          75% {
            transform: translateY(-8px) rotate(-1deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        
        @keyframes shine {
          0% {
            background-position: -100px;
          }
          60%, 100% {
            background-position: 320px;
          }
        }
      `}</style>
    </Box>
  );
}

export default MyComponent;