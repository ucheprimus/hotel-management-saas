import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/auth-success');

        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column flex-lg-row min-vh-100 bg-light" style={{ overflowX: 'hidden' }}>
            {/* LEFT: Form */}
            <div className="w-100 d-flex align-items-center justify-content-center px-4 px-sm-5 py-5 flex-lg-grow-1" style={{ flexBasis: 0, minWidth: 0 }}>
                <div className="w-100" style={{ maxWidth: '420px' }}>
                    <div className="d-flex align-items-center gap-3 mb-5">
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

                    <h1 className="fw-bold text-dark mb-2" style={{ fontSize: '2.25rem' }}>Welcome back</h1>
                    <p className="text-secondary mb-4">Sign in to manage your hotel operations.</p>

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
                                    className="form-control rounded-pill py-3"
                                    style={{ paddingLeft: '46px', paddingRight: '46px' }}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="form-check d-flex align-items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input mt-0"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    style={{ accentColor: '#4f46e5' }}
                                />
                                <label className="form-check-label small text-secondary mb-0" htmlFor="rememberMe">
                                    Remember me
                                </label>
                            </div>
                            <Link to="/forgot-password" className="small fw-medium text-decoration-none" style={{ color: '#4f46e5' }}>
                                Forgot password?
                            </Link>
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
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="d-flex align-items-center gap-3 my-4">
                        <hr className="flex-grow-1 my-0" />
                        <span className="small text-muted">or continue with</span>
                        <hr className="flex-grow-1 my-0" />
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-3 rounded-pill fw-medium"
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path fill="#4285F4" d="M23.5 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.74z" />
                            <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3a7.4 7.4 0 01-11-3.9H1.07v3.1A12 12 0 0012 24z" />
                            <path fill="#FBBC05" d="M5.07 14.2a7.2 7.2 0 010-4.4v-3.1H1.07a12 12 0 000 10.6l4-3.1z" />
                            <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.18 15.24 0 12 0 7.4 0 3.4 2.6 1.07 6.7l4 3.1A7.18 7.18 0 0112 4.75z" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-center small text-secondary mt-4 mb-0">
                        Don't have an account?{' '}
                        <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: '#4f46e5' }}>
                            Create one
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
                className="d-none d-lg-flex position-relative overflow-hidden flex-lg-grow-1"
                style={{
                    flexBasis: 0,
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
                        Your hotel command center
                    </h2>
                    <p className="mb-5" style={{ color: 'rgba(224, 231, 255, 0.9)', maxWidth: '380px' }}>
                        Manage reservations, revenue, and operations — all in one place.
                    </p>

                    <div className="row g-3 mb-3">
                        <div className="col-6">
                            <div
                                className="rounded-4 p-4 h-100"
                                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                            >
                                <p className="small mb-2" style={{ color: 'rgba(224, 231, 255, 0.8)' }}>Occupancy</p>
                                <p className="text-white fw-bold mb-1" style={{ fontSize: '1.875rem' }}>94%</p>
                                <p className="small mb-0" style={{ color: '#6ee7b7' }}>+3.2%</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className="rounded-4 p-4 h-100"
                                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                            >
                                <p className="small mb-2" style={{ color: 'rgba(224, 231, 255, 0.8)' }}>Revenue</p>
                                <p className="text-white fw-bold mb-1" style={{ fontSize: '1.875rem' }}>$48.2K</p>
                                <p className="small mb-0" style={{ color: '#6ee7b7' }}>+8.1%</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="rounded-4 p-4 mb-3"
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                    >
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <p className="text-white fw-semibold small mb-0">Bookings Overview</p>
                            <span
                                className="small px-2 py-1 rounded-pill"
                                style={{ color: 'rgba(224, 231, 255, 0.7)', background: 'rgba(255,255,255,0.1)' }}
                            >
                                Last 12 months
                            </span>
                        </div>
                        <div className="d-flex align-items-end gap-2" style={{ height: '5rem' }}>
                            {[40, 55, 35, 65, 50, 60, 45, 75, 100, 55, 65, 30].map((h, i) => (
                                <div
                                    key={i}
                                    className="rounded-2 flex-grow-1"
                                    style={{
                                        height: `${h}%`,
                                        background: i === 8 ? '#fff' : 'rgba(255,255,255,0.3)',
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        className="rounded-4 p-4 mb-4"
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                    >
                        <p className="text-white fw-semibold small mb-3">Recent Bookings</p>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="small" style={{ color: '#eef2ff' }}>Presidential Suite</span>
                                <span
                                    className="small fw-medium px-2 py-1 rounded-pill"
                                    style={{ color: '#6ee7b7', background: 'rgba(52, 211, 153, 0.15)' }}
                                >
                                    Check-in Today
                                </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="small" style={{ color: '#eef2ff' }}>Ocean View Deluxe</span>
                                <span
                                    className="small fw-medium px-2 py-1 rounded-pill"
                                    style={{ color: 'rgba(224, 231, 255, 0.7)', background: 'rgba(255,255,255,0.1)' }}
                                >
                                    Confirmed
                                </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="small" style={{ color: '#eef2ff' }}>Executive Room 402</span>
                                <span
                                    className="small fw-medium px-2 py-1 rounded-pill"
                                    style={{ color: '#fcd34d', background: 'rgba(251, 191, 36, 0.15)' }}
                                >
                                    Pending
                                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="d-flex align-items-center gap-3 rounded-4 px-4 py-3 align-self-start"
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center rounded-circle"
                            style={{ width: '36px', height: '36px', background: 'rgba(52, 211, 153, 0.2)' }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" width="18" height="18" style={{ color: '#6ee7b7' }}>
                                <path d="M3 17l6-6 4 4 8-8M21 11V7h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white small fw-semibold mb-0">Revenue up 18% this quarter</p>
                            <p className="small mb-0" style={{ color: 'rgba(224, 231, 255, 0.7)' }}>Compared to last quarter</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}