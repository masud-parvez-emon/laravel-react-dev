<?php

namespace App\Http\Controllers;

use App\Models\Container;
use Illuminate\Http\Request;

class ContainerController extends Controller
{

    public function index(Request $request)
    {
        $containers = Container::with(['category'])
                                ->when($request->filled(['_page', '_items_per_page']), function($query) use($request){
                                    $query->skip(($request->query('_page')-1)*$request->query('_items_per_page'))
                                            ->limit($request->query('_items_per_page'));
                                })
                                ->get();
        return response()->json(['containers' => $containers, 'total_records' => Container::count()]);
    }

    public function store(Request $request)
    {
        dd($request->all());
    }

    public function show(Container $container)
    {
        return response()->json($container->load(['category', 'trackings']));
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
