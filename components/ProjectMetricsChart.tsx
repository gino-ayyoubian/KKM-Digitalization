import React from 'react';
import { Project } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface ProjectMetricsChartProps {
    metrics: Project['metrics'];
}

const ProjectMetricsChart: React.FC<ProjectMetricsChartProps> = ({ metrics }) => {
    if (!metrics) return null;

    const { budget, timeline } = metrics;
    
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (percent < 0.05) return null;

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 p-6 rounded-lg">
            {/* Budget Allocation Pie Chart */}
            <div className="h-64">
                <h3 className="text-lg font-display font-semibold text-text-dark text-center mb-2">Budget Allocation ({budget.total} {budget.currency})</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={budget.allocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                        >
                            {budget.allocation.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} ${budget.currency}`} />
                        <Legend iconSize={10} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            {/* Timeline & Progress */}
            <div>
                <h3 className="text-lg font-display font-semibold text-text-dark mb-4">Project Timeline</h3>
                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="font-semibold text-text-light">Start Date:</span>
                        <span className="font-mono">{timeline.start}</span>
                    </div>
                     <div className="flex justify-between text-sm">
                        <span className="font-semibold text-text-light">End Date:</span>
                        <span className="font-mono">{timeline.end}</span>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-primary">Progress</span>
                            <span className="text-sm font-medium text-primary">{timeline.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                                className="bg-accent-yellow h-4 rounded-full transition-all duration-500" 
                                style={{width: `${timeline.progress}%`}}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectMetricsChart;
