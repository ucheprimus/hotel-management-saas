<?php

namespace Modules\Auth\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;

class ForgotPasswordController extends AuthController
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Password reset link sent to your email.',
            ]);
        }

        Log::warning('Password reset failed', ['email' => $request->email, 'status' => $status]);

        return response()->json([
            'message' => 'Unable to send reset link. Please check your email.',
        ], 400);
    }
}