import React from 'react';
import { useAuth } from '../../context/AuthContext';
import ReceptionistLayout from '../../layouts/ReceptionistLayout';

export default function ReceptionistDashboard() {
    const { user } = useAuth();

    return (
        <ReceptionistLayout>
            <div className="welcome-banner mb-4">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div>
                        <h2 className="fw-bold mb-1">Welcome back, {user?.name || 'Guest'}! 👋</h2>
                        <p className="mb-0" style={{ opacity: 0.8 }}>Manage check-ins, check-outs, and guest requests.</p>
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
                        <div className="stat-label">Check-ins Today</div>
                        <div className="stat-number">12</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Check-outs Today</div>
                        <div className="stat-number">8</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Available Rooms</div>
                        <div className="stat-number">25</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Occupancy</div>
                        <div className="stat-number">94%</div>
                    </div>
                </div>
            </div>
        </ReceptionistLayout>
    );
}