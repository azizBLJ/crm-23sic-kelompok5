import { useEffect, useState } from "react";
import { supabase } from "../../../Supabase";

const RoomAvailabilityAdmin = () => {
  const [rooms, setRooms] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [roomForm, setRoomForm] = useState({
    tipe_kamar: "",
    harga_kamar: "",
    status_kamar: "tersedia",
    image: "",
    deskripsi: "",
    no_kamar: "",
  });

  const fetchRooms = async () => {
    const { data, error } = await supabase.from("kamar").select("*").order("id", { ascending: true });
    if (!error) setRooms(data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomForm({ ...roomForm, [name]: value });
  };

  const handleAddRoom = async () => {
    const roomToInsert = {
      ...roomForm,
      harga_kamar: parseInt(roomForm.harga_kamar),
      status_kamar: roomForm.status_kamar.toLowerCase(),
    };

    const { error } = await supabase.from("kamar").insert([roomToInsert]);
    if (!error) {
      fetchRooms();
      resetForm();
    } else {
      alert("Gagal menambahkan kamar: " + error.message);
    }
  };

  const handleEditRoom = (room) => {
    setEditingId(room.id);
    setRoomForm(room);
  };

  const handleUpdateRoom = async () => {
    const updatedRoom = {
      ...roomForm,
      harga_kamar: parseInt(roomForm.harga_kamar),
    };

    const { error } = await supabase
      .from("kamar")
      .update(updatedRoom)
      .eq("id", editingId);

    if (!error) {
      fetchRooms();
      resetForm();
    } else {
      alert("Gagal mengupdate kamar: " + error.message);
    }
  };

  const handleDeleteRoom = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus kamar ini?");
    if (!confirm) return;

    const { error } = await supabase.from("kamar").delete().eq("id", id);
    if (!error) {
      fetchRooms();
    } else {
      alert("Gagal menghapus kamar: " + error.message);
    }
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setRoomForm({
      tipe_kamar: "",
      harga_kamar: "",
      status_kamar: "tersedia",
      image: "",
      deskripsi: "",
      no_kamar: "",
    });
  };

  const filteredRooms = filterStatus === "Semua" ? rooms : rooms.filter(room => room.status_kamar === filterStatus.toLowerCase());

  const getStatusColor = (status) => {
    switch (status) {
      case "tersedia":
        return "bg-green-100 text-green-800 border-green-200";
      case "terisi":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "tersedia":
        return "✅ Tersedia";
      case "terisi":
        return "🔴 Terisi";
      default:
        return status;
    }
  };

  const availableCount = rooms.filter(room => room.status_kamar === "tersedia").length;
  const occupiedCount = rooms.filter(room => room.status_kamar === "terisi").length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Manajemen Ketersediaan Kamar
        </h1>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-700">Total Kamar</h3>
            <p className="text-3xl font-bold text-blue-600">{rooms.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-700">Tersedia</h3>
            <p className="text-3xl font-bold text-green-600">{availableCount}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-700">Terisi</h3>
            <p className="text-3xl font-bold text-red-600">{occupiedCount}</p>
          </div>
        </div>

        {/* Filter & Tambah */}
        <div className="mb-8 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-2">
            {["Semua", "tersedia", "terisi"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-gray-700 hover:bg-blue-100"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsAdding(true);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            + Tambah Kamar
          </button>
        </div>

        {/* Form Tambah / Edit */}
        {(isAdding || editingId) && (
          <div className="bg-white border p-6 rounded-lg mb-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Kamar" : "Tambah Kamar Baru"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="tipe_kamar" placeholder="Tipe Kamar" onChange={handleChange} value={roomForm.tipe_kamar} className="border p-2 rounded" />
              <input name="harga_kamar" placeholder="Harga" type="number" onChange={handleChange} value={roomForm.harga_kamar} className="border p-2 rounded" />
              <input name="no_kamar" placeholder="Nomor Kamar" onChange={handleChange} value={roomForm.no_kamar} className="border p-2 rounded" />
              <select name="status_kamar" onChange={handleChange} value={roomForm.status_kamar} className="border p-2 rounded">
                <option value="tersedia">Tersedia</option>
                <option value="terisi">Terisi</option>
              </select>
              <input name="image" placeholder="Link Gambar" onChange={handleChange} value={roomForm.image} className="border p-2 rounded col-span-2" />
              <textarea name="deskripsi" placeholder="Deskripsi" onChange={handleChange} value={roomForm.deskripsi} className="border p-2 rounded col-span-2" />
            </div>
            <div className="mt-4 flex gap-3">
              {editingId ? (
                <button onClick={handleUpdateRoom} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan Perubahan</button>
              ) : (
                <button onClick={handleAddRoom} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
              )}
              <button onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Batal</button>
            </div>
          </div>
        )}

        {/* List Kamar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-white border rounded-xl shadow-sm">
              <img src={room.image} alt={room.tipe_kamar} className="w-full h-48 object-cover rounded-t-xl" />
              <div className="p-6">
                <h2 className="text-lg font-bold">{room.tipe_kamar} - {room.no_kamar}</h2>
                <p className="text-sm text-gray-600 mb-2">{room.deskripsi}</p>
                <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border ${getStatusColor(room.status_kamar)}`}>
                  {getStatusBadge(room.status_kamar)}
                </span>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => handleEditRoom(room)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDeleteRoom(room.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomAvailabilityAdmin;
