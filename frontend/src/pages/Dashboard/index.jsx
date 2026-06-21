import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../layouts/AuthenticatedLayout';

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome back, {user?.name}!
                        </h1>
                        <p className="text-gray-500 mt-2">
                            You're logged into your Hotel Management Dashboard.
                        </p>

                        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-sm text-amber-700">
                                <span className="font-medium">Current Hotel:</span> {user?.current_tenant?.data?.name || 'No hotel selected'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                                <div className="text-3xl mb-2">🏨</div>
                                <h3 className="font-medium">Hotel Management</h3>
                            </div>
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                                <div className="text-3xl mb-2">📅</div>
                                <h3 className="font-medium">Bookings</h3>
                            </div>
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                                <div className="text-3xl mb-2">📊</div>
                                <h3 className="font-medium">Reports</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}