import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    nip: '',
    title: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Kata sandi tidak cocok');
      return;
    }
    if (formData.password.length < 6) {
      setError('Kata sandi minimal 6 karakter');
      return;
    }
    if (!/^[0-9]+$/.test(formData.nip)) {
      setError('NIP harus berupa angka');
      return;
    }
    if (!formData.fullName || !formData.nip || !formData.title) {
      setError('Isi semua field yang diperlukan');
      return;
    }

    setLoading(true);
    const result = await register({
      nip: formData.nip,
      fullName: formData.fullName,
      title: formData.title,
      password: formData.password
    });

    if (result.success) navigate('/');
    else setError(result.message || 'Gagal mendaftar');

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* LEFT: Form Section */}
          <div className="w-full md:w-3/5 bg-white p-8 md:p-12">
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0b2b2f] mb-2 text-center">
                Daftar Akun Anda
              </h2>
              <p className="text-sm text-gray-600 mb-8 text-center">
                Isi formulir di bawah untuk membuat akun baru
              </p>

              {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* NIP */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    NIP (Nomor Identitas Pegawai) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    placeholder="Masukkan NIP Anda (hanya angka)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Title/Position */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Jabatan <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Masukkan jabatan Anda"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Kata Sandi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan kata sandi (minimal 6 karakter)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Konfirmasi Kata Sandi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Konfirmasi kata sandi Anda"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      'Mendaftarkan...'
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        Daftar Sekarang
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: Dark Panel with Logo */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-[#072936] to-[#0b3d4f] p-8 md:p-12 flex flex-col items-center justify-center text-center text-white">
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-6">
                  <img 
                    src={logo} 
                    alt="SIAP Logo" 
                    className="w-32 h-32 object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-2xl font-bold mb-2">SIAP</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Sistem Informasi Arsip Parepare
                </p>
              </div>

              {/* Divider */}
              <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>

              {/* CTA */}
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Sudah punya akun?
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Masuk Sekarang
                </button>
              </div>

              {/* Footer Text */}
              <p className="text-gray-400 text-xs mt-8">
                © 2024 SIAP Parepare. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}