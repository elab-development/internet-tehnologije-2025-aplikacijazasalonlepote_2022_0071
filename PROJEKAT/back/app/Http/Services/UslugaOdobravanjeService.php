<?php

namespace App\Http\Services;

use App\Models\User;
use App\Models\Usluga;
use App\Models\UslugaIzmena;
use Illuminate\Support\Facades\DB;
use Exception;

class UslugaOdobravanjeService
{
    protected $uslugaService;
    protected $emailService;

    public function __construct(UslugaService $uslugaService, EmailService $emailService)
    {
        $this->uslugaService = $uslugaService;
        $this->emailService = $emailService;
    }

    public function obradiZahtev(int $id, array $podaci, User $korisnik)
    {
        $rezultat = $this->uslugaService->procesuirajIzmenu($id, $podaci, $korisnik);
      
       if ($rezultat['status'] === 'predlog_kreiran') {
          $staraUsluga = Usluga::findOrFail($id);
        $uporedniPodaci = [
            'stari' => $staraUsluga->only(['naziv', 'kategorija', 'trajanje_usluge', 'cena', 'opis']),
            'novi' => $podaci
        ];

        $this->emailService->posaljiObavestenje(
            $this->emailService->getVlasnicaEmail(),
            "Novi predlog izmene usluge",
            "Zaposleni {$korisnik->ime} {$korisnik->prezime} želi da izmeni uslugu: {$staraUsluga->naziv}.",
            $uporedniPodaci 
        );
    }

        return $rezultat;
    }

   
}