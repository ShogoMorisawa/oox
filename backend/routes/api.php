<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Services\CalculateService;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from Lambda!',
        'status' => 'success',
    ]);
});

Route::post('/calculate', function (Request $request) {
    $matches = $request->input('matches');

    $service = new CalculateService();
    $graph = $service->buildGraph($matches);
    logger()->info('Generated Graph:', $graph);

    $mockResponse = [
        'order' => [
            'Ni',
            'Ti',
            ['Fe', 'Fi', 'Ne'],
            'Se',
            ['Te', 'Si'],
        ],
    ];

    return response()->json($mockResponse);
});
