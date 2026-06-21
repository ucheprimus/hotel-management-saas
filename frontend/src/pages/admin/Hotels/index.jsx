import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import HotelCard from '../../../components/HotelCard';
import HotelForm from '../../shared/Hotels/HotelForm';
import Loader from '../../../components/Loader';
import { hotelApi } from '../../../services/hotelApi';

export default function AdminHotels() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadHotels();
    }, []);

    const loadHotels = async () => {
        try {
            setLoading(true);
            const response = await hotelApi.getHotels();
            setHotels(response.data || []);
        } catch (err) {
            setError('Failed to load hotels');
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
            setError('Failed to create hotel');
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
            setError('Failed to update hotel');
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

    if (loading) return <Loader fullPage={true} size="lg" />;

    return (
        <AdminLayout>
            <div className="container-fluid px-4 py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="fw-bold mb-1">Hotels</h1>
                        <p className="text-muted">Manage all hotels on the platform</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-primary px-4 py-2"
                        style={{ background: '#4f46e5', border: 'none' }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>Add Hotel
                    </button>
                </div>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                {hotels.length === 0 ? (
                    <div className="text-center py-5">
                        <h5 className="text-muted">No hotels found</h5>
                        <p className="text-muted small">Click "Add Hotel" to create the first one</p>
                    </div>
                ) : (
                    <div className="row g-3">
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className="col-md-6 col-lg-4">
                                <HotelCard
                                    hotel={hotel}
                                    onEdit={() => {
                                        setEditingHotel(hotel);
                                        setShowModal(true);
                                    }}
                                    onDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fw-bold">
                                        {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => {
                                            setShowModal(false);
                                            setEditingHotel(null);
                                        }}
                                    />
                                </div>
                                <div className="modal-body">
                                    <HotelForm
                                        hotel={editingHotel}
                                        onSubmit={editingHotel ? handleUpdate : handleCreate}
                                        onCancel={() => {
                                            setShowModal(false);
                                            setEditingHotel(null);
                                        }}
                                        loading={submitting}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}