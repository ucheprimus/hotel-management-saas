import React from 'react';
import { Link } from 'react-router-dom';

export default function RecentActivity({ activities, loading }) {
    const getActivityIcon = (type) => {
        const icons = {
            booking: '📅',
            checkin: '✅',
            checkout: '📤',
            housekeeping: '🧹',
            maintenance: '🔧',
            payment: '💳',
            guest: '👤',
        };
        return icons[type] || '📌';
    };

    const getActivityColor = (type) => {
        const colors = {
            booking: 'border-primary',
            checkin: 'border-success',
            checkout: 'border-info',
            housekeeping: 'border-warning',
            maintenance: 'border-danger',
            payment: 'border-success',
            guest: 'border-secondary',
        };
        return colors[type] || 'border-secondary';
    };

    if (loading) {
        return (
            <div className="bg-white rounded-3 shadow-sm p-4 border-0">
                <h5 className="fw-bold mb-3">Recent Activity</h5>
                <div className="placeholder-glow">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="d-flex align-items-center gap-3 mb-3">
                            <span className="placeholder" style={{ width: '40px', height: '40px' }}></span>
                            <div className="flex-grow-1">
                                <span className="placeholder w-75"></span>
                                <span className="placeholder w-50 d-block"></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3 shadow-sm p-4 border-0">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Recent Activity</h5>
                <Link to="/activity" className="text-decoration-none small">View All</Link>
            </div>
            {activities.length === 0 ? (
                <p className="text-muted small mb-0">No recent activity</p>
            ) : (
                <div className="list-group list-group-flush">
                    {activities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="list-group-item px-0 py-2 border-0 d-flex align-items-center gap-3">
                            <div 
                                className={`border-start border-3 ${getActivityColor(activity.type)} ps-3`}
                                style={{ flex: 1 }}
                            >
                                <div className="d-flex align-items-center gap-2">
                                    <span>{getActivityIcon(activity.type)}</span>
                                    <span className="small">{activity.message}</span>
                                </div>
                                <div className="d-flex gap-3 mt-1">
                                    <span className="text-muted small">{activity.time}</span>
                                    <span className="text-muted small">by {activity.user}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}