import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/organisms/PageHeader';
import SubjectList from '@/components/organisms/SubjectList';
import SubjectDetailPanel from '@/components/organisms/SubjectDetailPanel';
import ErrorState from '@/components/molecules/ErrorState';
import EmptyState from '@/components/molecules/EmptyState';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import { subjectService, assignmentService } from '@/services';

const SubjectsPage = () => {
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
        <PageHeader 
          title="Subject Performance"
          description="Track progress across all subjects with detailed performance insights."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkeletonLoader count={3} type="card" className="lg:col-span-1" />
          <SkeletonLoader count={3} type="card" className="lg:col-span-2" />
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
      <PageHeader 
        title="Subject Performance"
        description="Track progress across all subjects with detailed performance insights."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SubjectList 
          subjects={subjects} 
          selectedSubject={selectedSubject} 
          onSelectSubject={handleSubjectSelect} 
          loading={loading}
          error={error}
          onRetry={loadSubjects}
        />
        
        <div className="lg:col-span-2">
          <SubjectDetailPanel 
            selectedSubject={selectedSubject} 
            assignments={assignments} 
            assignmentsLoading={assignmentsLoading} 
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;