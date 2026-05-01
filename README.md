#  Team Task Manager

A full-stack task management web application where users can create projects, assign tasks, and track progress.

---

##  Features

- User Authentication (Signup / Login)
- Create Projects
- Create Tasks under Projects
- Assign Tasks to team members
- Update Task Status (Pending / Completed)
- Add Comments to Tasks
- Delete Tasks and Projects

---

## 🛠 Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (Atlas)

---

## 📁 Project Structure

```
Team_Task_Manager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── index.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── script.js
│   ├── style.css
│
├── .gitignore
├── README.md
```

##  How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/Duyesh/Team-Task-Manager.git
cd Team-Task-Manager
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the server:

```bash
node server.js
```

### 3. Run Frontend

Go to the frontend folder and open:

```bash
index.html
```

You can:
- Double-click it  
- OR use Live Server in VS Code  

---

###  Application Flow

- Signup a new user  
- Login  
- Create a project  
- Add tasks under project  
- Update status / add comments / delete  