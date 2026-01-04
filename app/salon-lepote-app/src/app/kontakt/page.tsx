export default function Kontakt() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-serif text-center mb-12">Kontaktirajte Nas</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Informacije */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Gde se nalazimo?</h3>
            <p className="text-gray-600">Bulevar Lepote 12, Beograd</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Radno vreme</h3>
            <p className="text-gray-600">Pon - Pet: 09:00 - 20:00</p>
            <p className="text-gray-600">Subota: 10:00 - 16:00</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Telefon</h3>
            <p className="text-pink-600 font-bold">+381 11 123 456</p>
          </div>
        </div>

        {/* Kontakt Forma */}
        <form className="bg-pink-50 p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <label className="block mb-2">Ime</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="Vaše ime" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input type="email" className="w-full p-2 border rounded" placeholder="email@primer.com" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Poruka</label>
            <textarea className="w-full p-2 border rounded" rows={4}></textarea>
          </div>
          <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition">
            Pošalji poruku
          </button>
        </form>
      </div>
    </div>
  );
}