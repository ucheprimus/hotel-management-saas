@extends('layouts.auth')

@section('title', 'Reset Password')
@section('subtitle', "We'll send you a reset link")
@section('auth-content')

@if (session('status'))
<div class="alert alert-success alert-dismissible fade show" role="alert">
    <i class="fas fa-check-circle me-2"></i>{{ session('status') }}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
@endif

@if ($errors->any())
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    {{ $errors->first() }}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
@endif

<div class="text-center mb-4">
    <i class="fas fa-key fa-3x hotel-text"></i>
</div>

<form method="POST" action="{{ route('password.email') }}" x-data="{ loading: false }" @submit="loading = true">
    @csrf
    
    <div class="mb-4">
        <label class="form-label fw-semibold">Email Address</label>
        <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
                <i class="fas fa-envelope text-muted"></i>
            </span>
            <input type="email" name="email" class="form-control auth-input border-start-0 ps-0" 
                   value="{{ old('email') }}" required autofocus placeholder="you@example.com">
        </div>
    </div>
    
    <button type="submit" x-show="!loading" class="btn btn-auth w-100 text-white">
        <i class="fas fa-paper-plane me-2"></i>Send Reset Link
    </button>
    <button type="button" x-show="loading" disabled class="btn btn-auth w-100 text-white">
        <span class="spinner-border spinner-border-sm me-2"></span>Sending...
    </button>
</form>

@endsection

@section('footer-link')
<a href="{{ route('login') }}" class="text-white text-decoration-none small">
    <i class="fas fa-arrow-left me-1"></i>Back to login
</a>
@endsection