import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import SubjectCard from '@/components/molecules/SubjectCard';
import AssignmentCard from '@/components/molecules/AssignmentCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';
import ApperIcon from '@/components/ApperIcon';
import { subjectService, assignmentService } from '@/services';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      loadSubjectAssignments(selectedSubject.id);
    }
  }, [selectedSubject]);

  const loadSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await subjectService.getAll();
      setSubjects(data);
      if (data.length > 0) {
        setSelectedSubject(data[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load subjects');
      toast.error('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const loadSubjectAssignments = async (subjectId) => {
    setAssignmentsLoading(true);
    try {
      const data = await assignmentService.getBySubject(subjectId);
      setAssignments(data);
    } catch (err) {
      toast.error('Failed to load assignments');
    } finally {
      setAssignmentsLoading(false);
    }
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonLoader count={6} type="card" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadSubjects} />;
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Subject Performance
        </h1>
        <p className="text-gray-600">
          Track progress across all subjects with detailed performance insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects List */}
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
                  onClick={() => handleSubjectSelect(subject)}
                  className={selectedSubject?.id === subject.id ? 'ring-2 ring-primary' : ''}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subject Details */}
        <div className="lg:col-span-2">
          {selectedSubject ? (
            <div className="space-y-6">
              {/* Subject Header */}
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
                      name={
                        selectedSubject.trend === 'up' ? 'TrendingUp' :
                        selectedSubject.trend === 'down' ? 'TrendingDown' :
                        'Minus'
                      } 
                      size={16} 
                      className={
                        selectedSubject.trend === 'up' ? 'text-success' :
                        selectedSubject.trend === 'down' ? 'text-error' :
                        'text-gray-500'
                      }
                    />
                    <span className="text-sm text-gray-600 capitalize">
                      {selectedSubject.trend} trend
                    </span>
                  </div>
                </div>
              </div>

              {/* Subject Assignments */}
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
          ) : (
            <EmptyState
              icon="BookOpen"
              title="Select a subject"
              description="Choose a subject from the list to view detailed performance information."
              className="py-12"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Subjects;