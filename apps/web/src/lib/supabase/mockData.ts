import { Conversation, UserProfile, Message, ConversationParticipant } from './types';

// Mock user profiles
export const mockUsers: UserProfile[] = [
  {
    id: 'user-1',
    full_name: 'Sarah Johnson',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    email: 'sarah.johnson@example.com'
  },
  {
    id: 'user-2',
    full_name: 'Michael Chen',
    avatar_url: 'https://i.pravatar.cc/150?img=2',
    email: 'michael.chen@example.com'
  },
  {
    id: 'user-3',
    full_name: 'Jessica Williams',
    avatar_url: 'https://i.pravatar.cc/150?img=3',
    email: 'jessica.williams@example.com'
  },
  {
    id: 'user-4',
    full_name: 'David Rodriguez',
    avatar_url: 'https://i.pravatar.cc/150?img=4',
    email: 'david.rodriguez@example.com'
  },
  {
    id: 'user-5',
    full_name: 'Emily Lee',
    avatar_url: 'https://i.pravatar.cc/150?img=5',
    email: 'emily.lee@example.com'
  },
  {
    id: 'user-6',
    full_name: 'James Wilson',
    avatar_url: 'https://i.pravatar.cc/150?img=6',
    email: 'james.wilson@example.com'
  },
  {
    id: 'user-7',
    full_name: 'Maria Garcia',
    avatar_url: 'https://i.pravatar.cc/150?img=7',
    email: 'maria.garcia@example.com'
  },
  {
    id: 'user-8',
    full_name: 'Robert Taylor',
    avatar_url: 'https://i.pravatar.cc/150?img=8',
    email: 'robert.taylor@example.com'
  },
  {
    id: 'user-9',
    full_name: 'Jennifer Martinez',
    avatar_url: 'https://i.pravatar.cc/150?img=9',
    email: 'jennifer.martinez@example.com'
  },
  {
    id: 'user-10',
    full_name: 'Christopher Brown',
    avatar_url: 'https://i.pravatar.cc/150?img=10',
    email: 'christopher.brown@example.com'
  },
  {
    id: 'user-11',
    full_name: 'Lisa Anderson',
    avatar_url: 'https://i.pravatar.cc/150?img=11',
    email: 'lisa.anderson@example.com'
  },
  {
    id: 'user-12',
    full_name: 'Daniel Thomas',
    avatar_url: 'https://i.pravatar.cc/150?img=12',
    email: 'daniel.thomas@example.com'
  },
  {
    id: 'user-13',
    full_name: 'Karen White',
    avatar_url: 'https://i.pravatar.cc/150?img=13',
    email: 'karen.white@example.com'
  },
  {
    id: 'user-14',
    full_name: 'Matthew Harris',
    avatar_url: 'https://i.pravatar.cc/150?img=14',
    email: 'matthew.harris@example.com'
  },
  {
    id: 'user-15',
    full_name: 'Patricia Lewis',
    avatar_url: 'https://i.pravatar.cc/150?img=15',
    email: 'patricia.lewis@example.com'
  }
];

// Mock loan data for users
export const mockLoans: Record<string, { id: string; title: string; amount: string; status: string; dueDate: string; }[]> = {
  'user-1': [
    { id: 'loan-101', title: 'Home Mortgage', amount: '$320,000', status: 'Active', dueDate: '2024-07-15' },
    { id: 'loan-102', title: 'Auto Loan', amount: '$24,500', status: 'Active', dueDate: '2024-06-10' }
  ],
  'user-2': [
    { id: 'loan-201', title: 'Business Loan', amount: '$75,000', status: 'Active', dueDate: '2024-08-01' }
  ],
  'user-3': [
    { id: 'loan-301', title: 'Student Loan', amount: '$42,000', status: 'Active', dueDate: '2024-09-15' },
    { id: 'loan-302', title: 'Personal Loan', amount: '$10,000', status: 'Pending', dueDate: '2024-05-30' }
  ],
  'user-4': [
    { id: 'loan-401', title: 'Home Equity Loan', amount: '$80,000', status: 'Active', dueDate: '2024-10-01' }
  ],
  'user-5': [
    { id: 'loan-501', title: 'Credit Builder Loan', amount: '$5,000', status: 'Active', dueDate: '2024-06-15' }
  ],
  'user-6': [
    { id: 'loan-601', title: 'Auto Loan', amount: '$32,000', status: 'Active', dueDate: '2024-07-10' },
    { id: 'loan-602', title: 'Personal Loan', amount: '$15,000', status: 'Pending', dueDate: '2024-06-01' }
  ],
  'user-7': [
    { id: 'loan-701', title: 'Mortgage Refinance', amount: '$250,000', status: 'Pending', dueDate: '2024-08-15' }
  ],
  'user-8': [
    { id: 'loan-801', title: 'Home Improvement Loan', amount: '$45,000', status: 'Active', dueDate: '2024-09-01' }
  ],
  'user-9': [
    { id: 'loan-901', title: 'Debt Consolidation', amount: '$30,000', status: 'Active', dueDate: '2024-07-20' }
  ],
  'user-10': [
    { id: 'loan-1001', title: 'Small Business Loan', amount: '$120,000', status: 'Active', dueDate: '2024-11-01' }
  ],
  'user-11': [
    { id: 'loan-1101', title: 'Vehicle Loan', amount: '$28,000', status: 'Active', dueDate: '2024-06-30' }
  ],
  'user-12': [
    { id: 'loan-1201', title: 'Personal Loan', amount: '$12,000', status: 'Pending', dueDate: '2024-05-15' }
  ],
  'user-13': [
    { id: 'loan-1301', title: 'Mortgage', amount: '$380,000', status: 'Active', dueDate: '2024-10-15' }
  ],
  'user-14': [
    { id: 'loan-1401', title: 'Student Loan', amount: '$55,000', status: 'Active', dueDate: '2024-09-10' }
  ],
  'user-15': [
    { id: 'loan-1501', title: 'Business Expansion Loan', amount: '$200,000', status: 'Active', dueDate: '2024-08-01' }
  ]
};

// Mock documents for users
export const mockDocuments: Record<string, { id: string; title: string; type: string; date: string; }[]> = {
  'user-1': [
    { id: 'doc-101', title: 'Income Verification', type: 'PDF', date: '2024-03-15' },
    { id: 'doc-102', title: 'Proof of Address', type: 'PDF', date: '2024-03-12' },
    { id: 'doc-103', title: 'Credit Report', type: 'PDF', date: '2024-03-10' }
  ],
  'user-2': [
    { id: 'doc-201', title: 'Business Plan', type: 'PDF', date: '2024-02-20' },
    { id: 'doc-202', title: 'Financial Statements', type: 'XLSX', date: '2024-02-18' }
  ],
  'user-3': [
    { id: 'doc-301', title: 'Student Enrollment', type: 'PDF', date: '2024-01-25' },
    { id: 'doc-302', title: 'Tuition Statement', type: 'PDF', date: '2024-01-20' }
  ],
  'user-4': [
    { id: 'doc-401', title: 'Property Assessment', type: 'PDF', date: '2024-03-05' },
    { id: 'doc-402', title: 'Home Ownership Proof', type: 'PDF', date: '2024-03-02' }
  ],
  'user-5': [
    { id: 'doc-501', title: 'Credit History Report', type: 'PDF', date: '2024-03-20' }
  ],
  'user-6': [
    { id: 'doc-601', title: 'Vehicle Title', type: 'PDF', date: '2024-02-10' },
    { id: 'doc-602', title: 'Insurance Card', type: 'PDF', date: '2024-02-05' }
  ],
  'user-7': [
    { id: 'doc-701', title: 'Mortgage Statement', type: 'PDF', date: '2024-03-18' },
    { id: 'doc-702', title: 'Home Appraisal', type: 'PDF', date: '2024-03-15' }
  ],
  'user-8': [
    { id: 'doc-801', title: 'Renovation Plans', type: 'PDF', date: '2024-02-28' },
    { id: 'doc-802', title: 'Contractor Quote', type: 'PDF', date: '2024-02-25' }
  ],
  'user-9': [
    { id: 'doc-901', title: 'Credit Card Statements', type: 'PDF', date: '2024-03-10' },
    { id: 'doc-902', title: 'Loan Statements', type: 'PDF', date: '2024-03-08' }
  ],
  'user-10': [
    { id: 'doc-1001', title: 'Business License', type: 'PDF', date: '2024-02-15' },
    { id: 'doc-1002', title: 'Business Plan', type: 'PDF', date: '2024-02-12' }
  ],
  'user-11': [
    { id: 'doc-1101', title: 'Vehicle Information', type: 'PDF', date: '2024-03-05' }
  ],
  'user-12': [
    { id: 'doc-1201', title: 'Income Proof', type: 'PDF', date: '2024-03-22' }
  ],
  'user-13': [
    { id: 'doc-1301', title: 'Property Deed', type: 'PDF', date: '2024-02-10' },
    { id: 'doc-1302', title: 'Insurance Documents', type: 'PDF', date: '2024-02-08' }
  ],
  'user-14': [
    { id: 'doc-1401', title: 'Academic Transcripts', type: 'PDF', date: '2024-01-15' }
  ],
  'user-15': [
    { id: 'doc-1501', title: 'Business Growth Plan', type: 'PDF', date: '2024-02-20' },
    { id: 'doc-1502', title: 'Market Analysis', type: 'PDF', date: '2024-02-18' }
  ]
};

// Mock conversations
export const generateMockConversations = (currentUserId: string): Conversation[] => {
  return mockUsers
    .filter(user => user.id !== currentUserId)
    .map((user, index) => {
      const conversationId = `conv-${index + 1}`;
      const daysAgo = Math.floor(Math.random() * 10);
      const hoursAgo = Math.floor(Math.random() * 24);
      
      const updatedDate = new Date();
      updatedDate.setDate(updatedDate.getDate() - daysAgo);
      updatedDate.setHours(updatedDate.getHours() - hoursAgo);
      
      return {
        id: conversationId,
        created_at: new Date(updatedDate.getTime() - 1000 * 60 * 60 * 24).toISOString(),
        updated_at: updatedDate.toISOString(),
        title: null,
        is_group: false,
        participants: [
          {
            conversation_id: conversationId,
            user_id: currentUserId,
            joined_at: new Date(updatedDate.getTime() - 1000 * 60 * 60 * 24).toISOString(),
            last_read_message_id: null,
            user: {
              id: currentUserId,
              full_name: 'You (Admin)',
              avatar_url: null,
              email: 'admin@lendingapp.com'
            }
          },
          {
            conversation_id: conversationId,
            user_id: user.id,
            joined_at: new Date(updatedDate.getTime() - 1000 * 60 * 60 * 24).toISOString(),
            last_read_message_id: null,
            user
          }
        ],
        last_message: generateLastMessage(conversationId, index, user.id, currentUserId)
      };
    });
};

// Generate last message for each conversation
function generateLastMessage(conversationId: string, index: number, userId: string, currentUserId: string): Message {
  const messages = [
    'Could you help me with my loan application?',
    'Thank you for approving my loan!',
    'When is my next payment due?',
    'I submitted all the required documents.',
    'Do I need to provide any additional information?',
    'Is there a way to reduce my interest rate?',
    'Can I schedule a call to discuss my loan?',
    'I\'m having trouble making my payment this month.',
    'How long will the approval process take?',
    'I have a question about the terms of my loan.',
    'Thanks for your help with my application!',
    'Could you explain the late payment policy?',
    'I\'d like to make an extra payment.',
    'What documents do I need to provide?',
    'I need to update my contact information.'
  ];

  const senderId = index % 2 === 0 ? userId : currentUserId;
  
  return {
    id: `msg-last-${index}`,
    conversation_id: conversationId,
    sender_id: senderId,
    content: messages[index % messages.length],
    created_at: new Date().toISOString(),
    has_attachments: false,
    sender: senderId === currentUserId 
      ? { id: currentUserId, full_name: 'You (Admin)', avatar_url: null, email: 'admin@lendingapp.com' }
      : mockUsers.find(u => u.id === userId)
  };
}

// Generate messages for a specific conversation
export const generateMockMessages = (conversationId: string, userId: string, currentUserId: string): Message[] => {
  const messageTemplates = [
    {
      fromUser: 'Hi, I\'m interested in applying for a loan. Could you help me with the process?',
      fromAdmin: 'Of course! I\'d be happy to help. What type of loan are you looking for?'
    },
    {
      fromUser: 'I\'m looking for a mortgage loan to buy a new house.',
      fromAdmin: 'Great! For a mortgage loan, we\'ll need some documents like proof of income, credit history, and property details.'
    },
    {
      fromUser: 'How long does the approval process usually take?',
      fromAdmin: 'For mortgages, the approval typically takes 2-3 weeks after we receive all your documents.'
    },
    {
      fromUser: 'What interest rates can I expect?',
      fromAdmin: 'Our current rates for qualified borrowers start at 4.5%. The exact rate will depend on your credit score and loan term.'
    },
    {
      fromUser: 'Do you offer any first-time homebuyer programs?',
      fromAdmin: 'Yes, we have special programs for first-time buyers with lower down payment requirements and competitive rates.'
    },
    {
      fromUser: 'I\'ve submitted all my documents. Is there anything else I need to provide?',
      fromAdmin: 'I\'ve received your documents. Everything looks good so far. I\'ll review them and let you know if we need anything else.'
    },
    {
      fromUser: 'When will I hear back about my application status?',
      fromAdmin: 'You should receive an update within 3-5 business days. I\'ll personally notify you as soon as there\'s any progress.'
    }
  ];

  // Create array of messages with timestamps going back in time
  const messages: Message[] = [];
  const now = new Date();
  
  // Add the message templates first (oldest messages)
  messageTemplates.forEach((template, i) => {
    const timeAgo = now.getTime() - (messageTemplates.length - i) * 1000 * 60 * 30; // 30 mins apart
    
    // Add user message
    messages.push({
      id: `msg-${conversationId}-${i*2}`,
      conversation_id: conversationId,
      sender_id: userId,
      content: template.fromUser,
      created_at: new Date(timeAgo).toISOString(),
      has_attachments: false,
      sender: mockUsers.find(u => u.id === userId)
    });
    
    // Add admin reply
    messages.push({
      id: `msg-${conversationId}-${i*2+1}`,
      conversation_id: conversationId,
      sender_id: currentUserId,
      content: template.fromAdmin,
      created_at: new Date(timeAgo + 1000 * 60 * 5).toISOString(), // 5 mins later
      has_attachments: false,
      sender: { id: currentUserId, full_name: 'You (Admin)', avatar_url: null, email: 'admin@lendingapp.com' }
    });
  });
  
  // Sort messages by creation time
  return messages.sort((a, b) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
};

// Function to get user loans
export const getUserLoans = (userId: string) => {
  return mockLoans[userId] || [];
};

// Function to get user documents
export const getUserDocuments = (userId: string) => {
  return mockDocuments[userId] || [];
}; 