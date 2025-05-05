import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/navbar';
import { 
  Box,
  Card, 
  CardContent, 
  Typography, 
  Chip,
  Avatar,
  useTheme,
  styled,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  Backdrop,
  Divider
} from '@mui/material';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Cake,
  LocationOn,
  Scale,
  Female,
  Male,
  Person,
  Email,
  Phone,
  Notifications,
  Delete,
  Favorite,
  ChildCare,
  Celebration
} from '@mui/icons-material';

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  padding: theme.spacing(4, 2), // Reduced from 8 to 4
  gap: '32px',
  minHeight: '60vh', // Reduced from 70vh to 60vh
  '&::-webkit-scrollbar': {
    height: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: '6px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 4), // Reduced from 12 to 8
  },
}));

// Enhanced landscape card with improved styling
const LandscapeCard = styled(motion(Card))(({ theme }) => ({
  position: 'relative',
  border: 'none',
  borderRadius: '28px',
  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)',
  background: theme.palette.background.paper,
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  cursor: 'grab',
  overflow: 'visible',
  willChange: 'transform, box-shadow',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '28px',
    padding: '2px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover:before': {
    opacity: 1,
  },
  '&:active': {
    cursor: 'grabbing',
  }
}));

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
  months -= birthDate.getMonth();
  months += today.getMonth();
  if (months <= 0) return 'Newborn';
  if (months === 1) return '1 month';
  return `${months} months`;
};

// Custom cursor container styles
const CursorStyles = styled('style')({
  '@keyframes cursorPing': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(1.5)',
      opacity: 0
    }
  }
});

const BabyCard = ({ baby, onDeleteSuccess }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  const genderConfig = {
    girl: { icon: <Female fontSize="small" />, color: '#ff4081', gradient: 'linear-gradient(135deg, #ff9a9e, #fad0c4)' },
    boy: { icon: <Male fontSize="small" />, color: '#448aff', gradient: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)' }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${baby.name}?`)) {
      try {
        const response = await fetch(`http://localhost:5001/api/babies/${baby._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Deletion failed');
        onDeleteSuccess();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  // Optimized motion values with reduced intensity
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-100, 100], [2, -2]);
  const rotateX = useMotionValue(0);
  const brightness = useTransform(x, [-100, 0, 100], [1.02, 1, 1.02]);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCardHover = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;
    
    x.set(mouseX * 0.1);
    rotateX.set(mouseY * 0.05);
  };

  // Optimized animation variants
  const cardVariants = {
    normal: {
      scale: 1,
      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)',
      y: 0
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.12), 0 8px 12px rgba(0, 0, 0, 0.06)',
      y: -3,
      transition: { type: "spring", stiffness: 400, damping: 30 }
    },
    expanded: {
      scale: 1.03,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.08)',
      y: -5,
      zIndex: 50,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: {
      scale: 0.97,
      opacity: 0,
      y: 10,
      transition: { duration: 0.15 }
    }
  };
  
  const ageInMonths = parseInt(calculateAge(baby.dateOfBirth));
  const ageEmoji = ageInMonths < 3 ? '👶' : ageInMonths < 12 ? '🍼' : '🧒';

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <LandscapeCard
          onClick={handleCardClick}
          onMouseMove={handleCardHover}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            x.set(0);
            rotateX.set(0);
          }}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
          style={{
            rotateY,
            rotateX,
            filter: `brightness(${brightness.get()})`,
            zIndex: isExpanded ? 10 : 1,
            cursor: isMouseDown ? 'grabbing' : (isExpanded ? 'zoom-out' : 'grab')
          }}
          variants={cardVariants}
          initial="normal"
          animate={isExpanded ? "expanded" : isHovered ? "hover" : "normal"}
          exit="exit"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            minWidth: '600px',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          {/* Left Section - Avatar and Profile */}
          <Box sx={{
            position: 'relative',
            width: '38%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}10, ${theme.palette.primary.light}20)`,
            borderTopLeftRadius: '28px',
            borderBottomLeftRadius: '28px',
            overflow: 'hidden'
          }}>
            {/* Background pattern */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.05,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${genderConfig[baby.gender].color.substring(1)}' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              zIndex: 0
            }}/>
            
            <motion.div
              whileHover={{ scale: 1.05, rotate: [-0.5, 0.5, -0.5, 0.5, 0] }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'relative',
                zIndex: 2
              }}
            >
              <Avatar
                src={baby.profilePicture || '/baby-placeholder.png'}
                alt={baby.name}
                sx={{
                  width: 130,
                  height: 130,
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: theme.shadows[8],
                }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  background: genderConfig[baby.gender].color,
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 36,
                  height: 36,
                  boxShadow: theme.shadows[4],
                  color: 'white'
                }}
              >
                {genderConfig[baby.gender].icon}
              </motion.div>
            </motion.div>
            
            <Typography 
              variant="h5" 
              fontWeight={700}
              align="center"
              sx={{ 
                mt: 3,
                background: genderConfig[baby.gender].gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                zIndex: 2
              }}
            >
              {baby.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, zIndex: 2 }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Chip
                  label={baby.gender}
                  icon={genderConfig[baby.gender].icon}
                  size="medium"
                  sx={{
                    px: 1,
                    color: genderConfig[baby.gender].color,
                    bgcolor: `${genderConfig[baby.gender].color}15`,
                    borderRadius: '12px',
                    '& .MuiChip-icon': { color: `${genderConfig[baby.gender].color} !important` }
                  }}
                />
              </motion.div>
            </Box>
            
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              width: '90%', 
              borderRadius: '16px', 
              bgcolor: 'background.paper',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}
              >
                <Box component="span" sx={{ mr: 1, fontSize: '1.5rem' }}>
                  {ageEmoji}
                </Box>
                {calculateAge(baby.dateOfBirth)} old
              </Typography>
            </Box>
            
            {/* Delete button positioned at bottom */}
            <Box sx={{ position: 'absolute', bottom: 12, right: 12, zIndex: 10 }}>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton 
                  onClick={handleDelete} 
                  size="small"
                  sx={{ 
                    color: theme.palette.error.main,
                    bgcolor: theme.palette.background.paper,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:hover': {
                      bgcolor: theme.palette.error.light + '20'
                    }
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </motion.div>
            </Box>
          </Box>
          
          {/* Right Section - Details */}
          <Box sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative element */}
            <Box 
              component={motion.div}
              animate={{ opacity: [0.02, 0.05, 0.02] }}
              transition={{ duration: 8, repeat: Infinity }}
              sx={{
                position: 'absolute',
                top: -80,
                right: -80,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: genderConfig[baby.gender].gradient,
                filter: 'blur(60px)',
                zIndex: 0
              }}
            />
            
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ position: 'relative', zIndex: 1 }}>
              Baby Information
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3, position: 'relative', zIndex: 1 }}>
              <Grid item xs={6}>
                <DetailItem
                  icon={<Cake sx={{ color: '#ff7043' }} />}
                  label="Birth Date"
                  value={new Date(baby.dateOfBirth).toLocaleDateString()}
                  enhanced
                />
              </Grid>
              <Grid item xs={6}>
                <DetailItem
                  icon={<Scale sx={{ color: '#66bb6a' }} />}
                  label="Weight"
                  value={`${baby.weight} kg`}
                  enhanced
                />
              </Grid>
              <Grid item xs={12}>
                <DetailItem
                  icon={<LocationOn sx={{ color: '#29b6f6' }} />}
                  label="Hometown"
                  value={baby.hometown}
                  enhanced
                />
              </Grid>
            </Grid>

            {/* Milestone indicator */}
            <Box sx={{ 
              p: 1.5, 
              borderRadius: '16px', 
              mb: 2,
              background: `linear-gradient(120deg, ${theme.palette.background.paper}, ${genderConfig[baby.gender].color}08)`,
              border: `1px dashed ${genderConfig[baby.gender].color}30`,
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Celebration sx={{ color: genderConfig[baby.gender].color }} />
              <Typography variant="body2" fontWeight={500}>
                Next milestone:
                {ageInMonths < 3 
                  ? " First smile (2-3 months)" 
                  : ageInMonths < 6 
                    ? " Sitting up (4-7 months)" 
                    : ageInMonths < 10 
                      ? " First steps (9-12 months)" 
                      : " First words (12-18 months)"}
              </Typography>
            </Box>

            {(baby.guardian?.name || baby.guardian?.email || baby.guardian?.phone) && (
              <Box sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'action.hover',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1
              }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(45deg, ${theme.palette.background.paper}15 25%, transparent 25%, transparent 50%, ${theme.palette.background.paper}15 50%, ${theme.palette.background.paper}15 75%, transparent 75%, transparent)`,
                    backgroundSize: '8px 8px',
                    opacity: 0.5
                  }}
                />
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Guardian Details
                </Typography>
                <Grid container spacing={1}>
                  {baby.guardian?.name && (
                    <Grid item xs={12}>
                      <DetailItem
                        icon={<Person fontSize="small" />}
                        value={baby.guardian.name}
                        compact
                        enhanced
                      />
                    </Grid>
                  )}
                  {baby.guardian?.email && (
                    <Grid item xs={12}>
                      <DetailItem
                        icon={<Email fontSize="small" />}
                        value={baby.guardian.email}
                        compact
                        enhanced
                      />
                    </Grid>
                  )}
                  {baby.guardian?.phone && (
                    <Grid item xs={12}>
                      <DetailItem
                        icon={<Phone fontSize="small" />}
                        value={baby.guardian.phone}
                        compact
                        enhanced
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}

            {baby.notificationMethod && (
              <Box sx={{ mt: 2, position: 'relative', zIndex: 1 }}>
                <DetailItem
                  icon={<Notifications sx={{ color: '#ffa000' }} />}
                  label="Notifications"
                  value={baby.notificationMethod}
                  enhanced
                />
              </Box>
            )}
          </Box>
        </LandscapeCard>
      </motion.div>
    </Grid>
  );
};

// Enhanced DetailItem component with more sophisticated design
const DetailItem = ({ icon, label, value, compact, enhanced, sx }) => {
  const [hovering, setHovering] = useState(false);
  const theme = useTheme();

  return (
    <motion.div 
      whileHover={{ scale: enhanced ? 1.02 : 1.01 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: compact ? 0.5 : 1.5,
        borderRadius: enhanced ? 3 : 2,
        transition: 'all 0.2s ease',
        cursor: hovering ? 'cell' : 'default',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': enhanced ? {
          backgroundColor: 'background.paper',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        } : {
          backgroundColor: 'rgba(0,0,0,0.02)',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.03)'
        },
        ...sx
      }}>
        {enhanced && hovering && (
          <Box 
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)',
              zIndex: 0
            }}
          />
        )}
        
        <Avatar sx={{
          width: compact ? 28 : (enhanced ? 40 : 36),
          height: compact ? 28 : (enhanced ? 40 : 36),
          bgcolor: enhanced ? theme.palette.primary.light + '20' : 'background.paper',
          color: enhanced ? theme.palette.primary.main : 'text.primary',
          boxShadow: enhanced ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1
        }}>
          {icon}
        </Avatar>
        
        <Box sx={{ zIndex: 1 }}>
          {label && (
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={enhanced ? { fontWeight: 500 } : {}}
            >
              {label}
            </Typography>
          )}
          <Typography 
            variant="body2" 
            fontWeight={enhanced ? 600 : 500}
            sx={enhanced ? { color: theme.palette.text.primary } : {}}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

// Optimized loading indicator with smoother animation
const LoadingIndicator = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    cursor: 'wait'
  }}>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        <CircularProgress size={70} thickness={4} color="primary" />
      </motion.div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <Typography variant="h6" color="textSecondary" sx={{ mt: 3 }}>
        Loading babies...
      </Typography>
    </motion.div>
  </Box>
);

// Optimized error display with smoother animation
const ErrorDisplay = ({ error }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    style={{ cursor: 'not-allowed' }}
  >
    <Box sx={{ p: 3 }}>
      <Alert 
        severity="error" 
        sx={{ 
          borderRadius: 4,
          boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)'
        }}
      >
        Error loading babies: {error.message}
      </Alert>
    </Box>
  </motion.div>
);

// Enhanced "no babies" message
const NoBabiesMessage = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
  >
    <Box sx={{ 
      textAlign: 'center', 
      py: 10,
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'help'
    }}>
      <motion.div
        animate={{ 
          y: [0, -5, 0],
          rotate: [-1, 1, -1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
          🍼
        </Typography>
      </motion.div>
      <Typography 
        variant="h5" 
        color="textSecondary" 
        sx={{ 
          mb: 2, 
          background: 'linear-gradient(45deg, #5C6BC0, #26C6DA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}
      >
        No babies found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Start by adding your first baby profile!
      </Typography>
    </Box>
  </motion.div>
);

// Enhanced background animations
function Babies() {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [babies, setBabies] = React.useState([]);
  const [expandedBaby, setExpandedBaby] = React.useState(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  // Track mouse position for custom cursor
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const fetchBabies = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5001/api/babies', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setBabies(data.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (user) fetchBabies();
  }, [user, fetchBabies]);

  return (
    <div>
      <CursorStyles>
        {`
          @keyframes cursorPing {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          
          .baby-card-container {
            cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23448aff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><path d='M8 14s1.5 2 4 2 4-2 4-2'/><line x1='9' y1='9' x2='9.01' y2='9'/><line x1='15' y1='9' x2='15.01' y2='9'/></svg>") 20 20, auto;
          }
          
          .baby-card-container * {
            cursor: inherit;
          }.baby-card-container * {
            cursor: inherit;
          }
        `}
      </CursorStyles>
      <Navbar />
      <Box 
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="baby-card-container"
        sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #CED5FF 0%, #ffffff 50%, #CED5FF 100%)',
          backgroundSize: '100% 200%',
          backgroundPosition: '0 0',
          py: 4, // Reduced from 7 to 4      
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Enhanced background elements */}
        <Box
          component={motion.div}
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '30%',
            height: '30%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,210,210,0.6) 0%, rgba(255,210,210,0) 70%)',
            filter: 'blur(40px)',
            willChange: 'transform, opacity',
            pointerEvents: 'none'
          }}
        />
        
        <Box
          component={motion.div}
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.1, 0.12, 0.1]
          }}
          transition={{ 
            duration: 12,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '25%',
            height: '25%',
            borderRadius: '50%', 
            background: 'radial-gradient(circle, rgba(173,216,230,0.6) 0%, rgba(173,216,230,0) 70%)',
            filter: 'blur(40px)',
            willChange: 'transform, opacity',
            pointerEvents: 'none'
          }}
        />
        
        {/* New decorative elements */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          sx={{
            position: 'absolute',
            top: '40%',
            left: '20%',
            width: '60%',
            height: '60%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM56 4c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237986CB' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Enhanced page title */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6, 
          position: 'relative', 
          zIndex: 2
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <ChildCare fontSize="large" sx={{ color: '#3f51b5' }} />
              
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
        
            </Typography>
          </motion.div>
        </Box>

        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorDisplay error={error} />
        ) : babies.length === 0 ? (
          <NoBabiesMessage />
        ) : (
          <ScrollContainer>
            <AnimatePresence>
              <Grid 
                container 
                spacing={4} 
                sx={{ 
                  width: '100%',
                  maxWidth: '1400px', // Added to constrain width
                  margin: '0 auto', // Center horizontally
                  justifyContent: 'center', // Center grid items
                  px: 2 
                }}
              >
                {babies.map((baby) => (
                  <BabyCard 
                    key={baby._id} 
                    baby={baby}
                    onDeleteSuccess={fetchBabies}
                  />
                ))}
              </Grid>
            </AnimatePresence>
          </ScrollContainer>
        )}
        
        {/* Footer element */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          sx={{ 
            position: 'relative',
            zIndex: 2,
            mt: 8,
            textAlign: 'center',
            p: 3
          }}
        >
          <Divider sx={{ mb: 3 }}>
            <Chip 
              label="Vaccine Baby" 
              icon={<ChildCare />} 
              sx={{ 
                px: 2,
                fontWeight: 500,
                background: 'linear-gradient(45deg, #f3f4f8, #e8eaf6)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }} 
            />
          </Divider>
          
        </Box>
      </Box>
    </div>
  );
}

export default Babies;