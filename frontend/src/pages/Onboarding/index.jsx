import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function Onboarding() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hotelName, setHotelName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/onboarding', { hotel_name: hotelName });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-2xl shadow-lg mb-4">
                        <span className="text-white font-bold text-2xl">H</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Hotel<span className="text-amber-600">SaaS</span></h1>
                    <p className="text-gray-500 text-sm mt-2">Welcome! Let's set up your hotel</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Hotel Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                                placeholder="My Awesome Hotel"
                                value={hotelName}
                                onChange={(e) => setHotelName(e.target.value)}
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Create your first hotel to get started</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-600 text-white py-3 rounded-xl font-medium hover:bg-amber-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create My Hotel'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}