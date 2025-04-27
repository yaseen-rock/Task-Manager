# 📋 Task Management App

A full-stack **Task Management** application where users can **Register**, **Login**, and **Manage their Tasks** efficiently.  
Built with **Separate Frontend and Backend**.

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

![Screenshot (202)](https://github.com/user-attachments/assets/52c60101-0dcd-4dbf-b7b5-a054f05e2f53)

![Screenshot (203)](https://github.com/user-attachments/assets/6c6332fe-84e3-4547-830e-9d9932a20853)

![Screenshot (204)](https://github.com/user-attachments/assets/bfc83989-645b-4969-ac4f-0961c0082495)

![Screenshot (205)](https://github.com/user-attachments/assets/922e9577-fecb-4d71-b875-8af2b47be07f)

---

### 🌗 Light and Dark Theme Toggle

![Screenshot (207)](https://github.com/user-attachments/assets/3db7797d-5820-4639-bfc6-eef112304594)

![Screenshot (208)](https://github.com/user-attachments/assets/8d227f42-9848-4e09-a299-3845232006c0)

![Screenshot (209)](https://github.com/user-attachments/assets/eeb8596f-8eac-4e46-b6c5-a0c7e82eaa64)


---

## 🧩 Setup Instructions

### 1. Clone the Repositories
```bash
git clone https://github.com/yaseen-rock/Task-Manager.git
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
