import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const FileModal = ({ isOpen, onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    fileName: '',
    uptdName: '',
    inputDate: '',
    fileAmount: '',
    boxNumber: '',
    description: ''
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        fileName: '',
        uptdName: '',
        inputDate: '',
        fileAmount: '',
        boxNumber: '',
        description: ''
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = () => {
    if (!formData.fileName || !formData.uptdName || !formData.inputDate || !formData.fileAmount || !formData.boxNumber) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {editData ? 'Edit File Information' : 'Add New File'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama File <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fileName}
                onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan Nama File"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama UPTD <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.uptdName}
                onChange={(e) => setFormData({ ...formData, uptdName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan Nama UPTD"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal file Dimasukkan <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.inputDate}
                onChange={(e) => setFormData({ ...formData, inputDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah Berkas <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fileAmount}
                onChange={(e) => setFormData({ ...formData, fileAmount: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan jumlah Berka"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Box <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.boxNumber}
                onChange={(e) => setFormData({ ...formData, boxNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nomor Box Berkas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan Deskripsi Berkas seperti jenis berkas dan isi"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {editData ? 'Update File' : 'Masukkan Berkas'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileModal;