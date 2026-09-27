<div align="center">

# 🚀 Ameer Suhail — Developer Portfolio & CMS

  <p align="center">
    <strong>A high-performance, full-stack developer portfolio and dynamic content management system built with React 19, Node.js, Express, MongoDB, and Tailwind CSS v4.</strong>
  </p>

  <p align="center">
    <a href="https://ameersuhaildev.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/🌐_Live_Demo-ameersuhaildev.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </p>

</div>

---

## 🌟 Overview

**Ameer Suhail Portfolio** is a production-grade, interactive web application crafted for modern web performance, fluid motion design, and seamless portfolio administration. It blends cutting-edge web visual technologies—including **GSAP ScrollTrigger**, **Lenis Smooth Scroll**, **Framer Motion**, and a custom **System Preloader**—with a complete backend REST API and protected Admin Management Portal.

> [!TIP]
> ⚡ **Performance Engineered**: Benchmarked and optimized with **87.6% WebP asset compression**, **82.9% main JS entry chunk reduction** via route code-splitting, compound MongoDB database indexing, and Mongoose connection pooling.

---

## ✨ Key Features

### 🎨 Frontend & Experience Design
- **System Preloader & Shutter Reveal**: Custom dual-shutter animation system providing smooth initial load state transitions.
- **Fluid Motion Engine**: Smooth inertial scrolling powered by **Lenis** combined with **GSAP ScrollTrigger** timeline animations.
- **Interactive Project Showcase**: Dynamic portfolio grid with category filtering, lazy-loaded webp preview media, and modal detail views.
- **Custom Interactive Cursor**: Micro-interaction cursor dot & follower canvas responding to interactive DOM elements.
- **Dark / Light Theme System**: Integrated React Context theme provider with persistent UI styling.
- **Real-Time Analytics & Feedback**: Integrated **Vercel Analytics** and **React Toastify** notification system.

### 🔐 Admin Management Portal (`/admin`)
- **JWT Authenticated Portal**: Secure dashboard access for project, skill, and message control.
- **Project Management**: Create, update, or remove portfolio projects with direct image uploads via **Cloudinary**.
- **Category & Skill Management**: Dynamic skill matrix and technology category assignment.
- **Inbox & Contact Feed**: Real-time management of contact form submissions from prospective clients and recruiters.

### ⚡ Performance & Backend Engineering
- **Mongoose Connection Pooling**: Configured `maxPoolSize: 50` for multi-tenant concurrent request resilience.
- **Compound Database Indexing**: Multi-field indexes (`{ category: 1, createdAt: -1 }`) ensuring sub-100ms API query times.
- **Edge HTTP Caching**: Express middleware applying `Cache-Control: public, max-age=300, stale-while-revalidate=3600`.
- **Query Limit Capping**: Strict limit parameter sanitization preventing database resource exhaustion.

---

## 🛠️ Tech Stack

| Domain | Technologies & Libraries |
| :--- | :--- |
| **Frontend Core** | React 19, React Router v7, Vite 7, Context API |
| **Styling & Motion** | Tailwind CSS v4, GSAP (ScrollTrigger), Framer Motion, Lenis Scroll, AOS |
| **Backend API** | Node.js, Express 5, CORS, Cookie-Parser, Multer |
| **Database & Cloud** | MongoDB, Mongoose ORM, Cloudinary SDK |
| **Authentication** | JSON Web Tokens (JWT), HTTP-only Cookies |
| **Analytics & Tools** | Vercel Analytics, React Icons, React Type Animation, ESLint |

---

## ⚡ Performance Audit Benchmarks

| Metric / Asset | Pre-Optimization | Post-Optimization | Improvement |
| :--- | :--- | :--- | :--- |
| **Image Asset Payload** | 7.82 MB (PNG / JPG) | 0.97 MB (WebP) | **87.6% Reduction** 📉 |
| **Main JS Entry Bundle** | 868.78 kB | 148.45 kB | **82.9% Reduction** ⚡ |
| **API Limit Caps** | Unbounded | Max 50 per request | **Guaranteed SLA** 🛡️ |
| **DB Indexing** | Full Collection Scans | Compound Indexing | **Sub-100ms Queries** 🚀 |
| **Connection Handling** | Default Pool (10) | `maxPoolSize: 50` | **High Concurrency** 🔌 |

---

## 📁 Repository Structure

```text
ameersuhaildev/
├── client/                     # Frontend Application (React 19 + Vite)
│   ├── public/                 # Static assets & optimized WebP images
│   ├── src/
│   │   ├── assets/             # Images, icons, and static graphics
│   │   ├── components/         # Reusable UI components
│   │   │   ├── About Me/       # About page review & skill components
│   │   │   ├── Home/           # Hero section & featured components
│   │   │   ├── Projects/       # Project cards, grids, and filters
│   │   │   ├── common/         # Preloader shutter & system status
│   │   │   ├── effects/        # GSAP ScrollFloat & DecayCard animations
│   │   │   └── utils/          # Smooth scroll & theme wrappers
│   │   ├── context/            # ThemeContext state provider
│   │   ├── layout/             # Main layout & Admin layout templates
│   │   ├── pages/              # Route pages (Home, About, Projects, Admin)
│   │   ├── App.jsx             # React Router v7 router setup & lazy routes
│   │   └── main.jsx            # React root entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend REST API (Node.js + Express)
│   ├── controllers/            # Request handlers (Projects, Skills, Auth)
│   ├── dbConfig/               # Mongoose DB connection pool setup
│   ├── models/                 # Mongoose schemas (Project, Category, Skill)
│   ├── routes/                 # Express API router definitions
│   ├── services/               # Cloudinary image upload configuration
│   ├── server.js               # Express application entry & middleware
│   └── package.json
│
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn**
- **MongoDB**: Local MongoDB instance or MongoDB Atlas cluster URI
- **Cloudinary Account**: For project image upload storage

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ameersuhail799/ameersuhaildev.git
cd ameersuhaildev
```

---

### 2️⃣ Backend Setup (`/server`)

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` root:
   ```env
   PORT=8000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio
   JWT_SECRET=your_super_secret_jwt_key
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend development server:
   ```bash
   npm run start
   ```
   > The server will start on `http://localhost:8000`

---

### 3️⃣ Frontend Setup (`/client`)

1. Navigate to the client directory in a new terminal:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` root (optional):
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. Launch the Vite dev server:
   ```bash
   npm run dev
   ```
   > Open `http://localhost:5173` in your browser.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/projects/featured` | Fetch featured projects (Supports `?limit=N`) | Public |
| `GET` | `/projects/all` | Fetch all portfolio projects with category filters | Public |
| `POST` | `/projects/add` | Create a new project with image upload | Protected Admin |
| `GET` | `/categories` | Retrieve project categories | Public |
| `GET` | `/skills` | Retrieve tech stack skills list | Public |
| `POST` | `/messages/send` | Submit a contact form message | Public |
| `GET` | `/messages/all` | View received client messages | Protected Admin |
| `POST` | `/admin/login` | Authenticate admin user & set HTTP-only JWT | Public |

---

## 🛡️ License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

## 👨‍💻 Author & Contact

**Ameer Suhail** — *Full-Stack Developer & AI/ML Engineer*

- **Website**: [ameersuhaildev.vercel.app](https://ameersuhaildev.vercel.app/)
- **GitHub**: [@Ameersuhail799](https://github.com/Ameersuhail799)
- **LinkedIn**: [Connect on LinkedIn](https://www.linkedin.com/in/ameersuhail)

---

<div align="center">
  <sub>Built with ❤️ using React 19, Tailwind CSS v4, Node.js, and MongoDB.</sub>
</div>
