@extends('layouts.auth')

@section('title', 'Join Us')
@section('subtitle', 'Start your journey with us')
@section('auth-content')

@if ($errors->any())
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <ul class="mb-0">
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
@endif

<form method="POST" action="{{ route('register') }}" x-data="{ loading: false }" @submit="loading = true">
    @csrf
    
    <div class="mb-3">
        <label class="form-label fw-semibold">Full Name</label>
        <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
                <i class="fas fa-user text-muted"></i>
            </span>
            <input type="text" name="name" class="form-control auth-input border-start-0 ps-0" 
                   value="{{ old('name') }}" required placeholder="John Doe">
        </div>
    </div>
    
    <div class="mb-3">
        <label class="form-label fw-semibold">Email Address</label>
        <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
                <i class="fas fa-envelope text-muted"></i>
            </span>
            <input type="email" name="email" class="form-control auth-input border-start-0 ps-0" 
                   value="{{ old('email') }}" required placeholder="you@example.com">
        </div>
    </div>

    <div class="mb-3">
    <label class="form-label fw-semibold">Hotel Name</label>
    <div class="input-group">
        <span class="input-group-text bg-light border-end-0">
            <i class="fas fa-building text-muted"></i>
        </span>
        <input type="text" name="hotel_name" class="form-control auth-input border-start-0 ps-0" 
               value="{{ old('hotel_name') }}" required placeholder="My Awesome Hotel">
    </div>
    <small class="text-muted">This will be your hotel/business name</small>
</div>
    
    <div class="mb-3">
        <label class="form-label fw-semibold">Password</label>
        <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
                <i class="fas fa-lock text-muted"></i>
            </span>
            <input type="password" name="password" class="form-control auth-input border-start-0 ps-0" 
                   required placeholder="Create a password">
        </div>
    </div>
    
    <div class="mb-4">
        <label class="form-label fw-semibold">Confirm Password</label>
        <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
                <i class="fas fa-lock text-muted"></i>
            </span>
            <input type="password" name="password_confirmation" class="form-control auth-input border-start-0 ps-0" 
                   required placeholder="Confirm your password">
        </div>
    </div>
    
    <button type="submit" x-show="!loading" class="btn btn-auth w-100 text-white">
        <i class="fas fa-user-plus me-2"></i>Create Account
    </button>
    <button type="button" x-show="loading" disabled class="btn btn-auth w-100 text-white">
        <span class="spinner-border spinner-border-sm me-2"></span>Creating Account...
    </button>
</form>

@endsection

@section('footer-link')
<a href="{{ route('login') }}" class="text-white text-decoration-none small">
    Already have an account? <strong>Sign in</strong>
</a>
@endsection