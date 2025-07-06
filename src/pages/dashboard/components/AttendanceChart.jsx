import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AttendanceChart = ({ type = 'bar', data, title }) => {
  const weeklyData = [
    { day: 'Lun', present: 45, absent: 5, late: 3 },
    { day: 'Mar', present: 48, absent: 2, late: 2 },
    { day: 'Mer', present: 46, absent: 4, late: 4 },
    { day: 'Jeu', present: 47, absent: 3, late: 2 },
    { day: 'Ven', present: 44, absent: 6, late: 5 },
    { day: 'Sam', present: 25, absent: 25, late: 1 },
    { day: 'Dim', present: 0, absent: 50, late: 0 }
  ];

  const statusData = [
    { name: 'Présents', value: 42, color: 'var(--color-success)' },
    { name: 'Absents', value: 6, color: 'var(--color-error)' },
    { name: 'En retard', value: 2, color: 'var(--color-warning)' }
  ];

  const chartData = data || (type === 'pie' ? statusData : weeklyData);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-text-primary">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'pie') {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4">{title || 'Statut Aujourd\'hui'}</h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {chartData.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-secondary">{entry.name}: {entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title || 'Présence Hebdomadaire'}</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="present" fill="var(--color-success)" name="Présents" radius={[2, 2, 0, 0]} />
            <Bar dataKey="late" fill="var(--color-warning)" name="En retard" radius={[2, 2, 0, 0]} />
            <Bar dataKey="absent" fill="var(--color-error)" name="Absents" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;