<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreElementRequest;
use App\Http\Requests\UpdateElementRequest;
use App\Http\Resources\ElementResource;
use App\Models\Element;

class ElementController extends Controller
{
    public function index()
    {
        $elements = Element::ordered()->get();

        return ElementResource::collection($elements);
    }

    public function store(StoreElementRequest $request)
    {
        $element = Element::create($request->validated());

        return new ElementResource($element);
    }

    public function show(Element $element)
    {
        return new ElementResource($element);
    }

    public function update(UpdateElementRequest $request, Element $element)
    {
        $element->update($request->validated());

        return new ElementResource($element->fresh());
    }

    public function destroy(Element $element)
    {
        $element->delete();

        return response()->json([
            'message' => 'Element deleted successfully.',
        ]);
    }
}
