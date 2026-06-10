<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Hotel Management SaaS') }}</title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        .font-playfair {
            font-family: 'Playfair Display', serif;
        }
        .hotel-gradient {
            background: linear-gradient(135deg, #c97e4a 0%, #b5633a 100%);
        }
        .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .btn-hotel {
            background: linear-gradient(135deg, #c97e4a 0%, #b5633a 100%);
            border: none;
            color: white;
            transition: all 0.3s ease;
        }
        .btn-hotel:hover {
            background: linear-gradient(135deg, #b5633a 0%, #974a2e 100%);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(201,126,74,0.4);
        }
        .hotel-text {
            color: #c97e4a;
        }
        .auth-card {
            border-radius: 20px;
            backdrop-filter: blur(10px);
            background: rgba(255,255,255,0.95);
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
        <div class="container">
            <a class="navbar-brand fw-bold" href="{{ url('/') }}">
                <i class="fas fa-hotel hotel-text me-2"></i>
                <span class="font-playfair fs-4">Hotel<span class="hotel-text">SaaS</span></span>
            </a>
            
            <div class="ms-auto">
                @auth
                    <div class="dropdown">
                        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            <i class="fas fa-user-circle me-1"></i> {{ Auth::user()->name }}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="{{ route('dashboard') }}"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit" class="dropdown-item text-danger">
                                        <i class="fas fa-sign-out-alt me-2"></i>Logout
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </div>
                @else
                    <a href="{{ route('login') }}" class="btn btn-outline-secondary me-2">Sign In</a>
                    <a href="{{ route('register') }}" class="btn btn-hotel">Get Started</a>
                @endauth
            </div>
        </div>
    </nav>
    
    <main>
        @yield('content')
    </main>
    
    <footer class="bg-dark text-white-50 py-4 mt-5">
        <div class="container text-center">
            <small>© {{ date('Y') }} HotelSaaS. Empowering hotels worldwide.</small>
        </div>
    </footer>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>