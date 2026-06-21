import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthenticatedLayout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/dashboard" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">H</span>
                                </div>
                                <span className="text-xl font-bold text-gray-800">Hotel<span className="text-amber-600">SaaS</span></span>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">{user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-gray-500 hover:text-amber-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            <footer className="bg-white border-t border-gray-100 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} HotelSaaS. Empowering hotels worldwide.
                </div>
            </footer>
        </div>
    );
}