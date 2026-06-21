import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setStatus('');
        try {
            await axios.post('/api/v1/auth/reset-password', {
                ...formData,
                token,
            });
            setStatus('Password reset successfully!');
            setTimeout(() => navigate('/login'), 2000);
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
                    <p className="text-gray-500 text-sm mt-2">Create your new password</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                    {status && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                            {status}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">New Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                                placeholder="Create a new password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                                placeholder="Confirm your password"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-600 text-white py-3 rounded-xl font-medium hover:bg-amber-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/login" className="text-sm text-gray-500 hover:text-amber-600">
                            ← Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}