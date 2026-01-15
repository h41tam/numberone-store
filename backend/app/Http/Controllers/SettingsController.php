<?php

namespace App\Http\Controllers;

use App\Models\AppSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    private const WHATSAPP_BUSINESS_NUMBER_KEY = 'whatsapp_business_number';

    public function publicSettings(): JsonResponse
    {
        $number = $this->getWhatsappBusinessNumber();

        return response()->json([
            'whatsapp_business_number' => $number,
        ]);
    }

    public function show(): JsonResponse
    {
        $number = $this->getWhatsappBusinessNumber();

        return response()->json([
            'whatsapp_business_number' => $number,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'whatsapp_business_number' => ['required', 'string', 'min:8', 'max:32'],
        ]);

        $normalized = preg_replace('/\D+/', '', $validated['whatsapp_business_number']) ?? '';
        if ($normalized === '') {
            return response()->json([
                'message' => 'Invalid WhatsApp business number',
            ], 422);
        }

        AppSetting::query()->updateOrCreate(
            ['key' => self::WHATSAPP_BUSINESS_NUMBER_KEY],
            ['value' => $normalized],
        );

        return response()->json([
            'whatsapp_business_number' => $normalized,
        ]);
    }

    public static function get(string $key): ?string
    {
        $row = AppSetting::query()->where('key', $key)->first();
        if (! $row) {
            return null;
        }

        $value = $row->value ?? null;
        return is_string($value) ? $value : null;
    }

    private function getWhatsappBusinessNumber(): ?string
    {
        $dbValue = self::get(self::WHATSAPP_BUSINESS_NUMBER_KEY);
        if (is_string($dbValue) && $dbValue !== '') {
            return $dbValue;
        }

        $envValue = (string) env('WHATSAPP_BUSINESS_NUMBER', '');
        $normalized = preg_replace('/\D+/', '', $envValue) ?? '';
        if ($normalized !== '') {
            return $normalized;
        }

        return null;
    }
}
