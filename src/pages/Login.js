import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Login() {
  const [formData, setFormData] = useState({ nip: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await login(formData.nip, formData.password);
      if (result.success) navigate('/');
      else setError(result.message || 'Login gagal');
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row-reverse">
          {/* RIGHT: Form Section */}
          <div className="w-full md:w-3/5 bg-white p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0b2b2f] mb-2 text-center">
                Masuk Ke Akun Anda
              </h2>
              <p className="text-sm text-gray-600 mb-8 text-center">
                Silakan masukkan kredensial Anda untuk melanjutkan
              </p>

              {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NIP Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    NIP (Nomor Identitas Pegawai) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    placeholder="Masukkan NIP Anda"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Kata Sandi <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan kata sandi Anda"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  />
                </div>

                {/* Forgot Password Link (optional) */}
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    Lupa kata sandi?
                  </button>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      'Masuk...'
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        Masuk Sekarang
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Register Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Belum punya akun?{' '}
                  <button
                    onClick={() => navigate('/register')}
                    className="text-yellow-600 hover:text-yellow-700 font-semibold"
                  >
                    Daftar sekarang
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* LEFT: Dark Panel with Logo */}
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

              {/* Welcome Text */}
              <div>
                <h3 className="text-2xl font-bold mb-2">Selamat Datang!</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Sistem Informasi Arsip Parepare
                </p>
              </div>

              {/* Divider */}
              <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>

              {/* CTA */}
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Belum punya akun?
                </p>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Daftar Sekarang
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