# ParkEase 🚗🅿️

[![Netlify Status](https://api.netlify.com/api/v1/badges/netlify-badge.svg)](https://parkeasely.netlify.app/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Live Demo:** [https://parkeasely.netlify.app/](https://parkeasely.netlify.app/)

ParkEase is a modern, responsive parking lot finder web application designed to help drivers locate, view, and reserve available parking spots in real time.

---

## 🌐 Live Deployment

| Service | Platform | Link |
| :--- | :--- | :--- |
| **Frontend UI** | Netlify | [parkeasely.netlify.app](https://parkeasely.netlify.app/) |
| **Backend API** | Render | `https://<your-render-service-name>.onrender.com` |

---
# ParkEase 🚗🅿️

ParkEase is a modern, responsive parking lot finder web application designed to help drivers locate, view, and reserve available parking spots in real time. Featuring live geolocation detection, interactive spot listings, and a seamless booking flow, ParkEase removes the hassle of finding parking in busy areas.

---

## Features

- **Live Location Detection**: Automatically detects your current location via the Geolocation API to find the nearest parking lots.
- **Interactive Spot Listings**: View available parking spaces, pricing per hour, lot amenities, and operational hours.
- **Search & Filter**: Search parking spots by city, neighborhood, or landmark, with filters for vehicle type, covered parking, and EV charging.
- **Responsive UI**: Fully optimized layout for mobile, tablet, and desktop screens.
- **RESTful API Backend**: Scalable Express server handling authentication, parking inventory, and reservations.
- **Database Integration**: MongoDB database using Mongoose schemas for flexible parking lot and reservation management.

---

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS (or Bootstrap)
- Lucide React / React Icons
- Axios / Fetch API

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication
- dotenv & cors

---

## Project Structure

```text
parkease/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, SpotCard, MapView)
│   │   ├── pages/          # Home, Search, SpotDetails, Booking
│   │   ├── services/       # API call handlers
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Backend Node.js / Express application
│   ├── config/             # DB connection (db.js)
│   ├── controllers/        # Route controllers (parkingController, userController)
│   ├── models/             # Mongoose schemas (ParkingLot, Booking, User)
│   ├── routes/             # API routes
│   ├── server.js           # Server entry point
│   └── package.json
│
└── README.md
