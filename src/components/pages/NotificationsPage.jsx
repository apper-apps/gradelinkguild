import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PageHeader from '@/components/organisms/PageHeader';
import StatsOverview from '@/components/organisms/StatsOverview';
import FilterButtons from '@/components/organisms/FilterButtons';
import NotificationsList from '@/components/organisms/NotificationsList';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { notificationService } from '@/services';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { id: 'all', label: 'All', icon: 'List' },
    { id: 'unread', label: 'Unread', icon: 'Bell' },
    { id: 'grade', label: 'Grades', icon: 'Award' },
    { id: 'assignment', label: 'Assignments', icon: 'FileText' },
    { id: 'attendance', label: 'Attendance', icon: 'Calendar' }
  ];

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    filterNotifications();
  }, [notifications, activeFilter]);

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      setError(err.message || 'Failed to load notifications');
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const filterNotifications = () => {
    let filtered = [...notifications];

    switch (activeFilter) {
      case 'unread':
        filtered = notifications.filter(n => !n.read);
        break;
      case 'grade':
        filtered = notifications.filter(n => n.type === 'grade');
        break;
      case 'assignment':
        filtered = notifications.filter(n => n.type === 'assignment');
        break;
      case 'attendance':
        filtered = notifications.filter(n => n.type === 'attendance');
        break;
      default:
        break;
    }

    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setFilteredNotifications(filtered);
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

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all notifications as read');
    }
  };

  const getNotificationCounts = () => {
    return {
      total: notifications.length,
      unread: notifications.filter(n => !n.read).length,
      grade: notifications.filter(n => n.type === 'grade').length,
      assignment: notifications.filter(n => n.type === 'assignment').length,
      attendance: notifications.filter(n => n.type === 'attendance').length
    };
  };

  const counts = getNotificationCounts();

  const stats = [
    { title: 'Total', value: counts.total, colorClass: 'text-gray-900' },
    { title: 'Unread', value: counts.unread, colorClass: 'text-primary' },
    { title: 'Grades', value: counts.grade, colorClass: 'text-success' },
    { title: 'Assignments', value: counts.assignment, colorClass: 'text-warning' },
    { title: 'Attendance', value: counts.attendance, colorClass: 'text-info' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          ))}
        </div>
        <NotificationsList loading={true} />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadNotifications} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader 
          title="Notifications"
          description="Stay updated with real-time academic alerts and important updates."
          className="mb-0"
        />
        {counts.unread > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="secondary">
            <ApperIcon name="CheckCheck" size={16} className="mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      <StatsOverview stats={stats} className="md:grid-cols-5" />

      <FilterButtons 
        filters={filters} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
        counts={counts}
      />

      <NotificationsList 
        notifications={filteredNotifications} 
        loading={loading} 
        onMarkAsRead={handleMarkAsRead}
        emptyTitle={`No ${activeFilter === 'all' ? '' : activeFilter} notifications`}
        emptyDescription={
          activeFilter === 'all' 
            ? "You're all caught up! New notifications will appear here."
            : `No ${activeFilter} notifications found. Try a different filter.`
        }
      />
    </div>
  );
};

export default NotificationsPage;