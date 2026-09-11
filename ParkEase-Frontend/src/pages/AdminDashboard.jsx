import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import API from "../api/axiosInstance";

import {
  fetchSpotsStart,
  fetchSpotsSuccess,
  fetchSpotsFailure,
} from "../redux/slices/spotSlice";

const categoryOptions = ["2 Wheel", "4 Wheel", "6 Wheel"];

function AdminDashboard() {
  const dispatch = useDispatch();

  const {
    spots,
    loading,
    error,
  } = useSelector((state) => state.spots);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    category: [],
    stock: "",
    image: "",
    latitude: null,
    longitude: null,
    hasEv: false,
    isCovered: false,
  });

  const [editingId, setEditingId] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [mapSearchQuery, setMapSearchQuery] = useState("");
  const [mapSearchMessage, setMapSearchMessage] = useState("");

  const defaultMapCenter = useMemo(() => ({
    lat: 10.8505,
    lng: 76.2711,
  }), []);

  const selectedMapPosition = formData.latitude !== null && formData.longitude !== null
    ? { lat: Number(formData.latitude), lng: Number(formData.longitude) }
    : defaultMapCenter;

  const MapCenterUpdater = ({ position }) => {
    const map = useMap();
    const { lat, lng } = position;

    useEffect(() => {
      map.flyTo({ lat, lng }, Math.max(map.getZoom(), 14), { duration: 0.8 });
    }, [map, lat, lng]);

    return null;
  };

  const markerIcon = useMemo(() => new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }), []);

  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        return "Selected location";
      }

      const data = await response.json();
      return data?.display_name || "Selected location";
    } catch (error) {
      console.error("Failed to resolve map location:", error);
      return "Selected location";
    }
  };

  const handleMapSearch = async () => {
    const query = mapSearchQuery.trim();
    if (!query) {
      setMapSearchMessage("Enter a location to search.");
      return;
    }

    setMapSearchMessage("Searching...");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`,
        { headers: { Accept: "application/json" } }
      );
      const results = await response.json();

      if (!response.ok || !results.length) {
        setMapSearchMessage("Location not found.");
        return;
      }

      const result = results[0];
      setFormData((prev) => ({
        ...prev,
        latitude: Number(result.lat),
        longitude: Number(result.lon),
        location: result.display_name,
      }));
      setMapSearchMessage("Location selected.");
    } catch (error) {
      console.error("Failed to search map location:", error);
      setMapSearchMessage("Search failed. Try again.");
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      async click(event) {
        const selectedLat = event.latlng.lat;
        const selectedLng = event.latlng.lng;
        const placeName = await fetchLocationName(selectedLat, selectedLng);

        setFormData((prev) => ({
          ...prev,
          latitude: selectedLat,
          longitude: selectedLng,
          location: placeName,
        }));
      },
    });

    return null;
  };
  const [message, setMessage] = useState("");

  const locationSuggestions = [
    "Kanjirappally, Kerala",
    "Kochi, Kerala",
    "Ernakulam, Kerala",
    "Thrissur, Kerala",
    "Thiruvananthapuram, Kerala",
    "Bangalore, Karnataka",
    "Chennai, Tamil Nadu",
    "Mysuru, Karnataka",
    "Calicut, Kerala",
    "MG Road, Kochi",
    "Market Road, Ernakulam",
    "Infopark, Kakkanad",
  ];

  const suggestedLocations = locationSuggestions.filter((location) => {
    const query = formData.location.trim().toLowerCase();
    if (!query) return true;
    return location.toLowerCase().includes(query);
  });

  const loadSpots = useCallback(async () => {
    dispatch(fetchSpotsStart());

    try {
      const response = await API.get("/spots");
      const payload = response?.data?.spots ?? response?.data ?? [];

      dispatch(fetchSpotsSuccess(Array.isArray(payload) ? payload : []));
    } catch (error) {
      dispatch(
        fetchSpotsFailure(
          error.response?.data?.message ||
            "Failed to load spots"
        )
      );
    }
  }, [dispatch]);

  useEffect(() => {
    loadSpots();
  }, [loadSpots]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    if (!showMapPicker) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowMapPicker(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showMapPicker]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (formData.category.length === 0) {
      setMessage("Select at least one category");
      return;
    }

    try {
      if (editingId) {
        await API.put(
          `/spots/${editingId}`,
          {
            ...formData,
            location: formData.location.trim(),
            price: Number(formData.price),
            stock: Number(formData.stock),
            latitude: formData.latitude !== null && formData.latitude !== undefined ? Number(formData.latitude) : null,
            longitude: formData.longitude !== null && formData.longitude !== undefined ? Number(formData.longitude) : null,
            hasEv: Boolean(formData.hasEv),
            isCovered: Boolean(formData.isCovered),
          }
        );

        setMessage(
          "Spot updated successfully"
        );
      } else {
        await API.post("/spots", {
          ...formData,
          location: formData.location.trim(),
          price: Number(formData.price),
          stock: Number(formData.stock),
          latitude: formData.latitude !== null && formData.latitude !== undefined ? Number(formData.latitude) : null,
          longitude: formData.longitude !== null && formData.longitude !== undefined ? Number(formData.longitude) : null,
          hasEv: Boolean(formData.hasEv),
          isCovered: Boolean(formData.isCovered),
        });

        setMessage(
          "Spot created successfully"
        );
      }

      setFormData({
        name: "",
        location: "",
        description: "",
        price: "",
        category: [],
        stock: "",
        image: "",
        latitude: null,
        longitude: null,
        hasEv: false,
        isCovered: false,
      });

      setEditingId(null);

      await loadSpots();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Operation failed"
      );
    }
  };

  const handleEdit = (spot) => {
    setEditingId(spot._id);

    setFormData({
      name: spot.name || "",
      location: spot.location || spot.address || "",
      description: spot.description || "",
      price: spot.price || "",
      category: Array.isArray(spot.category)
        ? spot.category
        : spot.category
          ? [spot.category]
          : [],
      stock: spot.stock || "",
      image: spot.image || "",
      latitude: spot.latitude ?? null,
      longitude: spot.longitude ?? null,
      hasEv: Boolean(spot.hasEv),
      isCovered: Boolean(spot.isCovered),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this spot?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await API.delete(`/spots/${id}`);

      setMessage(
        "Spot deleted successfully"
      );

      await loadSpots();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to delete spot"
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      name: "",
      location: "",
      description: "",
      price: "",
      category: [],
      stock: "",
      image: "",
      latitude: null,
      longitude: null,
      hasEv: false,
      isCovered: false,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Admin Dashboard
      </h1>

      {message && (
        <div className="mb-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          {message}
        </div>
      )}

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h4 className="mb-5 text-xl font-semibold text-slate-900">
          {editingId ? "Edit Spot" : "Add New Parking Spot"}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Spot Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Location
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="location"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowMapPicker(true)}
                  className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                >
                  Select on Map
                </button>
              </div>

              {suggestedLocations.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestedLocations.slice(0, 6).map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          location,
                        }))
                      }
                      className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-1">
              <fieldset className="flex h-full flex-col justify-end gap-2">
                <legend className="block text-sm font-medium text-slate-700">
                  Category
                </legend>
                <div className="grid gap-2 rounded-lg border border-slate-300 bg-slate-50 p-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                  {categoryOptions.map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <input
                        type="checkbox"
                        name="category"
                        value={category}
                        checked={formData.category.includes(category)}
                        onChange={() =>
                          setFormData((prev) => ({
                            ...prev,
                            category: prev.category.includes(category)
                              ? prev.category.filter((item) => item !== category)
                              : [...prev.category, category],
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Price/hr
              </label>
              <input
                type="number"
                name="price"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Slot
              </label>
              <input
                type="number"
                name="stock"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="md:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    name="hasEv"
                    checked={formData.hasEv}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  EV Charging
                </label>

                <label className="flex items-center gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    name="isCovered"
                    checked={formData.isCovered}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Covered Only
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                About this Parking Facility
              </label>
              <textarea
                name="description"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                rows="4"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {showMapPicker && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
              <div className="w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl shadow-slate-950/50">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Choose parking location</h3>
                    <p className="text-sm text-slate-400">Click on the map or drag the marker to the exact spot.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowMapPicker(false)}
                    className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700"
                  >
                    Close
                  </button>
                </div>

                <div role="search" className="mb-3 flex gap-2">
                  <input
                    type="search"
                    value={mapSearchQuery}
                    onChange={(event) => {
                      setMapSearchQuery(event.target.value);
                      setMapSearchMessage("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleMapSearch();
                      }
                    }}
                    placeholder="Search location"
                    aria-label="Search location on map"
                    className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={handleMapSearch}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
                  >
                    Search
                  </button>
                </div>

                {mapSearchMessage && (
                  <p className="mb-3 text-xs text-slate-400">{mapSearchMessage}</p>
                )}

                <MapContainer
                  center={selectedMapPosition}
                  zoom={12}
                  scrollWheelZoom={true}
                  className="h-105 w-full rounded-xl"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapCenterUpdater position={selectedMapPosition} />
                  <MapClickHandler />
                  <Marker
                    position={selectedMapPosition}
                    icon={markerIcon}
                  />
                </MapContainer>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-slate-300">
                    Latitude: <span className="font-medium text-white">{selectedMapPosition.lat.toFixed(5)}</span>
                    <span className="mx-2 text-slate-500">|</span>
                    Longitude: <span className="font-medium text-white">{selectedMapPosition.lng.toFixed(5)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      const placeName = await fetchLocationName(
                        selectedMapPosition.lat,
                        selectedMapPosition.lng
                      );

                      setFormData((prev) => ({
                        ...prev,
                        location: placeName,
                      }));
                      setShowMapPicker(false);
                    }}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                  >
                    Use this location
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              {editingId ? "Update spot" : "Add Slot"}
            </button>

            {editingId && (
              <button
                type="button"
                className="rounded-lg bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h3 className="mb-4 text-2xl font-semibold text-slate-900">
        Spots
      </h3>

      {loading && (
        <div className="flex justify-center py-6">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full border-collapse text-left text-sm text-slate-700">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Spot Name</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {spots.map((spot) => (
                <tr key={spot._id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-slate-900">{spot.name}</td>
                  <td className="px-4 py-3">{spot.location}</td>
                  <td className="px-4 py-3">
                    {Array.isArray(spot.category)
                      ? spot.category.join(", ")
                      : spot.category}
                  </td>
                  <td className="px-4 py-3">₹{spot.price}</td>
                  <td className="px-4 py-3">{spot.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="rounded-md bg-amber-400 px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-amber-300"
                        onClick={() => handleEdit(spot)}
                      >
                        Edit
                      </button>

                      <button
                        className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600"
                        onClick={() => handleDelete(spot._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;