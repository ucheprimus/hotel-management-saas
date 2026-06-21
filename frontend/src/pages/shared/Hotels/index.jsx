import React, { useState, useEffect } from 'react';
import { hotelApi } from '../../../services/hotelApi';
import HotelCard from '../../../components/HotelCard';
import HotelFormModal from '../../../components/HotelFormModal';
import Loader from '../../../components/Loader';
import { useAuth } from '../../../context/AuthContext';

export default function HotelsPage() {
    const { user } = useAuth();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const isAdmin = user?.roles?.includes('Platform Admin') || user?.role === 'Platform Admin';
    const isOwner = user?.roles?.includes('Hotel Owner') || user?.role === 'Hotel Owner';
    const canManage = isAdmin || isOwner;

    useEffect(() => {
        loadHotels();
    }, []);


    const getPermissions = (user) => {
    const roles = user?.roles || [];
    const isAdmin = roles.includes('Platform Admin');
    const isOwner = roles.includes('Hotel Owner');
    const isManager = roles.includes('Hotel Manager');
    const isReceptionist = roles.includes('Receptionist');

    return {
        canView: isAdmin || isOwner || isManager || isReceptionist,
        canCreate: isAdmin || isOwner,
        canEdit: isAdmin || isOwner || isManager,
        canDelete: isAdmin || isOwner,
        canManageSettings: isAdmin || isOwner,
        canViewSettings: isAdmin || isOwner || isManager,
    };
};

const permissions = getPermissions(user);

    const loadHotels = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await hotelApi.getHotels();
            setHotels(response.data || []);
        } catch (err) {
            console.error('Load hotels error:', err);
            setError(err.response?.data?.message || 'Failed to load hotels');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (data) => {
        setSubmitting(true);
        try {
            await hotelApi.createHotel(data);
            setShowModal(false);
            loadHotels();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create hotel');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async (data) => {
        setSubmitting(true);
        try {
            await hotelApi.updateHotel(editingHotel.id, data);
            setShowModal(false);
            setEditingHotel(null);
            loadHotels();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update hotel');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this hotel?')) return;
        try {
            await hotelApi.deleteHotel(id);
            loadHotels();
        } catch (err) {
            setError('Failed to delete hotel');
        }
    };

    const openCreateModal = () => {
        setEditingHotel(null);
        setShowModal(true);
    };

    const openEditModal = (hotel) => {
        setEditingHotel(hotel);
        setShowModal(true);
    };

    if (loading) {
        return <Loader fullPage={true} size="lg" />;
    }

    return (
        <div className="container-fluid px-4 py-4">
            {/* Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold mb-1">Hotels</h1>
                    <p className="text-muted">Manage your hotel properties</p>
                </div>
                {canManage && (
                    <button
                        onClick={openCreateModal}
                        className="btn btn-primary px-4 py-2"
                        style={{ background: '#4f46e5', border: 'none' }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>Add Hotel
                    </button>
                )}
            </div>

            {/* Error Alert */}
            {error && (
                <div className="alert alert-danger alert-dismissible" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
            )}

            {/* Hotel Grid */}
            {hotels.length === 0 ? (
                <div className="text-center py-5">
                    <div className="text-muted mb-3">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#cbd5e1" />
                            <polyline points="9 22 9 12 15 12 15 22" stroke="#cbd5e1" />
                        </svg>
                    </div>
                    <h5 className="text-muted">No hotels yet</h5>
                    <p className="text-muted small">Click "Add Hotel" to create your first hotel</p>
                    {canManage && (
                        <button
                            onClick={openCreateModal}
                            className="btn btn-primary mt-2"
                            style={{ background: '#4f46e5', border: 'none' }}
                        >
                            Create First Hotel
                        </button>
                    )}
                </div>
            ) : (
                <div className="row g-3">
                    {hotels.map((hotel) => (
                        <div key={hotel.id} className="col-md-6 col-lg-4">
                            <HotelCard
                                hotel={hotel}
                                onEdit={canManage ? openEditModal : null}
                                onDelete={canManage ? handleDelete : null}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <HotelFormModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingHotel(null);
                }}
                onSubmit={editingHotel ? handleUpdate : handleCreate}
                hotel={editingHotel}
                loading={submitting}
            />

            {/* Bootstrap Icons */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
        </div>
    );
}