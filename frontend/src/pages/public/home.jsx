import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
    const { user } = useAuth();

    return (
        <div>
            {/* Navigation */}
            <nav className="nav-blur sticky-top">
                <div className="container py-3 d-flex justify-content-between align-items-center">
                    <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
                        <div className="bg-gradient-primary rounded d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                            <span className="text-white fw-bold">H</span>
                        </div>
                        <span className="fw-bold fs-5 text-dark">Hotel<span className="text-indigo">Flow</span></span>
                    </Link>
                    <div className="d-flex gap-3 align-items-center">
                        {user ? (
                            <Link to="/dashboard" className="btn-primary-custom">Dashboard</Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-decoration-none text-secondary">Sign In</Link>
                                <Link to="/register" className="btn-primary-custom">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="container py-5">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <div className="hero-badge">
                            <span className="pulse-dot"></span>
                            Trusted by 2,000+ hotels worldwide
                        </div>
                        <h1 className="display-3 fw-bold mt-3">
                            Modern hotel management,<br />
                            <span className="text-gradient">simplified.</span>
                        </h1>
                        <p className="text-muted-custom fs-5 mt-3">
                            Manage reservations, revenue, housekeeping, and guest experiences — all in one powerful platform.
                        </p>
                        <div className="d-flex flex-wrap gap-3 mt-4">
                            {!user && (
                                <Link to="/register" className="btn-primary-custom">Start Free Trial</Link>
                            )}
                            <Link to={user ? "/dashboard" : "/login"} className="btn-outline-custom">
                                {user ? 'Go to Dashboard' : 'Learn More'}
                            </Link>
                        </div>
                        <div className="d-flex gap-4 mt-4 text-muted-custom small">
                            <span>✓ No credit card required</span>
                            <span>✓ 14-day free trial</span>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="dashboard-preview">
                            <div className="bg-white rounded-3 p-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="fw-bold mb-0">Today's Overview</h6>
                                    <small className="text-muted-custom">Updated just now</small>
                                </div>
                                <div className="row g-3">
                                    <div className="col-4">
                                        <div className="stat-box stat-box-indigo">
                                            <div className="stat-number text-indigo">94%</div>
                                            <div className="stat-label">Occupancy</div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="stat-box stat-box-green">
                                            <div className="stat-number text-green">$48K</div>
                                            <div className="stat-label">Revenue</div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="stat-box stat-box-amber">
                                            <div className="stat-number text-amber">12</div>
                                            <div className="stat-label">Check-ins</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-light py-5">
                <div className="container text-center">
                    <h2 className="fw-bold">Everything you need to run your hotel</h2>
                    <p className="text-muted-custom">Powerful features designed for modern hospitality</p>
                    <div className="row g-4 mt-3">
                        {[
                            { icon: '📅', title: 'Booking Engine', desc: 'Real-time availability and instant bookings' },
                            { icon: '🏨', title: 'Property Management', desc: 'Manage rooms, rates, and inventory' },
                            { icon: '👥', title: 'Guest Experience', desc: 'Personalized guest profiles and history' },
                            { icon: '📊', title: 'Analytics', desc: 'Revenue reports and occupancy insights' },
                        ].map((f) => (
                            <div key={f.title} className="col-sm-6 col-lg-3">
                                <div className="feature-card">
                                    <div className="feature-icon">{f.icon}</div>
                                    <h6 className="fw-bold">{f.title}</h6>
                                    <p className="text-muted-custom small">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="container text-center text-muted-custom py-4 small border-top">
                © {new Date().getFullYear()} HotelFlow. Empowering hotels worldwide.
            </footer>
        </div>
    );
}