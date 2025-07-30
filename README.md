# 🎓 Tutoring Management System

A full-stack application developed using **React**, **TailwindCSS**, and **Vite** on the frontend, and **Laravel 11** with **Sanctum** on the backend. The platform supports management of tutoring groups, students (tutorados), attendance tracking, academic cycles, and student support appointments, with role-based functionality for tutors and students.

---

## 🚀 Tech Stack

### Frontend
- ⚛️ React
- 🎨 TailwindCSS v4
- ⚡ Vite
- 📡 Axios
- 🧭 React Router
- ✨ Lucide Icons
- 🧾 Formik + Yup

### Backend
- 🧬 Laravel 11
- 🔐 Laravel Sanctum
- 🗃️ Eloquent ORM
- 🐘 MySQL / PostgreSQL
- 🌐 RESTful API

---

## 📁 API Endpoints Overview

### 📘 Groups
```http
GET    /api/grupos
POST   /api/grupos
PUT    /api/grupos/{id}
DELETE /api/grupos/{id}
```

### 👨‍🎓 Students (Tutorados)
```http
GET    /api/tutorados
GET    /api/grupos/{idGrupo}/tutorados
POST   /api/tutorados
PUT    /api/tutorados/{id}
DELETE /api/tutorados/{id}
```

### 📅 Attendance
```http
GET    /api/asistencias
GET    /api/asistencias/{idCuentaTutorado}
GET    /api/asistencias/grupo/{idGrupo}
GET    /api/asistencias-fechas
POST   /api/asistencias
DELETE /api/asistencias/{idCuentaTutorado}/{fecha}
```

### 📚 Academic Cycles
```http
GET    /api/ciclos-escolares
POST   /api/ciclos-escolares
PUT    /api/ciclos-escolares/{id}
DELETE /api/ciclos-escolares/{id}
```

### 👨‍🏫 Tutors
```http
GET    /api/tutores
GET    /api/tutores/curp/{curp}
GET    /api/tutores/{curp}/grupos
GET    /api/user  // (Authenticated user with group info)
```

---

## 🔍 Core Features

- ✅ Role-based access (Tutor / Student)
- 📆 Weekly attendance management
- 📋 Dynamic profile view and editing
- 🧠 Special needs tracking (Psychology & Nursing)
- 📊 Group reports with attendance % calculations
- 🧩 Activity tracking (SWOT, Life Map, Vocational Test)

---

## 🧪 Validation & Testing

- ✅ Form validation via `Yup` (Frontend)
- ✅ FormRequest validation (Laravel)
- ✅ PHPUnit testing (Basic coverage)

---

## ⚙️ Installation

### Backend (Laravel)
```bash
git clone https://gitlab.com/your-username/project.git
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 💡 Notes

- Use **Postman** for testing endpoints.
- Data mocking is used temporarily in some frontend components.
- **PostgreSQL** is recommended for production deployment.
- Designed to work with **Apache** for final deployment.

---

## 👥 Contributors

- 👨‍💻 Oscar Kuricaveri Zamudio Damian (Fullstack Developer)
- 👨‍💻 Eladio Martines Ambris (Backend Developer)

---