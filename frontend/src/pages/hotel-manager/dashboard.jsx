import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../layouts/DashboardLayout';


export default function Dashboard() {
    const { user } = useAuth();
    const [stats] = useState({
        totalBookings: 142,
        totalRevenue: 48280,
        occupancyRate: 94,
        checkInsToday: 12,
    });

    const [activities] = useState([
        { id: 1, icon: '📅', message: 'New booking: Suite 401 - John Doe', time: '2 min ago', user: 'Receptionist' },
        { id: 2, icon: '✅', message: 'Guest checked in: Room 203 - Sarah Smith', time: '15 min ago', user: 'Front Desk' },
        { id: 3, icon: '🧹', message: 'Room 105 marked as clean', time: '32 min ago', user: 'Housekeeping' },
        { id: 4, icon: '🔧', message: 'Maintenance request: AC broken in Room 302', time: '1 hour ago', user: 'Guest' },
        { id: 5, icon: '📅', message: 'Booking cancelled: Deluxe Suite - Michael Brown', time: '2 hours ago', user: 'System' },
    ]);

    const statCards = [
        { key: 'bookings', label: 'Total Bookings', value: stats.totalBookings, icon: '📅', color: 'primary' },
        { key: 'revenue', label: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: 'success' },
        { key: 'occupancy', label: 'Occupancy Rate', value: `${stats.occupancyRate}%`, icon: '📊', color: 'info' },
        { key: 'checkins', label: 'Check-ins Today', value: stats.checkInsToday, icon: '🏩', color: 'warning' },
    ];

    const quickActions = [
        { icon: '➕', label: 'New Booking', path: '/bookings/create' },
        { icon: '👤', label: 'Add Guest', path: '/guests/create' },
        { icon: '🏨', label: 'Add Hotel', path: '/hotels/create' },
        { icon: '👥', label: 'Invite Staff', path: '/staff/invite' },
    ];

    return (
        <Layout>
            {/* Welcome Banner */}
            <div className="welcome-banner mb-4">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div>
                        <h2 className="fw-bold mb-1">Good Morning, {user?.name || 'Guest'}! 👋</h2>
                        <p className="mb-0" style={{ opacity: 0.8 }}>Welcome to your HotelFlow dashboard.</p>
                    </div>
                    <div className="d-flex align-items-center gap-3 mt-2 mt-sm-0">
                        <span className="badge">{user?.role || 'Guest'}</span>
                        <span style={{ opacity: 0.7, fontSize: 14 }}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="row g-3 mb-4">
                {statCards.map((card) => (
                    <div key={card.key} className="col-sm-6 col-xl-3">
                        <div className="stat-card d-flex align-items-center justify-content-between">
                            <div>
                                <div className="stat-label">{card.label}</div>
                                <div className="stat-number">{card.value}</div>
                            </div>
                            <div className={`stat-icon ${card.color}`}>{card.icon}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions + Activity */}
            <div className="row g-3">
                <div className="col-lg-4">
                    <div className="stat-card">
                        <h5 className="fw-bold mb-3" style={{ fontSize: 16 }}>Quick Actions</h5>
                        <div className="d-flex flex-wrap gap-2">
                            {quickActions.map((action) => (
                                <a key={action.label} href={action.path} className="quick-action">
                                    {action.icon} {action.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="stat-card">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold mb-0" style={{ fontSize: 16 }}>Recent Activity</h5>
                            <a href="/activity" className="text-primary small">View All</a>
                        </div>
                        {activities.map((activity) => (
                            <div key={activity.id} className="activity-item">
                                <div className="activity-icon">{activity.icon}</div>
                                <div className="activity-text">
                                    <div className="small">{activity.message}</div>
                                    <div className="d-flex gap-3">
                                        <span className="text-muted" style={{ fontSize: 11 }}>{activity.time}</span>
                                        <span className="text-muted" style={{ fontSize: 11 }}>by {activity.user}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}