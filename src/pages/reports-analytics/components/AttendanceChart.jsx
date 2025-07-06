import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AttendanceChart = ({ type, data, title, height = 300 }) => {
  const colors = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)'
  };

  const pieColors = [colors.primary, colors.secondary, colors.accent, colors.success, colors.warning, colors.error];

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="date" 
          stroke="var(--color-text-secondary)"
          fontSize={12}
        />
        <YAxis 
          stroke="var(--color-text-secondary)"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            color: 'var(--color-text-primary)'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="present" 
          stroke={colors.primary} 
          strokeWidth={2}
          dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
          name="Présents"
        />
        <Line 
          type="monotone" 
          dataKey="absent" 
          stroke={colors.error} 
          strokeWidth={2}
          dot={{ fill: colors.error, strokeWidth: 2, r: 4 }}
          name="Absents"
        />
        <Line 
          type="monotone" 
          dataKey="late" 
          stroke={colors.warning} 
          strokeWidth={2}
          dot={{ fill: colors.warning, strokeWidth: 2, r: 4 }}
          name="En retard"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="name" 
          stroke="var(--color-text-secondary)"
          fontSize={12}
        />
        <YAxis 
          stroke="var(--color-text-secondary)"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            color: 'var(--color-text-primary)'
          }}
        />
        <Bar 
          dataKey="value" 
          fill={colors.primary}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            color: 'var(--color-text-primary)'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderLineChart();
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      <div className="w-full" style={{ height: height }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default AttendanceChart;