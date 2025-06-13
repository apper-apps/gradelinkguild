import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import StatCard from '@/components/molecules/StatCard';
import SubjectCard from '@/components/molecules/SubjectCard';
import AssignmentCard from '@/components/molecules/AssignmentCard';
import NotificationCard from '@/components/molecules/NotificationCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';
import ProgressRing from '@/components/atoms/ProgressRing';
import { studentService, subjectService, assignmentService, notificationService } from '@/services';

const Dashboard = () => {
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
      
      setStudent(studentData[0]); // Select first student
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonLoader count={3} type="stat" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonLoader count={2} type="card" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadDashboardData} />;
  }

  const recentAssignments = assignments.slice(0, 5);
  const recentNotifications = notifications.slice(0, 3);
  const completionRate = assignments.length > 0 
    ? Math.round((assignments.filter(a => a.status === 'graded' || a.status === 'submitted').length / assignments.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Welcome back! Here's how {student?.name?.split(' ')[0] || 'your student'} is doing.
        </h1>
        <p className="text-gray-600">
          Stay updated with real-time academic progress and performance insights.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Current GPA"
          value={student?.gpa?.toFixed(1) || '0.0'}
          icon="Award"
          trend="stable"
          color="primary"
        />
        <StatCard
          title="Attendance Rate"
          value={`${student?.attendanceRate || 0}%`}
          icon="Calendar"
          trend={student?.attendanceRate >= 95 ? 'up' : student?.attendanceRate >= 90 ? 'stable' : 'down'}
          trendValue={`${student?.attendanceRate || 0}% this month`}
          color="success"
        />
        <StatCard
          title="Assignment Completion"
          value={`${completionRate}%`}
          icon="CheckCircle"
          trend={completionRate >= 90 ? 'up' : completionRate >= 80 ? 'stable' : 'down'}
          trendValue={`${assignments.filter(a => a.status === 'graded').length} completed`}
          color="info"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects Overview */}
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

          {/* Recent Assignments */}
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Performance Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Progress</span>
                <ProgressRing percentage={student?.gpa ? (student.gpa / 4.0) * 100 : 0} size={50} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Attendance</span>
                <ProgressRing 
                  percentage={student?.attendanceRate || 0} 
                  size={50}
                  color="#10b981"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Assignments</span>
                <ProgressRing 
                  percentage={completionRate} 
                  size={50}
                  color="#3b82f6"
                />
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
            {recentNotifications.length === 0 ? (
              <EmptyState
                icon="Bell"
                title="No notifications"
                description="You're all caught up! New notifications will appear here."
                className="py-8"
              />
            ) : (
              <div className="space-y-3">
                {recentNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NotificationCard
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      className="border-0 shadow-none bg-gray-50"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;