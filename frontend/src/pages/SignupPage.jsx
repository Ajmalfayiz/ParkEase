import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosInstance";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await API.post(
        "/auth/register",
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full">
        <div className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden sm:block">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-175 bg-blue-600/15 rounded-full blur-[140px]" />
                <div className="absolute top-[40%] -left-40 w-125 h-125 bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-[70%] -right-40 w-150 h-150 bg-cyan-600/10 rounded-full blur-[140px]" />
            </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
              Create Account
            </h2>

            {message && (
              <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700" role="status">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="signup-name">
                  Name
                </label>

                <input
                  id="signup-name"
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="signup-email">
                  Email
                </label>

                <input
                  id="signup-email"
                  type="email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="signup-password">
                  Password
                </label>

                <input
                  id="signup-password"
                  type="password"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link className="font-semibold text-blue-600 hover:text-blue-700" to="/login">
                Login
              </Link>
            </p>

          </div>

        </div>
    </div>
  );
}

export default Register;