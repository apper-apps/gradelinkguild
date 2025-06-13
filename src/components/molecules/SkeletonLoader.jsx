import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3, type = 'card', className = '' }) => {
  const skeletonVariants = {
    card: (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded-full w-12"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-4"></div>
          </div>
        </div>
      </div>
    ),
    stat: (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    ),
    notification: (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {skeletonVariants[type]}
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;