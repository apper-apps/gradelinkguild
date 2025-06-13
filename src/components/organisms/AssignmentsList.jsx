import { motion } from 'framer-motion';
import AssignmentCard from '@/components/molecules/AssignmentCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import { format } from 'date-fns';

const AssignmentsList = ({ assignments, loading, emptyTitle, emptyDescription, getSubjectName, className = '' }) => {
  if (loading) {
    return <SkeletonLoader count={5} type="card" className={className} />;
  }

  if (assignments.length === 0) {
    return (
      <EmptyState
        icon="FileText"
        title={emptyTitle}
        description={emptyDescription}
        className={className}
      />
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {assignments.map((assignment, index) => (
        <motion.div
          key={assignment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
        >
          {/* Replicating the full AssignmentCard logic if needed, or pass the complex rendering to AssignmentCard */}
          {/* For simplicity and reusability, a lot of logic was passed to AssignmentCard. The original page had additional elements inside the map */}
          {/* I will keep the original elements from the page for the list item, and use AssignmentCard for its internal structure */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {assignment.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{getSubjectName(assignment.subjectId)}</span>
                <span>Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}</span>
              </div>
            </div>
            <AssignmentCard assignment={assignment} className="!p-0 !bg-transparent !shadow-none !border-0" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AssignmentsList;