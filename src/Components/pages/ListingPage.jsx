

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import {
    MapPin,
    Star,
    Zap,
    ShieldCheck,
    Clock,
    Car,
    Filter,
    Navigation,
    CheckCircle2,
    Search,
    SlidersHorizontal,
    ChevronRight,
} from "lucide-react";


const PARKING_LOTS = [
    {
        id: "lot-1",
        name: "Mission Bay Premier Garage",
        type: "Covered Multi-Level Garage",
        address: "580 4th Street, San Francisco",
        distance: "0.2 miles away (3 min walk)",
        hourlyRate: 6.0,
        rating: 4.8,
        reviewCount: 342,
        totalSpots: 120,
        availableSpots: 34,
        hasEv: true,
        isCovered: true,
        hasSecurity: true,
        valet: false,
        image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80",
        tags: ["Instant QR Entry", "CCTV Monitored", "Tesla Supercharger"],
    },
    {
        id: "lot-2",
        name: "Downtown Financial Plaza Lot",
        type: "Underground Secure Facility",
        address: "201 California St, San Francisco",
        distance: "0.5 miles away (7 min walk)",
        hourlyRate: 8.5,
        rating: 4.9,
        reviewCount: 512,
        totalSpots: 80,
        availableSpots: 8,
        hasEv: true,
        isCovered: true,
        hasSecurity: true,
        valet: true,
        image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80",
        tags: ["Valet Available", "Heated", "24/7 Guard"],
    },
    {
        id: "lot-3",
        name: "SOMA Open-Air Express Lot",
        type: "Paved Surface Lot",
        address: "850 Folsom St, San Francisco",
        distance: "0.8 miles away (11 min walk)",
        hourlyRate: 4.0,
        rating: 4.3,
        reviewCount: 189,
        totalSpots: 50,
        availableSpots: 22,
        hasEv: false,
        isCovered: false,
        hasSecurity: true,
        valet: false,
        image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80",
        tags: ["Budget Friendly", "Wide Bays", "Easy In/Out"],
    },
    {
        id: "lot-4",
        name: "Embarcadero Pier Deck",
        type: "Rooftop & Covered Bays",
        address: "The Embarcadero & Green St",
        distance: "1.1 miles away (15 min walk)",
        hourlyRate: 7.0,
        rating: 4.7,
        reviewCount: 278,
        totalSpots: 150,
        availableSpots: 65,
        hasEv: true,
        isCovered: true,
        hasSecurity: true,
        valet: false,
        image: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=600&q=80",
        tags: ["Waterfront View", "Level 2 EV", "Direct Transit Access"],
    },
];

const ParkingSpotDirectory = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterEvOnly, setFilterEvOnly] = useState(false);
    const [filterCoveredOnly, setFilterCoveredOnly] = useState(false);
    const [sortBy, setSortBy] = useState("distance");
    const [selectedLot, setSelectedLot] = useState(PARKING_LOTS[0].id);

    // Filtering Logic
    const filteredLots = PARKING_LOTS.filter((lot) => {
        const matchesSearch =
            lot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lot.address.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEv = filterEvOnly ? lot.hasEv : true;
        const matchesCovered = filterCoveredOnly ? lot.isCovered : true;
        return matchesSearch && matchesEv && matchesCovered;
    }).sort((a, b) => {
        if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
        if (sortBy === "price-high") return b.hourlyRate - a.hourlyRate;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "spots") return b.availableSpots - a.availableSpots;
        return 0; // Default distance
    });

    return (

        <>
            {/* <Header /> */}
            <div className="min-h-screen  bg-slate-950 text-slate-100 flex flex-col">
                {/* Search & Top Controls */}
                <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-4">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

                        {/* Brand & Search Bar */}
                        <div className="flex items-center gap-4 flex-1">
                            {/* <div className="flex items-center gap-2">
                                
                            </div> */}

                            <div className="relative flex-1 max-w-lg">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search neighborhood, street, or venue..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
                                />
                            </div>
                        </div>

                        {/* Quick Filter Controls */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                            <button
                                onClick={() => setFilterEvOnly(!filterEvOnly)}
                                className={`px-3 py-2 rounded-lg border font-medium transition flex items-center gap-1.5 ${filterEvOnly
                                    ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                                    }`}
                            >
                                <Zap className="w-3.5 h-3.5" />
                                EV Charging
                            </button>

                            <button
                                onClick={() => setFilterCoveredOnly(!filterCoveredOnly)}
                                className={`px-3 py-2 rounded-lg border font-medium transition flex items-center gap-1.5 ${filterCoveredOnly
                                    ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                                    }`}
                            >
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Covered Only
                            </button>

                            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
                                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    aria-label="Sort parking spots"
                                    className="bg-slate-950 text-slate-300 text-xs border border-slate-800 rounded-lg px-2.5 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
                                >
                                    <option value="distance">Nearest Distance</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="spots">Most Available Spots</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </header>

                {/* Main Responsive Layout */}
                <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:px-6 lg:px-8 py-6">

                    {/* Results Bar */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                            Available Spots ({filteredLots.length})
                        </h2>
                        <span className="text-xs text-slate-500">Live inventory updated real-time</span>
                    </div>

                    {/* Listings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredLots.map((lot) => {
                            const isLowInventory = lot.availableSpots < 10;

                            return (
                                <article
                                    key={lot.id}
                                    onClick={() => setSelectedLot(lot.id)}
                                    className={`group bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between ${selectedLot === lot.id
                                        ? "border-blue-500 shadow-xl shadow-blue-950/50 ring-1 ring-blue-500"
                                        : "border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90"
                                        }`}
                                >
                                    {/* Visual Thumbnail */}
                                    <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                                        <img
                                            src={lot.image}
                                            alt={lot.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0  from-slate-950 via-transparent to-transparent opacity-80" />

                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 flex gap-1.5">
                                            {lot.hasEv && (
                                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1">
                                                    <Zap className="w-3 h-3" /> EV
                                                </span>
                                            )}
                                            {lot.isCovered && (
                                                <span className="px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-slate-300 border border-slate-700/60 text-[11px] font-medium">
                                                    Covered
                                                </span>
                                            )}
                                        </div>

                                        {/* Rating Tag */}
                                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-bold text-amber-400 flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                                            <span>{lot.rating}</span>
                                            <span className="text-[10px] text-slate-400 font-normal">({lot.reviewCount})</span>
                                        </div>

                                        {/* Live Capacity Indicator */}
                                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                                            <span className="text-slate-300 font-medium text-[11px]">{lot.type}</span>
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${isLowInventory
                                                    ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                                                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                                    }`}
                                            >
                                                {lot.availableSpots} spots left
                                            </span>
                                        </div>
                                    </div>

                                    {/* Lot Details Body */}
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {lot.name}
                                            </h3>

                                            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                                                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                                <span className="truncate">{lot.address}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                                                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                                <span>{lot.distance}</span>
                                            </div>

                                            {/* Tag Pills */}
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {lot.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Footer & Reserve Button */}
                                        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                                            <div>
                                                <span className="text-xs text-slate-400">Starts at</span>
                                                <div className="text-lg font-extrabold text-white">
                                                    ${lot.hourlyRate.toFixed(2)}
                                                    <span className="text-xs font-normal text-slate-400"> / hr</span>
                                                </div>
                                            </div>

                                           
                                            <div className='hidden lg:flex items-center gap-5'>
                                              
                                                <Link to='/details' className='btn-1 text-white px-7  py-3 rounded-full shadow-md text-sm '>View </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Empty Search State */}
                    {filteredLots.length === 0 && (
                        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/80 mt-4">
                            <Car className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                            <h3 className="text-base font-semibold text-white">No parking spots match your filters</h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                                Try removing some filters like EV charging or search for a broader location.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setFilterEvOnly(false);
                                    setFilterCoveredOnly(false);
                                }}
                                className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg transition"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}

                </main>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default ParkingSpotDirectory