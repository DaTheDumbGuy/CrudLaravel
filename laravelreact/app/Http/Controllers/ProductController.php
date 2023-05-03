<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json(['status' => 200, 'products' => $products]);
    }

    /** 
     * Show the form for creating a new resource.
     */

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|image'
        ]);

        try {
            $image = Str::random() . '.' . $request->image->getClientOriginalExtension();
            Storage::disk('public')->put('product/image/' . $image, file_get_contents($request->image), 'public');
            Product::create($request->post() + ['image' => $image]);

            return response()->json(['message' => 'Product Created successfully']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Something Went Wrong'], 500);
        }
    }

    // public function create(Request $request)
    // {
    //     $request->validate([
    //         'title' => 'required',
    //         'description' => 'required',
    //         'image' => 'required|image'
    //     ]);
    //     try {
    //         $image = Str::random() . '.' . $request->image->getClientOriginalExtension();
    //         Storage::disk('public')->put('product/image', $request->image, $image);
    //         Product::create($request->post() + ['image' => $image]);
    //         return response()->json(['message' => 'Product Created successfully']);
    //     } catch (\Exception $e) {
    //         Log::error($e->getMessage());
    //         return response()->json(['message' => 'Something Went Wrong'], 500);
    //     }
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
