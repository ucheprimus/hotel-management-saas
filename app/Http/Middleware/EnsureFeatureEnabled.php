<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\FeatureService;

class EnsureFeatureEnabled
{
    protected $featureService;
    
    public function __construct(FeatureService $featureService)
    {
        $this->featureService = $featureService;
    }
    
    public function handle(Request $request, Closure $next, string $featureKey)
    {
        if (!$this->featureService->isEnabled($featureKey)) {
            return response()->json([
                'message' => 'This feature is not available on your current plan'
            ], 403);
        }
        
        return $next($request);
    }
}