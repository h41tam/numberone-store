<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\SettingsController;

class CheckoutController extends Controller
{
    public function checkout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'address' => ['required', 'string'],
            'whatsapp' => ['required', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'string'],
            'items.*.color' => ['nullable', 'string'],
            'items.*.size' => ['nullable', 'string'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        $lines = [];
        foreach ($validated['items'] as $line) {
            $product = Product::query()->find($line['product_id']);
            if (! $product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
            $qty = (int) $line['quantity'];
            if (($product->stock ?? 0) < $qty) {
                return response()->json(['message' => 'Insufficient stock'], 422);
            }
            $product->stock = max(0, ($product->stock ?? 0) - $qty);
            $product->save();
            $lines[] = $product->name.' x'.$qty.' ('.$product->price.' MAD)'.($line['color'] ? ' ['.$line['color'].']' : '').($line['size'] ? ' ['.$line['size'].']' : '');
        }

        $business = SettingsController::get('whatsapp_business_number');
        if (! $business) {
            $business = (string) env('WHATSAPP_BUSINESS_NUMBER', '');
        }
        $business = preg_replace('/\D+/', '', $business) ?? '';
        if (! $business) {
            return response()->json(['message' => 'WhatsApp business number not configured'], 500);
        }

        $text = 'Nouvelle commande%0A';
        $text .= 'Adresse: '.urlencode($validated['address']).'%0A';
        $text .= 'Client WhatsApp: '.urlencode($validated['whatsapp']).'%0A';
        $text .= 'Produits:%0A';
        foreach ($lines as $l) {
            $text .= '- '.urlencode($l).'%0A';
        }

        $waUrl = 'https://wa.me/'.$business.'?text='.$text;

        return response()->json(['waUrl' => $waUrl]);
    }
}
