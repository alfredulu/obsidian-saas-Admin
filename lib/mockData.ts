
export const taskProgressData = [
  { value: 40 }, { value: 35 }, { value: 55 }, { value: 45 }, { value: 70 }, 
  { value: 60 }, { value: 85 }, { value: 75 }, { value: 95 }, { value: 80 },
  { value: 110 }, { value: 90 }, { value: 120 }
];

export const taskExpensesData = [
  { value: 30 }, { value: 45 }, { value: 35 }, { value: 60 }, { value: 50 },
  { value: 75 }, { value: 65 }, { value: 90 }, { value: 80 }, { value: 105 },
  { value: 95 }, { value: 115 }, { value: 100 }
];

export const saleHistoryData = [
  { name: 'Jan', avg: 40, total: 30 },
  { name: 'Feb', avg: 50, total: 45 },
  { name: 'Mar', avg: 45, total: 35 },
  { name: 'Apr', avg: 90, total: 85, active: true },
  { name: 'May', avg: 60, total: 50 },
  { name: 'Jun', avg: 55, total: 45 },
  { name: 'Jul', avg: 70, total: 60 },
  { name: 'Aug', avg: 65, total: 55 },
  { name: 'Sep', avg: 80, total: 70 },
  { name: 'Oct', avg: 75, total: 65 },
  { name: 'Nov', avg: 85, total: 75 },
  { name: 'Dec', avg: 70, total: 60 },
];

export const topPeople = [
  {
    id: 1,
    name: 'Cody Fish',
    email: 'codyfish@gmail.com',
    category: 'Employee',
    avatar: 'https://picsum.photos/seed/cody/40/40',
    statusColor: '#FF00D6'
  },
  {
    id: 2,
    name: 'Isaac Foster',
    email: 'issacfo@gmail.com',
    category: 'Customer',
    avatar: 'https://picsum.photos/seed/isaac/40/40',
    statusColor: '#10B981'
  },
  {
    id: 3,
    name: 'Alice Long',
    email: 'alicelong@gmail.com',
    category: 'Employee',
    avatar: 'https://picsum.photos/seed/alice/40/40',
    statusColor: '#FF00D6'
  },
  {
    id: 4,
    name: 'Chloe Perez',
    email: 'chloeperez@gmail.com',
    category: 'Partner',
    avatar: 'https://picsum.photos/seed/chloe/40/40',
    statusColor: '#F59E0B'
  },
  {
    id: 5,
    name: 'Richard Clark',
    email: 'richardclark@gmail.com',
    category: 'Employee',
    avatar: 'https://picsum.photos/seed/richard/40/40',
    statusColor: '#FF00D6'
  }
];


export const scheduleItems = [
  // ... existing items ...
  {
    id: 1,
    title: 'Meeting Client',
    status: 'Starting',
    time: '03:00 PM - 03:45 PM',
    attendees: [
      'https://picsum.photos/seed/u1/32/32',
      'https://picsum.photos/seed/u2/32/32',
      'https://picsum.photos/seed/u3/32/32'
    ],
    extraAttendees: 2,
    todoCount: 3,
    duration: '45 min.'
  },
  {
    id: 2,
    title: 'App Design',
    status: 'Design',
    time: '03:00 PM - 03:45 PM',
    attendees: [
      'https://picsum.photos/seed/u4/32/32',
      'https://picsum.photos/seed/u5/32/32',
      'https://picsum.photos/seed/u6/32/32'
    ],
    extraAttendees: 2,
    todoCount: 3
  }
];

export const revenueData = [
  { month: 'Jan', revenue: 4500 },
  { month: 'Feb', revenue: 5200 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6100 },
  { month: 'May', revenue: 5900 },
  { month: 'Jun', revenue: 7200 },
  { month: 'Jul', revenue: 8500 },
  { month: 'Aug', revenue: 7800 },
  { month: 'Sep', revenue: 9200 },
  { month: 'Oct', revenue: 10500 },
  { month: 'Nov', revenue: 11800 },
  { month: 'Dec', revenue: 13500 },
];

export const acquisitionData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 150 },
  { month: 'Mar', users: 180 },
  { month: 'Apr', users: 240 },
  { month: 'May', users: 300 },
  { month: 'Jun', users: 350 },
  { month: 'Jul', users: 420 },
  { month: 'Aug', users: 480 },
  { month: 'Sep', users: 550 },
  { month: 'Oct', users: 620 },
  { month: 'Nov', users: 700 },
  { month: 'Dec', users: 850 },
];

export const activityFeed = [
  {
    id: 1,
    user: 'Lily Carter',
    action: 'Purchased Pro Plan',
    time: '2 mins ago',
    avatar: 'https://picsum.photos/seed/lily/40/40',
    badge: 'Sale',
    badgeColor: '#FF00D6'
  },
  {
    id: 2,
    user: 'Cody Fish',
    action: 'Updated Task Progress',
    time: '15 mins ago',
    avatar: 'https://picsum.photos/seed/cody/40/40',
    badge: 'Update',
    badgeColor: '#00FFD1'
  },
  {
    id: 3,
    user: 'Isaac Foster',
    action: 'Joined as Customer',
    time: '1 hour ago',
    avatar: 'https://picsum.photos/seed/isaac/40/40',
    badge: 'New User',
    badgeColor: '#9D00FF'
  },
  {
    id: 4,
    user: 'Alice Long',
    action: 'Completed Project Alpha',
    time: '3 hours ago',
    avatar: 'https://picsum.photos/seed/alice/40/40',
    badge: 'Milestone',
    badgeColor: '#FACC15'
  }
];

export const pricingTiers = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for individuals starting their journey.',
    features: ['Up to 3 Projects', 'Basic Analytics', 'Community Support', '1GB Storage'],
    buttonText: 'Get Started',
    isPopular: false
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'Best for professionals and growing teams.',
    features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', '10GB Storage', 'Custom Integrations'],
    buttonText: 'Upgrade to Pro',
    isPopular: true
  },
  {
    name: 'Enterprise',
    price: '$199',
    description: 'Advanced features for large scale operations.',
    features: ['Unlimited Everything', 'Dedicated Account Manager', '24/7 Phone Support', 'SSO & Security', 'Custom Contracts'],
    buttonText: 'Contact Sales',
    isPopular: false
  }
];

