const SkeletonLoader = ({ count = 1, type = 'default', className = '' }) => {
  const getSkeletonContent = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="flex space-x-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        );
      case 'list':
        return (
          <div className="animate-pulse">
            <div className="flex items-center space-x-3 p-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        );
      default:
        return (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {getSkeletonContent()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;