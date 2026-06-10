<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Hotel Management SaaS') }} - @yield('title')</title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .font-playfair {
            font-family: 'Playfair Display', serif;
        }
        .hotel-gradient {
            background: linear-gradient(135deg, #c97e4a 0%, #b5633a 100%);
        }
        .auth-card {
            border-radius: 20px;
            backdrop-filter: blur(10px);
            background: white;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .auth-input {
            border-radius: 10px;
            border: 1px solid #e0e0e0;
            padding: 12px 15px;
            transition: all 0.3s ease;
        }
        .auth-input:focus {
            border-color: #c97e4a;
            box-shadow: 0 0 0 3px rgba(201,126,74,0.1);
            outline: none;
        }
        .btn-auth {
            background: linear-gradient(135deg, #c97e4a 0%, #b5633a 100%);
            border: none;
            border-radius: 10px;
            padding: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-auth:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(201,126,74,0.4);
        }
        .hotel-text {
            color: #c97e4a;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row min-vh-100 align-items-center justify-content-center">
            <div class="col-md-6 col-lg-5">
                <!-- Logo -->
                <div class="text-center mb-4">
                    <div class="hotel-gradient d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style="width: 70px; height: 70px;">
                        <i class="fas fa-hotel fa-2x text-white"></i>
                    </div>
                    <h1 class="font-playfair display-6 fw-bold mb-1">Hotel<span class="hotel-text">SaaS</span></h1>
                    <p class="text-white-50">@yield('subtitle')</p>
                </div>
                
                <!-- Auth Card -->
                <div class="auth-card p-4 p-md-5">
                    @yield('auth-content')
                </div>
                
                <!-- Footer Link -->
                <div class="text-center mt-4">
                    @yield('footer-link')
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>