import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthSuccess() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [dontShowAgain, setDontShowAgain] = useState(false);

    // Check if user has previously chosen to skip this page
    useEffect(() => {
        const skipAuthSuccess = localStorage.getItem('skipAuthSuccess');
        if (skipAuthSuccess === 'true') {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleContinue = () => {
        if (dontShowAgain) {
            localStorage.setItem('skipAuthSuccess', 'true');
        }
        navigate('/dashboard');
    };

    return (
        <div
            className="position-relative d-flex align-items-center justify-content-center px-4 py-5 overflow-hidden"
            style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fc, #eef0f7)' }}
        >
            {/* ambient decorative blobs */}
            <div
                className="position-absolute rounded-circle"
                style={{ top: '6rem', right: '6rem', width: '180px', height: '180px', background: 'rgba(124, 58, 237, 0.12)' }}
            />
            <div
                className="position-absolute rounded-circle"
                style={{ bottom: '5rem', left: '5rem', width: '90px', height: '90px', background: 'rgba(124, 58, 237, 0.1)' }}
            />

            <div className="position-relative w-100" style={{ maxWidth: '520px' }}>
                <div className="d-flex align-items-center justify-content-center gap-2 mb-5">
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

                <div className="text-center mb-4">
                    <div
                        className="d-inline-flex align-items-center justify-content-center mb-4"
                        style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)' }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center shadow-sm"
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '18px',
                                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" width="30" height="30" className="text-white">
                                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="fw-bold text-dark mb-2" style={{ fontSize: '2.25rem' }}>Welcome back!</h1>
                    <p className="text-secondary mb-0">Your account has been authenticated successfully.</p>
                </div>

                {/* User card */}
                <div
                    className="bg-white rounded-4 p-3 d-flex align-items-center justify-content-between gap-3 mb-3"
                    style={{ border: '1px solid #f1f1f4', boxShadow: '0 12px 30px -15px rgba(79, 70, 229, 0.15)' }}
                >
                    <div className="d-flex align-items-center gap-3">
                        <img
                            src={user?.avatar_url || 'https://placehold.co/56x56/ece9fd/4f46e5?text=' + (user?.name?.[0] || 'U')}
                            alt={user?.name || 'User avatar'}
                            className="rounded-circle flex-shrink-0"
                            style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                        />
                        <div>
                            <p className="fw-bold text-dark mb-0">{user?.name || 'Sarah Mitchell'}</p>
                            <p className="text-secondary mb-0 small">
                                {user?.role || 'General Manager'} · {user?.hotel_name || 'Grand Horizon Hotel'}
                            </p>
                        </div>
                    </div>
                    <span
                        className="small fw-medium px-3 py-1 rounded-pill flex-shrink-0 d-flex align-items-center gap-1"
                        style={{ background: '#d8f7e8', color: '#0f6e56' }}
                    >
                        <span className="rounded-circle" style={{ width: '6px', height: '6px', background: '#0f6e56', display: 'inline-block' }} />
                        Authenticated
                    </span>
                </div>

                {/* Blurred dashboard preview */}
                <div
                    className="position-relative rounded-4 p-3 mb-4"
                    style={{ border: '1px solid #f1f1f4', background: 'white', overflow: 'hidden' }}
                >
                    <div style={{ filter: 'blur(3px)', opacity: 0.6, userSelect: 'none', pointerEvents: 'none' }}>
                        <div className="row g-2 mb-2">
                            <div className="col-4">
                                <div className="rounded-3 p-3 h-100" style={{ background: '#f7f7fa' }}>
                                    <p className="text-secondary mb-1" style={{ fontSize: '11px' }}>Occupancy Rate</p>
                                    <p className="fw-bold text-dark mb-0">94.2%</p>
                                    <p className="mb-0" style={{ fontSize: '11px', color: '#0f6e56' }}>+3.2%</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="rounded-3 p-3 h-100" style={{ background: '#f7f7fa' }}>
                                    <p className="text-secondary mb-1" style={{ fontSize: '11px' }}>Total Revenue</p>
                                    <p className="fw-bold text-dark mb-0">$48,280</p>
                                    <p className="mb-0" style={{ fontSize: '11px', color: '#0f6e56' }}>+12.1%</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="rounded-3 p-3 h-100" style={{ background: '#f7f7fa' }}>
                                    <p className="text-secondary mb-1" style={{ fontSize: '11px' }}>Active Bookings</p>
                                    <p className="fw-bold text-dark mb-0">142</p>
                                    <p className="mb-0" style={{ fontSize: '11px', color: '#0f6e56' }}>+8</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3 p-3" style={{ background: '#f7f7fa' }}>
                            <p className="text-secondary mb-2" style={{ fontSize: '11px' }}>Booking Trends</p>
                            <div className="d-flex align-items-end gap-2" style={{ height: '64px' }}>
                                {[35, 50, 30, 60, 40, 70, 45, 55, 90, 50, 60, 35].map((h, i) => (
                                    <div
                                        key={i}
                                        className="rounded-2 flex-grow-1"
                                        style={{ height: `${h}%`, background: i === 8 ? '#6d5ce8' : '#d9d6f7' }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className="position-absolute top-50 start-50 translate-middle d-flex align-items-center gap-2 bg-white rounded-pill px-4 py-2 shadow-sm"
                        style={{ border: '1px solid #f1f1f4', whiteSpace: 'nowrap' }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" className="text-dark flex-shrink-0">
                            <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
                            <path d="M8 10.5V7.5a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                        </svg>
                        <span className="fw-medium text-dark small">Dashboard ready to access</span>
                    </div>
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    className="btn w-100 text-white fw-semibold py-3 rounded-pill border-0 mb-3 d-flex align-items-center justify-content-center gap-2"
                    style={{
                        background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                        boxShadow: '0 12px 24px -8px rgba(79, 70, 229, 0.5)',
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    Continue to Dashboard
                </button>

                {/* "Don't show this again" checkbox */}
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                    <input
                        type="checkbox"
                        id="dontShowAgain"
                        checked={dontShowAgain}
                        onChange={(e) => setDontShowAgain(e.target.checked)}
                        className="form-check-input"
                        style={{ cursor: 'pointer' }}
                    />
                    <label htmlFor="dontShowAgain" className="text-secondary small" style={{ cursor: 'pointer' }}>
                        Don't show this welcome screen again
                    </label>
                </div>

                {/* What's New Link */}
                <Link
                    to="/whats-new"
                    className="btn w-100 fw-semibold py-3 rounded-pill text-dark mb-4"
                    style={{ border: '1px solid #e2e2e8', background: 'white' }}
                >
                    View What's New
                </Link>

                <p className="text-center text-secondary small mb-0">
                    Last login: Today at 9:41 AM from San Francisco, CA
                </p>
            </div>
        </div>
    );
}