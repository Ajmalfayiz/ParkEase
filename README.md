live hosting link using render and netlify:https://parkeasely.netlify.app/
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
