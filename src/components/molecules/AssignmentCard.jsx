import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const AssignmentCard = ({ assignment, className = '' }) => {
  const getStatusColor = () => {
    switch (assignment.status) {
      case 'graded': return 'success';
      case 'submitted': return 'info';
      case 'overdue': return 'error';
      case 'upcoming': return 'warning';
      case 'in-progress': return 'primary';
      default: return 'default';
    }
  };

  const getStatusIcon = () => {
    switch (assignment.status) {
      case 'graded': return 'CheckCircle';
      case 'submitted': return 'Upload';
      case 'overdue': return 'AlertTriangle';
      case 'upcoming': return 'Clock';
      case 'in-progress': return 'Edit3';
      default: return 'FileText';
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{assignment.title}</h3>
          <p className="text-xs text-gray-600 mt-1">Due: {formatDate(assignment.dueDate)}</p>
        </div>
        <Badge variant={getStatusColor()} size="sm" className="flex-shrink-0 ml-2">
          <ApperIcon name={getStatusIcon()} size={12} className="mr-1" />
          {assignment.status.replace('-', ' ')}
        </Badge>
      </div>

      {assignment.score !== null && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Score:</span>
          <span className="font-medium text-gray-900">
            {assignment.score}/{assignment.maxScore} ({Math.round((assignment.score / assignment.maxScore) * 100)}%)
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default AssignmentCard;