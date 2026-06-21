import React, { useState, useEffect } from 'react';

export default function HotelForm({ hotel, onSubmit, onCancel, loading }) {
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

    useEffect(() => {
        if (hotel) {
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
        }
    }, [hotel]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-12">
                    <label className="form-label fw-semibold">Hotel Name *</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        placeholder="https://www.hotel.com"
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label fw-semibold">Currency</label>
                    <select
                        name="currency"
                        className="form-select"
                        value={formData.currency}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                            onChange={handleChange}
                            id="isActive"
                        />
                        <label className="form-check-label" htmlFor="isActive">
                            Active (visible to staff and guests)
                        </label>
                    </div>
                </div>
            </div>
            <div className="mt-4 d-flex gap-2">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                    style={{ background: '#4f46e5', border: 'none' }}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Saving...
                        </>
                    ) : (
                        hotel ? 'Update Hotel' : 'Create Hotel'
                    )}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}