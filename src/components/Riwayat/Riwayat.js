import React, { useEffect, useState, useContext } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { getAllHistory } from '../../services/api';

const Riwayat = ({ files, setViewingFile }) => {
  const { isAdmin } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchHistory();
    }
  }, [isAdmin]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getAllHistory();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sort files by creation date (newest first)
  const sortedFiles = [...files].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Riwayat</h2>
      
      {/* Active Files History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Berkas Aktif</h3>
        {sortedFiles.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Belum ada Berkas Aktif.</p>
        ) : (
          <div className="space-y-4">
            {sortedFiles.map(file => (
              <div key={file._id} className="border-l-4 border-green-600 bg-green-50 p-4 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg">{file.fileName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Dibuat Pada {new Date(file.createdAt).toLocaleDateString()} at {new Date(file.createdAt).toLocaleTimeString()}
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <span className="text-gray-700">
                        <strong>UPTD:</strong> {file.uptdName}
                      </span>
                      <span className="text-gray-700">
                        <strong>Box:</strong> {file.boxNumber}
                      </span>
                      <span className="text-gray-700">
                        <strong>Tanggal Dimasukkan:</strong> {file.inputDate}
                      </span>
                      <span className="text-gray-700">
                        <strong>Jumlah Berkas:</strong> {file.fileAmount}
                      </span>
                    </div>
                    {file.description && (
                      <p className="text-sm text-gray-600 mt-2 italic">{file.description}</p>
                    )}
                    {file.updatedAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        Last updated: {new Date(file.updatedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setViewingFile(file)}
                    className="text-blue-600 hover:text-blue-800 ml-4"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Deleted Files History (Admin Only) */}
      {isAdmin && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            Riwayat Berkas Terhapus
          </h3>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Memuat Riwayat</p>
          ) : history.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Belum ada Berkas dihapus.</p>
          ) : (
            <div className="space-y-4">
              {history.map(item => (
                <div key={item._id} className="border-l-4 border-red-600 bg-red-50 p-4 rounded-r-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg">{item.fileName}</p>
                    <p className="text-sm text-red-600 mt-1">
                      Dihapus pada Tanggal {new Date(item.deletedAt).toLocaleDateString()} at {new Date(item.deletedAt).toLocaleTimeString()}
                      {item.deletedBy && ` by ${item.deletedBy.fullName}`}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Dibuat pada Tanggal {new Date(item.createdAt).toLocaleDateString()}
                      {item.createdBy && ` by ${item.createdBy.fullName}`}
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <span className="text-gray-700">
                        <strong>UPTD:</strong> {item.uptdName}
                      </span>
                      <span className="text-gray-700">
                        <strong>Box</strong> {item.boxNumber}
                      </span>
                      <span className="text-gray-700">
                        <strong>Tanggal Input</strong> {item.inputDate}
                      </span>
                      <span className="text-gray-700">
                        <strong>Jumlah Berkas</strong> {item.fileAmount}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-2 italic">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Riwayat;