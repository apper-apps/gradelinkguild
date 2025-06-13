import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/organisms/PageHeader';
import StatsOverview from '@/components/organisms/StatsOverview';
import FilterButtons from '@/components/organisms/FilterButtons';
import AssignmentsList from '@/components/organisms/AssignmentsList';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import { assignmentService, subjectService } from '@/services';
import { isAfter } from 'date-fns';

const AssignmentsPage = () => {
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
        break;
    }

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

  const counts = getAssignmentCounts();

  const stats = [
    { title: 'Total', value: counts.total, colorClass: 'text-gray-900' },
    { title: 'Upcoming', value: counts.upcoming, colorClass: 'text-warning' },
    { title: 'Overdue', value: counts.overdue, colorClass: 'text-error' },
    { title: 'Graded', value: counts.graded, colorClass: 'text-success' },
    { title: 'Submitted', value: counts.submitted, colorClass: 'text-info' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Assignments & Grades" description="Track all assignments, due dates, and grades across all subjects." />
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

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Assignments & Grades"
        description="Track all assignments, due dates, and grades across all subjects."
      />

      <StatsOverview stats={stats} className="md:grid-cols-5" />

      <FilterButtons 
        filters={filters} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
        counts={counts}
      />

      <AssignmentsList 
        assignments={filteredAssignments} 
        loading={loading}
        emptyTitle={`No ${activeFilter === 'all' ? '' : activeFilter} assignments`}
        emptyDescription={
          activeFilter === 'all' 
            ? "Assignment updates will appear here as they become available."
            : `No ${activeFilter} assignments found. Try a different filter.`
        }
        getSubjectName={getSubjectName}
      />
    </div>
  );
};

export default AssignmentsPage;