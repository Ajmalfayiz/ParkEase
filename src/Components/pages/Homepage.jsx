// const HomePage = () => {
//     return (

//         <>
//             <section className="homepage container mx-auto px-4 md:px-8 lg:px-16 text-center" >
//                 <div className="text-center">
//                     <h4 className="text-1 uppercase font-bold text-center pt-8 mb-4">No Searching. No Waiting. Just AI-Powered Parking.</h4>
//                         {/* <div className="border border-grey-500">
//                             <input type="text" placeholder="Search Your Parking Space Location" className="w-auto` px-4 py-2 rounded-full" />
//                             <button type="submit">Submit</button>
//                         </div> */}

//                     <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold pt-3 text-center mt=0 pb-12'> Spot, Park, and Relax.   </h1>

//                     <h6 className="text-xl py-8 text-light text-2">It connects to a centralized database containing real-time status feeds from garage systems,<br></br> municipal parking databases, and IoT sensors   </h6>
//                 </div>
//             </section>
//         </>
//     )

// }

import React, { useState } from "react";
import {
    MapPin,
    Search,
    Calendar,
    Clock,
    Car,
    ShieldCheck,
    Zap,
    Smartphone,
    Navigation,
    Star,
    ChevronRight,
    Sparkles,
    ArrowRight,
    Compass,
    CheckCircle2,
    Menu,
    X,
    CreditCard,
    Building2,
    Users,
} from "lucide-react";

const homepage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchLocation, setSearchLocation] = useState("Downtown Financial District");
    const [selectedDuration, setSelectedDuration] = useState("2 Hours");

    const stats = [
        { value: "50,000+", label: "Guaranteed Bays", sub: "Across 40+ major hubs" },
        { value: "99.4%", label: "Check-in Reliability", sub: "Automated LPR scanners" },
        { value: "4.9/5", label: "Driver Rating", sub: "From 120k+ app reviews" },
        { value: "15 mins", label: "Average Time Saved", sub: "No circling the block" },
    ];

    const features = [
        {
            icon: Navigation,
            badge: "Real-Time Telemetry",
            title: "Predictive Spot Availability",
            description:
                "AI-guided sensor mapping shows exactly how many stalls are open before you turn onto the street.",
            gradient: "from-blue-600/20 to-cyan-500/10",
            border: "border-blue-500/30",
        },
        {
            icon: Zap,
            badge: "Smart Mobility",
            title: "EV Supercharging Hubs",
            description:
                "Filter specifically for Level 2 and DC Fast chargers with live wattage readouts and reservation holds.",
            gradient: "from-emerald-600/20 to-teal-500/10",
            border: "border-emerald-500/30",
        },
        {
            icon: ShieldCheck,
            badge: "Touchless Entry",
            title: "Automated Plate Recognition",
            description:
                "Drive straight through security gates. Our cameras scan your plate and grant instant barrier access.",
            gradient: "from-indigo-600/20 to-purple-500/10",
            border: "border-indigo-500/30",
        },
        {
            icon: CreditCard,
            badge: "Flexible Billing",
            title: "Dynamic Hourly & Monthly Rates",
            description:
                "Pay per minute with zero surprise surcharges or lock in discounted commuter subscriptions.",
            gradient: "from-amber-600/20 to-orange-500/10",
            border: "border-amber-500/30",
        },
    ];

    const nearbySpots = [
        {
            name: "Mission Bay Premier Garage",
            address: "580 4th Street",
            type: "Covered Multi-Level",
            rate: "$6.00/hr",
            spotsLeft: 34,
            distance: "0.2 mi",
            hasEv: true,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80",
        },
        {
            name: "Downtown Financial Plaza",
            address: "201 California St",
            type: "Executive Underground",
            rate: "$8.50/hr",
            spotsLeft: 8,
            distance: "0.5 mi",
            hasEv: true,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80",
        },
        {
            name: "Embarcadero Pier Deck",
            address: "Green St & Promenade",
            type: "Covered & Rooftop",
            rate: "$7.00/hr",
            spotsLeft: 65,
            distance: "1.1 mi",
            hasEv: true,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=600&q=80",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden">

            {/* Decorative Ambient Glowing Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[140px]" />
                <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-[70%] -right-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px]" />
            </div>

          
            {/* Hero Section */}
            <section className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* Subtle Announcement Pill */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs font-medium text-slate-300 backdrop-blur-md shadow-inner">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        <span>Now live in 12 new metropolitan airports & arenas</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                </div>

                {/* Main Headline */}
                <div className="text-center max-w-4xl mx-auto space-y-6">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
                        Arrive calmly. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
                            Guaranteed spots
                        </span>{" "}
                        awaiting your car.
                    </h1>
                    <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Eliminate parking anxiety with real-time stall detection, instant reservation passes, and automatic touchless gate clearances.
                    </p>
                </div>

                {/* Floating Glass Search & Booking Widget */}
                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="p-3 sm:p-4 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800 shadow-2xl shadow-blue-950/40">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                            {/* Destination */}
                            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                                <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</span>
                                    <input
                                        type="text"
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                        className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none truncate"
                                    />
                                </div>
                            </div>

                            {/* Time Slot */}
                            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                                <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-400">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Duration</span>
                                    <select
                                        value={selectedDuration}
                                        onChange={(e) => setSelectedDuration(e.target.value)}
                                        className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                                    >
                                        <option value="1 Hour" className="bg-slate-900">1 Hour ($4.00)</option>
                                        <option value="2 Hours" className="bg-slate-900">2 Hours ($8.00)</option>
                                        <option value="4 Hours" className="bg-slate-900">4 Hours ($15.00)</option>
                                        <option value="All Day" className="bg-slate-900">Full Day Pass ($28.00)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => alert(`Searching for spots near ${searchLocation} for ${selectedDuration}...`)}
                                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition duration-200 cursor-pointer"
                            >
                                <Search className="w-4 h-4" />
                                Find Available Stalls
                            </button>

                        </div>

                        {/* Quick Filter Tags */}
                        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 px-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] text-slate-500">Popular:</span>
                                <span className="px-2 py-0.5 rounded-md bg-slate-800/60 hover:bg-slate-800 text-slate-300 cursor-pointer">EV Fast-Charge</span>
                                <span className="px-2 py-0.5 rounded-md bg-slate-800/60 hover:bg-slate-800 text-slate-300 cursor-pointer">Covered Only</span>
                                <span className="px-2 py-0.5 rounded-md bg-slate-800/60 hover:bg-slate-800 text-slate-300 cursor-pointer">Airport Valet</span>
                            </div>
                            <div className="flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                                <CheckCircle2 className="w-3.5 h-3.5" /> No reservation fees
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            {/* Metrics Strip */}
            <section className="relative z-10 border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-md py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center sm:text-left border-l border-slate-800 pl-6 first:border-l-0">
                                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stat.value}</div>
                                <div className="text-sm font-bold text-slate-300 mt-1">{stat.label}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

          

            {/* Decorative Features Grid */}
            <section id="features" className="relative z-10 py-24 bg-slate-900/30 border-t border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Engineered for Drivers</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                            Why drivers trust ParkEase every morning
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400 mt-3">
                            We replaced ticket stubs, broken validation stamps, and full-lot surprises with unified frictionless hardware.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`p-8 rounded-3xl bg-gradient-to-br ${item.gradient} bg-slate-900/70 border ${item.border} backdrop-blur-xl relative overflow-hidden group hover:scale-[1.01] transition duration-300`}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white">
                                            <Icon className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-slate-950/60 px-3 py-1 rounded-full border border-slate-800">
                                            {item.badge}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* How It Works - 3 Step Flow */}
            <section id="how-it-works" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Zero Friction Process</span>
                    <h2 className="text-3xl font-extrabold text-white mt-2">Park in 3 Simple Steps</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 text-center relative">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-black text-lg flex items-center justify-center mx-auto mb-4">
                            1
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Locate & Reserve</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Search by destination, compare guaranteed hourly rates, and reserve your dedicated bay ahead of time.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 text-center relative">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-black text-lg flex items-center justify-center mx-auto mb-4">
                            2
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Automated Check-in</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Drive up to the barrier. Our automated cameras scan your license plate and lift the gate instantly.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 text-center relative">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 font-black text-lg flex items-center justify-center mx-auto mb-4">
                            3
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Seamless Exit</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Leave whenever you are ready. Duration is calculated automatically to your saved card with no paper receipts.
                        </p>
                    </div>

                </div>
            </section>




        </div>
    );
}

export default homepage