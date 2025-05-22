# React + Vite + ESLint

# 🧠 FindJobs Frontend

An AI-powered job matching platform that helps users discover jobs tailored to their profile. This repository contains the **React.js frontend** of the application.

## Features

- User Authentication (Login, Signup)
- Profile creation & editing
- AI-powered job recommendations using OpenAI
- Dynamic job listings fetched from backend
- Responsive UI with Tailwind CSS
- Smooth animations via Framer Motion
- JWT-based auth token storage
- Modular component structure

---

## 📁 Project Structure

    src/
    ├── components/ 
    │ ├── JobList.jsx
    │ ├── Recommendations.jsx
    ├── pages/ 
    │ ├── Home.jsx
    │ ├── Login.jsx
    │ ├── Signup.jsx
    │ ├── Profile.jsx
    ├── App.jsx
    ├── main.jsx
    ├── assets/
    └── utils/


---

## 🛠️ Technologies Used

| Tech             | Usage                  |
|------------------|------------------------|
| React 19         | UI rendering           |
| React Router DOM | Routing                |
| Axios            | API requests           |
| Tailwind CSS 4   | Styling                |
| Framer Motion    | Animations             |
| React Toastify   | Notifications          |
| Vite             | Development build tool |
| Lucide React     | Icon library           |

---
.env (example)
    VITE_API_BASE_URL=https://your-backend-api.com

---

## Authentication Flow
Token is stored in localStorage upon login or signup.
Token is attached in headers for protected routes:

- Authorization: Bearer <token>

---

## AI Recommendations
Flow:
- User clicks Find My Matches on the home page.
- Frontend sends a POST request to /api/ai/recommendations with JWT.
- Backend formats prompt using user profile → calls OpenAI API.
- Recommended jobs are returned and rendered as animated cards.

## Todos
- Add profile editing UI
- Improve accessibility & SEO
- Add filters to job listings
- Write unit tests with Vitest

## Deployed in Vercel