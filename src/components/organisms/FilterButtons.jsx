import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const FilterButtons = ({ filters, activeFilter, setActiveFilter, counts, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.map(filter => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveFilter(filter.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === filter.id
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ApperIcon name={filter.icon} size={14} />
          <span>{filter.label}</span>
          {filter.id !== 'all' && counts[filter.id] !== undefined && (
            <Badge variant={activeFilter === filter.id ? 'default' : 'primary'} size="sm">
              {counts[filter.id]}
            </Badge>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterButtons;