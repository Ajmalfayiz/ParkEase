import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';

import logo from "../assets/header.png"
import { logout } from '../redux/slices/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const handleLogout = () => {
        dispatch(logout());
        closeMenu();
    };

    return (
        <header className="relative z-40 border-b border-slate-200 bg-white">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <nav className="flex min-h-20 items-center justify-between gap-4">
                    <Link to="/" onClick={closeMenu} className="shrink-0" aria-label="ParkEase home">
                        <img src={logo} alt="ParkEase" className="h-auto w-36 sm:w-44 lg:w-48" />
                    </Link>

                    <div className="hidden items-center gap-6 font-medium lg:flex">
                        <Link to="/" className="text-sm text-slate-700 transition hover:text-blue-600">Home</Link>
                        <Link to="/listing" className="text-sm text-slate-700 transition hover:text-blue-600">Listing</Link>
                    </div>

                    {user ? (
                        <div className="hidden items-center gap-4 lg:flex">
                            {user.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                                >
                                    Admin
                                </Link>
                            )}
                            <span className="text-sm font-medium text-slate-700">
                                Hi, {user.name || user.email || 'there'}
                            </span>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="hidden items-center gap-5 lg:flex">
                            <Link to="/login" className="text-sm font-medium text-slate-700 transition hover:text-blue-600">Login</Link>
                            <Link to="/signup" className="btn-1 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90">Sign Up</Link>
                        </div>
                    )}

                    <button
                        type="button"
                        className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
                        onClick={() => setMenuOpen((isOpen) => !isOpen)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    >
                        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </nav>

                <div
                    id="mobile-navigation"
                    className={`${menuOpen ? "flex" : "hidden"} flex-col gap-2 border-t border-slate-200 py-4 lg:hidden`}
                >
                    <Link to="/" onClick={closeMenu} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Home</Link>
                    <Link to="/listing" onClick={closeMenu} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Listing</Link>
                    <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        onClick={closeMenu}
                                        className="rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-slate-700"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-100"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={closeMenu} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Login</Link>
                                <Link to="/signup" onClick={closeMenu} className="btn-1 rounded-lg px-3 py-2.5 text-center text-sm font-semibold text-white">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header