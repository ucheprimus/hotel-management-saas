@extends('layouts.auth')

@section('title', 'Welcome Back')
@section('subtitle', 'Sign in to your account')
@section('auth-content')

@if ($errors->any())
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <i class="fas fa-exclamation-circle me-2"></i>{{ $errors->first() }}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
@endif

<form method="POST" action="{{ route('login') }}" x-data="{ loading: false }" @submit="loading = true">
    @csrf
    
    <div class="mb-3">
        <label class="form-label fw-semibold">Email Address</label>
        <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
                <i class="fas fa-envelope text-muted"></i>
            </span>
            <input type="email" name="email" class="form-control auth-input border-start-0 ps-0" 
                   value="{{ old('email') }}" required autofocus placeholder="you@example.com">
        </div>
    </div>
    
    <div class="mb-3">
        <label class="form-label fw-semibold">Password</label>
        <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
                <i class="fas fa-lock text-muted"></i>
            </span>
            <input type="password" name="password" class="form-control auth-input border-start-0 ps-0" 
                   required placeholder="••••••••">
        </div>
    </div>
    
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="remember" id="remember">
            <label class="form-check-label text-muted" for="remember">Remember me</label>
        </div>
        <a href="{{ route('password.request') }}" class="text-decoration-none small">Forgot password?</a>
    </div>
    
    <button type="submit" x-show="!loading" class="btn btn-auth w-100 text-white">
        <i class="fas fa-sign-in-alt me-2"></i>Sign In
    </button>
    <button type="button" x-show="loading" disabled class="btn btn-auth w-100 text-white">
        <span class="spinner-border spinner-border-sm me-2"></span>Signing In...
    </button>
</form>

@endsection

@section('footer-link')
<a href="{{ route('register') }}" class="text-white text-decoration-none small">
    Don't have an account? <strong>Create one</strong>
</a>
@endsection