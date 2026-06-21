import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        hotel_name: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <style>{`
            @media (min-width: 992px) {
                .hf-register-left {
                    flex-basis: 55%;
                    height: 100vh;
                    overflow-y: auto;
                }
                .hf-register-right {
                    height: 100vh;
                    overflow-y: auto;
                }
            }
        `}</style>
        <div className="d-flex flex-column flex-lg-row bg-light" style={{ minHeight: '100vh', overflow: 'hidden' }}>
            {/* LEFT: Form */}
            <div
                className="w-100 d-flex align-items-center justify-content-center px-4 px-sm-5 py-5 flex-lg-shrink-0 hf-register-left"
                style={{ minWidth: 0 }}
            >
                <div className="w-100" style={{ maxWidth: '460px' }}>
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <div
                            className="d-flex align-items-center justify-content-center shadow-sm"
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" width="22" height="22" className="text-white">
                                <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.5 20v-5.5a1 1 0 011-1h3a1 1 0 011 1V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="fs-4 fw-bold text-dark">HotelFlow</span>
                    </div>

                    <h1 className="fw-bold text-dark mb-2" style={{ fontSize: '2.25rem' }}>Create your account</h1>
                    <p className="text-secondary mb-4">Start managing your hotel operations today.</p>

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
                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-dark mb-2">Full Name</label>
                            <div className="position-relative">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    width="18"
                                    height="18"
                                    className="text-secondary position-absolute"
                                    style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                                >
                                    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
                                    <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                                </svg>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control rounded-pill py-3"
                                    style={{ paddingLeft: '46px' }}
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-dark mb-2">Hotel Name</label>
                            <div className="position-relative">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    width="18"
                                    height="18"
                                    className="text-secondary position-absolute"
                                    style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                                >
                                    <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.5 20v-5.5a1 1 0 011-1h3a1 1 0 011 1V20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    type="text"
                                    name="hotel_name"
                                    className="form-control rounded-pill py-3"
                                    style={{ paddingLeft: '46px' }}
                                    placeholder="My Awesome Hotel"
                                    value={formData.hotel_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <p className="text-secondary mt-2 mb-0" style={{ fontSize: '12px', paddingLeft: '4px' }}>
                                This will be your hotel/business name
                            </p>
                        </div>

                        <div className="mb-3">
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
                                    name="email"
                                    className="form-control rounded-pill py-3"
                                    style={{ paddingLeft: '46px' }}
                                    placeholder="you@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-dark mb-2">Password</label>
                            <div className="position-relative">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    width="18"
                                    height="18"
                                    className="text-secondary position-absolute"
                                    style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                                >
                                    <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
                                    <path d="M8 10.5V7.5a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                                </svg>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="form-control rounded-pill py-3"
                                    style={{ paddingLeft: '46px', paddingRight: '46px' }}
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="btn position-absolute p-0 border-0 bg-transparent text-secondary"
                                    style={{ right: '16px', top: '50%', transform: 'translateY(-50%)' }}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                            <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.6 9.6 0 0112 5c5 0 9 4.5 10 7-0.5 1.2-1.4 2.6-2.6 3.8M6.5 6.6C4.6 7.9 3.1 9.7 2 12c1 2.5 5 7 10 7 1.3 0 2.5-0.3 3.6-0.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                            <path d="M2 12c1-2.5 5-7 10-7s9 4.5 10 7c-1 2.5-5 7-10 7s-9-4.5-10-7z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold small text-dark mb-2">Confirm Password</label>
                            <div className="position-relative">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    width="18"
                                    height="18"
                                    className="text-secondary position-absolute"
                                    style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                                >
                                    <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
                                    <path d="M8 10.5V7.5a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                                </svg>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    className="form-control rounded-pill py-3"
                                    style={{ paddingLeft: '46px', paddingRight: '46px' }}
                                    placeholder="Confirm your password"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((s) => !s)}
                                    className="btn position-absolute p-0 border-0 bg-transparent text-secondary"
                                    style={{ right: '16px', top: '50%', transform: 'translateY(-50%)' }}
                                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showConfirmPassword ? (
                                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                            <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.6 9.6 0 0112 5c5 0 9 4.5 10 7-0.5 1.2-1.4 2.6-2.6 3.8M6.5 6.6C4.6 7.9 3.1 9.7 2 12c1 2.5 5 7 10 7 1.3 0 2.5-0.3 3.6-0.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                            <path d="M2 12c1-2.5 5-7 10-7s9 4.5 10 7c-1 2.5-5 7-10 7s-9-4.5-10-7z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn w-100 text-white fw-semibold py-3 rounded-pill border-0"
                            style={{
                                background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                                boxShadow: '0 12px 24px -8px rgba(79, 70, 229, 0.5)',
                            }}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center small text-secondary mt-4 mb-0">
                        Already have an account?{' '}
                        <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: '#4f46e5' }}>
                            Sign in
                        </Link>
                    </p>
                    </div>

                    <div className="d-flex align-items-center justify-content-center gap-3 mt-4 small text-muted">
                        <Link to="/terms" className="text-muted text-decoration-none">Terms of Service</Link>
                        <span>·</span>
                        <Link to="/privacy" className="text-muted text-decoration-none">Privacy Policy</Link>
                    </div>
                </div>
            </div>

            {/* RIGHT: Showcase panel */}
            <div
                className="d-none d-lg-flex position-relative overflow-hidden flex-lg-grow-1 hf-register-right"
                style={{
                    minWidth: 0,
                    background: 'linear-gradient(135deg, #4338ca, #4f46e5 50%, #7c3aed)',
                }}
            >
                {/* ambient glow */}
                <div
                    className="position-absolute rounded-circle"
                    style={{
                        top: '-6rem',
                        right: '-6rem',
                        width: '24rem',
                        height: '24rem',
                        background: 'rgba(167, 139, 250, 0.3)',
                        filter: 'blur(80px)',
                    }}
                />
                <div
                    className="position-absolute rounded-circle"
                    style={{
                        bottom: '-8rem',
                        left: '-2.5rem',
                        width: '24rem',
                        height: '24rem',
                        background: 'rgba(129, 140, 248, 0.2)',
                        filter: 'blur(80px)',
                    }}
                />

                <div className="position-relative w-100 d-flex flex-column justify-content-center" style={{ paddingLeft: '3.5rem', paddingRight: '3.5rem', paddingTop: '4rem', paddingBottom: '4rem' }}>
                    <div
                        className="d-inline-flex align-items-center gap-2 align-self-start px-3 py-2 rounded-pill mb-4 small fw-medium text-white"
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                    >
                        <span className="rounded-circle" style={{ width: '6px', height: '6px', background: '#34d399', display: 'inline-block' }} />
                        Trusted by 2,000+ hotels worldwide
                    </div>

                    <h2 className="fw-bold text-white mb-3" style={{ fontSize: '2.25rem', lineHeight: 1.2 }}>
                        Start running a sharper operation
                    </h2>
                    <p className="mb-5" style={{ color: 'rgba(224, 231, 255, 0.9)', maxWidth: '380px' }}>
                        Set up your hotel in minutes — reservations, revenue, and staff, all in one dashboard.
                    </p>

                    <div className="d-flex flex-column gap-3 mb-4">
                        <div
                            className="d-flex align-items-center gap-3 rounded-4 px-4 py-3"
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                                style={{ width: '36px', height: '36px', background: 'rgba(52, 211, 153, 0.2)' }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" width="18" height="18" style={{ color: '#6ee7b7' }}>
                                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-white small fw-semibold mb-0">Free 14-day trial</p>
                                <p className="small mb-0" style={{ color: 'rgba(224, 231, 255, 0.7)' }}>No card required to get started</p>
                            </div>
                        </div>

                        <div
                            className="d-flex align-items-center gap-3 rounded-4 px-4 py-3"
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                                style={{ width: '36px', height: '36px', background: 'rgba(52, 211, 153, 0.2)' }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" width="18" height="18" style={{ color: '#6ee7b7' }}>
                                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-white small fw-semibold mb-0">Set up in under 10 minutes</p>
                                <p className="small mb-0" style={{ color: 'rgba(224, 231, 255, 0.7)' }}>Import your rooms and rates instantly</p>
                            </div>
                        </div>

                        <div
                            className="d-flex align-items-center gap-3 rounded-4 px-4 py-3"
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                                style={{ width: '36px', height: '36px', background: 'rgba(52, 211, 153, 0.2)' }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" width="18" height="18" style={{ color: '#6ee7b7' }}>
                                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-white small fw-semibold mb-0">Cancel anytime</p>
                                <p className="small mb-0" style={{ color: 'rgba(224, 231, 255, 0.7)' }}>No long-term contracts or lock-in</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="rounded-4 p-4"
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                    >
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 fw-semibold text-white"
                                style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.15)', fontSize: '14px' }}
                            >
                                AM
                            </div>
                            <div>
                                <p className="text-white small fw-semibold mb-0">Adaeze Madu</p>
                                <p className="small mb-0" style={{ color: 'rgba(224, 231, 255, 0.7)' }}>GM, Lagune Boutique Hotel</p>
                            </div>
                        </div>
                        <p className="small mb-0" style={{ color: '#eef2ff', lineHeight: 1.6 }}>
                            "We switched our whole front desk to HotelFlow in an afternoon. Occupancy reporting alone paid for the subscription."
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}