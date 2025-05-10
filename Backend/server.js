const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const vaccineRoutes = require('./routes/vaccineRoutes');
const chatRoutes = require('./routes/chatRoutes');
const healthRoutes = require('./routes/healthRoutes');
const faqRoutes = require('./routes/faqRoutes');
const babyRoutes = require('./routes/babyRoutes');
const { sendEmail } = require('./middleware/mail_setup');
const { notifyMail } = require('./middleware/mail_scheduler');
// const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
const clients = new Map();

wss.on('connection', (ws, req) => {
  const userId = req.url.split('?userId=')[1];
  clients.set(userId, ws);

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      const { receiverId, text, senderId } = data;

      // Save message to database
      const Message = require('./models/Message');
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        text
      });
      await newMessage.save();

      // Send message to receiver if they're connected
      const receiverWs = clients.get(receiverId);
      if (receiverWs) {
        receiverWs.send(JSON.stringify({
          type: 'message',
          data: {
            sender: senderId,
            text,
            timestamp: new Date()
          }
        }));
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(userId);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vaccines', vaccineRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/babies', babyRoutes);
// app.use('/api/auth', authRoutes);

// MongoDB Connection
const mongoURI = "mongodb+srv://BabyDB:BabyWorld@babydb.56oasq6.mongodb.net/?retryWrites=true&w=majority&appName=BabyDB";

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Test email sending
  const testEmail = async () => {
    try {
      await sendEmail('kasunmundigala180@gmail.com', 'Test Email from Vaccine Baby', {
        name: 'Kasun',
        message: 'This is a test email from Vaccine Baby. If you receive this, the email functionality is working correctly!',
        date: new Date().toLocaleDateString(),
        buttonText: 'Visit Website',
        buttonUrl: 'http://localhost:8081'
      });
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Failed to send test email:', error);
    }
  };

  // Call test email function
  testEmail();

  // Call notify mail function
  notifyMail()
    .then(() => console.log('Notification emails sent successfully'))
    .catch(error => console.error('Failed to send notification emails:', error));
});
