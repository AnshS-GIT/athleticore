# 🏋️‍♂️ AthletiCore

> **Live Hosted Project:** [https://athleticore01.vercel.app](https://athleticore01.vercel.app)

AthletiCore is a full-stack web application designed to track user moods and provide personalized rule-based recommendations for activities, workouts, and music. Built with a focus on clean architecture, the platform helps users maintain self-awareness while promoting physical and mental well-being through contextual suggestions.

---

## 🌟 Key Features

- **🔐 Secure Authentication:** JWT-based user login and registration with hashed (bcrypt) passwords.
- **😊 Mood Tracking:** Visual emoji-based mood selector with optional journaling notes.
- **🎯 Smart Recommendations:** Contextual activity, workout, and music suggestions based on your logged mood.
- **🤖 Interactive Chatbot:** A universally accessible, floating AI assistant that detects mood keywords and serves recommendations conversationally.
- **📊 Mood History:** A chronological dashboard detailing your past emotional states and journal logs.
- **🎨 Modern UI/UX:** Responsive, dark-themed "glassmorphism" design built entirely from scratch with vanilla CSS.

---

## 🛠️ Technology Stack

**Frontend:**
- React.js (Vite)
- Axios
- Vanilla CSS
- Hosted on Vercel

**Backend:**
- Node.js & Express.js
- MongoDB (Mongoose ODM)
- JSON Web Tokens (JWT)
- Hosted on Render

## 🏗️ Architecture, Design Patterns & OOP Principles

AthletiCore was built using strict software engineering methodologies to ensure scalability, maintainability, and clean code.

### 1. Object-Oriented Programming (OOP) Principles
- **Encapsulation:** Database operations are completely hidden within the `Repository` classes. The `Services` and `Controllers` do not know how data is stored or retrieved, they only call methods like `findByEmail()` or `create()`.
- **Abstraction:** Complex business logic (like recommendation filtering and password hashing) is abstracted away in the `Service` classes. The `Controllers` remain "thin" and only handle HTTP requests and JSON responses.
- **Separation of Concerns (SoC):** Every file has a single responsibility. Routes handle URLs, Middleware handles auth/errors, Controllers parse requests, Services apply rules, and Repositories talk to MongoDB.

### 2. Layered Architecture
The backend data flows strictly in one direction through defined layers:
`Router ➔ Controller ➔ Service ➔ Repository ➔ MongoDB Model`
This strict layering ensures that business logic is never mixed with HTTP transport logic or database queries.

### 3. Design Patterns Implemented
- **Repository Pattern:** Centralizes all database interaction into dedicated files (e.g., `UserRepository`). This decouples the application logic from the Mongoose ODM.
- **Service Layer Pattern:** Defines an application boundary with a set of available operations (e.g., `AuthService`, `MoodService`), encapsulating the application's business logic.
- **Singleton Pattern:** All `Services` and `Repositories` are instantiated once and exported as singletons. This prevents memory leaks and ensures global state consistency across the Node.js application.
- **Middleware Pattern:** Cross-cutting concerns like JWT authentication validation and global error handling intercept requests seamlessly before they reach the core controllers.

---

## 📂 Documentation (SESD Deliverables)
All required system design and architectural documentation can be found in the root directory:

1. [`idea.md`](./idea.md) - Project overview, problem statement, and scope.
2. [`useCaseDiagram.md`](./useCaseDiagram.md) - Actor interactions and use case flows.
3. [`sequenceDiagram.md`](./sequenceDiagram.md) - End-to-end data flow (Frontend → Backend → DB).
4. [`classDiagram.md`](./classDiagram.md) - OOP architecture showing Models, Services, and Repositories.
5. [`ErDiagram.md`](./ErDiagram.md) - Database schema and relationship models.

---

## 💻 Local Setup & Installation

If you wish to run AthletiCore locally, follow these steps:

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas cluster (or local instance)

### 1. Clone the Repository
```bash
git clone https://github.com/AnshS-GIT/athleticore.git
cd athleticore
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```
Start the backend server:
```bash
npm start
# Server running in development mode on port 5005
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5005
```
Start the frontend development server:
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser to view the application!

---

> **Note on Cross-Origin Resource Sharing (CORS):** The backend is explicitly configured to handle standard CORS preflight requests from the deployed Vercel domain to ensure smooth HTTP communications in production.