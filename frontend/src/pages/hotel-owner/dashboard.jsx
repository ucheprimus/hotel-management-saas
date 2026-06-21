import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../layouts/DashboardLayout';
import WelcomeBanner from '../../components/WelcomeBanner';

export default function HotelOwnerDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalHotels: 1,
        totalBookings: 142,
        totalRevenue: 48280,
        occupancyRate: 94,
    });

    return (
        <Layout>
            <div className="container-fluid px-4 py-4">
                <WelcomeBanner user={user} />
                <h2 className="fw-bold mb-3">Hotel Overview</h2>
                <div className="row g-3 mb-4">
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-label">My Hotels</div>
                            <div className="stat-number">{stats.totalHotels}</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-label">Total Bookings</div>
                            <div className="stat-number">{stats.totalBookings}</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-label">Revenue</div>
                            <div className="stat-number">${stats.totalRevenue.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-label">Occupancy</div>
                            <div className="stat-number">{stats.occupancyRate}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}