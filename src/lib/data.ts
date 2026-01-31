export const attendanceTrendData = [
  { month: 'Jan', students: 155, staff: 155 },
  { month: 'Feb', students: 170, staff: 168 },
  { month: 'Mar', students: 165, staff: 165 },
  { month: 'Apr', students: 162, staff: 162 },
  { month: 'May', students: 195, staff: 195 }
];

export const issueCategoriesData = [
  { category: 'IT', reported: 590, resolved: 520 },
  { category: 'Facilities', reported: 450, resolved: 380 },
  { category: 'Academic', reported: 380, resolved: 350 },
  { category: 'Academic A', reported: 510, resolved: 480 }
];

export const suggestionsData = [
  { category: 'IT', valuable: 610, unvaluable: 490 },
  { category: 'Facilities', valuable: 480, unvaluable: 420 },
  { category: 'Academic', valuable: 450, unvaluable: 450 }
];

export const exitReasonsData = [
  { name: 'Academic', value: 35, color: '#EF4444' },
  { name: 'Personal', value: 25, color: '#10B981' },
  { name: 'Financial', value: 20, color: '#1F2937' },
  { name: 'Transfer', value: 15, color: '#F59E0B' },
  { name: 'Other', value: 5, color: '#F97316' }
];

export const learningResourcesData = [
  { name: 'Academic', value: 40, color: '#EF4444' },
  { name: 'Personal', value: 30, color: '#10B981' },
  { name: 'Financial', value: 15, color: '#1F2937' },
  { name: 'Transfer', value: 10, color: '#F59E0B' },
  { name: 'Other', value: 5, color: '#F97316' }
];

export const attendanceOverviewData = [
  { name: 'Present', value: 85, color: '#EF4444' },
  { name: 'Absent', value: 15, color: '#10B981' }
];

export const campusIssues = [
  { id: 'CI001', title: 'Library Wi-Fi outage', status: 'Open', priority: 'High', assignee: 'IT Dept.' },
  { id: 'CI002', title: 'Leaking roof in Science Lab', status: 'In Progress', priority: 'High', assignee: 'Maintenance' },
  { id: 'CI003', title: 'Insufficient seating in Cafeteria', status: '', priority: 'Medium', assignee: 'Facilities' },
  { id: 'CI004', title: 'Broken projector in Lecture Hall A', status: 'Open', priority: 'Medium', assignee: 'IT Dept.' },
  { id: 'CI005', title: 'Poor ventilation in Admin Building', status: 'Closed', priority: 'Low', assignee: 'Facilities' }
];

export const suggestions = [
  { id: 'SG001', title: 'More charging stations in common areas', status: 'New', source: 'Anonymous' },
  { id: 'SG002', title: 'Extend library hours during exams', status: 'Reviewed', source: 'User' },
  { id: 'SG003', title: 'Improve campus shuttle frequency', status: '', source: 'Anonymous' },
  { id: 'SG004', title: 'Add healthy food options to vending machines', status: 'New', source: 'User' }
];

export const auditTrail = [
  { id: 'AT001', action: 'Updated issue CI002 status', user: 'AdminUser', timestamp: '2023-10-26 10:30 AM' },
  { id: 'AT002', action: 'Approved suggestion SG002', user: 'AdminUser', timestamp: '2023-10-26 09:45 AM' },
  { id: 'AT003', action: 'Created new event "Career Fair"', user: 'AdminUser', timestamp: '2023-10-25 03:00 PM' },
  { id: 'AT004', action: 'Assigned issue CI001 to IT Dept.', user: 'AdminUser', timestamp: '2023-10-25 11:15 AM' },
  { id: 'AT005', action: 'Logged in', user: 'AdminUser', timestamp: '2023-10-25 08:00 AM' }
];
