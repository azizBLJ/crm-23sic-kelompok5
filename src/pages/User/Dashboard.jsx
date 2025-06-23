import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className="text-gray-800 bg-[#fef9f5] font-sans">
        {/* HEADER & NAVIGATION */}
        <header className="navbar px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/template/img/logommh.png" alt="Mutiara Merdeka Hotel" className="h-12 w-auto" />
            <h1 className="text-xl font-bold text-gray-800">Mutiara Merdeka Hotel</h1>
          </div>
          <nav>
            <ul className="flex flex-wrap gap-4 text-sm font-medium">
              <li><a className="hover:underline" href="#">HOME</a></li>
              <li className="relative group">
                <button className="hover:underline">ROOMS</button>
                <ul className="absolute hidden group-hover:block bg-white text-gray-700 border mt-2 rounded shadow-lg z-10">
                  <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">Single Room</a></li>
                  <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">Double Room</a></li>
                  <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">Suites</a></li>
                  <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">Family Room</a></li>
                </ul>
              </li>
              <li className="relative group">
                <button className="hover:underline">FACILITIES</button>
                <ul className="absolute hidden group-hover:block bg-white text-gray-700 border mt-2 rounded shadow-lg z-10">
                  <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">Restaurant</a></li>
                  <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">Spa & Wellness</a></li>
                  <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">Pool</a></li>
                  <li><a className="block px-4 py-2 hover:bg-gray-100" href="#">Meeting Rooms</a></li>
                </ul>
              </li>
              <li><a className="hover:underline" href="#">GALLERY</a></li>
              <li><a className="hover:underline" href="#">PROMOTIONS</a></li>
              <li><a className="button-primary" href="#">BOOK NOW</a></li>
              <li><a className="hover:underline" href="#">CONTACT US</a></li>
            </ul>
          </nav>
        </header>

        {/* HERO SECTION (Slider style - bisa dibuat carousel jika ingin dynamic) */}
        <section
          className="text-white text-center py-20 bg-cover bg-center"
          style={{ backgroundImage: `url(/template/img/a1.jpeg)` }} // Langsung referensi satu gambar
        >
          <div className="bg-black bg-opacity-50 py-12 px-6">
            <h2 className="text-4xl font-bold">Your Perfect Getaway Awaits</h2>
            <p className="mt-4 text-lg">Discover unparalleled comfort and luxury in the heart of the city.</p>
            <a href="#" className="button-secondary mt-6 inline-block">BOOK YOUR STAY NOW</a>
          </div>
        </section>
        {/* WHY CHOOSE US */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-12">WHY CHOOSE US?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <img src="/template/img/a1.jpeg" alt="Luxurious Rooms" className="rounded mb-3 w-full h-48 object-cover" />
                <h5 className="text-xl font-semibold">Luxurious Rooms</h5>
                <p className="mt-2">Spacious and elegantly designed rooms for ultimate comfort.</p>
              </div>
              <div className="card">
                <img src="/template/img/a2.jpg" alt="Gourmet Dining" className="rounded mb-3 w-full h-48 object-cover" />
                <h5 className="text-xl font-semibold">Gourmet Dining</h5>
                <p className="mt-2">Indulge in culinary delights at our exquisite restaurants.</p>
              </div>
              <div className="card">
                <img src="/template/img/a4.jpeg" alt="Exceptional Service" className="rounded mb-3 w-full h-48 object-cover" />
                <h5 className="text-xl font-semibold">Exceptional Service</h5>
                <p className="mt-2">Our dedicated staff ensures a memorable and personalized experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED ROOMS */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-10 text-center">OUR FEATURED ROOMS</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {["a2.jpg", "a3.jpeg", "a5.jpg"].map((img, i) => (
                <div className="card" key={i}>
                  <img src={`/template/img/${img}`} alt="Room" className="rounded mb-4 w-full h-52 object-cover" />
                  <h5 className="text-xl font-semibold">Deluxe King Room</h5>
                  <p className="mt-2 text-sm">King Bed | City View | Free WiFi</p>
                  <p className="text-lg font-bold text-[var(--color-navbar)] mt-2">Starts from $150</p>
                  <a href="#" className="button-secondary mt-4 inline-block">BOOK NOW</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white pt-12 pb-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h5 className="text-lg font-bold mb-4">Mutiara Hotel</h5>
                <p>Your ultimate destination for luxury stays and memorable experiences.</p>
              </div>
              <div>
                <h6 className="text-sm font-semibold mb-2">About Us</h6>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:underline">Our Story</a></li>
                  <li><a href="#" className="hover:underline">Careers</a></li>
                </ul>
              </div>
              <div>
                <h6 className="text-sm font-semibold mb-2">Guest Services</h6>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:underline">FAQs</a></li>
                  <li><a href="#" className="hover:underline">Contact</a></li>
                </ul>
              </div>
              <div>
                <h6 className="text-sm font-semibold mb-2">Stay Connected</h6>
                <form className="flex">
                  <input type="email" placeholder="Enter your email" className="input rounded-l-none" />
                  <button className="button-primary rounded-l-none">Subscribe</button>
                </form>
              </div>
            </div>
            <hr className="my-6 border-gray-700" />
            <p className="text-center text-sm">© 2025 Mutiara Hotel. All rights reserved. Designed by [Nama Desainer Anda]</p>
          </div>
        </footer>
      </div>
    </>
  );
}
