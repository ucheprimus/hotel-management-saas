import React from 'react';


export default function StatsCards({ stats, loading, userRole }) {
    const isAdmin = userRole === 'Platform Admin';
    
    const cards = [
        { 
            key: 'totalBookings', 
            label: 'Total Bookings', 
            icon: '📅', 
            color: 'primary',
            value: stats?.totalBookings || 0,
        },
        { 
            key: 'totalRevenue', 
            label: 'Revenue', 
            icon: '💰', 
            color: 'success',
            value: `$${stats?.totalRevenue?.toLocaleString() || 0}`,
        },
        { 
            key: 'occupancyRate', 
            label: 'Occupancy Rate', 
            icon: '📊', 
            color: 'info',
            value: `${stats?.occupancyRate || 0}%`,
        },
        { 
            key: 'checkInsToday', 
            label: 'Check-ins Today', 
            icon: '🏩', 
            color: 'warning',
            value: stats?.checkInsToday || 0,
        },
    ];

    // Extra cards for Platform Admin
    if (isAdmin) {
        cards.push(
            { 
                key: 'totalHotels', 
                label: 'Total Hotels', 
                icon: '🏨', 
                color: 'dark',
                value: stats?.totalHotels || 0,
            },
            { 
                key: 'totalProperties', 
                label: 'Total Properties', 
                icon: '🏢', 
                color: 'secondary',
                value: stats?.totalProperties || 0,
            }
        );
    }

    if (loading) {
        return (
            <div className="row g-3 mb-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="col-md-3 col-sm-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center py-3">
                                <div className="placeholder-glow">
                                    <span className="placeholder w-100" style={{ height: '60px' }}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="row g-3 mb-4">
            {cards.map((card) => (
                <div key={card.key} className="col-md-3 col-sm-6">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="text-muted small mb-1">{card.label}</p>
                                    <h3 className="fw-bold mb-0">{card.value}</h3>
                                </div>
                                <div 
                                    className={`bg-${card.color} bg-opacity-10 rounded-3 p-3`}
                                    style={{ fontSize: '28px' }}
                                >
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}