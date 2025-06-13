import notificationData from '../mockData/notification.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const notificationService = {
  async getAll() {
    await delay(300);
    return [...notificationData];
  },

  async getById(id) {
    await delay(200);
    const notification = notificationData.find(n => n.id === id);
    return notification ? { ...notification } : null;
  },

  async getUnreadCount() {
    await delay(150);
    return notificationData.filter(n => !n.read).length;
  },

  async markAsRead(id) {
    await delay(200);
    const index = notificationData.findIndex(n => n.id === id);
    if (index === -1) throw new Error('Notification not found');
    
    notificationData[index].read = true;
    return { ...notificationData[index] };
  },

  async markAllAsRead() {
    await delay(300);
    notificationData.forEach(n => n.read = true);
    return [...notificationData];
  },

  async create(notification) {
    await delay(400);
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };
    notificationData.unshift(newNotification);
    return { ...newNotification };
  },

  async delete(id) {
    await delay(300);
    const index = notificationData.findIndex(n => n.id === id);
    if (index === -1) throw new Error('Notification not found');
    
    const deleted = notificationData.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default notificationService;