@extends('layouts.app')

@section('content')
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-white border-0 pt-4 text-center">
                    <i class="fas fa-hotel fa-3x hotel-text mb-3"></i>
                    <h2 class="font-playfair">Welcome! Let's set up your hotel</h2>
                    <p class="text-muted">Create your first hotel to get started</p>
                </div>
                <div class="card-body p-4">
                    <form method="POST" action="{{ route('onboarding.store') }}">
                        @csrf
                        
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Hotel Name</label>
                            <input type="text" name="hotel_name" class="form-control" required autofocus>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Hotel Email</label>
                            <input type="email" name="hotel_email" class="form-control" value="{{ Auth::user()->email }}">
                        </div>
                        
                        <button type="submit" class="btn btn-hotel w-100">
                            <i class="fas fa-check-circle me-2"></i>Create My Hotel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection