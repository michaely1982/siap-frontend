import React from 'react';

const StatsCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <Icon className="w-12 h-12 opacity-20" style={{ color }} />
    </div>
  </div>
);

export default StatsCard;