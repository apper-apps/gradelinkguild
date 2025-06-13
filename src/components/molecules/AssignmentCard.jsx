import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const AssignmentCard = ({ assignment, className = '' }) => {
  if (!assignment) return null;

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getStatusIcon(assignment.status)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
            {assignment.status || 'Pending'}
          </span>
        </div>
        {assignment.priority && (
          <span className="text-xs text-gray-500 font-medium">
            {assignment.priority}
          </span>
        )}
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-1">
        {assignment.title}
      </h3>
      
      {assignment.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {assignment.description}
        </p>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>
            {assignment.dueDate ? format(new Date(assignment.dueDate), 'MMM dd, yyyy') : 'No due date'}
          </span>
        </div>
        {assignment.points && (
          <span className="font-medium">
            {assignment.points} pts
          </span>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;