import React from 'react';
import { Link } from 'react-router-dom';


export default function QuickActions({ userRole }) {
    const getActions = () => {
        const actions = [];
        
        // Common actions
        actions.push({ icon: '➕', label: 'New Booking', path: '/bookings/create', color: 'primary' });
        actions.push({ icon: '👤', label: 'Add Guest', path: '/guests/create', color: 'success' });
        
        // Role-specific actions
        if (['Hotel Owner', 'Hotel Manager'].includes(userRole)) {
            actions.push({ icon: '🏨', label: 'Add Hotel', path: '/hotels/create', color: 'info' });
            actions.push({ icon: '👥', label: 'Invite Staff', path: '/staff/invite', color: 'warning' });
        }
        
        if (userRole === 'Housekeeping') {
            actions.push({ icon: '🧹', label: 'View Tasks', path: '/housekeeping', color: 'secondary' });
        }
        
        if (userRole === 'Platform Admin') {
            actions.push({ icon: '🏢', label: 'Manage Tenants', path: '/tenants', color: 'danger' });
            actions.push({ icon: '📊', label: 'Platform Analytics', path: '/reports/platform', color: 'dark' });
        }
        
        return actions.slice(0, 6);
    };

    const actions = getActions();

    return (
        <div className="bg-white rounded-3 shadow-sm p-4 mb-4 border-0">
            <h5 className="fw-bold mb-3">Quick Actions</h5>
            <div className="d-flex flex-wrap gap-2">
                {actions.map((action) => (
                    <Link
                        key={action.path}
                        to={action.path}
                        className={`btn btn-${action.color} d-flex align-items-center gap-2`}
                        style={{ 
                            borderRadius: '10px',
                            padding: '8px 18px',
                        }}
                    >
                        <span>{action.icon}</span>
                        <span>{action.label}</span>
                    </Link>
                ))}
                {actions.length === 0 && (
                    <p className="text-muted small mb-0">No quick actions available for your role</p>
                )}
            </div>
        </div>
    );
}