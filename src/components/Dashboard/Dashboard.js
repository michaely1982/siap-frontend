import React from 'react';
import { FileText, Box, Calendar, Plus, Eye } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = ({ files, setIsModalOpen, setEditingFile, setViewingFile }) => {
  const totalFiles = files.length;
  const uniqueBoxes = 33;
  
  // Calculate files added this year
  const thisYear = files.filter(f => {
    if (!f.inputDate) return false;
    const fileYear = new Date(f.inputDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return fileYear === currentYear;
  }).length;

  // Prepare data for the chart
  const getChartData = () => {
    const filesByYear = files.reduce((acc, file) => {
      if (!file.inputDate) return acc;
      const year = new Date(file.inputDate).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year]++;
      return acc;
    }, {});

    const chartData = Object.keys(filesByYear)
      .map(year => ({
        year: year,
        totalFiles: filesByYear[year]
      }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));

    return chartData;
  };

  const chartData = getChartData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard SIAP - Sistem Informasi Arsip Parepare</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard icon={FileText} label="Total Arsip Keseluruhan" value={totalFiles} color="#3b82f6" />
        <StatsCard icon={Box} label="Total Organisasi Perangkat Daerah" value={uniqueBoxes} color="#10b981" />
        <StatsCard icon={Calendar} label="Total Arsip Statis Masuk Tahun Ini" value={thisYear} color="#f59e0b" />
      </div>

      {/* Line Chart Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Perkembangan Arsip per Tahun</h3>
        {chartData.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Tidak ada chart untuk saat ini.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Tahun', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Jumlah Arsip', angle: -90, position: 'insideLeft' }}
                allowDecimals={false}
              />
              <Tooltip 
                formatter={(value) => [`${value} arsip`, 'Total']}
                labelFormatter={(label) => `Tahun ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="totalFiles" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Total Arsip"
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">File Terbaru</h3>
        {files.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Belum ada Berkas saat ini, Mulai dengan menambahkan Berkas</p>
        ) : (
          <div className="space-y-3">
            {files.slice(0, 5).map(file => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-4">
                  <FileText className="w-10 h-10 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{file.fileName}</p>
                    <p className="text-sm text-gray-600">UPTD: {file.uptdName} • Box: {file.boxNumber} • {file.inputDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => setViewingFile(file)}
                  className="text-blue-600 hover:text-blue-800 p-2"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;