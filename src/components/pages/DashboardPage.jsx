import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/organisms/PageHeader';
import StatsOverview from '@/components/organisms/StatsOverview';
import SubjectCard from '@/components/molecules/SubjectCard';
import AssignmentCard from '@/components/molecules/AssignmentCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';
import PerformanceSummary from '@/components/organisms/PerformanceSummary';
import RecentNotifications from '@/components/organisms/RecentNotifications';
import StatCard from '@/components/molecules/StatCard';
import { studentService, subjectService, assignmentService, notificationService } from '@/services';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [studentData, subjectData, assignmentData, notificationData] = await Promise.all([
        studentService.getAll(),
        subjectService.getAll(),
        assignmentService.getAll(),
        notificationService.getAll()
      ]);
      
      setStudent(studentData[0]);
      setSubjects(subjectData);
      setAssignments(assignmentData);
      setNotifications(notificationData);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
      toast.success('Notification marked as read');
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  const recentAssignments = assignments.slice(0, 5);
  const recentNotifications = notifications.slice(0, 3);
  const completionRate = assignments.length > 0 
    ? Math.round((assignments.filter(a => a.status === 'graded' || a.status === 'submitted').length / assignments.length) * 100)
    : 0;

  const stats = [
    { 
      component: (
        <StatCard
          title="Current GPA"
          value={student?.gpa?.toFixed(1) || '0.0'}
          icon="Award"
          trend="stable"
          color="primary"
        />
      )
    },
    { 
      component: (
        <StatCard
          title="Attendance Rate"
          value={`${student?.attendanceRate || 0}%`}
          icon="Calendar"
          trend={student?.attendanceRate >= 95 ? 'up' : student?.attendanceRate >= 90 ? 'stable' : 'down'}
          trendValue={`${student?.attendanceRate || 0}% this month`}
          color="success"
        />
      )
    },
    { 
      component: (
        <StatCard
          title="Assignment Completion"
          value={`${completionRate}%`}
          icon="CheckCircle"
          trend={completionRate >= 90 ? 'up' : completionRate >= 80 ? 'stable' : 'down'}
          trendValue={`${assignments.filter(a => a.status === 'graded').length} completed`}
          color="info"
        />
      )
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title={`Welcome back! Here's how your student is doing.`}
          description="Stay updated with real-time academic progress and performance insights."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonLoader count={3} type="stat" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SkeletonLoader count={2} type="card" />
            <SkeletonLoader count={3} type="card" />
          </div>
          <div className="space-y-6">
            <SkeletonLoader count={1} type="stat" />
            <SkeletonLoader count={2} type="notification" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadDashboardData} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Welcome back! Here's how ${student?.name?.split(' ')[0] || 'your student'} is doing.`}
        description="Stay updated with real-time academic progress and performance insights."
      />

      <StatsOverview stats={stats} className="md:grid-cols-3" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h2>
            {subjects.length === 0 ? (
              <EmptyState
                icon="BookOpen"
                title="No subjects available"
                description="Subject information will appear here once classes are enrolled."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject, index) => (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SubjectCard subject={subject} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Assignments</h2>
            {recentAssignments.length === 0 ? (
              <EmptyState
                icon="FileText"
                title="No assignments yet"
                description="Assignment updates will appear here as they become available."
              />
            ) : (
              <div className="space-y-3">
                {recentAssignments.map((assignment, index) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AssignmentCard assignment={assignment} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <PerformanceSummary 
            gpa={student?.gpa} 
            attendanceRate={student?.attendanceRate} 
            completionRate={completionRate}
          />
          <RecentNotifications 
            notifications={recentNotifications} 
            onMarkAsRead={handleMarkAsRead} 
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;