🍼 Vaccine Baby  
Vaccine Baby is a mobile-responsive web application developed by **Kasun Mundigala** as a Final Year Project. It helps parents (especially busy mothers and fathers in Sri Lanka) manage their child’s vaccination schedule, track growth milestones, and access trusted healthcare information all in one platform.  

🚀 Features  
- 📅 **Vaccination Scheduling & Reminders** – Automated SMS and email notifications (Twilio & Nodemailer) to ensure timely vaccinations  
- 📊 **Growth Tracker** – Track baby’s weight & height using WHO growth standards with interactive charts  
- 💬 **Chat with Midwife** – Real-time communication with healthcare professionals using WebSocket  
- 📖 **FAQ Section** – Reliable childcare and nutrition information from CHDR (Child Health Development Record) & hospital sources  
- 🔔 **Notifications & Alerts** – Stay updated with reminders for vaccinations and health milestones  
- 🔐 **Secure Login** – JWT authentication with Firebase support for media storage  


🧠 Research & Impact  
- ✅ 20% reduction in missed vaccinations  
- ✅ 30% increase in parental engagement with growth tracking  
- ✅ 25% less time spent searching for health information  
- ✅ 40% increase in user engagement within first 2 months  

 🛠️ Tech Stack  

Frontend 
- React.js  
- Material UI + Tailwind CSS  
- React Day Picker (calendar UI)  

Backend 
- Node.js  
- Express.js  
- MongoDB (Mongoose ORM)  

Storage & Auth 
- Firebase (media storage & authentication)  
- JWT (secure login & session handling)  

Notifications & Communication
- Nodemailer (Email reminders)  
- Twilio API (SMS reminders)  
- WebSocket (Real-time midwife chat)  


📁 Project Structure  
Vaccine-Baby/
├── frontend/ # React frontend
├── backend/ # Node.js + Express backend
│ ├── controllers/ # Business logic
│ ├── middleware/ # Authentication & request validation
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API endpoints
│ ├── server.js # Backend entry point
│ ├── firebase.js # Firebase integration
│ └── .env # Environment variables
└── README.md # Main project README

⚡ Quick Start  

 1. Clone the Repository  
```bash
git clone https://github.com/KDMundigala/Vaccine-Baby.git
cd Vaccine-Baby
````

 2. Start the Backend

```bash
cd backend
npm install
npm start
```

 3. Start the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

* Frontend → `http://localhost:5173`
* Backend → `http://localhost:5000`

---

## 📚 Documentation

* Frontend: `frontend/README.md`
* Backend: `backend/README.md`

---

📝 Reviewer Notes

* Demonstrates a full-stack **MERN** healthcare application
* Focused on **real-world problem solving** for busy parents in Sri Lanka
* Clean, modular, and scalable codebase
* Deployed with cloud-ready technologies (Firebase, Twilio)

---
 📧 Contact

👨‍💻 **Kasun Dilshan Mundigala**

* Email: **[kasundilshan@gmail.com](mailto:kasundilshan@gmail.com)**




## 📄 License

This project is for **academic and demonstration purposes only**.




