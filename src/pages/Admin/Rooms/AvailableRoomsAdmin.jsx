import { useState } from "react";

const initialRooms = [
  {
    id: 1,
    tipe: "Deluxe",
    harga: 750000,
    fasilitas: ["AC", "Wi-Fi", "TV", "Kamar Mandi Dalam"],
    deskripsi: "Kamar luas dengan fasilitas premium dan pemandangan kota.",
    status: "Tersedia",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=250&fit=crop",
    nomorKamar: "101",
    tamu: null,
    checkinDate: null,
    checkoutDate: null,
  },
  {
    id: 2,
    tipe: "Suite",
    harga: 1200000,
    fasilitas: ["AC", "Wi-Fi", "Bathtub", "Mini Bar", "Breakfast"],
    deskripsi: "Suite mewah cocok untuk keluarga dan pasangan bulan madu.",
    status: "Terisi",
    image: "https://i.pinimg.com/736x/a3/6d/f6/a36df64ce1f8da6e4749efe8f7e4ffc3.jpg",
    nomorKamar: "201",
    tamu: "Budi Santoso",
    checkinDate: "2025-06-15",
    checkoutDate: "2025-06-20",
  },
  {
    id: 3,
    tipe: "Standar",
    harga: 600000,
    fasilitas: ["AC", "TV", "Shower", "Air Panas"],
    deskripsi: "Kamar nyaman dengan desain modern dan harga terjangkau.",
    status: "Tersedia",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop",
    nomorKamar: "102",
    tamu: null,
    checkinDate: null,
    checkoutDate: null,
  },
  {
    id: 4,
    tipe: "Deluxe",
    harga: 950000,
    fasilitas: ["AC", "Wi-Fi", "TV", "Mini Bar", "Working Desk"],
    deskripsi: "Cocok untuk pebisnis dengan fasilitas kerja dan kenyamanan tinggi.",
    status: "Maintenance",
    image: "https://images.unsplash.com/photo-1582719478183-d6c94469da28?w=400&h=250&fit=crop",
    nomorKamar: "301",
    tamu: null,
    checkinDate: null,
    checkoutDate: null,
  },
  {
    id: 5,
    tipe: "Suite",
    harga: 1300000,
    fasilitas: ["AC", "Wi-Fi", "2 Tempat Tidur", "TV", "Dapur Kecil"],
    deskripsi: "Dirancang khusus untuk keluarga dengan kapasitas hingga 4 orang.",
    status: "Terisi",
    image: "https://images.unsplash.com/photo-1578894388660-e77c1454e225?w=400&h=250&fit=crop",
    nomorKamar: "401",
    tamu: "Keluarga Rahmat",
    checkinDate: "2025-06-16",
    checkoutDate: "2025-06-18",
  },  

];

const RoomAvailabilityAdmin = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newRoom, setNewRoom] = useState({
    tipe: "",
    harga: "",
    fasilitas: "",
    deskripsi: "",
    status: "Tersedia",
    image: "",
    nomorKamar: "",
  });

  const handleStatusChange = (id, newStatus) => {
    setRooms(rooms.map(room =>
      room.id === id
        ? {
            ...room,
            status: newStatus,
            tamu: newStatus === "Tersedia" ? null : room.tamu,
            checkinDate: newStatus === "Tersedia" ? null : room.checkinDate,
            checkoutDate: newStatus === "Tersedia" ? null : room.checkoutDate,
          }
        : room
    ));
  };

  const handleEdit = (room) => {
    setEditingId(room.id);
    setFormData({
      ...room,
      checkinDate: room.checkinDate || "",
      checkoutDate: room.checkoutDate || "",
      tamu: room.tamu || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingId) {
      setFormData({ ...formData, [name]: value });
    } else {
      setNewRoom({ ...newRoom, [name]: value });
    }
  };

  const handleSave = () => {
    setRooms(rooms.map(room =>
      room.id === editingId
        ? {
            ...formData,
            tamu: formData.status === "Terisi" ? formData.tamu : null,
            checkinDate: formData.status === "Terisi" ? formData.checkinDate : null,
            checkoutDate: formData.status === "Terisi" ? formData.checkoutDate : null,
          }
        : room
    ));
    setEditingId(null);
    setFormData({});
  };

  const handleAddRoom = () => {
    const fasilitasArray = newRoom.fasilitas.split(",").map(f => f.trim());
    const newId = rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1;
    const roomToAdd = {
      ...newRoom,
      id: newId,
      harga: parseInt(newRoom.harga),
      fasilitas: fasilitasArray,
      tamu: null,
      checkinDate: null,
      checkoutDate: null,
    };
    setRooms([...rooms, roomToAdd]);
    setNewRoom({
      tipe: "",
      harga: "",
      fasilitas: "",
      deskripsi: "",
      status: "Tersedia",
      image: "",
      nomorKamar: "",
    });
    setIsAdding(false);
  };

  const filteredRooms = filterStatus === "Semua" ? rooms : rooms.filter(room => room.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "Tersedia":
        return "bg-green-100 text-green-800 border-green-200";
      case "Terisi":
        return "bg-red-100 text-red-800 border-red-200";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Tersedia":
        return "✅ Tersedia";
      case "Terisi":
        return "🔴 Terisi";
      case "Maintenance":
        return "🔧 Maintenance";
      default:
        return status;
    }
  };

  const availableCount = rooms.filter(room => room.status === "Tersedia").length;
  const occupiedCount = rooms.filter(room => room.status === "Terisi").length;
  const maintenanceCount = rooms.filter(room => room.status === "Maintenance").length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Manajemen Ketersediaan Kamar
        </h1>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-700">Maintenance</h3>
            <p className="text-3xl font-bold text-yellow-600">{maintenanceCount}</p>
          </div>
        </div>

        {/* Tombol Filter & Tambah */}
        <div className="mb-8 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-2">
            {["Semua", "Tersedia", "Terisi", "Maintenance"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-gray-700 hover:bg-blue-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            + Tambah Kamar
          </button>
        </div>

        {/* Form Tambah */}
        {isAdding && (
          <div className="bg-white border p-6 rounded-lg mb-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Tambah Kamar Baru</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="tipe" placeholder="Tipe Kamar" onChange={handleChange} value={newRoom.tipe} className="border p-2 rounded" />
              <input name="harga" placeholder="Harga" type="number" onChange={handleChange} value={newRoom.harga} className="border p-2 rounded" />
              <input name="nomorKamar" placeholder="Nomor Kamar" onChange={handleChange} value={newRoom.nomorKamar} className="border p-2 rounded" />
              <input name="fasilitas" placeholder="Fasilitas (pisahkan dengan koma)" onChange={handleChange} value={newRoom.fasilitas} className="border p-2 rounded" />
              <input name="image" placeholder="Link Gambar" onChange={handleChange} value={newRoom.image} className="border p-2 rounded col-span-2" />
              <textarea name="deskripsi" placeholder="Deskripsi" onChange={handleChange} value={newRoom.deskripsi} className="border p-2 rounded col-span-2" />
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={handleAddRoom} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Simpan
              </button>
              <button onClick={() => setIsAdding(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Daftar Kamar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-white border rounded-xl shadow-sm">
              {editingId === room.id ? (
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Edit Kamar {room.nomorKamar}</h3>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-3 rounded-lg mb-3">
                    <option value="Tersedia">Tersedia</option>
                    <option value="Terisi">Terisi</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                  {formData.status === "Terisi" && (
                    <>
                      <input name="tamu" value={formData.tamu} onChange={handleChange} placeholder="Nama Tamu" className="w-full border p-3 rounded-lg mb-3" />
                      <input name="checkinDate" type="date" value={formData.checkinDate} onChange={handleChange} className="w-full border p-3 rounded-lg mb-3" />
                      <input name="checkoutDate" type="date" value={formData.checkoutDate} onChange={handleChange} className="w-full border p-3 rounded-lg mb-3" />
                    </>
                  )}
                  <div className="flex gap-3">
                    <button onClick={handleSave} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex-1">
                      Simpan
                    </button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 flex-1">
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <img src={room.image} alt={room.tipe} className="w-full h-48 object-cover rounded-t-xl" />
                  <div className="p-6">
                    <h2 className="text-lg font-bold">{room.tipe} - {room.nomorKamar}</h2>
                    <p className="text-sm text-gray-600 mb-2">{room.deskripsi}</p>
                    <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border ${getStatusColor(room.status)}`}>
                      {getStatusBadge(room.status)}
                    </span>
                    <div className="mt-4 flex flex-col gap-2">
                      <button onClick={() => handleEdit(room)} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Edit Status
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomAvailabilityAdmin;
