<?php

namespace App\Http\Controllers;
use App\Http\Requests\UslugaFilterRequest;
use App\Http\Requests\UpdateUslugaRequest;
use App\Http\Resources\UslugaResource;
use App\Http\Services\UslugaService;
use App\Http\Services\UslugaOdobravanjeService;
use Illuminate\Support\Facades\Auth;
use Exception;

class UslugaController extends Controller
{
    protected $uslugaService;
    protected $odobravanjeService;
   

    

   public function __construct(UslugaService $uslugaService,UslugaOdobravanjeService $odobravanjeService)
{
    $this->uslugaService = $uslugaService;
    $this->odobravanjeService = $odobravanjeService;
   
    
   
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



     public function update(UpdateUslugaRequest $request, $id)
    {
        try {
            $rezultat = $this->odobravanjeService->obradiZahtev(
                $id, 
                $request->validated(), 
                Auth::user()
            );

            return response()->json([
                'success' => true,
                'message' => $rezultat['status'] === 'izvrseno' 
                    ? 'Usluga uspešno ažurirana.' 
                    : 'Predlog izmene je poslat vlasnici.',
                'data' => $rezultat['data']
            ]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }




}