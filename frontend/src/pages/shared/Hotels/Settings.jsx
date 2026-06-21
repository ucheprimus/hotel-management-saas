import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { hotelApi } from '../../../services/hotelApi';
import Loader from '../../../components/Loader';

export default function HotelSettings() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [settings, setSettings] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        currency: 'USD',
        timezone: 'UTC',
    });

    useEffect(() => {
        loadHotel();
    }, [id]);

    const loadHotel = async () => {
        try {
            setLoading(true);
            const response = await hotelApi.getHotel(id);
            const hotel = response.data;
            setSettings({
                name: hotel.name || '',
                address: hotel.address || '',
                phone: hotel.phone || '',
                email: hotel.email || '',
                website: hotel.website || '',
                currency: hotel.currency || 'USD',
                timezone: hotel.timezone || 'UTC',
            });
        } catch (err) {
            setError('Failed to load hotel settings');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');
        try {
            await hotelApi.updateHotel(id, settings);
            setSuccess('Hotel settings updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <Loader fullPage={true} size="md" />;
    }

    return (
        <div className="container-fluid px-4 py-4">
            <div className="d-flex align-items-center gap-3 mb-4">
                <button
                    onClick={() => navigate('/hotels')}
                    className="btn btn-outline-secondary btn-sm"
                >
                    <i className="bi bi-arrow-left"></i> Back
                </button>
                <h1 className="fw-bold mb-0">Hotel Settings</h1>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    {error && (
                        <div className="alert alert-danger alert-dismissible" role="alert">
                            {error}
                            <button type="button" className="btn-close" onClick={() => setError('')}></button>
                        </div>
                    )}
                    {success && (
                        <div className="alert alert-success alert-dismissible" role="alert">
                            {success}
                            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label fw-semibold">Hotel Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={settings.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={settings.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={settings.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={settings.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    className="form-control"
                                    value={settings.website}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label fw-semibold">Currency</label>
                                <select
                                    name="currency"
                                    className="form-select"
                                    value={settings.currency}
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
                                    value={settings.timezone}
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
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                                disabled={saving}
                                style={{ background: '#4f46e5', border: 'none' }}
                            >
                                {saving ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Saving...
                                    </>
                                ) : (
                                    'Save Settings'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
        </div>
    );
}