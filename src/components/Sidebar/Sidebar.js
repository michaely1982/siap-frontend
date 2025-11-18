import React, { useContext, useState } from 'react';
import { FileText, Archive, Clock, LogOut, User, Users, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // For mobile
  const [isMinimized, setIsMinimized] = useState(false); // For desktop minimize

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      logout();
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsOpen(false); // Close sidebar on mobile after navigation
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-900 text-white p-3 rounded-lg shadow-lg hover:bg-gray-800 transition"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isMinimized ? 'md:w-20' : 'md:w-64'} w-64`}
      >
        {/* Minimize/Maximize Button (Desktop Only) - Centered Vertically */}
        <button
          onClick={toggleMinimize}
          className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 bg-yellow-400 text-gray-900 p-1.5 rounded-full shadow-lg hover:bg-yellow-500 transition z-50"
          title={isMinimized ? 'Maximize' : 'Minimize'}
        >
          {isMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Logo and Title Section */}
        <div className={`p-6 border-b border-gray-700 ${isMinimized ? 'md:px-3' : ''}`}>
          <div className={`flex items-center gap-3 ${isMinimized ? 'md:flex-col md:gap-2' : ''}`}>
            <div className={`bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0 ${
              isMinimized ? 'md:w-10 md:h-10' : 'w-12 h-12'
            }`}>
              <img src={logo} alt="SIAP Logo" className="w-full h-full object-contain" />
            </div>
            {!isMinimized && (
              <div>
                <h1 className="text-xl font-bold">SIAP</h1>
                <p className="text-xs text-gray-400">Arsip Parepare</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <div className={`space-y-1 ${isMinimized ? 'md:px-2' : 'px-3'}`}>
            <button
              onClick={() => handleNavigation('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentPage === 'dashboard'
                  ? 'bg-yellow-400 text-gray-900 font-semibold shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } ${isMinimized ? 'md:justify-center md:px-2' : ''}`}
              title={isMinimized ? 'Dashboard' : ''}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {!isMinimized && <span>Dashboard</span>}
            </button>

            <button
              onClick={() => handleNavigation('daftar')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentPage === 'daftar'
                  ? 'bg-yellow-400 text-gray-900 font-semibold shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } ${isMinimized ? 'md:justify-center md:px-2' : ''}`}
              title={isMinimized ? 'Daftar Arsip' : ''}
            >
              <Archive className="w-5 h-5 flex-shrink-0" />
              {!isMinimized && <span>Daftar Arsip</span>}
            </button>

            <button
              onClick={() => handleNavigation('riwayat')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentPage === 'riwayat'
                  ? 'bg-yellow-400 text-gray-900 font-semibold shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } ${isMinimized ? 'md:justify-center md:px-2' : ''}`}
              title={isMinimized ? 'Riwayat' : ''}
            >
              <Clock className="w-5 h-5 flex-shrink-0" />
              {!isMinimized && <span>Riwayat</span>}
            </button>

            {/* User Management - Admin Only */}
            {isAdmin && (
              <button
                onClick={() => handleNavigation('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentPage === 'users'
                    ? 'bg-yellow-400 text-gray-900 font-semibold shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } ${isMinimized ? 'md:justify-center md:px-2' : ''}`}
                title={isMinimized ? 'User Management' : ''}
              >
                <Users className="w-5 h-5 flex-shrink-0" />
                {!isMinimized && <span>User Management</span>}
              </button>
            )}
          </div>
        </nav>

        {/* User Info Section */}
        <div className={`border-t border-gray-700 p-4 ${isMinimized ? 'md:px-2' : ''}`}>
          {/* User Profile */}
          {!isMinimized ? (
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-white truncate">{user?.fullName}</p>
                <p className="text-xs text-gray-400 truncate">NIP: {user?.nip}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-4 p-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-900" />
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg ${
              isMinimized ? 'md:px-2' : ''
            }`}
            title={isMinimized ? 'Keluar' : ''}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!isMinimized && <span>Keluar</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;