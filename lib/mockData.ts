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

export const taskProgressSeries = [
  { month: 'Nov', value: 52 },
  { month: 'Dec', value: 64 },
  { month: 'Jan', value: 58 },
  { month: 'Feb', value: 72 },
  { month: 'Mar', value: 68 },
  { month: 'Apr', value: 75 }
];

export const taskExpensesSeries = [
  { month: 'Nov', value: 4800 },
  { month: 'Dec', value: 5300 },
  { month: 'Jan', value: 6200 },
  { month: 'Feb', value: 6000 },
  { month: 'Mar', value: 6550 },
  { month: 'Apr', value: 6045 }
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

export const users = [
  { id: 1, name: 'Cody Fish', email: 'codyfish@gmail.com', role: 'Admin', status: 'Active', avatar: 'CF' },
  { id: 2, name: 'Isaac Foster', email: 'issacfo@gmail.com', role: 'Staff', status: 'Active', avatar: 'IF' },
  { id: 3, name: 'Alice Long', email: 'alicelong@gmail.com', role: 'Customer', status: 'Inactive', avatar: 'AL' },
  { id: 4, name: 'Chloe Perez', email: 'chloeperez@gmail.com', role: 'Staff', status: 'Active', avatar: 'CP' },
  { id: 5, name: 'Richard Clark', email: 'richardclark@gmail.com', role: 'Customer', status: 'Active', avatar: 'RC' },
  { id: 6, name: 'Emma Wilson', email: 'emmaw@gmail.com', role: 'Staff', status: 'Inactive', avatar: 'EW' },
  { id: 7, name: 'Liam Neeson', email: 'liam@gmail.com', role: 'Customer', status: 'Active', avatar: 'LN' },
];

export const companies = [
  { id: 1, name: 'TechFlow', industry: 'Software', employees: 150, plan: 'Enterprise', logo: 'TF' },
  { id: 2, name: 'GreenGrid', industry: 'Energy', employees: 45, plan: 'Pro', logo: 'GG' },
  { id: 3, name: 'SkyHigh', industry: 'Aviation', employees: 300, plan: 'Enterprise', logo: 'SH' },
  { id: 4, name: 'BlueWave', industry: 'Marine', employees: 12, plan: 'Basic', logo: 'BW' },
  { id: 5, name: 'NovaSoft', industry: 'IT Services', employees: 85, plan: 'Pro', logo: 'NS' },
  { id: 6, name: 'PulseMedia', industry: 'Marketing', employees: 25, plan: 'Basic', logo: 'PM' },
];

export const notifications = [
  { id: 1, title: 'New User Signup', description: 'A new user has registered on your platform.', time: '2 mins ago', unread: true, type: 'user' },
  { id: 2, title: 'System Update', description: 'The system will undergo maintenance at 2:00 AM UTC.', time: '1 hour ago', unread: true, type: 'system' },
  { id: 3, title: 'Payment Received', description: 'Invoice #4521 has been paid successfully.', time: '3 hours ago', unread: false, type: 'payment' },
  { id: 4, title: 'New Message', description: 'You have a new message from Alex Rivera.', time: '5 hours ago', unread: false, type: 'message' },
  { id: 5, title: 'Security Alert', description: 'A login attempt was detected from a new device.', time: '1 day ago', unread: false, type: 'security' },
];

export const tasks = [
  { id: 1, title: 'Dashboard Redesign', description: 'Update the main dashboard with the new Obsidian Noir theme.', status: 'In Progress', priority: 'High', dueDate: '2023-11-05', user: 'Cody Fish' },
  { id: 2, title: 'API Integration', description: 'Connect the frontend with the new GraphQL backend endpoints.', status: 'Todo', priority: 'Medium', dueDate: '2023-11-10', user: 'Isaac Foster' },
  { id: 3, title: 'User Testing', description: 'Conduct usability testing with the first batch of beta users.', status: 'Todo', priority: 'Low', dueDate: '2023-11-12', user: 'Chloe Perez' },
  { id: 4, title: 'Bug Fixes', description: 'Resolve the reported issues in the mobile navigation drawer.', status: 'Completed', priority: 'High', dueDate: '2023-10-30', user: 'Emma Wilson' },
  { id: 5, title: 'Documentation', description: 'Write the technical documentation for the new component library.', status: 'In Progress', priority: 'Medium', dueDate: '2023-11-08', user: 'Cody Fish' },
  { id: 6, title: 'SEO Optimization', description: 'Improve the landing page SEO scores for better visibility.', status: 'Todo', priority: 'Low', dueDate: '2023-11-15', user: 'Richard Clark' },
];

export const notes = [
  { id: 1, title: 'Project Roadmap', content: 'The roadmap for Q4 includes the launch of the mobile app and the new analytics engine.', createdAt: '2023-10-20' },
  { id: 2, title: 'Meeting Notes', content: 'Discussed the budget for the next marketing campaign. Approved $50k for social media ads.', createdAt: '2023-10-22' },
  { id: 3, title: 'Design Ideas', content: 'Consider using more neon accents in the dashboard for a futuristic look.', createdAt: '2023-10-25' },
  { id: 4, title: 'Tech Stack', content: 'We are moving towards a fully serverless architecture using Next.js and Vercel.', createdAt: '2023-10-28' },
];

export const files = [
  { id: 1, name: 'Project Assets', type: 'folder', size: '1.2 GB', modified: '2023-10-25' },
  { id: 2, name: 'Brand Guidelines.pdf', type: 'document', size: '4.5 MB', modified: '2023-10-22' },
  { id: 3, name: 'Dashboard_Mockup.fig', type: 'image', size: '12.8 MB', modified: '2023-10-24' },
  { id: 4, name: 'Marketing Videos', type: 'folder', size: '4.8 GB', modified: '2023-10-20' },
  { id: 5, name: 'User_Interviews.mp4', type: 'video', size: '850 MB', modified: '2023-10-21' },
  { id: 6, name: 'Invoices_Q3.xlsx', type: 'document', size: '1.2 MB', modified: '2023-10-18' },
];

export const integrations = [
  { id: 1, name: 'Slack', description: 'Send notifications and alerts directly to your Slack channels.', connected: true, logo: 'Slack' },
  { id: 2, name: 'Google', description: 'Sync your calendar and drive files with the platform.', connected: false, logo: 'Google' },
  { id: 3, name: 'GitHub', description: 'Automate your deployment workflow with GitHub Actions.', connected: true, logo: 'GitHub' },
  { id: 4, name: 'Stripe', description: 'Manage your subscriptions and payments with Stripe.', connected: false, logo: 'Stripe' },
];
