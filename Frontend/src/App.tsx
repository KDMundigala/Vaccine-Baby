import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/useAuth";
import Loginpage from './pages/loginform.jsx';
import Vaccination from "./pages/Vaccination";
import Chat from "./pages/Chat";
import HealthCalculator from "./pages/HealthCalculator.jsx";
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound";
import Homepage from './pages/Home.jsx';
import Registerpage from './pages/register.jsx';
import BabysitterPage from './pages/babydetail.jsx';
import Reminder from './pages/reminder.jsx';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/register';
import Midwife from './pages/Midwife'; // Added Midwife page
import TempComponent from './components/temp_component'; // Import your temp component
import Services from './pages/services';
import Babies from './pages/baby_card';
import Contact from "./pages/contact.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Loginpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/baby-details" element={<BabysitterPage />} />
            <Route path="/reminder" element={<Reminder />} />
            <Route path="/vaccination" element={<Vaccination />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/health-calculator" element={<HealthCalculator />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/services" element={<Services />} />
            <Route path="/baby" element={<Babies />} />
            <Route path="/about" element={<About />} />
            <Route path="/midwife" element={<Midwife />} /> {/* Added Midwife route */}
            <Route path="/temp" element={<TempComponent />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
