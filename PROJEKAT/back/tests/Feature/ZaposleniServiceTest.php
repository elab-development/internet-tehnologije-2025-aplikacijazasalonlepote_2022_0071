<?php

namespace Tests\Feature;
use App\Http\Services\ZaposleniService;
use App\Models\User;
use App\Models\Zaposleni;
use App\Models\Usluga;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('ZaposleniService Unit Testovi', function () {

    beforeEach(function () {
        $this->service = new ZaposleniService();
    });

   
    it('može uspešno da sinhronizuje usluge za zaposlenog', function () {
        $user = User::factory()->create(['type' => 'sminkerka']);
        $zaposleni = Zaposleni::factory()->create(['user_id' => $user->id]);
        $usluge = Usluga::factory()->count(3)->create();
        $uslugaIds = $usluge->pluck('id')->toArray();
        $this->service->syncUsluge($user->id, $uslugaIds);

        expect($zaposleni->fresh()->usluge)->toHaveCount(3);
    });

   
    it('ispravno filtrira zaposlene prema imenu i tipu', function () {
        $ana = User::factory()->create(['ime' => 'Ana', 'type' => 'sminkerka']);
        Zaposleni::factory()->create(['user_id' => $ana->id]);

        $milica = User::factory()->create(['ime' => 'Milica', 'type' => 'manikirka']);
        Zaposleni::factory()->create(['user_id' => $milica->id]);

        $rezultatIme = $this->service->getAllZaposleni(['ime' => 'Ana']);
        expect($rezultatIme->total())->toBe(1);
        expect($rezultatIme->first()->ime)->toBe('Ana');

        $rezultatTip = $this->service->getAllZaposleni(['type' => 'manikirka']);
        expect($rezultatTip->total())->toBe(1);
        expect($rezultatTip->first()->type)->toBe('manikirka');
    });

    
    it('ispravno sortira zaposlene po radnom stažu (JOIN test)', function () {
        
        $u1 = User::factory()->create(['type' => 'sminkerka']);
        Zaposleni::factory()->create(['user_id' => $u1->id, 'radni_staz' => 2]);

       
        $u2 = User::factory()->create(['type' => 'sminkerka']);
        Zaposleni::factory()->create(['user_id' => $u2->id, 'radni_staz' => 10]);

       
        $rezultat = $this->service->getAllZaposleni([
            'sort_by' => 'radni_staz',
            'order' => 'desc'
        ]);

        expect($rezultat->first()->zaposleni->radni_staz)->toBe(10);
    });

  
    it('može da filtrira zaposlene koji imaju više od minimalnog staža', function () {
        $junior = User::factory()->create(['type' => 'manikirka']);
        Zaposleni::factory()->create(['user_id' => $junior->id, 'radni_staz' => 1]);

        $senior = User::factory()->create(['type' => 'manikirka']);
        Zaposleni::factory()->create(['user_id' => $senior->id, 'radni_staz' => 15]);

        $rezultat = $this->service->getAllZaposleni(['min_staz' => 5]);

        expect($rezultat->total())->toBe(1);
        expect($rezultat->first()->zaposleni->radni_staz)->toBe(15);
    });

});