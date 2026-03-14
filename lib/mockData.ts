export const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908, isCurrent: true },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
];

export const productHighlights = [
  { name: 'Get Pro', value: 25018, color: '#FF00D6' },
  { name: 'Active Visitor', value: 12450, color: '#00F5FF' },
  { name: 'Cancel', value: 1200, color: '#FF4444' },
];

export const taskProgressData = [
  { value: 40 }, { value: 35 }, { value: 55 }, { value: 45 }, { value: 70 }, { value: 65 }, { value: 85 }
];

export const taskExpensesData = [
  { value: 6045 }, { value: 5800 }, { value: 6200 }, { value: 5900 }, { value: 6100 }, { value: 6045 }
];

export const topPeople = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Employee', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Customer', avatar: 'JS' },
  { id: 3, name: 'Mike Ross', email: 'mike@example.com', status: 'Partner', avatar: 'MR' },
  { id: 4, name: 'Harvey Specter', email: 'harvey@example.com', status: 'Employee', avatar: 'HS' },
  { id: 5, name: 'Donna Paulsen', email: 'donna@example.com', status: 'Partner', avatar: 'DP' },
];

export const analyticsData = [
  { time: '00:00', users: 400, sessions: 240, bounce: 24 },
  { time: '04:00', users: 300, sessions: 139, bounce: 18 },
  { time: '08:00', users: 2000, sessions: 980, bounce: 45 },
  { time: '12:00', users: 2780, sessions: 1908, bounce: 32 },
  { time: '16:00', users: 1890, sessions: 1480, bounce: 28 },
  { time: '20:00', users: 2390, sessions: 1380, bounce: 35 },
  { time: '23:59', users: 3490, sessions: 2300, bounce: 40 },
];

export const revenueOverTime = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 21000 },
  { month: 'Jun', revenue: 28000 },
  { month: 'Jul', revenue: 35000 },
];

export const userAcquisition = [
  { month: 'Jan', newUsers: 1200 },
  { month: 'Feb', newUsers: 1900 },
  { month: 'Mar', newUsers: 1500 },
  { month: 'Apr', newUsers: 2200 },
  { month: 'May', newUsers: 2800 },
  { month: 'Jun', newUsers: 3400 },
  { month: 'Jul', newUsers: 4100 },
];

export const recentEvents = [
  { id: 1, user: 'Alex Rivera', event: 'Upgraded to Pro', time: '2 mins ago', type: 'Upgrade' },
  { id: 2, user: 'Sarah Chen', event: 'New Subscription', time: '15 mins ago', type: 'New' },
  { id: 3, user: 'James Wilson', event: 'Payment Success', time: '1 hour ago', type: 'Payment' },
  { id: 4, user: 'Maria Garcia', event: 'New User Signup', time: '3 hours ago', type: 'Signup' },
  { id: 5, user: 'David Kim', event: 'Support Ticket Closed', time: '5 hours ago', type: 'Support' },
];

export const chats = [
  {
    id: 1,
    name: 'Alex Rivera',
    avatar: 'AR',
    status: 'online',
    lastMessage: 'The design looks great! Let\'s proceed.',
    time: '2m ago',
    messages: [
      { id: 1, text: 'Hey, how is the progress on the dashboard?', sender: 'me', time: '10:00 AM' },
      { id: 2, text: 'It\'s going well! I just finished the analytics section.', sender: 'them', time: '10:05 AM' },
      { id: 3, text: 'The design looks great! Let\'s proceed.', sender: 'them', time: '10:06 AM' },
    ]
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: 'SC',
    status: 'online',
    lastMessage: 'Can we schedule a call for tomorrow?',
    time: '15m ago',
    messages: [
      { id: 1, text: 'Hi Sarah, did you see the latest update?', sender: 'me', time: '09:00 AM' },
      { id: 2, text: 'Yes, I did. Looks promising.', sender: 'them', time: '09:15 AM' },
      { id: 3, text: 'Can we schedule a call for tomorrow?', sender: 'them', time: '09:16 AM' },
    ]
  },
  {
    id: 3,
    name: 'James Wilson',
    avatar: 'JW',
    status: 'offline',
    lastMessage: 'The payment was successful.',
    time: '1h ago',
    messages: []
  },
];

export const calendarEvents = [
  { id: 1, title: 'Project Sync', date: '2023-10-24', type: 'Design' },
  { id: 2, title: 'Design Review', date: '2023-10-25', type: 'Starting' },
  { id: 3, title: 'Client Meeting', date: '2023-10-28', type: 'New' },
];
