import React from 'react';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import SearchBox from '../shared/SearchBox';

const DaftarArsip = ({ 
  filteredFiles, 
  searchTerm, 
  setSearchTerm, 
  setIsModalOpen, 
  setEditingFile, 
  setViewingFile,
  handleEditFile,
  handleDeleteFile 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Daftar Arsip</h2>
        <button
          onClick={() => {
            setEditingFile(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Tambah Berkas Baru
        </button>
      </div>

      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Cari berkas disini berdasarkan Nama, Deskripsi, Nomor Box dan Nama UPTD"
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredFiles.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            {searchTerm ? 'No files found matching your search.' : 'No files archived yet.'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama File</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama UPTD</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal Dimasukkan</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jumlah Berkas</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nomor Box</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFiles.map(file => (
                  <tr key={file._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{file.fileName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{file.uptdName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{file.inputDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{file.fileAmount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{file.boxNumber}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setViewingFile(file)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {/* Remove isAdmin check - all users can edit and delete */}
                        <button
                          onClick={() => handleEditFile(file)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFile(file._id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarArsip;