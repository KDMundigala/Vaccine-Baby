
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-baby-blue/30 to-white z-0"></div>
        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="font-poppins text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span>Monitor Your Baby's</span>
            <span className="block text-baby-purple">Health & Vaccinations</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Track your baby's vaccinations, monitor growth, and connect with healthcare professionals - 
            all in one place. BabyBloom helps you make informed decisions about your child's health.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/signup">
              <Button className="w-full bg-baby-purple hover:opacity-90 sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                className="w-full border-baby-purple text-baby-purple hover:bg-baby-purple hover:text-white sm:w-auto"
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white py-12">
        <div className="container">
          <h2 className="font-poppins text-3xl font-bold text-center text-gray-900">
            Our Services
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Service 1 */}
            <div className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 rounded-full bg-baby-blue/20 p-3 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-baby-purple">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 className="font-poppins text-lg font-semibold text-gray-900">
                Vaccination Tracking
              </h3>
              <p className="mt-2 text-gray-600">
                Keep track of all your baby's vaccinations with timely reminders and detailed information.
              </p>
            </div>
            {/* Service 2 */}
            <div className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 rounded-full bg-baby-blue/20 p-3 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-baby-purple">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="font-poppins text-lg font-semibold text-gray-900">
                Professional Consultation
              </h3>
              <p className="mt-2 text-gray-600">
                Chat with qualified midwives and healthcare professionals for personalized advice.
              </p>
            </div>
            {/* Service 3 */}
            <div className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 rounded-full bg-baby-blue/20 p-3 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-baby-purple">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 className="font-poppins text-lg font-semibold text-gray-900">
                Health Calculator
              </h3>
              <p className="mt-2 text-gray-600">
                Monitor your baby's growth with our health calculator for weight and height status.
              </p>
            </div>
            {/* Service 4 */}
            <div className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 rounded-full bg-baby-blue/20 p-3 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-baby-purple">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              <h3 className="font-poppins text-lg font-semibold text-gray-900">
                Health FAQs
              </h3>
              <p className="mt-2 text-gray-600">
                Access comprehensive information about baby care, nutrition, and health concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
