import { useState, useEffect, useRef } from "react";
import { vaccineAPI } from "@/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from '../components/navbar.jsx';
import { ChevronDown, CheckCircle, AlertCircle, Calendar as CalendarIcon, Syringe as SyringeIcon } from "lucide-react";

interface VaccineData {
  _id: string;
  name: string;
  ageInMonths: number;
  description: string;
  diseasesAvoided: string[];
  scheduledDate: string;
  status: string;
  missedDays?: number;
}

const Syringe = () => {
  const groupRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.x * Math.PI * 0.3;
      groupRef.current.rotation.x = mouse.y * Math.PI * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 32]} />
        <meshStandardMaterial color="#CED5FF" />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 32]} />
        <meshStandardMaterial color="#AA60EA" />
      </mesh>
    </group>
  );
};

const Vaccination = () => {
  const { toast } = useToast();
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [getBirthDate, setGetBirthDate] = useState<Date | null>(null);
  const [vaccines, setVaccines] = useState<VaccineData[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineData | null>(null);
  const [missedDays, setMissedDays] = useState<number>(0);
  const [missDialogOpen, setMissDialogOpen] = useState(false);
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);
  const [canRender3D, setCanRender3D] = useState(true);
  const [expandedVaccine, setExpandedVaccine] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  useEffect(() => {
    try {
      require('@react-three/fiber');
      require('@react-three/drei');
      setCanRender3D(true);
    } catch (error) {
      console.error("3D rendering dependencies failed to load:", error);
      setCanRender3D(false);
    }
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem('token'))
    const userId = JSON.parse(localStorage.getItem("user") || '{}').id;

    const fetchBabyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/babies/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGetBirthDate(new Date(data.data.dateOfBirth));
      } catch (error) {
        console.error('Failed to fetch baby details:', error);
      }
    };

    fetchBabyDetails();
  }, []);

  useEffect(() => {
    if (getBirthDate) {
      setBirthDate(getBirthDate);
    } else {
      const defaultDate = new Date();
      defaultDate.setMonth(defaultDate.getMonth() - 2);
      setBirthDate(defaultDate);
      localStorage.setItem("babyBirthDate", defaultDate.toISOString());
    }
  }, [getBirthDate]);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await vaccineAPI.getVaccinationSchedule();
        const scheduleData = response.data.map((vaccine: any) => ({
          ...vaccine,
          scheduledDate: new Date(vaccine.scheduledDate).toISOString()
        }));

        // Sort the vaccines by ageInMonths in ascending order
        const sortedVaccines = scheduleData.sort((a, b) => a.ageInMonths - b.ageInMonths);
        
        setVaccines(sortedVaccines);
        setHighlightedDates(sortedVaccines.map((vaccine: VaccineData) => new Date(vaccine.scheduledDate)));
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load vaccination schedule",
          variant: "destructive",
        });
      }
    };

    if (birthDate) {
      fetchVaccines();
    }
  }, [birthDate, toast]);

  const handleMissVaccine = (vaccine: VaccineData) => {
    setSelectedVaccine(vaccine);
    setMissedDays(0);
    setMissDialogOpen(true);
  };

  const handleSubmitMissedDays = async () => {
    if (!selectedVaccine || missedDays <= 0 || missedDays > 14) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number of days (1-14).",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await vaccineAPI.recordMissedVaccination(
        selectedVaccine._id,
        missedDays
      );

      const updatedVaccines = vaccines.map(vaccine => {
        const updatedRecord = response.data.updatedRecords.find(
          (record: any) => record.vaccineId === vaccine._id
        );
        if (updatedRecord) {
          return {
            ...vaccine,
            scheduledDate: updatedRecord.scheduledDate,
            status: updatedRecord.status,
            missedDays: vaccine._id === selectedVaccine._id ? missedDays : undefined
          };
        }
        return vaccine;
      });

      setVaccines(updatedVaccines);
      setHighlightedDates(updatedVaccines.map(vaccine => new Date(vaccine.scheduledDate)));
      setMissDialogOpen(false);
      
      toast({
        title: "Vaccination Schedule Updated",
        description: `The schedule has been adjusted by ${missedDays} days.`,
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Could not update vaccination schedule",
        variant: "destructive",
      });
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const clickedVaccine = vaccines.find(
      (v: VaccineData) => new Date(v.scheduledDate).toDateString() === date.toDateString()
    );
    if (clickedVaccine) {
      setSelectedVaccine(clickedVaccine);
    } else {
      setSelectedVaccine(null);
    }
  };

  const isVaccinePast = (date: string): boolean => {
    const vaccineDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return vaccineDate < today;
  };

  const formatVaccineDate = (date: string): string => {
    return format(new Date(date), 'MMMM dd, yyyy');
  };

  const toggleExpand = (id: string) => {
    setExpandedVaccine(expandedVaccine === id ? null : id);
  };

  const displayedVaccines = showAll ? vaccines : vaccines.slice(0, 7);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#CED5FF] via-white to-[#CED5FF] py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16 mt-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 font-poppins bg-clip-text text-transparent bg-gradient-to-r from-[#AA60EA] to-[#7B68EE]">
              Vaccination Schedule
            </h1>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 text-gray-600 max-w-2xl mx-auto"
            >
              <p>Keep track of your baby's vaccination schedule to ensure they stay protected and healthy.</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 flex flex-col md:flex-row justify-between items-center bg-white/70 rounded-2xl p-5 shadow-lg backdrop-blur-sm max-w-5xl mx-auto"
          >
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <SyringeIcon className="w-6 h-6 text-[#AA60EA]" />
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-all"
                  checked={showAll}
                  onCheckedChange={setShowAll}
                  className="data-[state=checked]:bg-[#AA60EA]"
                />
                <Label htmlFor="show-all" className="font-medium text-gray-700">
                  Show All Vaccines (up to 3 Years)
                </Label>
              </div>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                className="border-[#AA60EA] text-[#AA60EA] hover:bg-[#AA60EA] hover:text-white rounded-full px-6 shadow-md flex items-center gap-2"
                onClick={() => setCalendarDialogOpen(true)}
              >
                <CalendarIcon className="w-4 h-4" />
                View Calendar
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <AnimatePresence>
              {displayedVaccines.map((vaccine: VaccineData, index: number) => {
                const isPast = isVaccinePast(vaccine.scheduledDate);
                return (
                  <motion.div
                    key={vaccine._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`mb-4 overflow-hidden`}
                  >
                    <motion.div
                      className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
                        isPast 
                          ? "border-green-500"
                          : vaccine.status === 'missed'
                            ? "border-red-500"
                            : "border-[#AA60EA]"
                      }`}
                      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(170, 96, 234, 0.2)" }}
                      onHoverStart={() => setIsHovering(vaccine._id)}
                      onHoverEnd={() => setIsHovering(null)}
                    >
                      <div 
                        className="cursor-pointer p-5 flex flex-col md:flex-row justify-between items-start md:items-center"
                        onClick={() => toggleExpand(vaccine._id)}
                      >
                        <div className="flex items-center mb-3 md:mb-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                            isPast 
                              ? "bg-green-100" 
                              : vaccine.status === 'missed'
                                ? "bg-red-100"
                                : "bg-purple-100"
                          }`}>
                            {isPast ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : vaccine.status === 'missed' ? (
                              <AlertCircle className="w-6 h-6 text-red-500" />
                            ) : (
                              <SyringeIcon className="w-6 h-6 text-[#AA60EA]" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{vaccine.name}</h3>
                            <p className="text-sm text-gray-500">
                              {vaccine.ageInMonths === 0 ? "At birth" : `${vaccine.ageInMonths} months`}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center md:gap-8 w-full md:w-auto">
                          <div className="mb-3 md:mb-0">
                            <p className="text-sm text-gray-500">Scheduled Date</p>
                            <p className="font-medium text-gray-700">{formatVaccineDate(vaccine.scheduledDate)}</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {!isPast && (
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMissVaccine(vaccine);
                                  }}
                                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white rounded-full px-4"
                                >
                                  Miss Date
                                </Button>
                              </motion.div>
                            )}
                            
                            {vaccine.status === 'missed' && (
                              <span className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-full">
                                Missed by {vaccine.missedDays} days
                              </span>
                            )}
                            
                            <motion.div
                              animate={{ rotate: expandedVaccine === vaccine._id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className={`w-5 h-5 ${isHovering === vaccine._id ? "text-[#AA60EA]" : "text-gray-400"}`} />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {expandedVaccine === vaccine._id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-medium text-gray-700 mb-2">Prevents</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {vaccine.diseasesAvoided.map((disease, idx) => (
                                      <span 
                                        key={idx} 
                                        className="bg-[#CED5FF] text-[#AA60EA] text-xs px-3 py-1 rounded-full"
                                      >
                                        {disease}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                
                                {vaccine.description && (
                                  <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                                    <p className="text-sm text-gray-600">{vaccine.description}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {!showAll && vaccines.length > 7 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-8"
              >
                <Button
                  onClick={() => setShowAll(true)}
                  className="bg-gradient-to-r from-[#AA60EA] to-[#7B68EE] hover:from-[#9050D0] hover:to-[#6A58DE] text-white rounded-full px-8 py-6 shadow-lg"
                >
                  Show More Vaccines
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Missed Vaccine Dialog */}
          <Dialog open={missDialogOpen} onOpenChange={setMissDialogOpen}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <DialogContent className="bg-white rounded-xl border-[#CED5FF] shadow-lg max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle className="text-gray-800 font-poppins text-2xl">Report Missed Vaccination</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Enter the number of days missed for the {selectedVaccine?.name} vaccination.
                    The maximum allowed is 14 days.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="missed-days" className="text-gray-700">Number of days missed</Label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Input
                        id="missed-days"
                        type="number"
                        min="1"
                        max="14"
                        value={missedDays.toString()}
                        onChange={(e) => setMissedDays(parseInt(e.target.value) || 0)}
                        placeholder="Enter days (1-14)"
                        className="border-[#CED5FF] focus:ring-[#AA60EA]"
                      />
                    </motion.div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      onClick={() => setMissDialogOpen(false)}
                      className="border-[#AA60EA] text-[#AA60EA] hover:bg-[#AA60EA] hover:text-white rounded-full"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={handleSubmitMissedDays} 
                      className="bg-[#AA60EA] hover:bg-[#AA60EA]/90 text-white rounded-full"
                    >
                      Update Schedule
                    </Button>
                  </motion.div>
                </div>
              </DialogContent>
            </motion.div>
          </Dialog>

          {/* Calendar Dialog */}
          <Dialog open={calendarDialogOpen} onOpenChange={setCalendarDialogOpen}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <DialogContent className="sm:max-w-lg bg-gradient-to-b from-[#CED5FF]/50 to-white rounded-xl border-[#CED5FF] shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-gray-800 font-poppins">Vaccination Calendar</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Select a date to view scheduled vaccinations. Purple dates indicate vaccine appointments.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-6">
                  {canRender3D ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Canvas style={{ height: '100px', width: '100px', margin: '0 auto' }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Syringe />
                        <OrbitControls enableZoom={false} enablePan={false} />
                      </Canvas>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#AA60EA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto mb-4"
                      >
                        <path d="M12 2v6l3 3-3 3v6" />
                        <path d="M9 12h6" />
                      </svg>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Calendar
                      value={selectedDate}
                      onChange={(value: Date) => handleDateClick(value)}
                      className="border-[#CED5FF] rounded-lg shadow-sm bg-white p-4 w-full"
                      tileClassName={({ date }) =>
                        highlightedDates.some(
                          (d) => d.toDateString() === date.toDateString()
                        )
                          ? 'bg-[#AA60EA] text-white rounded-full'
                          : ''
                      }
                      calendarType="gregory"
                      prevLabel={<span className="text-[#AA60EA] font-bold">←</span>}
                      nextLabel={<span className="text-[#AA60EA] font-bold">→</span>}
                      navigationLabel={({ date }) => (
                        <span className="text-gray-800 font-poppins">
                          {format(date, 'MMMM yyyy')}
                        </span>
                      )}
                    />
                  </motion.div>
                </div>
                {selectedVaccine && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#CED5FF]/10 p-4 rounded-lg"
                  >
                    <h3 className="font-poppins font-medium text-gray-800 text-lg">
                      {selectedVaccine.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Scheduled for: {formatVaccineDate(selectedVaccine.scheduledDate)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Prevents: {selectedVaccine.diseasesAvoided.join(", ")}
                    </p>
                  </motion.div>
                )}
                <div className="flex justify-end">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setCalendarDialogOpen(false)}
                      className="bg-[#AA60EA] hover:bg-[#AA60EA]/90 text-white rounded-full px-6"
                    >
                      Close
                    </Button>
                  </motion.div>
                </div>
              </DialogContent>
            </motion.div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Vaccination;