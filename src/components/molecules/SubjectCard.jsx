import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const SubjectCard = ({ subject, onClick, className = '' }) => {
  const getTrendIcon = () => {
    if (subject.trend === 'up') return 'TrendingUp';
    if (subject.trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (subject.trend === 'up') return 'text-success';
    if (subject.trend === 'down') return 'text-error';
    return 'text-gray-500';
  };

  const getGradeColor = () => {
    const percentage = subject.gradePercentage;
    if (percentage >= 90) return 'success';
    if (percentage >= 80) return 'primary';
    if (percentage >= 70) return 'warning';
    return 'error';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={onClick}
      className={`bg-white rounded-lg p-6 shadow-sm border border-gray-100 cursor-pointer transition-shadow hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{subject.name}</h3>
          <p className="text-sm text-gray-600">{subject.teacher}</p>
        </div>
        <Badge variant={getGradeColor()} size="lg">
          {subject.currentGrade}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{subject.gradePercentage}%</span>
          </div>
          <div className={`flex items-center text-sm ${getTrendColor()}`}>
            <ApperIcon name={getTrendIcon()} size={14} className="mr-1" />
            <span className="capitalize">{subject.trend}</span>
          </div>
        </div>
        <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
      </div>
    </motion.div>
  );
};

export default SubjectCard;