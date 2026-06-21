import React from 'react';

export default function WelcomeBanner({ user }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const getRoleBadge = () => {
        const role = user?.role || 'Guest';
        const colors = {
            'Platform Admin': 'bg-danger',
            'Hotel Owner': 'bg-primary',
            'Hotel Manager': 'bg-info',
            'Receptionist': 'bg-success',
            'Housekeeping': 'bg-warning text-dark',
        };
        return colors[role] || 'bg-secondary';
    };

    return (
        <div className="bg-white rounded-3 shadow-sm p-4 mb-4 border-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div>
                    <h2 className="fw-bold mb-1">
                        {getGreeting()}, {user?.name || 'Guest'}! 👋
                    </h2>
                    <p className="text-muted mb-0">
                        Welcome to your HotelFlow dashboard. Here's what's happening today.
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3 mt-2 mt-sm-0">
                    <span className={`badge ${getRoleBadge()} px-3 py-2 fs-6`}>
                        {user?.role || 'Guest'}
                    </span>
                    <span className="text-muted small">
                        {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}