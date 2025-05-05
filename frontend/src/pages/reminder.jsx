import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputAdornment,
  Fade,
  CircularProgress,
  Dialog,
  Zoom,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import BackgroundIMG from '/src/assets/Remind1.png';
import LeftsideIMG from '/src/assets/reminder2.png';

// Import Material UI icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';
import CelebrationIcon from '@mui/icons-material/Celebration';

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

const animateBackground = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

const slideIn = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const scaleIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const sparkle = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1) rotate(180deg); opacity: 1; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
`;

// Styled components using Material UI
const BackgroundContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
}));

const BackgroundImage = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '50%',
  height: '100%',
  backgroundImage: `url(${BackgroundIMG})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center right',
  zIndex: 1,
}));

const LeftSideImage = styled('img')(({ theme, isAnimating }) => ({
  position: 'absolute',
  left: '5%',
  bottom: 0,
  width: '25%',
  height: 'auto',
  zIndex: 2,
  objectFit: 'contain',
  objectPosition: 'bottom left',
  animation: isAnimating 
    ? `${shake} 0.5s ease-in-out, ${pulse} 0.5s ease-in-out` 
    : `${float} 6s ease-in-out infinite`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    filter: 'brightness(1.05)',
  },
  [theme.breakpoints.down('md')]: {
    width: '30%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '35%',
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: '30%', // Make space for the left image
  [theme.breakpoints.down('md')]: {
    paddingLeft: '35%',
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '38%',
  },
}));

const FormCard = styled(Card)(({ theme, animation }) => ({
  maxWidth: 400,
  width: '100%',
  padding: theme.spacing(2),
  borderRadius: 16,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(5px)',
  background: 'rgba(255, 255, 255, 0.95)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  animation: animation === 'in' 
    ? `${slideIn} 0.5s ease forwards`
    : 'none',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
  },
}));

const FormHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const FormLogo = styled(Box)(({ theme }) => ({
  backgroundColor: '#9c27b0',
  color: 'white',
  width: 50,
  height: 50,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
  boxShadow: '0 4px 10px rgba(156, 39, 176, 0.3)',
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 600,
  color: '#4A148C',
  marginBottom: theme.spacing(2),
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },
    '&.Mui-focused': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
  },
}));

const NotificationToggleGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
  '& .MuiToggleButtonGroup-grouped': {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    flex: 1,
    margin: '0 8px',
    transition: 'all 0.2s ease',
    '&:first-of-type': {
      marginLeft: 0,
    },
    '&:last-of-type': {
      marginRight: 0,
    },
  },
}));

const NotificationButton = styled(ToggleButton)(({ theme, selected }) => ({
  padding: theme.spacing(1),
  backgroundColor: selected ? '#9c27b0' : 'white',
  color: selected ? 'white' : 'inherit',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: selected ? '#7b1fa2' : '#f0f0f0',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const SectionLabel = styled(Box)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#666',
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const ContinueButton = styled(Button)(({ theme, loading }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  borderRadius: 8,
  backgroundColor: loading ? '#b39ddb' : '#9c27b0',
  color: 'white',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: loading ? '#b39ddb' : '#7b1fa2',
    transform: loading ? 'none' : 'translateY(-2px)',
    boxShadow: loading ? 'none' : '0 6px 15px rgba(156, 39, 176, 0.4)',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'rotate(45deg)',
    transition: 'all 0.6s ease',
    opacity: 0,
  },
  '&:hover:before': {
    opacity: loading ? 0 : 1,
    left: '-100%',
  }
}));

const FieldValidation = styled(Box)(({ theme, isValid }) => ({
  position: 'absolute',
  right: -10,
  top: '50%',
  transform: 'translateY(-50%)',
  color: isValid ? '#4caf50' : 'transparent',
  transition: 'all 0.2s ease',
}));

const SuccessDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 16,
    padding: theme.spacing(3),
    textAlign: 'center',
    maxWidth: 400,
    background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    overflow: 'visible',
  }
}));

const SuccessIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: '#4caf50',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  margin: '0 auto 20px',
  position: 'relative',
  animation: `${scaleIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
  boxShadow: '0 10px 20px rgba(76, 175, 80, 0.3)',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '4px solid transparent',
    borderTopColor: '#4caf50',
    borderBottomColor: '#4caf50',
    animation: `${sparkle} 2s linear infinite`,
  }
}));

const Confetti = styled(Box)(({ theme, index }) => ({
  position: 'absolute',
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: ['#9c27b0', '#4caf50', '#ff9800', '#2196f3', '#f44336'][index % 5],
  top: `-${10 + Math.random() * 20}px`,
  left: `${Math.random() * 100}%`,
  transform: 'scale(0)',
  opacity: 0,
  animation: `${bounce} ${1 + Math.random() * 1}s ease-out ${Math.random() * 0.5}s forwards`,
}));

function BabysitterReminderForm() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardAnimation, setCardAnimation] = useState('in');
  const [notificationMethod, setNotificationMethod] = useState('email');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [formValid, setFormValid] = useState({
    guardianName: false,
    email: false,
    phone: false
  });
  
  const [formValues, setFormValues] = useState({
    guardianName: '',
    email: '',
    phone: ''
  });
  
  const handleNotificationChange = (event, newMethod) => {
    if (newMethod !== null) {
      setNotificationMethod(newMethod);
    }
  };

  const handleImageClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleFormChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value
    });

    // Simple validation
    if (field === 'guardianName') {
      setFormValid({...formValid, guardianName: value.length > 2});
    } else if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setFormValid({...formValid, email: emailRegex.test(value)});
    } else if (field === 'phone') {
      const phoneRegex = /^\d{10}$/;
      setFormValid({...formValid, phone: phoneRegex.test(value.replace(/\D/g, ''))});
    }
  };

  const handleContinueClick = () => {
    // Show loading state
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Show confetti after a brief delay
      setTimeout(() => {
        setShowConfetti(true);
      }, 300);
      
      // Log form data
      console.log('Form submitted', {
        ...formValues,
        notificationMethod
      });
    }, 1500);
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    setShowConfetti(false);
    
    // Reset form if needed
    // setFormValues({ guardianName: '', email: '', phone: '' });
    // setNotificationMethod('email');
  };

  // Entrance animations
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    setTimeout(() => setShowForm(true), 300);
  }, []);

  // Check if the form is valid based on the notification method
  const isFormValid = () => {
    if (notificationMethod === 'email') {
      return formValid.guardianName && formValid.email;
    } else if (notificationMethod === 'sms') {
      return formValid.guardianName && formValid.phone;
    } else if (notificationMethod === 'both') {
      return formValid.guardianName && formValid.email && formValid.phone;
    }
    return false;
  };

  // Generate confetti elements
  const renderConfetti = () => {
    const confettiCount = 30;
    const confetti = [];
    
    for (let i = 0; i < confettiCount; i++) {
      confetti.push(<Confetti key={i} index={i} />);
    }
    
    return confetti;
  };

  return (
    <BackgroundContainer>
      <BackgroundImage />
      <LeftSideImage 
        src={LeftsideIMG} 
        alt="Babysitter with clipboard" 
        isAnimating={isAnimating}
        onClick={handleImageClick}
      />
      <ContentContainer>
        <FormCard elevation={6} animation={cardAnimation}>
          <CardContent>
            <FormHeader>
              <Fade in={showForm} timeout={1000}>
                <FormLogo>
                  <NotificationsIcon fontSize="medium" />
                </FormLogo>
              </Fade>
              <FormTitle variant="h6">Reminder Details</FormTitle>
            </FormHeader>
            
            <Box position="relative">
              <FormField 
                fullWidth 
                label="Guardian Name" 
                variant="outlined" 
                size="small"
                value={formValues.guardianName}
                onChange={(e) => handleFormChange('guardianName', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon color="primary" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <Fade in={formValid.guardianName}>
                <FieldValidation isValid={formValid.guardianName}>
                  <CheckCircleOutlineIcon color="success" />
                </FieldValidation>
              </Fade>
            </Box>
            
            <Box position="relative">
              <FormField 
                fullWidth 
                label="Email" 
                variant="outlined" 
                size="small"
                type="email"
                value={formValues.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <Fade in={formValid.email}>
                <FieldValidation isValid={formValid.email}>
                  <CheckCircleOutlineIcon color="success" />
                </FieldValidation>
              </Fade>
            </Box>
            
            <Box position="relative">
              <FormField 
                fullWidth 
                label="Phone Number" 
                variant="outlined" 
                size="small"
                value={formValues.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="primary" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <Fade in={formValid.phone}>
                <FieldValidation isValid={formValid.phone}>
                  <CheckCircleOutlineIcon color="success" />
                </FieldValidation>
              </Fade>
            </Box>
            
            <SectionLabel>
              <Box display="flex" alignItems="center" width="100%">
                <Typography variant="body2" color="textSecondary" fontWeight={500}>
                  Notification Method
                </Typography>
              </Box>
            </SectionLabel>
            
            <NotificationToggleGroup
              value={notificationMethod}
              exclusive
              onChange={handleNotificationChange}
              aria-label="notification method"
              fullWidth
            >
              <NotificationButton value="email" aria-label="email">
                Email
              </NotificationButton>
              <NotificationButton value="sms" aria-label="sms">
                SMS
              </NotificationButton>
              <NotificationButton value="both" aria-label="both">
                Both
              </NotificationButton>
            </NotificationToggleGroup>
            
            <ContinueButton 
              variant="contained" 
              endIcon={loading ? null : <ArrowForwardIcon />}
              disabled={!isFormValid() || loading}
              onClick={handleContinueClick}
              loading={loading}
            >
              {loading ? (
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <CircularProgress size={20} color="inherit" />
                  <Typography variant="button">Processing...</Typography>
                </Box>
              ) : (
                "Continue"
              )}
            </ContinueButton>
          </CardContent>
        </FormCard>
      </ContentContainer>
      
      {/* Success Dialog with Animation */}
      <SuccessDialog 
        open={success} 
        onClose={handleCloseSuccess}
        TransitionComponent={Zoom}
        transitionDuration={500}
      >
        {showConfetti && renderConfetti()}
        <Box sx={{ position: 'relative', p: 2 }}>
          <SuccessIcon>
            <DoneIcon fontSize="large" />
          </SuccessIcon>
          
          <Typography variant="h5" component="h2" gutterBottom sx={{ 
            fontWeight: 700, 
            color: '#4A148C',
            animation: `${bounce} 1s ease 0.5s both`
          }}>
            Reminder Set Successfully!
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
            We'll notify {formValues.guardianName} via {notificationMethod === 'both' ? 'email and SMS' : notificationMethod} when it's time.
          </Typography>
          
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              onClick={handleCloseSuccess}
              sx={{
                bgcolor: '#9c27b0',
                borderRadius: 4,
                px: 4,
                '&:hover': {
                  bgcolor: '#7b1fa2',
                }
              }}
              startIcon={<CelebrationIcon />}
            >
              Awesome!
            </Button>
          </Box>
        </Box>
      </SuccessDialog>
    </BackgroundContainer>
  );
}

export default BabysitterReminderForm;