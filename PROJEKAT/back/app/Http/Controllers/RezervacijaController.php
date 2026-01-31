<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\RezervacijaService;
use Illuminate\Http\Request;
use Exception;

class RezervacijaController extends Controller

{

      protected $rezervacijaService;
      

      public function __construct(RezervacijaService $rezervacijaService)
{
    $this->rezervacijaService = $rezervacijaService;
    
   
}



    public function getTermini(Request $request)
    {
         try {
           
        return response()->json(
            $this->rezervacijaService->generisiSlobodneTermine(
                $request->usluga_id, 
                $request->datum
            ));
        }
        catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške prilikom prihvatanja termina.',
                'error' => $e->getMessage()
            ], 500);
        }

    }



    

}