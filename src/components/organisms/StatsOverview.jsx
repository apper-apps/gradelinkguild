import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';

const StatsOverview = ({ stats, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          {stat.component ? stat.component : (
            <>
              <div className={`text-2xl font-bold ${stat.colorClass || 'text-gray-900'}`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default StatsOverview;