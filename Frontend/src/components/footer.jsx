import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, IconButton, Link, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const theme = useTheme();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Links with staggered animation
  const menuLinks = [
    { title: 'Home', href: 'http://localhost:8081/home' },
    { title: 'About us', href: 'http://localhost:8081/about' },
    { title: 'Contact', href: 'http://localhost:8081/contact' }
  ];
  
  const serviceLinks = [
    { title: 'Growth Tracker', href: 'http://localhost:8081/health-calculator' },
    { title: 'Reminder', href: 'http://localhost:8081/vaccination' },
    { title: 'Baby book', href: 'http://localhost:8081/faq' },
    { title: 'Chat with Midwife', href: 'http://localhost:8081/chat' }
  ];
  
  // Social media with hover effects
  const socialMedia = [
    { icon: <FacebookIcon fontSize="small" />, color: '#3b5998' },
    { icon: <YouTubeIcon fontSize="small" />, color: '#ff0000' },
    { icon: <InstagramIcon fontSize="small" />, color: '#e1306c' },
    { icon: <LinkedInIcon fontSize="small" />, color: '#0077b5' }
  ];

  return (
    <Box
      sx={{
        bgcolor: 'rgba(249, 250, 255, 0.97)',
        backgroundImage: 'linear-gradient(135deg, rgba(206, 213, 255, 0.4) 0%, rgba(249, 250, 255, 0.97) 100%)',
        py: 6,
        mt: 'auto',
        transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.03)',
        borderTop: '1px solid rgba(147, 112, 219, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Poppins", sans-serif',
        zIndex: 5,
      }}
    >
      {/* Decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147, 112, 219, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
          zIndex: 1,
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147, 112, 219, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
          zIndex: 1,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4}>
          <Grid 
            item 
            xs={12} 
            md={3}
            sx={{
              animation: isVisible ? 'fadeInUp 0.8s forwards' : 'none',
              opacity: 0,
              '@keyframes fadeInUp': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              },
            }}
          >
            <Typography 
              variant="h5" 
              component="div" 
              sx={{
                mb: 2,
                fontWeight: 600,
                fontFamily: '"Poppins", sans-serif',
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '40%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #9370DB, rgba(147, 112, 219, 0.3))',
                  bottom: '-8px',
                  left: '0',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease',
                },
                '&:hover:after': {
                  width: '60%',
                },
                '& span:first-of-type': { color: '#9370DB' }
              }}
            >
              <span>Vaccine</span> Baby
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 3,
                lineHeight: 1.7, 
                fontFamily: '"Poppins", sans-serif',
                maxWidth: '90%',
                textAlign: 'justify'
              }}
            >
             Vaccine Baby offers essential tools for your baby's health, from tracking to expert midwife support
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 1.5,
                mt: 3
              }}
            >
              {socialMedia.map((social, index) => (
                <IconButton 
                  key={index}
                  aria-label={`social-${index}`} 
                  size="small" 
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  sx={{ 
                    border: '1px solid rgba(147, 112, 219, 0.3)',
                    backgroundColor: hoverIndex === index ? social.color : 'transparent',
                    color: hoverIndex === index ? 'white' : 'inherit',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoverIndex === index ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
                    boxShadow: hoverIndex === index ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                    '&:hover': {
                      borderColor: 'transparent',
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          
          <Grid 
            item 
            xs={12} 
            md={3}
            sx={{
              animation: isVisible ? 'fadeInUp 0.8s 0.2s forwards' : 'none',
              opacity: 0,
              '@keyframes fadeInUp': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              },
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                fontFamily: '"Poppins", sans-serif',
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '30%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #9370DB, rgba(147, 112, 219, 0.3))',
                  bottom: '-8px',
                  left: '0',
                  borderRadius: '3px',
                }
              }}
            >
              Menu
            </Typography>
            
            {menuLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                underline="none" 
                color="text.secondary" 
                display="block" 
                sx={{ 
                  mb: 1.5,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                  transition: `all 0.4s ease ${0.4 + index * 0.1}s`,
                  fontFamily: '"Poppins", sans-serif',
                  position: 'relative',
                  paddingLeft: '8px',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    backgroundColor: '#9370DB',
                    transform: 'translateY(-50%) scale(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover': {
                    color: '#9370DB',
                    paddingLeft: '15px',
                  },
                  '&:hover:before': {
                    transform: 'translateY(-50%) scale(1)',
                  }
                }}
              >
                {link.title}
              </Link>
            ))}
          </Grid>
          
          <Grid 
            item 
            xs={12} 
            md={3}
            sx={{
              animation: isVisible ? 'fadeInUp 0.8s 0.3s forwards' : 'none',
              opacity: 0,
              '@keyframes fadeInUp': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              },
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                fontFamily: '"Poppins", sans-serif',
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '30%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #9370DB, rgba(147, 112, 219, 0.3))',
                  bottom: '-8px',
                  left: '0',
                  borderRadius: '3px',
                }
              }}
            >
              Service
            </Typography>
            
            {serviceLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                underline="none" 
                color="text.secondary" 
                display="block" 
                sx={{ 
                  mb: 1.5,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                  transition: `all 0.4s ease ${0.5 + index * 0.1}s`,
                  fontFamily: '"Poppins", sans-serif',
                  position: 'relative',
                  paddingLeft: '8px',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    backgroundColor: '#9370DB',
                    transform: 'translateY(-50%) scale(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover': {
                    color: '#9370DB',
                    paddingLeft: '15px',
                  },
                  '&:hover:before': {
                    transform: 'translateY(-50%) scale(1)',
                  }
                }}
              >
                {link.title}
              </Link>
            ))}
          </Grid>
          
          <Grid 
            item 
            xs={12} 
            md={3}
            sx={{
              animation: isVisible ? 'fadeInUp 0.8s 0.4s forwards' : 'none',
              opacity: 0,
              '@keyframes fadeInUp': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              },
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                fontFamily: '"Poppins", sans-serif',
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '30%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #9370DB, rgba(147, 112, 219, 0.3))',
                  bottom: '-8px',
                  left: '0',
                  borderRadius: '3px',
                }
              }}
            >
              Contact
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 1.5,
                fontFamily: '"Poppins", sans-serif',
                position: 'relative',
                paddingLeft: '22px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                transition: 'all 0.4s ease 0.6s',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  left: '0',
                  top: '50%',
                  width: '16px',
                  height: '16px',
                  background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239370DB"><path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"></path><path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a1 1 0 0 0-.086-1.391l-4.064-3.696z"></path></svg>')`,
                  backgroundSize: 'cover',
                  transform: 'translateY(-50%)',
                }
              }}
            >
              +9411242562
            </Typography>
            
            <Link 
              href="mailto:vaccinebaby@gmail.com" 
              underline="none" 
              color="text.secondary" 
              display="block"
              sx={{ 
                fontFamily: '"Poppins", sans-serif',
                position: 'relative',
                paddingLeft: '22px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                transition: 'all 0.4s ease 0.7s',
                '&:hover': {
                  color: '#9370DB',
                },
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  left: '0',
                  top: '50%',
                  width: '16px',
                  height: '16px',
                  background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239370DB"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path></svg>')`,
                  backgroundSize: 'cover',
                  transform: 'translateY(-50%)',
                }
              }}
            >
              Vaccinebaby@gmail.com
            </Link>
          </Grid>
        </Grid>
        
        <Box 
          sx={{
            mt: 5,
            pt: 3,
            borderTop: '1px solid rgba(147, 112, 219, 0.15)',
            transition: 'opacity 1.2s ease-in-out, transform 1s ease-in-out',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: '0.7s',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              fontFamily: '"Poppins", sans-serif',
              fontSize: '0.82rem' 
            }}
          >
            © {new Date().getFullYear()} Vaccine Baby. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, mt: { xs: 2, sm: 0 } }}>
            <Link 
              href="#" 
              underline="none" 
              color="text.secondary" 
              sx={{ 
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.82rem',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#9370DB' }
              }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              underline="none" 
              color="text.secondary" 
              sx={{ 
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.82rem',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#9370DB' }
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}