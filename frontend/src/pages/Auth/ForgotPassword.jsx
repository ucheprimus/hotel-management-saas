import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [sentTo, setSentTo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/v1/auth/forgot-password', { email });
            setSentTo(email);
            setSent(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/v1/auth/forgot-password', { email: sentTo });
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center px-4 py-5" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fc, #eef0f7)' }}>
            <div className="w-100" style={{ maxWidth: '440px' }}>
                <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18" className="text-white">
                            <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 20v-5.5a1 1 0 011-1h3a1 1 0 011 1V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="fs-5 fw-bold text-dark">HotelFlow</span>
                </div>

                {!sent ? (
                    <>
                        <div className="text-center mb-4">
                            <div
                                className="d-inline-flex align-items-center justify-content-center mb-3"
                                style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#ece9fd' }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" width="26" height="26" style={{ color: '#4f46e5' }}>
                                    <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.8" />
                                    <path d="M12.5 13.5L20 21M16 18l2.5-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h1 className="fw-bold text-dark mb-2" style={{ fontSize: '1.875rem' }}>Forgot password?</h1>
                            <p className="text-secondary mb-0">Enter your email address and we'll send you a reset link.</p>
                        </div>

                        <div
                            className="bg-white rounded-4 p-4 p-md-5"
                            style={{ border: '1px solid #f1f1f4', boxShadow: '0 20px 40px -15px rgba(79, 70, 229, 0.15)' }}
                        >
                            {error && (
                                <div className="alert alert-danger py-2 small rounded-3 mb-4" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-4">
                                    <label className="form-label fw-semibold small text-dark mb-2">Email Address</label>
                                    <div className="position-relative">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            width="18"
                                            height="18"
                                            className="text-secondary position-absolute"
                                            style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                                        >
                                            <path d="M3 6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v11a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 17.5v-11z" stroke="currentColor" strokeWidth="1.7" />
                                            <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input
                                            type="email"
                                            className="form-control rounded-pill py-3"
                                            style={{ paddingLeft: '46px' }}
                                            placeholder="you@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn w-100 text-white fw-semibold py-3 rounded-pill border-0 mb-3"
                                    style={{
                                        background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                                        boxShadow: '0 12px 24px -8px rgba(79, 70, 229, 0.5)',
                                    }}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>

                            <div className="text-center">
                                <Link to="/login" className="small fw-semibold text-decoration-none d-inline-flex align-items-center gap-1" style={{ color: '#4f46e5' }}>
                                    <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                                        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <div
                        className="bg-white rounded-4 p-4 p-md-5 text-center"
                        style={{ border: '1px solid #f1f1f4', boxShadow: '0 20px 40px -15px rgba(79, 70, 229, 0.15)' }}
                    >
                        <div
                            className="d-inline-flex align-items-center justify-content-center position-relative mb-3"
                            style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#d8f7e8' }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" width="28" height="28" style={{ color: '#0f6e56' }}>
                                <path d="M4 6.5A1.5 1.5 0 015.5 5h13A1.5 1.5 0 0120 6.5v11a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17.5v-11z" stroke="currentColor" strokeWidth="1.7" />
                                <path d="M5 7l7 5.5L19 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div
                                className="d-flex align-items-center justify-content-center position-absolute"
                                style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#0f6e56', bottom: '-2px', right: '-2px', border: '2px solid white' }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" width="12" height="12">
                                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="fw-bold text-dark mb-2" style={{ fontSize: '1.625rem' }}>Check your inbox!</h2>
                        <p className="text-secondary mb-1">Password reset email sent successfully.</p>
                        <p className="text-dark mb-4">
                            We sent a reset link to <strong>{sentTo}</strong>
                        </p>

                        <div
                            className="d-flex align-items-center justify-content-center gap-2 rounded-pill py-2 px-3 mb-4 small"
                            style={{ background: '#e9f9f0', color: '#0f6e56' }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                                <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Link expires in <strong>15 minutes</strong>
                        </div>

                        {error && (
                            <div className="alert alert-danger py-2 small rounded-3 mb-3" role="alert">
                                {error}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={loading}
                            className="btn w-100 text-white fw-semibold py-3 rounded-pill border-0 mb-3"
                            style={{
                                background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                                boxShadow: '0 12px 24px -8px rgba(79, 70, 229, 0.5)',
                            }}
                        >
                            {loading ? 'Resending...' : 'Resend Email'}
                        </button>

                        <Link to="/login" className="small fw-semibold text-decoration-none d-inline-flex align-items-center gap-1" style={{ color: '#4f46e5' }}>
                            <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Return to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}