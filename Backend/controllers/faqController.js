
const FAQ = require('../models/FAQ');

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({});
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get FAQs by category
// @route   GET /api/faqs/category/:category
// @access  Public
const getFAQsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const faqs = await FAQ.find({ category });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new FAQ (admin only)
// @route   POST /api/faqs
// @access  Private/Admin
const createFAQ = async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    
    if (!question || !answer || !category) {
      return res.status(400).json({ message: 'Please provide question, answer and category' });
    }
    
    const faq = new FAQ({
      question,
      answer,
      category
    });
    
    const createdFAQ = await faq.save();
    res.status(201).json(createdFAQ);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an FAQ (admin only)
// @route   PUT /api/faqs/:id
// @access  Private/Admin
const updateFAQ = async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    
    const faq = await FAQ.findById(req.params.id);
    
    if (faq) {
      faq.question = question || faq.question;
      faq.answer = answer || faq.answer;
      faq.category = category || faq.category;
      
      const updatedFAQ = await faq.save();
      res.json(updatedFAQ);
    } else {
      res.status(404).json({ message: 'FAQ not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an FAQ (admin only)
// @route   DELETE /api/faqs/:id
// @access  Private/Admin
const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    
    if (faq) {
      await faq.deleteOne();
      res.json({ message: 'FAQ removed' });
    } else {
      res.status(404).json({ message: 'FAQ not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFAQs,
  getFAQsByCategory,
  createFAQ,
  updateFAQ,
  deleteFAQ
};
