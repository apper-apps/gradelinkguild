import DashboardPage from '@/components/pages/DashboardPage';
import SubjectsPage from '@/components/pages/SubjectsPage';
import AssignmentsPage from '@/components/pages/AssignmentsPage';
import NotificationsPage from '@/components/pages/NotificationsPage';
import SettingsPage from '@/components/pages/SettingsPage';

export const routes = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
component: DashboardPage
  },
  {
    id: 'subjects',
    label: 'Subjects',
    path: '/subjects',
    icon: 'BookOpen',
component: SubjectsPage
  },
  {
    id: 'assignments',
    label: 'Assignments',
    path: '/assignments',
    icon: 'FileText',
component: AssignmentsPage
  },
  {
    id: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    icon: 'Bell',
component: NotificationsPage
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
component: SettingsPage
  }
];