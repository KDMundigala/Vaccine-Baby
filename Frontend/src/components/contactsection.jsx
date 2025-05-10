import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Card, 
  IconButton, 
  Divider, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Grid,
  List,
  ListItem,
  useTheme,
  alpha,
  InputAdornment
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  LocationOn, 
  Chat, 
  Send, 
  CheckCircle,
  Facebook, 
  Twitter, 
  Instagram,
  LinkedIn,
  ExpandMore,
  Person,
  Subject,
  Message
} from '@mui/icons-material';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  }
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } 
  }
};

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const formRef = useRef(null);
  const heroRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    }, 1500);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // FAQ data
  const faqItems = [
    {
      question: "What vaccinations are recommended for newborns?",
      answer: "Newborns typically receive the Hepatitis B vaccine at birth. Other vaccines begin at 2 months including DTaP, Hib, PCV13, IPV, and RV."
    },
    {
      question: "Are vaccine appointments available on weekends?",
      answer: "Yes, we offer limited weekend appointments on Saturdays from 9am to 1pm. These spots fill quickly, so we recommend booking at least two weeks in advance."
    },
    {
      question: "How do I schedule a vaccine consultation?",
      answer: "You can schedule a consultation through our online booking system, by calling our office, or by sending us a message through this contact form."
    },
    {
      question: "What should I bring to my baby's first vaccine appointment?",
      answer: "Please bring your identification, insurance card, your baby's birth certificate or identification, and any previous vaccination records if applicable."
    }
  ];

  // Contact info items
  const contactItems = [
    { 
      icon: <Phone />, 
      title: "Phone", 
      content: "(123) 456-7890", 
      caption: "Mon-Fri 9am-5pm"
    },
    { 
      icon: <Mail />, 
      title: "Email", 
      content: "support@vaccinebaby.com", 
      caption: "We'll respond within 24 hours"
    },
    { 
      icon: <LocationOn />, 
      title: "Office", 
      content: "123 Health Avenue, Suite 400", 
      caption: "Medical District, CA 90210"
    },
    { 
      icon: <Chat />, 
      title: "Live Chat", 
      content: "Chat with our midwives", 
      caption: "Available 24/7 for urgent queries"
    }
  ];
  
  // Social media items 
  const socialItems = [
    { icon: <Facebook />, color: '#1877F2', label: 'Facebook' },
    { icon: <Twitter />, color: '#1DA1F2', label: 'Twitter' },
    { icon: <Instagram />, color: '#E4405F', label: 'Instagram' },
    { icon: <LinkedIn />, color: '#0A66C2', label: 'LinkedIn' }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: alpha(theme.palette.primary.light, 0.05),
      overflow: 'hidden'
    }}>
      {/* Hero Header */}
      <Box 
        ref={heroRef}
        sx={{ 
          height: { xs: '25rem', md: '30rem' },
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, 
            ${theme.palette.primary.dark} 0%, 
            ${theme.palette.primary.main} 50%, 
            ${theme.palette.secondary.main} 100%)`
        }}
      >
        <Container 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            zIndex: 5
          }}
        >
          <Box
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            sx={{ textAlign: 'center', maxWidth: 700 }}
          >
            <Typography 
              component={motion.h1}
              variants={fadeInUp}
              variant="h2"
              sx={{ 
                fontWeight: 800, 
                color: 'white', 
                mb: 2,
                textShadow: '0 4px 30px rgba(0,0,0,0.15)'
              }}
            >
              Contact Us
            </Typography>
            
            <Typography 
              component={motion.p}
              variants={fadeInUp}
              variant="h6" 
              sx={{ 
                color: alpha(theme.palette.common.white, 0.95),
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                mb: 4,
                mx: 'auto',
                maxWidth: 600
              }}
            >
              Have questions about your baby's vaccinations or need assistance? Our dedicated team of healthcare professionals is here to help you every step of the way.
            </Typography>
            
            <motion.div variants={scaleIn}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                color="secondary"
                size="large"
                href="#contact-form"
                sx={{ 
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  background: theme.palette.common.white,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    background: theme.palette.common.white,
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.25)',
                  }
                }}
              >
                Reach Out Now
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Main content */}
      <Container sx={{ py: 10, position: 'relative', zIndex: 7 }}>
        <Grid container spacing={5} id="contact-form">
          
          {/* Contact Information Card */}
          <Grid item xs={12} md={6}>
            <Card 
              component={motion.div}
              initial="hidden"
              whileInView="visible"
              variants={fadeInRight}
              viewport={{ once: true, amount: 0.2 }}
              elevation={0}
              sx={{ 
                borderRadius: 4,
                height: '100%',
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.15)}`,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontWeight: 700, 
                    mb: 3,
                    position: 'relative',
                    display: 'inline-block',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: 0,
                      width: '60%',
                      height: 4,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      borderRadius: 4
                    }
                  }}
                >
                  Get in Touch
                </Typography>
                
                <Box
                  component={motion.div}
                  variants={staggerChildren}
                  sx={{ mb: 4 }}
                >
                  <List>
                    {contactItems.map((item, index) => (
                      <ListItem 
                        component={motion.li}
                        variants={itemFade}
                        key={index} 
                        sx={{ mb: 2.5, px: 0 }}
                      >
                        <Box
                          sx={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '16px',
                            mr: 2.5,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {React.cloneElement(item.icon, { sx: { fontSize: 24 } })}
                        </Box>
                        
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight="700" fontSize="1.1rem">
                            {item.title}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                            {item.content}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.caption}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Follow Us
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {socialItems.map((social, index) => (
                      <IconButton
                        key={index}
                        aria-label={social.label}
                        sx={{ 
                          background: social.color,
                          color: '#fff',
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
          
          {/* Contact Form Card */}
          <Grid item xs={12} md={6}>
            <Card 
              component={motion.div}
              ref={formRef}
              initial="hidden"
              whileInView="visible"
              variants={fadeInLeft}
              viewport={{ once: true, amount: 0.2 }}
              elevation={0}
              sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.15)}`,
                position: 'relative'
              }}
            >
              <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontWeight: 700, 
                    mb: 3,
                    position: 'relative',
                    display: 'inline-block',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: 0,
                      width: '60%',
                      height: 4,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      borderRadius: 4
                    }
                  }}
                >
                  Send a Message
                </Typography>
                
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <Box
                      component={motion.div}
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      sx={{ 
                        textAlign: 'center', 
                        p: 4, 
                        bgcolor: alpha(theme.palette.success.main, 0.1), 
                        borderRadius: 3,
                        border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`
                      }}
                    >
                      <CheckCircle sx={{ fontSize: 60, color: theme.palette.success.main, mb: 2 }} />
                      <Typography variant="h5" sx={{ color: theme.palette.success.dark, mb: 1, fontWeight: 700 }}>
                        Message Sent Successfully!
                      </Typography>
                      <Typography sx={{ color: theme.palette.success.dark }}>
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      component={motion.div}
                      key="form"
                      variants={staggerChildren}
                    >
                      <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {/* Name field */}
                          <TextField
                            id="name"
                            name="name"
                            label="Your Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.name}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                          
                          {/* Email field */}
                          <TextField
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.email}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Mail color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                          
                          {/* Subject field */}
                          <TextField
                            id="subject"
                            name="subject"
                            label="Subject"
                            type="text"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Subject color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                          
                          {/* Message field */}
                          <TextField
                            id="message"
                            name="message"
                            label="Message"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                  <Message color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                          
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
                              py: 1.8,
                              borderRadius: 3,
                              background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                              textTransform: 'none',
                              fontSize: '1.1rem',
                              fontWeight: 600
                            }}
                            endIcon={<Send />}
                          >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  )}
                </AnimatePresence>
              </Box>
            </Card>
          </Grid>
        </Grid>
        
        {/* FAQ Section */}
        <Box 
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          sx={{ 
            maxWidth: 'md', 
            mx: 'auto', 
            mt: 12,
            mb: 10
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                color: theme.palette.primary.main, 
                fontWeight: 700, 
                mb: 1.5
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}
            >
              Get quick answers to common questions about vaccinations, appointments, and more.
            </Typography>
          </Box>
          
          <Card 
            component={motion.div}
            variants={staggerChildren}
            elevation={0}
            sx={{ 
              borderRadius: 4,
              overflow: 'hidden',
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.15)}`
            }}
          >
            {faqItems.map((item, index) => (
              <Accordion 
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}
                disableGutters
                elevation={0}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Card>
        </Box>
      </Container>

      {/* Floating chat button */}
      <Box
        component={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        sx={{ 
          position: 'fixed',
          bottom: theme.spacing(4),
          right: theme.spacing(4),
          zIndex: 50
        }}
      >
        <Button
          aria-label="Chat with us"
          variant="contained"
          sx={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            minWidth: 'unset',
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`
          }}
        >
          <Chat sx={{ fontSize: 26 }} />
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;