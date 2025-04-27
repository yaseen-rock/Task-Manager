# 📋 Task Management App

A full-stack **Task Management** application where users can **Register**, **Login**, and **Manage their Tasks** efficiently.  
Built with **Separate Frontend and Backend**, and deployed to **Vercel** (Frontend) and your backend hosting (e.g., Vercel/Render).

---

## 🚀 Tech Stack

| Frontend | Backend |
|:---|:---|
| React.js + Vite | Node.js + Express |
| Material-UI (MUI) | MongoDB (Mongoose) |
| Axios | JWT Authentication |
| React Router | CORS |
| Dark/Light Theme Switch | REST API |

---

## 🛠️ Features

### 🧑‍💻 Authentication
- **Login / Register Pages** built into a **Sliding UI** — easily switch between login and register by sliding the form.
- **JWT Token-based Authentication** — securely stores token in localStorage.

---

### 🗂️ Dashboard
- **Add New Task**: Create tasks with title and description.
- **Edit Task**: Update any existing task easily.
- **Delete Task**: Remove tasks you no longer need.
- **View All Tasks**: See your tasks in an organized list or card view.

---

### 🎨 UI Features
- **Material-UI (MUI)** based modern, responsive design.
- **Dark Mode / Light Mode Switch**: Toggle between dark and light themes with a smooth transition.
- **Fully Responsive**: Works perfectly on Desktop, Tablet, and Mobile.

---

## 📁 Folder Structure

```
/backend
  ├── server.js
  ├── /models
  ├── /routes
  ├── /controllers
  ├── /middlewares
  ├── /config
  └── .env

/frontend
  ├── /src
    ├── /components
    ├── /pages
    ├── /services
    ├── /themes
    └── App.jsx
  ├── .env
  └── vite.config.js
```

---

## 🔐 Environment Variables

### Backend (`/backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Frontend (`/frontend/.env`)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

(Frontend uses `VITE_API_URL` to call APIs.)

---

## 🖼️ Screenshots

### 🔥 Landing Page (Login / Register Sliding)

![Screenshot (199)](https://github.com/user-attachments/assets/1d251b20-a653-4feb-9231-530fcc4127b0)

![Screenshot (201)](https://github.com/user-attachments/assets/c4152462-4053-49d3-8261-26c412bf8e75)


---

### 📋 Dashboard (Add / Edit / Delete Tasks)

> (Add your screenshot here)

---

### 🌗 Light and Dark Theme Toggle

> (Add your screenshot here)

---

## 🧩 Setup Instructions

### 1. Clone the Repositories
```bash
git clone https://github.com/yourusername/task-management-frontend.git
git clone https://github.com/yourusername/task-management-backend.git
```

---

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

---

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

---

### 4. Setup Environment Files
Create `.env` files in both frontend and backend (as shown above).

---

### 5. Run Locally

**Start Backend**
```bash
cd backend
npm run dev
```

**Start Frontend**
```bash
cd frontend
npm run dev
```

---

## 🌎 Deployment

### 📦 Backend Deployment
- Host backend on Render / Railway / Vercel / Any VPS.
- Make sure your MongoDB URI is cloud-based (e.g., MongoDB Atlas).

### 🌐 Frontend Deployment
- Host frontend on **Vercel**.
- Set the frontend `.env` on Vercel with the live backend URL.

---

## 📢 Important Notes
- Make sure CORS is enabled in your backend.
- Always store JWT Token securely (currently saved in localStorage for demo).
- Secure your API and sensitive routes properly for production.

---

## 👨‍💻 Author

- **Your Name** — Yaseen

---

## ⭐️ If you like this project, please star it on GitHub and consider contributing!

---

# 🎯 Future Improvements
- Add User Profile Section
- Task Filtering (Completed / Pending)
- Push Notifications for Deadlines
- Drag-and-Drop Task Reordering
