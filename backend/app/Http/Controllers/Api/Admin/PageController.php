<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Page::query()->latest('updated_at');

        if ($search = $request->string('search')->toString()) {
            $query->where(fn ($builder) => $builder
                ->where('title', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%"));
        }

        return response()->json($query->paginate(20));
    }

    public function store(StorePageRequest $request): JsonResponse
    {
        $page = Page::create($request->validated());

        return response()->json($page, 201);
    }

    public function show(Page $page): JsonResponse
    {
        return response()->json($page);
    }

    public function update(UpdatePageRequest $request, Page $page): JsonResponse
    {
        $page->update($request->validated());

        return response()->json($page->fresh());
    }

    public function destroy(Page $page): JsonResponse
    {
        $page->delete();

        return response()->noContent();
    }
}
