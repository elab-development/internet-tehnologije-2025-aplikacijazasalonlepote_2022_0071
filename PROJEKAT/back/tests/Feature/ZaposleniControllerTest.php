<?php

use App\Models\User;
use App\Models\Zaposleni;
use App\Models\Usluga;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

describe('Zaposleni i Usluge Feature Testovi', function () {

    beforeEach(function () {
        $this->vlasnica = User::factory()->create(['type' => 'vlasnica']);
        $this->userZaposleni = User::factory()->create(['ime' => 'Maja', 'type' => 'sminkerka']);
        $this->zaposleni = Zaposleni::factory()->create(['user_id' => $this->userZaposleni->id, 'radni_staz' => 5]);
    });

   
    it('vlasnica može da vidi listu zaposlenih sa filterima', function () {
        Sanctum::actingAs($this->vlasnica);

        $response = $this->getJson('/api/vlasnica/zaposleni?ime=Maja&type=sminkerka');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonPath('data.0.ime_prezime', 'Maja ' . $this->userZaposleni->prezime);
    });

    it('zabranjuje pristup listi zaposlenih ako korisnik nije vlasnica', function () {
        $klijent = User::factory()->create(['type' => 'klijent']);
        Sanctum::actingAs($klijent);

        $response = $this->getJson('/api/vlasnica/zaposleni');

        $response->assertStatus(403);
    });

   
    it('zaposleni može da vidi samo svoje usluge', function () {
        Sanctum::actingAs($this->userZaposleni);

        $usluga = Usluga::factory()->create(['kategorija' => 'sminkanje']);
        $this->zaposleni->usluge()->attach($usluga->id);

        $response = $this->getJson('/api/zaposleni/moje-usluge');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonPath('data.0.naziv', $usluga->naziv);
    });

    
    it('vlasnica uspešno dodeljuje dozvoljene usluge zaposlenom', function () {
        Sanctum::actingAs($this->vlasnica);

        $usluga = Usluga::factory()->create(['kategorija' => 'sminkanje']);

        $payload = [
            'user_id' => $this->userZaposleni->id,
            'usluge' => [$usluga->id]
        ];

        $response = $this->postJson('/api/vlasnica/zaposleni/usluge', $payload);

        $response->assertStatus(200)
                 ->assertJson(['success' => true]);

        expect($this->zaposleni->fresh()->usluge)->toHaveCount(1);
    });

    it('ne dozvoljava dodelu usluge koja ne odgovara tipu radnice (Custom Validation Test)', function () {
        Sanctum::actingAs($this->vlasnica);

        $manikirUsluga = Usluga::factory()->create([
            'naziv' => 'Gellac',
            'kategorija' => 'manikir'
        ]);

        $payload = [
            'user_id' => $this->userZaposleni->id,
            'usluge' => [$manikirUsluga->id]
        ];

        $response = $this->postJson('/api/vlasnica/zaposleni/usluge', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['usluge']);
        
        $response->assertJsonFragment([
            "Radnica (sminkerka) ne može raditi uslugu: Gellac"
        ]);
    });

    it('vraća 404/422 ako se pokuša dodela nepostojeće usluge', function () {
        Sanctum::actingAs($this->vlasnica);

        $payload = [
            'user_id' => $this->userZaposleni->id,
            'usluge' => [999]
        ];

        $response = $this->postJson('/api/vlasnica/zaposleni/usluge', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['usluge.0']);
    });

   
    it('vlasnica može da vidi usluge bilo kog zaposlenog preko ID-a', function () {
        Sanctum::actingAs($this->vlasnica);

        $response = $this->getJson("/api/vlasnica/zaposleni/{$this->userZaposleni->id}/usluge");

        $response->assertStatus(200);
    });
});