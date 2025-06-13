import { motion } from 'framer-motion';
import SubjectCard from '@/components/molecules/SubjectCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';

const SubjectList = ({ subjects, selectedSubject, onSelectSubject, loading, error, onRetry }) => {
  if (loading) {
    return <SkeletonLoader count={6} type="card" />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (subjects.length === 0) {
    return (
      <EmptyState
        icon="BookOpen"
        title="No subjects found"
        description="Subject information will appear here once classes are enrolled."
      />
    );
  }

  return (
    <div className="lg:col-span-1">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">All Subjects</h2>
      <div className="space-y-3">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SubjectCard
              subject={subject}
              onClick={() => onSelectSubject(subject)}
              className={selectedSubject?.id === subject.id ? 'ring-2 ring-primary' : ''}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;