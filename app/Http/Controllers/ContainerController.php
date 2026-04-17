<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContainerRequest;
use App\Models\Container;
use App\Models\ContainerTracking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function store(ContainerRequest $request)
    {
        // dd($request->all());
        DB::beginTransaction();
        try {
            $container = Container::create($request->only(['number', 'category_id']));
            $container->trackings()->createMany($request->trackings);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            dd($e->getMessage());
        }
        return response()->json();
    }

    public function show(Container $container)
    {
        return response()->json($container->load(['trackings']));
    }

    public function update(ContainerRequest $containerRequest, Container $container)
    {
        DB::transaction(function() use($containerRequest, $container){
            $container->fill($containerRequest->all());
            $container->save();

            [$containerToBeUpdated, $containerToBeCreated] = $containerRequest->collect('trackings')
                                                                            ->partition(function($item){
                                                                                return isset($item['id']);
                                                                            });
            $container->trackings()->whereIn('id', $containerToBeUpdated->pluck('id'))
                                    ->get()
                                    ->each(function($containerTracking) use($containerToBeUpdated){
                                        $containerTracking->fill(
                                            $containerToBeUpdated->where('id', $containerTracking->id)->collapse()->all()
                                        );
                                        $containerTracking->save();
                                    });

            $container->trackings()->createMany($containerToBeCreated);
            
        });

        

        // $containerRequest->tracking
    }

    // public function destroy($id)
    // {
    //     //
    // }
}
