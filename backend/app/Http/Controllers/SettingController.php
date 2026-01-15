<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function getWhatsapp(): JsonResponse
    {
        $setting = Setting::where('key', 'whatsapp_number')->first();
        return response()->json([
            'number' => $setting ? $setting->value : env('WHATSAPP_BUSINESS_NUMBER', ''),
        ]);
    }

    public function updateWhatsapp(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'number' => ['required', 'string'],
        ]);

        $setting = Setting::where('key', 'whatsapp_number')->first();
        if (!$setting) {
            $setting = new Setting();
            $setting->key = 'whatsapp_number';
        }
        $setting->value = $validated['number'];
        $setting->save();

        return response()->json([
            'message' => 'WhatsApp number updated successfully',
            'number' => $setting->value,
        ]);
    }
}
