<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\JsonResponse;

class PublicPageController extends Controller
{
    public function show(string $slug): JsonResponse
    {
        $page = Page::published()->where('slug', $slug)->firstOrFail();

        return response()->json($page);
    }
}
