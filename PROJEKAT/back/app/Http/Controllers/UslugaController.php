<?php

namespace App\Http\Controllers;
use App\Http\Requests\UslugaFilterRequest;
use App\Http\Resources\UslugaResource;
use App\Http\Services\UslugaService;
use Illuminate\Support\Facades\Auth;
use Exception;

class UslugaController extends Controller
{
    protected $uslugaService;
   

    

   public function __construct(UslugaService $uslugaService)
{
    $this->uslugaService = $uslugaService;
   
    
   
}

    

    public function index(UslugaFilterRequest $request)
    {
        try {
            $usluge = $this->uslugaService->getAllUsluge($request->validated());
            return UslugaResource::collection($usluge);
        
      } catch (\Exception $e) {
            return response()->json([
              'success' => false, 
              'error' => $e->getMessage()
            ], 500);
        }
    }





}