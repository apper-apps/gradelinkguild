import ApperIcon from '@/components/ApperIcon';
import AssignmentCard from '@/components/molecules/AssignmentCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import { motion } from 'framer-motion';

const SubjectDetailPanel = ({ selectedSubject, assignments, assignmentsLoading }) => {
  const getTrendIcon = (trend) => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-gray-500';
  };

  if (!selectedSubject) {
    return (
      <EmptyState
        icon="BookOpen"
        title="Select a subject"
        description="Choose a subject from the list to view detailed performance information."
        className="py-12"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-display font-bold text-gray-900 mb-1">
              {selectedSubject.name}
            </h2>
            <p className="text-gray-600">{selectedSubject.teacher}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {selectedSubject.currentGrade}
            </div>
            <div className="text-sm text-gray-600">
              {selectedSubject.gradePercentage}%
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <ApperIcon 
              name={getTrendIcon(selectedSubject.trend)}
              size={16} 
              className={getTrendColor(selectedSubject.trend)}
            />
            <span className="text-sm text-gray-600 capitalize">
              {selectedSubject.trend} trend
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Assignments & Grades
        </h3>
        {assignmentsLoading ? (
          <SkeletonLoader count={3} type="card" />
        ) : assignments.length === 0 ? (
          <EmptyState
            icon="FileText"
            title="No assignments yet"
            description="Assignment updates for this subject will appear here."
            className="py-8"
          />
        ) : (
          <div className="space-y-3">
            {assignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AssignmentCard assignment={assignment} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetailPanel;