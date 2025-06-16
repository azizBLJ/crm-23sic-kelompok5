export default function MembershipForm() {
  return (
    <div className="p-6 bg-white rounded-xl shadow my-4">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Tambah Membership</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Nama</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            placeholder="Nama Member"
          />
        </div>
        <div>
          <label className="block text-gray-700">Level</label>
          <select className="w-full px-4 py-2 border rounded">
            <option>Silver</option>
            <option>Gold</option>
            <option>Platinum</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
