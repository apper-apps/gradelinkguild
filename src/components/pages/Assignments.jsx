import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { toast } from 'react-toastify';
import AssignmentCard from '@/components/molecules/AssignmentCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { assignmentService, subjectService } from '@/services';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { id: 'all', label: 'All', icon: 'List' },
    { id: 'upcoming', label: 'Upcoming', icon: 'Clock' },
    { id: 'overdue', label: 'Overdue', icon: 'AlertTriangle' },
    { id: 'graded', label: 'Graded', icon: 'CheckCircle' },
    { id: 'submitted', label: 'Submitted', icon: 'Upload' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterAssignments();
  }, [assignments, activeFilter]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [assignmentData, subjectData] = await Promise.all([
        assignmentService.getAll(),
        subjectService.getAll()
      ]);
      setAssignments(assignmentData);
      setSubjects(subjectData);
    } catch (err) {
      setError(err.message || 'Failed to load assignments');
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const filterAssignments = () => {
    let filtered = [...assignments];
    const now = new Date();

    switch (activeFilter) {
      case 'upcoming':
        filtered = assignments.filter(a => 
          isAfter(new Date(a.dueDate), now) && a.status !== 'graded' && a.status !== 'submitted'
        );
        break;
      case 'overdue':
        filtered = assignments.filter(a => a.status === 'overdue');
        break;
      case 'graded':
        filtered = assignments.filter(a => a.status === 'graded');
        break;
      case 'submitted':
        filtered = assignments.filter(a => a.status === 'submitted');
        break;
      default:
        // 'all' - no filtering needed
        break;
    }

    // Sort by due date (overdue first, then by date)
    filtered.sort((a, b) => {
      if (a.status === 'overdue' && b.status !== 'overdue') return -1;
      if (b.status === 'overdue' && a.status !== 'overdue') return 1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    setFilteredAssignments(filtered);
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || 'Unknown Subject';
  };

  const getAssignmentCounts = () => {
    const now = new Date();
    return {
      total: assignments.length,
      upcoming: assignments.filter(a => 
        isAfter(new Date(a.dueDate), now) && a.status !== 'graded' && a.status !== 'submitted'
      ).length,
      overdue: assignments.filter(a => a.status === 'overdue').length,
      graded: assignments.filter(a => a.status === 'graded').length,
      submitted: assignments.filter(a => a.status === 'submitted').length
    };
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          ))}
        </div>
        <SkeletonLoader count={5} type="card" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadData} />;
  }

  const counts = getAssignmentCounts();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Assignments & Grades
        </h1>
        <p className="text-gray-600">
          Track all assignments, due dates, and grades across all subjects.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          <div className="text-2xl font-bold text-gray-900">{counts.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          <div className="text-2xl font-bold text-warning">{counts.upcoming}</div>
          <div className="text-sm text-gray-600">Upcoming</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          <div className="text-2xl font-bold text-error">{counts.overdue}</div>
          <div className="text-sm text-gray-600">Overdue</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          <div className="text-2xl font-bold text-success">{counts.graded}</div>
          <div className="text-sm text-gray-600">Graded</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          <div className="text-2xl font-bold text-info">{counts.submitted}</div>
          <div className="text-sm text-gray-600">Submitted</div>
        </motion.div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
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
            {filter.id !== 'all' && (
              <Badge variant={activeFilter === filter.id ? 'default' : 'primary'} size="sm">
                {filter.id === 'upcoming' ? counts.upcoming :
                 filter.id === 'overdue' ? counts.overdue :
                 filter.id === 'graded' ? counts.graded :
                 filter.id === 'submitted' ? counts.submitted :
                 counts.total}
              </Badge>
            )}
          </motion.button>
        ))}
      </div>

      {/* Assignments List */}
      {filteredAssignments.length === 0 ? (
        <EmptyState
          icon="FileText"
          title={`No ${activeFilter === 'all' ? '' : activeFilter} assignments`}
          description={
            activeFilter === 'all' 
              ? "Assignment updates will appear here as they become available."
              : `No ${activeFilter} assignments found. Try a different filter.`
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
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
                <Badge 
                  variant={
                    assignment.status === 'graded' ? 'success' :
                    assignment.status === 'submitted' ? 'info' :
                    assignment.status === 'overdue' ? 'error' :
                    assignment.status === 'upcoming' ? 'warning' :
                    'primary'
                  }
                >
                  <ApperIcon 
                    name={
                      assignment.status === 'graded' ? 'CheckCircle' :
                      assignment.status === 'submitted' ? 'Upload' :
                      assignment.status === 'overdue' ? 'AlertTriangle' :
                      assignment.status === 'upcoming' ? 'Clock' :
                      'Edit3'
                    } 
                    size={12} 
                    className="mr-1" 
                  />
                  {assignment.status.replace('-', ' ')}
                </Badge>
              </div>

              {assignment.score !== null && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Score:</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        {assignment.score}/{assignment.maxScore}
                      </span>
                      <span className="text-sm text-gray-600 ml-2">
                        ({Math.round((assignment.score / assignment.maxScore) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;