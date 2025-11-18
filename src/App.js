import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import DaftarArsip from './components/DaftarArsip/DaftarArsip';
import Riwayat from './components/Riwayat/Riwayat';
import UserManagement from './components/UserManagement/UserManagement';
import FileModal from './components/Modal/FileModal';
import ViewModal from './components/Modal/ViewModal';
import { getAllFiles, createFile, updateFile, deleteFile } from './services/api';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const MainApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [viewingFile, setViewingFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const data = await getAllFiles();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
      } else {
        alert('Failed to load files');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFile = async (formData) => {
    try {
      if (editingFile) {
        const updatedFile = await updateFile(editingFile._id, formData);
        setFiles(files.map(f => f._id === editingFile._id ? updatedFile : f));
        setEditingFile(null);
      } else {
        const newFile = await createFile(formData);
        setFiles([newFile, ...files]);
      }
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Failed to save file');
    }
  };

  const handleEditFile = (file) => {
    setEditingFile(file);
    setIsModalOpen(true);
  };

  const handleDeleteFile = async (id) => {
    if (window.confirm('Are you sure you want to delete this file record?')) {
      try {
        await deleteFile(id);
        setFiles(files.filter(f => f._id !== id));
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('Failed to delete file');
      }
    }
  };

  const filteredFiles = files.filter(file =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.uptdName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.boxNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Main Content - Add padding for mobile menu button */}
      <div className="flex-1 w-full md:w-auto p-4 md:p-8 pt-20 md:pt-8">
        {currentPage === 'dashboard' && (
          <Dashboard 
            files={files}
            setIsModalOpen={setIsModalOpen}
            setEditingFile={setEditingFile}
            setViewingFile={setViewingFile}
          />
        )}
        {currentPage === 'daftar' && (
          <DaftarArsip 
            filteredFiles={filteredFiles}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setIsModalOpen={setIsModalOpen}
            setEditingFile={setEditingFile}
            setViewingFile={setViewingFile}
            handleEditFile={handleEditFile}
            handleDeleteFile={handleDeleteFile}
          />
        )}
        {currentPage === 'riwayat' && (
          <Riwayat 
            files={files}
            setViewingFile={setViewingFile}
          />
        )}
        {currentPage === 'users' && (
          <UserManagement />
        )}
      </div>

      <FileModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFile(null);
        }}
        onSave={handleSaveFile}
        editData={editingFile}
      />

      <ViewModal
        isOpen={!!viewingFile}
        onClose={() => setViewingFile(null)}
        file={viewingFile}
      />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;