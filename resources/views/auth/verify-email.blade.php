@extends('layouts.auth')

@section('title', 'Verify Your Email')
@section('subtitle', 'One more step to go')
@section('auth-content')

<div class="text-center">
    <div class="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
        <svg class="h-8 w-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    </div>
    
    <h2 class="text-xl font-semibold text-gray-800 mb-2">Verify your email address</h2>
    <p class="text-gray-500 text-sm mb-6">
        We sent a verification link to <strong class="text-gray-700">{{ Auth::user()->email }}</strong>.
        Please check your inbox and click the link to verify your account.
    </p>
    
    @if (session('status') == 'verification-link-sent')
        <div class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            A new verification link has been sent to your email address.
        </div>
    @endif
    
    <div class="space-y-3">
        <form method="POST" action="{{ route('verification.send') }}" x-data="{ sending: false }" @submit="sending = true">
            @csrf
            <button type="submit" x-show="!sending" class="w-full bg-hotel-500 text-white py-3 rounded-xl font-medium hover:bg-hotel-600 transition">
                Resend Verification Email
            </button>
            <button type="button" x-show="sending" disabled class="w-full bg-hotel-400 text-white py-3 rounded-xl font-medium cursor-not-allowed">
                <svg class="animate-spin h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </button>
        </form>
        
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="w-full text-gray-500 text-sm hover:text-gray-700 transition">
                ← Logout and try different account
            </button>
        </form>
    </div>
</div>

@endsection