@extends('layouts.app')

@section('content')
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow-sm border-0 card-hover">
                <div class="card-header bg-white border-0 pt-4">
                    <h2 class="font-playfair mb-0">Welcome back, {{ Auth::user()->name }}!</h2>
                    <p class="text-muted mt-2">You're logged into your Hotel Management Dashboard.</p>
                </div>
                <div class="card-body">
                    @feature('advanced_reports')
                        <div class="alert alert-purple border-0 rounded-3">
                            <i class="fas fa-chart-line me-2"></i>
                            ✨ Advanced Reports feature is enabled for your plan!
                        </div>
                    @endfeature
                    
                    <div class="row mt-4">
                        <div class="col-md-4 mb-3">
                            <div class="card text-center border-0 shadow-sm">
                                <div class="card-body">
                                    <i class="fas fa-building fa-2x hotel-text"></i>
                                    <h5 class="mt-2">Hotel Management</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card text-center border-0 shadow-sm">
                                <div class="card-body">
                                    <i class="fas fa-calendar-check fa-2x hotel-text"></i>
                                    <h5 class="mt-2">Bookings</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card text-center border-0 shadow-sm">
                                <div class="card-body">
                                    <i class="fas fa-chart-bar fa-2x hotel-text"></i>
                                    <h5 class="mt-2">Reports</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .alert-purple {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
</style>
@endsection