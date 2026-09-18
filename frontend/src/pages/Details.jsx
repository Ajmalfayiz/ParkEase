import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import API from "../api/axiosInstance";
import {
  MapPin,
  Star,
  Zap,
  ShieldCheck,
  Clock,
  Navigation,
  CheckCircle2,
  Info,
  CreditCard,
  ArrowLeft,
  Bookmark,
  Sparkles,
} from "lucide-react";

const fallbackLot = {
  id: "spot",
  name: "Parking Spot",
  type: "Parking Spot",
  address: "Location unavailable",
  distance: "Near your destination",
  hourlyRate: 0,
  dailyMax: 0,
  rating: 4.5,
  reviewCount: 0,
  totalSpots: 0,
  availableSpots: 0,
  clearance: "Standard clearance",
  operatingHours: "Open 24/7",
  hasEv: false,
  evRate: 0,
  description: "Secure parking is available at this location.",
  images: [
    "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
  ],
  amenities: [
    { title: "24/7 Access", desc: "Available whenever you need it.", icon: Clock },
    { title: "EV Charging", desc: "Charging support available where offered.", icon: Zap },
    { title: "Secure Parking", desc: "Safety monitoring and access control.", icon: ShieldCheck },
    { title: "Easy Navigation", desc: "Simple arrival and exit flow.", icon: Navigation },
  ],
  entryInstructions: [
    "Arrive at the location and follow the posted wayfinding signs.",
    "Use your reservation confirmation or the app directions for entry.",
    "Park in the designated open bay and keep your confirmation available until exit.",
  ],
  reviews: [
    {
      id: 1,
      author: "Guest",
      date: "Recently",
      rating: 5,
      comment: "Convenient parking and an easy in-and-out experience.",
    },
  ],
};

const ParkingLotDetailsPage = () => {
  const { lotId } = useParams();
  const location = useLocation();
  const selectedSpot = location.state?.spot;

  const [activeLotId, setActiveLotId] = useState(selectedSpot?.id || lotId || "lot-1");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [durationHours, setDurationHours] = useState(3);
  const [includeEv, setIncludeEv] = useState(false);
  const [vehicleSize, setVehicleSize] = useState("standard");
  const [isSaved, setIsSaved] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const nextLotId = selectedSpot?.id || lotId || "lot-1";
    setActiveLotId(nextLotId);
    setActiveImageIndex(0);
    setIncludeEv(false);
  }, [selectedSpot, lotId]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const exactLocation = selectedSpot?.location || selectedSpot?.address || fallbackLot.address;

  const lot = selectedSpot
    ? {
        ...fallbackLot,
        id: selectedSpot.id || activeLotId,
        name: selectedSpot.name || fallbackLot.name,
        type: selectedSpot.type || fallbackLot.type,
        address: exactLocation,
        distance: selectedSpot.distance || fallbackLot.distance,
        hourlyRate: Number(selectedSpot.hourlyRate) || fallbackLot.hourlyRate,
        dailyMax: Number(selectedSpot.hourlyRate) ? Number(selectedSpot.hourlyRate) * 5 : fallbackLot.dailyMax,
        rating: Number(selectedSpot.rating) || fallbackLot.rating,
        reviewCount: Number(selectedSpot.reviewCount) || fallbackLot.reviewCount,
        totalSpots: Number(selectedSpot.totalSpots) || fallbackLot.totalSpots,
        availableSpots: Number(selectedSpot.availableSpots) || fallbackLot.availableSpots,
        images: [selectedSpot.image || fallbackLot.images?.[0], ...(fallbackLot.images || []).slice(1)].filter(Boolean),
      }
    : fallbackLot;

  const parkingCost = durationHours * lot.hourlyRate;
  const evCost = lot.hasEv && includeEv ? lot.evRate : 0;
  const serviceFee = 1.75;
  const grandTotal = (parkingCost + evCost + serviceFee).toFixed(2);

  const handleReserve = async (e) => {
    e.preventDefault();
    setPaymentError("");

    if (!window.Razorpay) {
      setPaymentError("Payment checkout is still loading. Please try again.");
      return;
    }

    setPaymentLoading(true);

    try {
      const { data: order } = await API.post("/payments/create-order", {
        amount: Number(grandTotal),
        spotId: lot.id,
        durationHours,
      });
      const savedUser = JSON.parse(localStorage.getItem("user") || "null");

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "ParkEase",
        description: `${lot.name} parking reservation`,
        order_id: order.orderId,
        prefill: {
          name: savedUser?.name || "",
          email: savedUser?.email || "",
        },
        theme: {
          color: "#2563eb",
        },
        handler: async (paymentResponse) => {
          try {
            await API.post("/payments/verify", paymentResponse);
            setIsBookingSuccess(true);
            setTimeout(() => setIsBookingSuccess(false), 5000);
          } catch (error) {
            setPaymentError(
              error.response?.data?.message ||
                "Payment verification failed. Please contact support."
            );
          } finally {
            setPaymentLoading(false);
          }
        },
      });

      checkout.on("payment.failed", (paymentFailure) => {
        setPaymentError(
          paymentFailure.error?.description || "Payment was not completed."
        );
        setPaymentLoading(false);
      });

      checkout.open();
    } catch (error) {
      setPaymentError(
        error.response?.data?.message ||
          "Unable to start payment. Please try again."
      );
      setPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased pb-16">
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/listing"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 sm:px-3"
              title="Back to search results"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View listing</span>
            </Link>
            <div>
              <span className="text-xs text-slate-400">Viewing Facility</span>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                {lot.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-lg border transition ${
                isSaved ? "bg-blue-600/20 border-blue-500 text-blue-400" : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
              }`}
              title="Save Lot"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {lot.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {lot.availableSpots} Spots Open
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lot.address}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-white">{lot.rating}</span>
                <span className="text-slate-500 font-normal">({lot.reviewCount} verified reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{lot.address}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{lot.distance}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lot.address)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
            >
              <Navigation className="w-4 h-4" />
              Google Maps
            </a>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 h-72 sm:h-96">
            <img
              src={lot.images[activeImageIndex] || lot.images[0]}
              alt={lot.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />

            {lot.images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {lot.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? "border-blue-500 scale-105" : "border-slate-700/80 opacity-70"
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-medium text-slate-300 border border-slate-700">
              Clearance: {lot.clearance}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Live Lot Occupancy
              </h2>

              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-extrabold text-white">
                  {lot.availableSpots}{" "}
                  <span className="text-sm font-normal text-slate-400">/ {lot.totalSpots} Bays</span>
                </span>
                <span className="text-xs font-bold text-blue-400">
                  {Math.round(((lot.totalSpots - lot.availableSpots) / lot.totalSpots) * 100)}% Occupied
                </span>
              </div>

              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((lot.totalSpots - lot.availableSpots) / lot.totalSpots) * 100}%`,
                  }}
                />
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Operating Schedule:</span>
                  <span className="font-medium text-white">{lot.operatingHours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">EV Superchargers:</span>
                  <span className="font-medium text-white">
                    {lot.hasEv ? "Available (Level 2 & DC)" : "Not Available"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Daily Max Rate:</span>
                  <span className="font-medium text-emerald-400">₹{lot.dailyMax.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-blue-400" />
              <span>Guaranteed parking space reserved immediately upon checkout.</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
           

            <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Features & Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lot.amenities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70">
                      <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 shrink-0 border border-blue-500/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white">{item.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Arrival & Parking Steps</h2>
              <div className="space-y-3">
                {lot.entryInstructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Driver Feedback</h2>
                  <p className="text-xs text-slate-400">Recent check-in experiences</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-amber-400 flex items-center gap-1 justify-end">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{lot.rating}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">340+ drivers</span>
                </div>
              </div>

              <div className="space-y-3">
                {lot.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{rev.author}</span>
                        <span className="text-slate-500">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, index) => (
                          <Star key={index} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Price</p>
                  <h3 className="text-3xl font-extrabold text-white">
                      ₹{lot.hourlyRate.toFixed(2)}
                    <span className="text-base font-medium text-slate-400">/hr</span>
                  </h3>
                </div>
                <span className="px-2 py-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-semibold">
                  Best value
                </span>
              </div>

              <form onSubmit={handleReserve} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Duration</label>
                  <select
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>1 hour</option>
                    <option value={2}>2 hours</option>
                    <option value={3}>3 hours</option>
                    <option value={4}>4 hours</option>
                    <option value={6}>6 hours</option>
                    <option value={8}>8 hours</option>
                  </select>
                </div>

                

                {lot.hasEv && (
                  <label className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      Add EV charging
                    </span>
                    <input
                      type="checkbox"
                      checked={includeEv}
                      onChange={() => setIncludeEv(!includeEv)}
                      className="rounded border-slate-600 bg-slate-900"
                    />
                  </label>
                )}

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Parking</span>
                    <span>₹ {parkingCost.toFixed(2)}</span>
                  </div>
                  {includeEv && (
                    <div className="flex items-center justify-between">
                      <span>EV charge</span>
                      <span>₹ {evCost.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Service fee</span>
                    <span> ₹ {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-sm font-bold text-white">
                    <span>Total</span>
                    <span>₹ {grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={paymentLoading}
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 text-sm flex items-center justify-center gap-2 transition"
                >
                  <CreditCard className="w-4 h-4" />
                  {paymentLoading ? "Opening secure checkout..." : "Pay & Reserve Spot"}
                </button>

                {paymentError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 px-3 py-2 text-xs">
                    {paymentError}
                  </div>
                )}

                {isBookingSuccess && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 px-3 py-2 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Reservation confirmed for {lot.name}
                  </div>
                )}
              </form>

              <div className="mt-4 border-t border-slate-800 pt-4 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span>Instant confirmation and mobile QR entry</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Refundable up to 30 minutes before arrival</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ParkingLotDetailsPage;
