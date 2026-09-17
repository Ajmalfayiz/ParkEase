

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    MapPin,
    Star,
    Zap,
    ShieldCheck,
    Car,
    Search,
    SlidersHorizontal,
    Navigation,
} from "lucide-react";

import API from "../api/axiosInstance";

const defaultImage =
    "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80";

const normalizeSpot = (spot) => {
    const exactLocation = spot.location || spot.address || spot.name || "Location unavailable";
    const categories = Array.isArray(spot.category)
        ? spot.category
        : spot.category
            ? [spot.category]
            : [];
    const categoryLabel = categories.join(", ");

    return {
        id: spot._id || spot.id,
        name: spot.name || "Parking Spot",
        type: categoryLabel || "Parking Spot",
        location: exactLocation,
        address: exactLocation,
        hourlyRate: Number(spot.price) || 0,
        rating: Number(spot.rating) || 4.5,
        reviewCount: Number(spot.reviewCount) || 0,
        totalSpots: Number(spot.stock) || 0,
        availableSpots: Number(spot.stock) || 0,
        hasEv: Boolean(spot.hasEv ?? false),
        isCovered: Boolean(spot.isCovered ?? false),
        hasSecurity: Boolean(spot.hasSecurity ?? true),
        valet: Boolean(spot.valet ?? false),
        image: spot.image || defaultImage,
        tags: Array.isArray(spot.tags)
            ? spot.tags
            : [categoryLabel || "Available now", "Flexible timing"],
    };
};

const ParkingSpotDirectory = () => {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterEvOnly, setFilterEvOnly] = useState(false);
    const [filterCoveredOnly, setFilterCoveredOnly] = useState(false);
    const [sortBy, setSortBy] = useState("rating");
    const [selectedLot, setSelectedLot] = useState(null);

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                setLoading(true);
                const response = await API.get("/spots");
                const spots = response?.data?.spots || [];
                const normalizedspots = spots.map(normalizeSpot);

                setSpots(normalizedspots);

                if (normalizedspots.length > 0) {
                    setSelectedLot(normalizedspots[0].id);
                }
            } catch (error) {
                console.error("Failed to load parking spots:", error);
                setSpots([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSpots();
    }, []);

    const filteredLots = useMemo(() => {
        return [...spots]
            .filter((lot) => {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    (lot.location || lot.address || lot.name).toLowerCase().includes(query) ||
                    (lot.name || "").toLowerCase().includes(query) ||
                    lot.type.toLowerCase().includes(query);
                const matchesEv = filterEvOnly ? lot.hasEv : true;
                const matchesCovered = filterCoveredOnly ? lot.isCovered : true;
                return matchesSearch && matchesEv && matchesCovered;
            })
            .sort((a, b) => {
                if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
                if (sortBy === "price-high") return b.hourlyRate - a.hourlyRate;
                if (sortBy === "rating") return b.rating - a.rating;
                if (sortBy === "spots") return b.availableSpots - a.availableSpots;
                return 0;
            });
    }, [spots, searchQuery, filterEvOnly, filterCoveredOnly, sortBy]);

    return (
        <>
            <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
                <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-4">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
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
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="spots">Most Available Spots</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                            Available Spots ({filteredLots.length})
                        </h2>
                        <span className="text-xs text-slate-500">Live inventory updated real-time</span>
                    </div>

                    {loading ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-300">
                            Loading parking spots...
                        </div>
                    ) : (
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
                                        <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                                            <img
                                                src={lot.image}
                                                alt={lot.location || lot.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 from-slate-950 via-transparent to-transparent opacity-80" />

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

                                            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-bold text-amber-400 flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                                <span>{lot.rating}</span>
                                                <span className="text-[10px] text-slate-400 font-normal">({lot.reviewCount})</span>
                                            </div>

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

                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {lot.name}
                                                </h3>

                                                <div className="mt-2 rounded-lg border border-slate-800 bg-slate-950/60 p-2">
                                                    <div className="flex items-start justify-between gap-2 text-xs text-slate-300">
                                                        <div className="flex items-start gap-1.5 min-w-0">
                                                            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                                                            <div className="min-w-0">
                                                                <div className="text-[10px] uppercase tracking-wide text-slate-500">Location</div>
                                                                <div className="mt-0.5 leading-relaxed break-words">{lot.location }</div>
                                                            </div>
                                                        </div>

                                                        <a
                                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lot.location || lot.address)}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] font-medium text-blue-300 hover:border-blue-500 hover:text-blue-200"
                                                            title="Open location in Google Maps"
                                                        >
                                                            <Navigation className="w-3 h-3" />
                                                            Map
                                                        </a>
                                                    </div>
                                                </div>

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

                                            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                                                <div>
                                                    <span className="text-xs text-slate-400">Starts at</span>
                                                    <div className="text-lg font-extrabold text-white">
                                                        ₹{lot.hourlyRate.toFixed(2)}
                                                        <span className="text-xs font-normal text-slate-400"> / hr</span>
                                                    </div>
                                                </div>

                                                <div className="hidden lg:flex items-center gap-5">
                                                    <Link
                                                        to={`/details/${lot.id}`}
                                                        state={{ spot: lot }}
                                                        className="btn-1 text-white px-7 py-3 rounded-full shadow-md text-sm"
                                                    >
                                                        View
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    {!loading && filteredLots.length === 0 && (
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
        </>
    );
};

export default ParkingSpotDirectory;