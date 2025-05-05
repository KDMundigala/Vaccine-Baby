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
  Select,
  MenuItem,
  InputAdornment,
  Fade,
  Avatar,
  CircularProgress,
  Dialog,
  Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { storage, uploadProfilePicture }  from '../utils/firebase';

// Icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import BoyOutlinedIcon from '@mui/icons-material/BoyOutlined';
import GirlOutlinedIcon from '@mui/icons-material/GirlOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DoneIcon from '@mui/icons-material/Done';

// Images
import backgroundimg from '/src/assets/reminderpage.png';
import rightsideimg from '/src/assets/reminderpage1.png';

// Animations
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

const slideOut = keyframes`
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(-100%); opacity: 0; }
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

// Styled Components
const BackgroundContainer = styled(Box)({
  width: '100%',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#f5f5ff',
});

const BackgroundImage = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${backgroundimg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'left center',
  zIndex: 1,
});

const RightSideImage = styled('img')(({ isAnimating }) => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: '32%',
  height: 'auto',
  zIndex: 2,
  objectFit: 'contain',
  objectPosition: 'bottom right',
  animation: isAnimating 
    ? `${shake} 0.5s ease-in-out, ${pulse} 0.5s ease-in-out` 
    : `${float} 6s ease-in-out infinite`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    filter: 'brightness(1.05)',
  },
}));

const ContentContainer = styled(Container)({
  position: 'relative',
  zIndex: 3,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const FormCard = styled(Card)(({ animation }) => ({
  maxWidth: 380,
  width: '100%',
  padding: '16px',
  borderRadius: 16,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(5px)',
  background: 'rgba(255, 255, 255, 0.95)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  animation: animation === 'in' 
    ? `${slideIn} 0.5s ease forwards`
    : animation === 'out'
      ? `${slideOut} 0.5s ease forwards`
      : 'none',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
  },
}));

const FormHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const FormLogo = styled(Box)({
  backgroundColor: '#9c27b0',
  color: 'white',
  width: 50,
  height: 50,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '8px',
  boxShadow: '0 4px 10px rgba(156, 39, 176, 0.3)',
});

const FormTitle = styled(Typography)({
  textAlign: 'center',
  fontWeight: 600,
  background: 'linear-gradient(90deg, #7B1FA2 0%, #9C27B0 100%)',
  backgroundSize: '200% 200%',
  animation: `${animateBackground} 3s ease infinite`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const FormField = styled(TextField)({
  marginBottom: '16px',
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
});

const WeightField = styled(Box)({
  marginBottom: '16px',
  position: 'relative',
});

const KgAdornment = styled(Box)({
  paddingLeft: '8px',
  paddingRight: '8px',
  backgroundColor: '#757575',
  color: 'white',
  borderRadius: '0 8px 8px 0',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 500,
});

const GenderToggleGroup = styled(ToggleButtonGroup)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
  '& .MuiToggleButtonGroup-grouped': {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    flex: 1,
    margin: '0 8px',
    transition: 'all 0.2s ease',
    '&:first-of-type': { marginLeft: 0 },
    '&:last-of-type': { marginRight: 0 },
  },
});

const GenderButton = styled(ToggleButton)(({ selected, value }) => ({
  padding: '8px',
  backgroundColor: selected 
    ? value === 'boy' ? '#7986cb' : '#f48fb1'
    : 'white',
  color: selected ? 'white' : 'inherit',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: value === 'boy' ? '#5c6bc0' : '#f06292',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const DateContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
  gap: '8px',
});

const FieldValidation = styled(Box)(({ isValid }) => ({
  position: 'absolute',
  right: -10,
  top: '50%',
  transform: 'translateY(-50%)',
  color: isValid ? '#4caf50' : 'transparent',
  transition: 'all 0.2s ease',
}));

const PhotoUploadContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '24px',
});

const PhotoUploadBox = styled(Box)(({ hasPhoto }) => ({
  width: 150,
  height: 150,
  borderRadius: '50%',
  border: hasPhoto ? 'none' : '2px dashed #757575',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  cursor: 'pointer',
  backgroundColor: hasPhoto ? 'transparent' : 'rgba(0, 0, 0, 0.03)',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: hasPhoto ? 'transparent' : 'rgba(0, 0, 0, 0.05)',
    transform: 'scale(1.02)',
  },
}));

const ButtonsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

const ActionButton = styled(Button)({
  width: '100%',
  padding: '12px',
  borderRadius: 8,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
});

const NotificationToggleGroup = styled(ToggleButtonGroup)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
  '& .MuiToggleButtonGroup-grouped': {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    flex: 1,
    margin: '0 8px',
    transition: 'all 0.2s ease',
  },
});

const NotificationButton = styled(ToggleButton)(({ selected }) => ({
  padding: '8px',
  backgroundColor: selected ? '#9c27b0' : 'white',
  color: selected ? 'white' : 'inherit',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: selected ? '#7b1fa2' : '#f0f0f0',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const SuccessDialog = styled(Dialog)({
  '& .MuiPaper-root': {
    borderRadius: 16,
    padding: '24px',
    textAlign: 'center',
    maxWidth: 400,
    background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    overflow: 'visible',
  }
});

const SuccessIcon = styled(Box)({
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
});

const Confetti = styled(Box)(({ index }) => ({
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

// Mock data
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const years = ['2023', '2024', '2025', '2026', '2027', '2028'];

function BabyDetailsForm() {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [gender, setGender] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardAnimation, setCardAnimation] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationMethod, setNotificationMethod] = useState('email');
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [formValid, setFormValid] = useState({
    name: false,
    hometown: false,
    weight: false,
    guardianName: false,
    email: false,
    phone: false
  });

  const [formValues, setFormValues] = useState({
    name: '',
    hometown: '',
    weight: '',
    guardianName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleGenderChange = (event, newGender) => {
    if (newGender !== null) setGender(newGender);
  };

  const handleFormChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
    
    if (field === 'name') setFormValid({...formValid, name: value.length > 2});
    if (field === 'hometown') setFormValid({...formValid, hometown: value.length > 2});
    if (field === 'weight') {
      const numValue = parseFloat(value);
      setFormValid({...formValid, weight: !isNaN(numValue) && numValue > 0 && numValue < 30});
    }
  };

  const handleGuardianFormChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
    
    if (field === 'guardianName') setFormValid({...formValid, guardianName: value.length > 2});
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setFormValid({...formValid, email: emailRegex.test(value)});
    }
    if (field === 'phone') {
      const phoneRegex = /^\d{10}$/;
      setFormValid({...formValid, phone: phoneRegex.test(value.replace(/\D/g, ''))});
    }
  };

  const handleNextStep = () => {
    setCardAnimation('out');
    setTimeout(() => {
      setFormStep(prev => prev + 1);
      setCardAnimation('in');
    }, 500);
  };

  const handlePreviousStep = () => {
    setCardAnimation('out');
    setTimeout(() => {
      setFormStep(prev => prev - 1);
      setCardAnimation('in');
    }, 500);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) setProfilePictureUrl(URL.createObjectURL(file));
  };

  const handleNotificationChange = (event, newMethod) => {
    if (newMethod !== null) setNotificationMethod(newMethod);
  };

  const handleFinishClick = async () => {
    try {
      setIsLoading(true);

      // Validate dateOfBirth
      if (!year || !month || !day) {
        alert('Please select a valid date of birth.');
        setIsLoading(false);
        return;
      }

      // Format date properly with zero-padding
      const formattedMonth = month.padStart(2, '0');
      const formattedDay = day.padStart(2, '0');
      const dateString = `${year}-${formattedMonth}-${formattedDay}`;
      const dateOfBirth = new Date(dateString);

      if (isNaN(dateOfBirth.getTime())) {
        alert('Invalid date of birth. Please check your input.');
        setIsLoading(false);
        return;
      }

      // Validate required fields with specific messages
      if (!formValues.name) {
        alert('Baby name is required.');
        setIsLoading(false);
        return;
      }
      if (!formValues.hometown) {
        alert('Hometown is required.');
        setIsLoading(false);
        return;
      }
      if (!formValues.weight) {
        alert('Weight is required.');
        setIsLoading(false);
        return;
      }
      if (!gender) {
        alert('Gender is required.');
        setIsLoading(false);
        return;
      }

      let imageURL = ''
      if (formValues.profilePicture) {
        imageURL = await uploadProfilePicture(formValues.profilePicture, formValues.name);
      }

      // Prepare combined data
      const formData = {
        baby: { 
          name: formValues.name.trim(),
          hometown: formValues.hometown.trim(),
          weight: parseFloat(formValues.weight),
          gender,
          dateOfBirth: new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`).toISOString(),
          profilePicture: imageURL 
        },
        guardian: {
          name: formValues.guardianName.trim(),
          email: formValues.email.trim(),
          phone: formValues.phone.trim()
        },
        notificationMethod
      };

      console.log('FormData being sent:', formData);

      // Get auth token
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Make API call
      const response = await fetch('http://localhost:5001/api/babies/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const responseBody = await response.json();
      console.log('Server response:', responseBody);

      // Handle success
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => setShowConfetti(true), 300);
        setTimeout(() => navigate('/baby'), 2000);
      } else {
        console.error('Submission failed:', responseBody);
        alert(`Submission failed: ${responseBody.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const isStepValid = () => {
    switch(formStep) {
      case 1:
        return formValid.name && formValid.hometown && formValid.weight && gender && month && day && year;
      case 2:
        return true; // Photo optional
      case 3:
        if (notificationMethod === 'email') return formValid.guardianName && formValid.email;
        if (notificationMethod === 'sms') return formValid.guardianName && formValid.phone;
        return formValid.guardianName && formValid.email && formValid.phone;
      default:
        return false;
    }
  };

  useEffect(() => {
    const validateDate = () => {
      if (year && month && day) {
        const date = new Date(`${year}-${month}-${day}`);
        return !isNaN(date.getTime());
      }
      return false;
    };
    
    setFormValid(prev => ({
      ...prev,
      dateValid: validateDate()
    }));
  }, [year, month, day]);

  const renderStep1 = () => (
    <FormCard elevation={6} animation={cardAnimation}>
      <CardContent>
        <FormHeader>
          <FormLogo>
            <ChildCareIcon fontSize="medium" />
          </FormLogo>
          <FormTitle variant="h6">Enter Your Baby Details</FormTitle>
        </FormHeader>

        {/* Name Field */}
        <Box position="relative">
          <FormField 
            fullWidth 
            label="Full Name" 
            variant="outlined" 
            size="small"
            value={formValues.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
            InputProps={{
              startAdornment: <PersonOutlineIcon color="primary" fontSize="small" />
            }}
          />
          <Fade in={formValid.name}>
            <CheckCircleOutlineIcon color="success" sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} />
          </Fade>
        </Box>

        {/* Hometown Field */}
        <Box position="relative">
          <FormField 
            fullWidth 
            label="Home Town" 
            variant="outlined" 
            size="small"
            value={formValues.hometown}
            onChange={(e) => handleFormChange('hometown', e.target.value)}
            InputProps={{
              startAdornment: <HomeOutlinedIcon color="primary" fontSize="small" />
            }}
          />
          <Fade in={formValid.hometown}>
            <CheckCircleOutlineIcon color="success" sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} />
          </Fade>
        </Box>

        {/* Weight Field */}
        <WeightField>
          <Box display="flex">
            <FormField 
              fullWidth 
              label="Weight" 
              variant="outlined" 
              size="small"
              type="number"
              value={formValues.weight}
              onChange={(e) => handleFormChange('weight', e.target.value)}
              InputProps={{
                startAdornment: <ScaleOutlinedIcon color="primary" fontSize="small" />,
                endAdornment: <KgAdornment>kg</KgAdornment>,
                style: { borderRadius: '8px 0 0 8px' }
              }}
            />
          </Box>
          <Fade in={formValid.weight}>
            <CheckCircleOutlineIcon color="success" sx={{ position: 'absolute', right: 35, top: '50%', transform: 'translateY(-50%)' }} />
          </Fade>
        </WeightField>

        {/* Gender Selection */}
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>Gender</Typography>
        <GenderToggleGroup
          value={gender}
          exclusive
          onChange={handleGenderChange}
          fullWidth
        >
          <GenderButton value="boy">
            <BoyOutlinedIcon sx={{ mr: 0.5 }} />
            Boy
          </GenderButton>
          <GenderButton value="girl">
            <GirlOutlinedIcon sx={{ mr: 0.5 }} />
            Girl
          </GenderButton>
        </GenderToggleGroup>

        {/* Birthday Selection */}
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1, mt: 2 }}>
          <CakeOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
          Birthday
        </Typography>
        <DateContainer>
          <FormControl size="small" fullWidth>
            <Select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              displayEmpty
              renderValue={(selected) => selected || 'MM'}
            >
              {months.map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" fullWidth>
            <Select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              displayEmpty
              renderValue={(selected) => selected || 'DD'}
            >
              {days.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" fullWidth>
            <Select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              displayEmpty
              renderValue={(selected) => selected || 'YYYY'}
            >
              {years.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DateContainer>

        <ActionButton 
          variant="contained" 
          color="primary"
          endIcon={<ArrowForwardIcon />}
          disabled={!isStepValid()}
          onClick={handleNextStep}
        >
          Next
        </ActionButton>
      </CardContent>
    </FormCard>
  );

  const renderStep2 = () => (
    <FormCard elevation={6} animation={cardAnimation}>
      <CardContent>
        <FormHeader>
          <FormLogo>
            <PhotoCameraIcon fontSize="medium" />
          </FormLogo>
          <FormTitle variant="h6">Upload Profile Picture</FormTitle>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Let's add a photo of {formValues.name}
          </Typography>
        </FormHeader>

        <PhotoUploadContainer>
          <PhotoUploadBox 
            hasPhoto={!!profilePictureUrl} 
            onClick={() => fileInputRef.current.click()}
          >
            {profilePictureUrl ? (
              <Avatar src={profilePictureUrl} sx={{ width: '100%', height: '100%' }} />
            ) : (
              <AddAPhotoIcon style={{ fontSize: 48, color: '#757575', opacity: 0.7 }} />
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setProfilePictureUrl(URL.createObjectURL(file));
                  setFormValues({ ...formValues, profilePicture: file });
                }
              }}
            />
          </PhotoUploadBox>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }} onClick={() => fileInputRef.current.click()}>
            {profilePictureUrl ? 'Change Photo' : 'Upload Photo'}
          </Typography>
        </PhotoUploadContainer>

        <ButtonsContainer>
          <Button 
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handlePreviousStep}
            sx={{ width: '48%' }}
          >
            Back
          </Button>
          <Button 
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNextStep}
            sx={{ width: '48%' }}
          >
            Next
          </Button>
        </ButtonsContainer>
      </CardContent>
    </FormCard>
  );

  const renderStep3 = () => (
    <FormCard elevation={6} animation={cardAnimation}>
      <CardContent>
        <FormHeader>
          <FormLogo>
            <NotificationsIcon fontSize="medium" />
          </FormLogo>
          <FormTitle variant="h6">Reminder Settings</FormTitle>
        </FormHeader>

        {/* Guardian Details */}
        <Box position="relative">
          <FormField
            fullWidth
            label="Guardian Name"
            variant="outlined"
            size="small"
            value={formValues.guardianName}
            onChange={(e) => handleGuardianFormChange('guardianName', e.target.value)}
            InputProps={{
              startAdornment: <PersonOutlineIcon color="primary" fontSize="small" />
            }}
          />
          <Fade in={formValid.guardianName}>
            <CheckCircleOutlineIcon color="success" sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} />
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
            onChange={(e) => handleGuardianFormChange('email', e.target.value)}
            InputProps={{
              startAdornment: <EmailIcon color="primary" fontSize="small" />
            }}
          />
          <Fade in={formValid.email}>
            <CheckCircleOutlineIcon color="success" sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} />
          </Fade>
        </Box>

        <Box position="relative">
          <FormField
            fullWidth
            label="Phone Number"
            variant="outlined"
            size="small"
            value={formValues.phone}
            onChange={(e) => handleGuardianFormChange('phone', e.target.value)}
            InputProps={{
              startAdornment: <PhoneIcon color="primary" fontSize="small" />
            }}
          />
          <Fade in={formValid.phone}>
            <CheckCircleOutlineIcon color="success" sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} />
          </Fade>
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 2, mb: 1 }}>
          Notification Method
        </Typography>
        <NotificationToggleGroup
          value={notificationMethod}
          exclusive
          onChange={handleNotificationChange}
          fullWidth
        >
          <NotificationButton value="email">Email</NotificationButton>
          <NotificationButton value="sms">SMS</NotificationButton>
          <NotificationButton value="both">Both</NotificationButton>
        </NotificationToggleGroup>

        <ButtonsContainer sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handlePreviousStep}
            sx={{ width: '48%' }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={isLoading ? <CircularProgress size={20} /> : <DoneIcon />}
            onClick={handleFinishClick}
            disabled={!isStepValid() || isLoading}
            sx={{ width: '48%' }}
          >
            {isLoading ? 'Submitting...' : 'Submit All'}
          </Button>
        </ButtonsContainer>
      </CardContent>
    </FormCard>
  );

  return (
    <BackgroundContainer>
      <BackgroundImage />
      <RightSideImage 
        src={rightsideimg} 
        alt="Person with baby at desk" 
        isAnimating={isAnimating}
        onClick={() => setIsAnimating(true)}
      />
      <ContentContainer>
        {formStep === 1 && renderStep1()}
        {formStep === 2 && renderStep2()}
        {formStep === 3 && renderStep3()}

        <SuccessDialog open={success} onClose={() => setSuccess(false)}>
          <Box sx={{ position: 'relative', p: 4 }}>
            {showConfetti && Array.from({ length: 30 }).map((_, i) => (
              <Confetti key={i} index={i} />
            ))}
            <SuccessIcon>
              <DoneIcon fontSize="large" />
            </SuccessIcon>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#4A148C' }}>
              All Set!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Baby details and reminders saved successfully
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CelebrationIcon />}
              onClick={() => navigate('/baby')}
            >
              Continue to Dashboard
            </Button>
          </Box>
        </SuccessDialog>
      </ContentContainer>
    </BackgroundContainer>
  );
}

export default BabyDetailsForm;