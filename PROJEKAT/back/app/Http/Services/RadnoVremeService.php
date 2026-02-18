<?php

namespace App\Http\Services;

use App\Models\RadnoVreme;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class RadnoVremeService
{
    public function sacuvajRaspored(array $data)
    {
        return DB::transaction(function () use ($data) {
            $userId = $data['user_id'];
            $rezultati = [];

            foreach ($data['raspored'] as $dan) {
                $rezultati[] = RadnoVreme::updateOrCreate(
                    [
                        'user_id' => $userId,
                        'dan_u_nedelji' => $dan['dan_u_nedelji']
                    ],
                    [
                        'vreme_od' => $dan['radi'] ? $dan['vreme_od'] : null,
                        'vreme_do' => $dan['radi'] ? $dan['vreme_do'] : null,
                        'radi' => $dan['radi']
                    ]
                );
            }

            return $rezultati;
        });
    }


    public function getRasporedZaZaposlenog(int $userId)
{
    return RadnoVreme::where('user_id', $userId)
        ->orderByRaw('CASE WHEN dan_u_nedelji = 0 THEN 7 ELSE dan_u_nedelji END')
        ->get();
}
}