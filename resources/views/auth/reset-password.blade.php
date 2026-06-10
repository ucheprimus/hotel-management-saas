@extends('layouts.auth')

@section('title', 'Reset Password')
@section('subtitle', 'Create your new password')
@section('auth-content')

@if ($errors->any())
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    {{ $errors->first() }}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
@endif

<form method="POST" action="{{ route('password.store') }}" x-data="{ loading: false }" @submit="loading = true">
    @csrf
    <input type="hidden" name="token" value="{{ $token }}">
    
    <div class="mb-3">
        <label class="form-label fw-semibold">Email Address</label>
        <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
                <i class="fas fa-envelope text-muted"></i>
            </span>
            <input type="email" name="email" class="form-control auth-input border-start-0 ps-0" 
                   value="{{ old('email', $request->email) }}" required autofocus>
        </div>
    </div>
    
    <div class="mb-3">
        <label class="form-label fw-semibold">New Password</label>
        <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
                <i class="fas fa-lock text-muted"></i>
            </span>
            <input type="password" name="password" class="form-control auth-input border-start-0 ps-0" 
                   required placeholder="••••••••">
        </div>
    </div>
    
    <div class="mb-4">
        <label class="form-label fw-semibold">Confirm Password</label>
        <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
                <i class="fas fa-lock text-muted"></i>
            </span>
            <input type="password" name="password_confirmation" class="form-control auth-input border-start-0 ps-0" 
                   required placeholder="Confirm new password">
        </div>
    </div>
    
    <button type="submit" x-show="!loading" class="btn btn-auth w-100 text-white">
        <i class="fas fa-key me-2"></i>Reset Password
    </button>
    <button type="button" x-show="loading" disabled class="btn btn-auth w-100 text-white">
        <span class="spinner-border spinner-border-sm me-2"></span>Resetting...
    </button>
</form>

@endsection

@section('footer-link')
<a href="{{ route('login') }}" class="text-white text-decoration-none small">
    <i class="fas fa-arrow-left me-1"></i>Back to login
</a>
@endsection