import { useState, useEffect } from "react";
import { faqAPI } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from '../components/navbar.jsx';
import { Search, Filter, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await (selectedCategory === "all" 
          ? faqAPI.getAllFAQs()
          : faqAPI.getFAQsByCategory(selectedCategory));
        setFaqs(response.data);
        setFilteredFaqs(response.data);
        setOpenFaq(null); // Reset open FAQ when category changes
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load FAQs",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, [selectedCategory, toast]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(
        faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchQuery, faqs]);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const categories = ["all", "Food", "Health", "Development", "General"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CED5FF] via-white to-[#AA60EA]/20">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 font-poppins tracking-tight">
            Frequently Asked <span className="text-[#AA60EA]">Questions</span>
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Find answers to the most common questions about our services and products
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#AA60EA] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="w-full md:w-64">
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger className="w-full bg-white border border-gray-200 py-3 rounded-lg focus:ring-2 focus:ring-[#AA60EA] outline-none">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4 text-[#AA60EA]" />
                    <SelectValue placeholder="Select a category" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg shadow-lg border-none">
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="hover:bg-[#CED5FF]/30 transition-colors duration-200"
                    >
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-10 w-10 text-[#AA60EA]" />
            </motion.div>
          </div>
        ) : (
          <motion.div 
            className="max-w-3xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredFaqs.length === 0 ? (
              <motion.div 
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center shadow-md"
              >
                <p className="text-gray-600 text-lg">No FAQs found matching your search criteria.</p>
              </motion.div>
            ) : (
              filteredFaqs.map((faq) => (
                <motion.div
                  key={faq._id}
                  variants={itemVariants}
                >
                  <div
                    className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md transition-all duration-300 border-l-4 ${
                      openFaq === faq._id ? "border-l-[#AA60EA] shadow-lg shadow-[#AA60EA]/10" : "border-l-transparent hover:border-l-[#CED5FF]"
                    }`}
                  >
                    <div
                      className="p-5 cursor-pointer"
                      onClick={() => toggleFaq(faq._id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="pr-8">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#CED5FF]/40 text-[#AA60EA] mb-2">
                            {faq.category}
                          </span>
                          <h3 className="font-poppins text-lg font-semibold text-gray-800">
                            {faq.question}
                          </h3>
                        </div>
                        <div className={`rounded-full p-2 transition-colors duration-300 ${
                          openFaq === faq._id ? "bg-[#AA60EA]/10 text-[#AA60EA]" : "bg-gray-100 text-gray-400"
                        }`}>
                          {openFaq === faq._id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {openFaq === faq._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden border-t border-gray-100"
                        >
                          <div className="p-5 pt-3">
                            <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
                              {faq.answer
                                .split('\n')
                                .filter(line => line.trim() !== '')
                                .map((line, idx) => (
                                  <li key={idx} className="text-gray-700">
                                    {line.replace(/^- /, '')}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FAQ;