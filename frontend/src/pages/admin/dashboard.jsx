import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../layouts/AdminLayout';
import WelcomeBanner from '../../components/WelcomeBanner';

export default function AdminDashboard() {
    const { user } = useAuth();

    return (
        <AdminLayout>
            <WelcomeBanner user={user} />
            <div className="row g-3">
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Total Hotels</div>
                        <div className="stat-number">45</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Total Properties</div>
                        <div className="stat-number">127</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Total Users</div>
                        <div className="stat-number">348</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-label">Total Revenue</div>
                        <div className="stat-number">$48,280</div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}