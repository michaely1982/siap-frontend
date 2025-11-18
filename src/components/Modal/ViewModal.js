import React from 'react';
import { X } from 'lucide-react';

const ViewModal = ({ isOpen, onClose, file }) => {
  if (!isOpen || !file) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
          <h2 className="text-2xl font-bold">Detail Berkas</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Nama Berkas</p>
              <p className="text-lg font-semibold text-gray-800">{file.fileName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Nama UPTD</p>
              <p className="text-lg font-semibold text-gray-800">{file.uptdName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Tanggal Dimasukkan</p>
              <p className="text-lg text-gray-800">{file.inputDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Jumlah Berkas</p>
              <p className="text-lg text-gray-800">{file.fileAmount}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 font-medium">Nomor Box</p>
            <p className="text-lg font-semibold text-gray-800">{file.boxNumber}</p>
          </div>

          {file.description && (
            <div>
              <p className="text-sm text-gray-600 font-medium">Deskripsi</p>
              <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{file.description}</p>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Dibuat Oleh</p>
                <p className="text-sm text-gray-800">
                  {file.createdBy?.fullName || 'Unknown'}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(file.createdAt).toLocaleString()}
                </p>
              </div>
              {file.updatedBy && (
                <div>
                  <p className="text-sm text-gray-600 font-medium">Terakhir diperbaharui Pada</p>
                  <p className="text-sm text-gray-800">
                    {file.updatedBy?.fullName || 'Unknown'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(file.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;