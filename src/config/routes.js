import Dashboard from '@/components/pages/Dashboard';
import Subjects from '@/components/pages/Subjects';
import Assignments from '@/components/pages/Assignments';
import Notifications from '@/components/pages/Notifications';
import Settings from '@/components/pages/Settings';

export const routes = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    component: Dashboard
  },
  {
    id: 'subjects',
    label: 'Subjects',
    path: '/subjects',
    icon: 'BookOpen',
    component: Subjects
  },
  {
    id: 'assignments',
    label: 'Assignments',
    path: '/assignments',
    icon: 'FileText',
    component: Assignments
  },
  {
    id: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    icon: 'Bell',
    component: Notifications
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: Settings
  }
];