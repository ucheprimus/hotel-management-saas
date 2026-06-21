import React from 'react';
import { useAuth } from '../../context/AuthContext';
import HousekeepingLayout from '../../layouts/HousekeepingLayout';

export default function HousekeepingDashboard() {
    const { user } = useAuth();

    return (
        <HousekeepingLayout>
            <div className="welcome-banner mb-4">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div>
                        <h2 className="fw-bold mb-1">Welcome back, {user?.name || 'Guest'}! 👋</h2>
                        <p className="mb-0" style={{ opacity: 0.8 }}>Manage your cleaning tasks and room status.</p>
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
                <div className="col-md-4">
                    <div className="stat-card">
                        <div className="stat-label">Rooms to Clean</div>
                        <div className="stat-number">6</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card">
                        <div className="stat-label">In Progress</div>
                        <div className="stat-number">3</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card">
                        <div className="stat-label">Completed Today</div>
                        <div className="stat-number">18</div>
                    </div>
                </div>
            </div>
        </HousekeepingLayout>
    );
}