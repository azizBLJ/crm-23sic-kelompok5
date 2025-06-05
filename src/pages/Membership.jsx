import React, { useState } from "react";

const Membership = () => {
  const [members, setMembers] = useState([
    { nama: "Zaki", level: "Gold" },
    { nama: "Nadia", level: "Platinum" },
  ]);
  const [nama, setNama] = useState("");
  const [level, setLevel] = useState("Silver");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama) return;

    const newMember = { nama, level };
    setMembers([...members, newMember]);
    setNama("");
    setLevel("Silver");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Membership</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-blue-600 text-lg font-semibold mb-4">Tambah Membership</h3>
        <div className="mb-4">
          <label>Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border px-2 py-1"
            placeholder="Nama Member"
          />
        </div>
        <div className="mb-4">
          <label>Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border px-2 py-1"
          >
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Simpan
        </button>
      </form>

      <h3 className="text-blue-600 text-lg font-semibold mb-2">Daftar Member</h3>
      <table className="w-full border text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="border px-2 py-1">Nama</th>
            <th className="border px-2 py-1">Level</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{m.nama}</td>
              <td className="border px-2 py-1">{m.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Membership;
