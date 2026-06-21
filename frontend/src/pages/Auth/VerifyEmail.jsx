import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function VerifyEmail() {
    const { user } = useAuth();
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const verified = Boolean(user?.email_verified_at);

    const resendVerification = async () => {
        setLoading(true);
        setStatus('');
        try {
            await axios.post('/api/v1/auth/email/verification-notification');
            setStatus('Verification email sent!');
        } catch (err) {
            setStatus('Failed to send verification email');
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

                {!verified ? (
                    <>
                        <div className="text-center mb-4">
                            <div
                                className="d-inline-flex align-items-center justify-content-center position-relative mb-3"
                                style={{ width: '64px', height: '64px', borderRadius: '18px', background: '#ece9fd' }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" width="28" height="28" style={{ color: '#4f46e5' }}>
                                    <path d="M4 6.5A1.5 1.5 0 015.5 5h13A1.5 1.5 0 0120 6.5v11a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17.5v-11z" stroke="currentColor" strokeWidth="1.7" />
                                    <path d="M5 7l7 5.5L19 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div
                                    className="d-flex align-items-center justify-content-center position-absolute"
                                    style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f59e0b', top: '-4px', right: '-4px', border: '2px solid white' }}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" width="13" height="13">
                                        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                                        <path d="M12 7v5l3.5 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <h1 className="fw-bold text-dark mb-2" style={{ fontSize: '1.875rem' }}>Verify your email</h1>
                            <p className="text-secondary mb-0">We've sent a verification link to your email address.</p>
                        </div>

                        <div
                            className="bg-white rounded-4 p-4 p-md-5"
                            style={{ border: '1px solid #f1f1f4', boxShadow: '0 20px 40px -15px rgba(79, 70, 229, 0.15)' }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-between gap-3 rounded-4 p-3 mb-3"
                                style={{ background: '#f7f7fa', border: '1px solid #efeff3' }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ece9fd' }}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18" style={{ color: '#4f46e5' }}>
                                            <path d="M4 6.5A1.5 1.5 0 015.5 5h13A1.5 1.5 0 0120 6.5v11a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17.5v-11z" stroke="currentColor" strokeWidth="1.7" />
                                            <path d="M5 7l7 5.5L19 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="fw-semibold text-dark mb-0 small">{user?.email || 'your@email.com'}</p>
                                        <p className="text-secondary mb-0" style={{ fontSize: '12px' }}>Sent 2 minutes ago</p>
                                    </div>
                                </div>
                                <span
                                    className="small fw-medium px-3 py-1 rounded-pill flex-shrink-0"
                                    style={{ background: '#fbeed5', color: '#854f0b' }}
                                >
                                    ● Pending Verification
                                </span>
                            </div>

                            <div
                                className="d-flex align-items-start gap-2 rounded-3 p-3 mb-4 small"
                                style={{ background: '#fdf8e6', border: '1px solid #f5e8b8', color: '#7a6420' }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" width="16" height="16" className="flex-shrink-0 mt-1">
                                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                                    <path d="M12 11v5M12 8v.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                                </svg>
                                <span>Didn't receive the email? Check your spam folder or request a new link.</span>
                            </div>

                            {status && (
                                <div className="alert alert-info py-2 small rounded-3 mb-3" role="alert">
                                    {status}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={resendVerification}
                                disabled={loading}
                                className="btn w-100 text-white fw-semibold py-3 rounded-pill border-0 mb-3"
                                style={{
                                    background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                                    boxShadow: '0 12px 24px -8px rgba(79, 70, 229, 0.5)',
                                }}
                            >
                                {loading ? 'Sending...' : 'Resend Verification Email'}
                            </button>

                            <Link
                                to="/account/email"
                                className="btn w-100 fw-semibold py-3 rounded-pill text-dark"
                                style={{ border: '1px solid #e2e2e8', background: 'white' }}
                            >
                                Change Email Address
                            </Link>
                        </div>
                    </>
                ) : (
                    <div
                        className="bg-white rounded-4 p-4 p-md-5 text-center"
                        style={{ border: '1px solid #f1f1f4', boxShadow: '0 20px 40px -15px rgba(79, 70, 229, 0.15)' }}
                    >
                        <div
                            className="d-inline-flex align-items-center justify-content-center position-relative mb-3"
                            style={{ width: '64px', height: '64px', borderRadius: '18px', background: '#d8f7e8' }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" width="28" height="28" style={{ color: '#0f6e56' }}>
                                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div
                                className="d-flex align-items-center justify-content-center position-absolute"
                                style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0f6e56', top: '-4px', right: '-4px', border: '2px solid white' }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" width="13" height="13">
                                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="fw-bold text-dark mb-2" style={{ fontSize: '1.625rem' }}>Email Verified!</h2>
                        <p className="text-secondary mb-4">Your email address has been successfully verified.</p>

                        <div
                            className="d-flex align-items-center justify-content-between gap-3 rounded-4 p-3 mb-4"
                            style={{ background: '#e9f9f0', border: '1px solid #cdf0dd' }}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#c2efd9' }}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" style={{ color: '#0f6e56' }}>
                                        <path d="M4 6.5A1.5 1.5 0 015.5 5h13A1.5 1.5 0 0120 6.5v11a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17.5v-11z" stroke="currentColor" strokeWidth="1.7" />
                                        <path d="M5 7l7 5.5L19 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p className="fw-semibold text-dark mb-0 small">{user?.email}</p>
                            </div>
                            <span
                                className="small fw-medium px-3 py-1 rounded-pill flex-shrink-0"
                                style={{ background: '#0f6e56', color: 'white' }}
                            >
                                ● Verified
                            </span>
                        </div>

                        <Link
                            to="/dashboard"
                            className="btn w-100 text-white fw-semibold py-3 rounded-pill border-0"
                            style={{
                                background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                                boxShadow: '0 12px 24px -8px rgba(79, 70, 229, 0.5)',
                            }}
                        >
                            Continue to Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}