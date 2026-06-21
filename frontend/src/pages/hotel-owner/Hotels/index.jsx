import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hotelApi } from '../../services/hotelApi';
import Layout from '../../layouts/DashboardLayout';  // Only this one
import Loader from '../../components/Loader';

export default function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        currency: 'USD',
        timezone: 'UTC',
        is_active: true,
    });
    const [submitting, setSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const navigate = useNavigate();

    // Load hotels
    useEffect(() => {
        loadHotels();
    }, []);

    const loadHotels = async () => {
        try {
            setLoading(true);
            const response = await hotelApi.getHotels();
            setHotels(response.data);
        } catch (err) {
            setError('Failed to load hotels');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Open create modal
    const openCreateModal = () => {
        setEditingHotel(null);
        setFormData({
            name: '',
            address: '',
            phone: '',
            email: '',
            website: '',
            currency: 'USD',
            timezone: 'UTC',
            is_active: true,
        });
        setShowModal(true);
    };

    // Open edit modal
    const openEditModal = (hotel) => {
        setEditingHotel(hotel);
        setFormData({
            name: hotel.name || '',
            address: hotel.address || '',
            phone: hotel.phone || '',
            email: hotel.email || '',
            website: hotel.website || '',
            currency: hotel.currency || 'USD',
            timezone: hotel.timezone || 'UTC',
            is_active: hotel.is_active !== undefined ? hotel.is_active : true,
        });
        setShowModal(true);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingHotel) {
                await hotelApi.updateHotel(editingHotel.id, formData);
            } else {
                await hotelApi.createHotel(formData);
            }
            setShowModal(false);
            loadHotels();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this hotel?')) return;
        try {
            await hotelApi.deleteHotel(id);
            loadHotels();
        } catch (err) {
            setError('Failed to delete hotel');
        }
    };

    // Format currency
    const formatCurrency = (code) => {
        const currencies = { USD: '$', EUR: '€', GBP: '£', NGN: '₦', KES: 'KSh' };
        return currencies[code] || code;
    };

    return (
        <Layout>
            <div className="container py-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="fw-bold mb-1">Hotels</h1>
                        <p className="text-muted">Manage your hotel properties</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="btn btn-primary px-4 py-2"
                        style={{ background: '#4f46e5', border: 'none' }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>Add Hotel
                    </button>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="alert alert-danger alert-dismissible" role="alert">
                        {error}
                        <button type="button" className="btn-close" onClick={() => setError('')}></button>
                    </div>
                )}

                {/* Loading */}
                {loading ? (
    <Loader size="lg" fullPage />
) : hotels.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="text-muted mb-3">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#cbd5e1" />
                                <polyline points="9 22 9 12 15 12 15 22" stroke="#cbd5e1" />
                            </svg>
                        </div>
                        <h5 className="text-muted">No hotels yet</h5>
                        <p className="text-muted small">Click "Add Hotel" to create your first hotel</p>
                        <button
                            onClick={openCreateModal}
                            className="btn btn-primary mt-2"
                            style={{ background: '#4f46e5', border: 'none' }}
                        >
                            Create First Hotel
                        </button>
                    </div>
                ) : (
                    <div className="row g-3">
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className="col-md-6 col-lg-4">
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h5 className="card-title fw-bold mb-0">{hotel.name}</h5>
                                            <span className={`badge ${hotel.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                                {hotel.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        {hotel.address && (
                                            <p className="card-text small text-muted mb-1">
                                                <i className="bi bi-geo-alt me-1"></i>{hotel.address}
                                            </p>
                                        )}
                                        {hotel.phone && (
                                            <p className="card-text small text-muted mb-1">
                                                <i className="bi bi-telephone me-1"></i>{hotel.phone}
                                            </p>
                                        )}
                                        {hotel.email && (
                                            <p className="card-text small text-muted mb-1">
                                                <i className="bi bi-envelope me-1"></i>{hotel.email}
                                            </p>
                                        )}
                                        <p className="card-text small text-muted mb-0">
                                            <i className="bi bi-currency-dollar me-1"></i>Currency: {hotel.currency} ({formatCurrency(hotel.currency)})
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-0 d-flex gap-2">
                                        <button
                                            onClick={() => openEditModal(hotel)}
                                            className="btn btn-outline-primary btn-sm flex-grow-1"
                                        >
                                            <i className="bi bi-pencil me-1"></i>Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(hotel.id)}
                                            className="btn btn-outline-danger btn-sm"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fw-bold">
                                        {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Hotel Name *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="e.g., Grand Plaza Hotel"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    className="form-control"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    placeholder="123 Main Street, City, Country"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Phone</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="+1-234-567-8900"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="info@hotel.com"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Website</label>
                                                <input
                                                    type="url"
                                                    name="website"
                                                    className="form-control"
                                                    value={formData.website}
                                                    onChange={handleInputChange}
                                                    placeholder="https://www.hotel.com"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label fw-semibold">Currency</label>
                                                <select
                                                    name="currency"
                                                    className="form-select"
                                                    value={formData.currency}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="USD">USD ($)</option>
                                                    <option value="EUR">EUR (€)</option>
                                                    <option value="GBP">GBP (£)</option>
                                                    <option value="NGN">NGN (₦)</option>
                                                    <option value="KES">KES (KSh)</option>
                                                    <option value="ZAR">ZAR (R)</option>
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label fw-semibold">Timezone</label>
                                                <select
                                                    name="timezone"
                                                    className="form-select"
                                                    value={formData.timezone}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="UTC">UTC</option>
                                                    <option value="Africa/Lagos">Lagos (GMT+1)</option>
                                                    <option value="Africa/Nairobi">Nairobi (GMT+3)</option>
                                                    <option value="America/New_York">New York (GMT-5)</option>
                                                    <option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
                                                    <option value="Europe/London">London (GMT+0)</option>
                                                    <option value="Europe/Paris">Paris (GMT+1)</option>
                                                    <option value="Asia/Dubai">Dubai (GMT+4)</option>
                                                    <option value="Asia/Singapore">Singapore (GMT+8)</option>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        name="is_active"
                                                        className="form-check-input"
                                                        checked={formData.is_active}
                                                        onChange={handleInputChange}
                                                        id="isActive"
                                                    />
                                                    <label className="form-check-label" htmlFor="isActive">
                                                        Active (visible to staff and guests)
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={submitting}
                                            style={{ background: '#4f46e5', border: 'none' }}
                                        >
                                            {submitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Saving...
                                                </>
                                            ) : (
                                                editingHotel ? 'Update Hotel' : 'Create Hotel'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bootstrap Icons CDN */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
        </Layout>
    );
}