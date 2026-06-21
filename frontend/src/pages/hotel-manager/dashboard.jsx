import React from 'react';
import { useAuth } from '../../context/AuthContext';
import HotelManagerLayout from '../../layouts/HotelManagerLayout';

export default function HotelManagerDashboard() {
    const { user } = useAuth();

    return (
        <HotelManagerLayout>
            <div className="welcome-banner mb-4">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div>
                        <h2 className="fw-bold mb-1">Welcome back, {user?.name || 'Guest'}! 👋</h2>
                        <p className="mb-0" style={{ opacity: 0.8 }}>Oversee daily hotel operations.</p>
                    </div>
                    <div className="d-flex align-items-center gap-3 mt-2 mt-sm-0">
                        <span className="badge">{user?.role || 'Guest'}</span>
                        <span style={{ opacity: 0.7, fontSize: 14 }}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Hotels</div>
                        <div className="stat-number">1</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Staff</div>
                        <div className="stat-number">12</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Bookings</div>
                        <div className="stat-number">142</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Revenue</div>
                        <div className="stat-number">$48,280</div>
                    </div>
                </div>
            </div>
        </HotelManagerLayout>
    );
}