<?php

namespace App\Http\Controllers;

use App\Models\ContainerCategory;
use Illuminate\Http\Request;

class ContainerCategoryController extends Controller
{

    public function index()
    {
        $ContainerCategories = ContainerCategory::all();
        return response()->json($ContainerCategories);
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
