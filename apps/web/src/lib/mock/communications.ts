import { v4 as uuidv4 } from 'uuid';

export type User = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  email: string;
  phone: string;
  lastActive?: string;
  isOnline: boolean;
  unreadCount?: number;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: Attachment[];
};

export type Attachment = {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
};

export type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessageAt: string;
  title?: string;
  loanId?: string;
  loanType?: string;
  loanAmount?: number;
  loanStatus?: string;
};

// Mock user data
export const mockUsers: User[] = [
  {
    id: 'current-user',
    name: 'Michael Scott',
    avatar: '/avatars/michael-scott.jpg',
    role: 'loan_officer',
    email: 'michael@dundermifflin.com',
    phone: '(555) 123-4567',
    isOnline: true,
  },
  {
    id: 'user-1',
    name: 'Jim Halpert',
    avatar: '/avatars/jim-halpert.jpg',
    role: 'borrower',
    email: 'jim@dundermifflin.com',
    phone: '(555) 234-5678',
    lastActive: '2023-10-15T14:30:00Z',
    isOnline: false,
  },
  {
    id: 'user-2',
    name: 'Pam Beesly',
    avatar: '/avatars/pam-beesly.jpg',
    role: 'borrower',
    email: 'pam@dundermifflin.com',
    phone: '(555) 345-6789',
    lastActive: '2023-10-15T16:45:00Z',
    isOnline: true,
  },
  {
    id: 'user-3',
    name: 'Dwight Schrute',
    avatar: '/avatars/dwight-schrute.jpg',
    role: 'borrower',
    email: 'dwight@schrute-farms.com',
    phone: '(555) 456-7890',
    lastActive: '2023-10-14T09:15:00Z',
    isOnline: false,
  },
  {
    id: 'user-4',
    name: 'Angela Martin',
    avatar: '/avatars/angela-martin.jpg',
    role: 'borrower',
    email: 'angela@dundermifflin.com',
    phone: '(555) 567-8901',
    lastActive: '2023-10-15T11:20:00Z',
    isOnline: false,
  },
  {
    id: 'user-5',
    name: 'Kevin Malone',
    avatar: '/avatars/kevin-malone.jpg',
    role: 'borrower',
    email: 'kevin@dundermifflin.com',
    phone: '(555) 678-9012',
    lastActive: '2023-10-13T15:30:00Z',
    isOnline: false,
  },
  {
    id: 'user-6',
    name: 'Oscar Martinez',
    avatar: '/avatars/oscar-martinez.jpg',
    role: 'borrower',
    email: 'oscar@dundermifflin.com',
    phone: '(555) 789-0123',
    lastActive: '2023-10-15T10:15:00Z',
    isOnline: true,
  },
  {
    id: 'user-7',
    name: 'Stanley Hudson',
    avatar: '/avatars/stanley-hudson.jpg',
    role: 'borrower',
    email: 'stanley@dundermifflin.com',
    phone: '(555) 890-1234',
    lastActive: '2023-10-12T13:45:00Z',
    isOnline: false,
  },
  {
    id: 'user-8',
    name: 'Phyllis Vance',
    avatar: '/avatars/phyllis-vance.jpg',
    role: 'borrower',
    email: 'phyllis@dundermifflin.com',
    phone: '(555) 901-2345',
    lastActive: '2023-10-14T14:10:00Z',
    isOnline: false,
  },
  {
    id: 'user-9',
    name: 'Toby Flenderson',
    avatar: '/avatars/toby-flenderson.jpg',
    role: 'processor',
    email: 'toby@dundermifflin.com',
    phone: '(555) 012-3456',
    lastActive: '2023-10-15T09:30:00Z',
    isOnline: true,
  },
  {
    id: 'user-10',
    name: 'Kelly Kapoor',
    avatar: '/avatars/kelly-kapoor.jpg',
    role: 'borrower',
    email: 'kelly@dundermifflin.com',
    phone: '(555) 123-4567',
    lastActive: '2023-10-15T13:25:00Z',
    isOnline: true,
  },
  {
    id: 'user-11',
    name: 'Ryan Howard',
    avatar: '/avatars/ryan-howard.jpg',
    role: 'borrower',
    email: 'ryan@dundermifflin.com',
    phone: '(555) 234-5678',
    lastActive: '2023-10-14T16:50:00Z',
    isOnline: false,
  },
  {
    id: 'user-12',
    name: 'Meredith Palmer',
    avatar: '/avatars/meredith-palmer.jpg',
    role: 'borrower',
    email: 'meredith@dundermifflin.com',
    phone: '(555) 345-6789',
    lastActive: '2023-10-13T11:15:00Z',
    isOnline: false,
  },
  {
    id: 'user-13',
    name: 'Creed Bratton',
    avatar: '/avatars/creed-bratton.jpg',
    role: 'borrower',
    email: 'creed@dundermifflin.com',
    phone: '(555) 456-7890',
    lastActive: '2023-10-12T10:45:00Z',
    isOnline: false,
  },
  {
    id: 'user-14',
    name: 'David Wallace',
    avatar: '/avatars/david-wallace.jpg',
    role: 'underwriter',
    email: 'david@dundermifflin.com',
    phone: '(555) 567-8901',
    lastActive: '2023-10-15T15:20:00Z',
    isOnline: true,
  },
];

// Common message templates
const loanOfficerTemplates = [
  "Hello {name}, I'm reviewing your {loanType} application for ${amount}. Everything looks good so far.",
  "I see your {loanType} application is in {status}. Do you have any questions I can help with?",
  "We need a few additional documents for your {loanType}. Could you upload your recent bank statements?",
  "Great news! Your {loanType} application has moved to the next stage of approval.",
  "Just following up on your {loanType}. We're still waiting for the appraisal to come back.",
  "I've submitted your {loanType} application for final review. You should hear back within 2-3 business days.",
  "Your {loanType} has been approved! Let's schedule a time to discuss next steps.",
  "There are a few items we need to clarify regarding your {loanType} application. When would be a good time to talk?",
  "I noticed you haven't completed the income verification for your {loanType}. Can I help with that?",
  "Just wanted to let you know we received your documents for the {loanType}. We're processing them now."
];

const borrowerTemplates = [
  "Thanks for the update on my {loanType}. I'm excited to move forward.",
  "I just uploaded the documents you requested. Please let me know if you need anything else.",
  "I have a question about the interest rate on my {loanType}. Is it fixed or variable?",
  "When can I expect to close on my {loanType}?",
  "I noticed my application status is {status}. What does that mean exactly?",
  "Is there anything I can do to speed up the approval process?",
  "Do you need any additional information from me at this point?",
  "I'm concerned about the closing costs for my {loanType}. Can we discuss the breakdown?",
  "Thank you for all your help with my {loanType} application!",
  "I may need to adjust my {loanType} amount. Is that possible at this stage?"
];

// Sample loan information for conversations
const loanInfo = [
  { id: 'loan-1', type: 'Mortgage', amount: 320000, status: 'Application Review' },
  { id: 'loan-2', type: 'Auto Loan', amount: 35000, status: 'Approved' },
  { id: 'loan-3', type: 'Home Equity', amount: 75000, status: 'Pending Documents' },
  { id: 'loan-4', type: 'Personal Loan', amount: 12000, status: 'Closing Scheduled' },
  { id: 'loan-5', type: 'Business Loan', amount: 150000, status: 'Underwriting' },
  { id: 'loan-6', type: 'Mortgage Refinance', amount: 280000, status: 'Rate Lock' },
  { id: 'loan-7', type: 'Home Improvement', amount: 45000, status: 'Approved' },
  { id: 'loan-8', type: 'Debt Consolidation', amount: 30000, status: 'Application Review' },
  { id: 'loan-9', type: 'Investment Property', amount: 250000, status: 'Document Collection' },
  { id: 'loan-10', type: 'Construction Loan', amount: 350000, status: 'Pending Appraisal' },
  { id: 'loan-11', type: 'FHA Loan', amount: 210000, status: 'Application Submitted' },
  { id: 'loan-12', type: 'VA Loan', amount: 280000, status: 'Pre-Approval' },
  { id: 'loan-13', type: 'HELOC', amount: 100000, status: 'Final Review' },
  { id: 'loan-14', type: 'Jumbo Loan', amount: 750000, status: 'Conditional Approval' },
];

// Helper function to generate random dates
function randomDate(daysAgo: number = 30) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
}

// Helper function to generate a random number of messages
function generateRandomMessages(
  conversationId: string,
  participants: User[],
  loanInfo: { type: string; amount: number; status: string },
  count: number = 10
): Message[] {
  const messages: Message[] = [];
  const currentUser = participants.find(p => p.id === 'current-user')!;
  const borrower = participants.find(p => p.id !== 'current-user')!;
  
  // Create a conversation thread with messages
  let lastDate = new Date();
  lastDate.setDate(lastDate.getDate() - Math.floor(Math.random() * 30)); // Random start date in last 30 days
  
  for (let i = 0; i < count; i++) {
    // Advance time by random amount (1 min to 2 days)
    lastDate = new Date(lastDate.getTime() + (60000 + Math.random() * 172800000));
    
    // Alternate between loan officer and borrower
    const sender = i % 2 === 0 ? currentUser : borrower;
    const templates = i % 2 === 0 ? loanOfficerTemplates : borrowerTemplates;
    
    // Select and format message template
    let content = templates[Math.floor(Math.random() * templates.length)]
      .replace('{name}', borrower.name.split(' ')[0])
      .replace('{loanType}', loanInfo.type)
      .replace('{amount}', loanInfo.amount.toLocaleString())
      .replace('{status}', loanInfo.status);
    
    // Add occasional document attachments
    const hasAttachment = Math.random() < 0.2; // 20% chance of attachment
    let attachments: Attachment[] = [];
    
    if (hasAttachment) {
      const attachmentTypes = [
        { name: 'Bank Statement.pdf', type: 'application/pdf', size: 1230000 },
        { name: 'W2_Form.pdf', type: 'application/pdf', size: 980000 },
        { name: 'PayStub.pdf', type: 'application/pdf', size: 540000 },
        { name: 'ID_Verification.jpg', type: 'image/jpeg', size: 2100000 },
        { name: 'Property_Assessment.pdf', type: 'application/pdf', size: 3400000 },
        { name: 'Credit_Report.pdf', type: 'application/pdf', size: 1700000 },
        { name: 'Loan_Agreement.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 850000 }
      ];
      
      const attachment = attachmentTypes[Math.floor(Math.random() * attachmentTypes.length)];
      attachments = [{
        id: uuidv4(),
        name: attachment.name,
        type: attachment.type,
        size: attachment.size,
        url: `/mock-files/${attachment.name}`
      }];
      
      // Add text about the attachment
      if (sender.id === currentUser.id) {
        content += ` I've attached the ${attachment.name.split('.')[0]} for your reference.`;
      } else {
        content += ` I've attached my ${attachment.name.split('.')[0]} as requested.`;
      }
    }
    
    messages.push({
      id: `msg-${i}-${uuidv4()}`,
      conversationId,
      senderId: sender.id,
      content,
      timestamp: lastDate.toISOString(),
      read: i < count - 3, // Last 3 messages may be unread
      attachments: hasAttachment ? attachments : undefined
    });
  }
  
  // Sort messages by timestamp (newest last for display order)
  return messages.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
}

// Generate mock conversations
export const mockConversations: Conversation[] = mockUsers.slice(1).map((user, index) => {
  const loan = loanInfo[index % loanInfo.length];
  const messageCount = 5 + Math.floor(Math.random() * 15); // Between 5-20 messages
  const participants = [mockUsers[0], user]; // Current user (loan officer) and the borrower
  const conversationId = `conv-${user.id}`;
  
  const messages = generateRandomMessages(
    conversationId,
    participants,
    {
      type: loan.type,
      amount: loan.amount,
      status: loan.status
    },
    messageCount
  );
  
  return {
    id: conversationId,
    participants,
    messages,
    lastMessageAt: messages[messages.length - 1].timestamp,
    title: user.name,
    loanId: loan.id,
    loanType: loan.type,
    loanAmount: loan.amount,
    loanStatus: loan.status
  };
});

// Add unread count for each user
mockConversations.forEach(conversation => {
  const borrower = conversation.participants.find(p => p.id !== 'current-user')!;
  const unreadMessages = conversation.messages.filter(m => 
    m.senderId === 'current-user' && !m.read
  );
  
  if (unreadMessages.length > 0) {
    const userIndex = mockUsers.findIndex(u => u.id === borrower.id);
    if (userIndex >= 0) {
      mockUsers[userIndex].unreadCount = unreadMessages.length;
    }
  }
});

// Sort conversations by last message (newest first)
export const sortedConversations = [...mockConversations].sort((a, b) => 
  new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
);

// Function to get all conversations
export function getConversations() {
  return sortedConversations;
}

// Function to get a specific conversation
export function getConversation(id: string) {
  return mockConversations.find(c => c.id === id);
}

// Function to add a message to a conversation
export function addMessage(conversationId: string, content: string, senderId: string = 'current-user'): Message {
  const conversation = mockConversations.find(c => c.id === conversationId);
  if (!conversation) {
    throw new Error(`Conversation with id ${conversationId} not found`);
  }
  
  const message: Message = {
    id: `msg-${uuidv4()}`,
    conversationId,
    senderId,
    content,
    timestamp: new Date().toISOString(),
    read: senderId === 'current-user', // Messages from current user are marked as read
  };
  
  conversation.messages.push(message);
  conversation.lastMessageAt = message.timestamp;
  
  // If message is from someone else to the current user, update unread count
  if (senderId !== 'current-user') {
    const user = mockUsers.find(u => u.id === senderId);
    if (user) {
      user.unreadCount = (user.unreadCount || 0) + 1;
    }
  }
  
  return message;
}

// Function to mark messages as read
export function markAsRead(conversationId: string, userId: string = 'current-user') {
  const conversation = mockConversations.find(c => c.id === conversationId);
  if (!conversation) {
    return false;
  }
  
  // Mark all messages from other users as read for this user
  conversation.messages.forEach(message => {
    if (message.senderId !== userId) {
      message.read = true;
    }
  });
  
  // Reset unread count for this conversation's participants
  conversation.participants.forEach(participant => {
    if (participant.id !== userId) {
      const userIndex = mockUsers.findIndex(u => u.id === participant.id);
      if (userIndex >= 0) {
        mockUsers[userIndex].unreadCount = 0;
      }
    }
  });
  
  return true;
}

// Function to search conversations
export function searchConversations(query: string) {
  if (!query || query.trim() === '') {
    return sortedConversations;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return sortedConversations.filter(conversation => {
    // Search in participant names
    const nameMatch = conversation.participants.some(p => 
      p.name.toLowerCase().includes(normalizedQuery)
    );
    
    // Search in messages
    const messageMatch = conversation.messages.some(m => 
      m.content.toLowerCase().includes(normalizedQuery)
    );
    
    // Search in loan info
    const loanMatch = 
      (conversation.loanType && conversation.loanType.toLowerCase().includes(normalizedQuery)) ||
      (conversation.loanStatus && conversation.loanStatus.toLowerCase().includes(normalizedQuery));
    
    return nameMatch || messageMatch || loanMatch;
  });
}

// Simulate user response based on AI
export function simulateResponse(conversationId: string, userMessage: string) {
  const conversation = mockConversations.find(c => c.id === conversationId);
  if (!conversation) {
    return null;
  }
  
  const borrower = conversation.participants.find(p => p.id !== 'current-user')!;
  const loanInfo = {
    type: conversation.loanType || 'loan',
    amount: conversation.loanAmount || 100000,
    status: conversation.loanStatus || 'processing'
  };
  
  // Check for trigger words and generate appropriate responses
  const lowerMessage = userMessage.toLowerCase();
  let response: string;
  
  if (lowerMessage.includes('document') || lowerMessage.includes('upload')) {
    response = `I'll get those documents uploaded right away. Is there a specific deadline I need to meet for my ${loanInfo.type}?`;
  } else if (lowerMessage.includes('approve') || lowerMessage.includes('approved')) {
    response = `That's great news about my ${loanInfo.type}! What are the next steps we need to take?`;
  } else if (lowerMessage.includes('rate') || lowerMessage.includes('interest')) {
    response = `Thanks for the information about the rates. For my ${loanInfo.type}, is this rate locked in or could it change before closing?`;
  } else if (lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
    response = `I'm available to discuss my ${loanInfo.type} application. How about tomorrow afternoon or Wednesday morning?`;
  } else if (lowerMessage.includes('question') || lowerMessage.includes('help')) {
    response = `Yes, I do have a question about my ${loanInfo.type}. How long will the final approval process take once all documents are submitted?`;
  } else if (lowerMessage.includes('status') || lowerMessage.includes('update')) {
    response = `Thank you for the status update on my ${loanInfo.type}. Is there anything else I need to do while we wait for the next step?`;
  } else {
    // Default response if no triggers matched
    response = `Thanks for your message about my ${loanInfo.type}. I appreciate you keeping me updated throughout this process.`;
  }
  
  // Add the response with a slight delay to simulate typing
  setTimeout(() => {
    addMessage(conversationId, response, borrower.id);
  }, 1500 + Math.random() * 3000); // 1.5-4.5 second delay
  
  return true;
}

// Function to create a new conversation
export function createConversation(userId: string, initialMessage: string): Conversation {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }
  
  // Create a random loan for this conversation
  const loanIndex = Math.floor(Math.random() * loanInfo.length);
  const loan = loanInfo[loanIndex];
  
  const conversationId = `conv-${uuidv4()}`;
  const timestamp = new Date().toISOString();
  
  const message: Message = {
    id: `msg-${uuidv4()}`,
    conversationId,
    senderId: 'current-user',
    content: initialMessage,
    timestamp,
    read: true
  };
  
  const conversation: Conversation = {
    id: conversationId,
    participants: [mockUsers[0], user],
    messages: [message],
    lastMessageAt: timestamp,
    title: user.name,
    loanId: loan.id,
    loanType: loan.type,
    loanAmount: loan.amount,
    loanStatus: loan.status
  };
  
  mockConversations.push(conversation);
  sortedConversations.unshift(conversation); // Add to beginning of sorted list
  
  return conversation;
}

// Function to get communication statistics
export function getCommunicationStats() {
  const totalConversations = mockConversations.length;
  const totalMessages = mockConversations.reduce((sum, conv) => sum + conv.messages.length, 0);
  const unreadMessages = mockConversations.reduce((sum, conv) => 
    sum + conv.messages.filter(m => !m.read && m.senderId !== 'current-user').length, 0
  );
  
  const conversationsToday = mockConversations.filter(conv => {
    const lastMessageDate = new Date(conv.lastMessageAt);
    const today = new Date();
    return lastMessageDate.toDateString() === today.toDateString();
  }).length;
  
  const messagesByDay = Array(7).fill(0);
  const today = new Date();
  
  mockConversations.forEach(conv => {
    conv.messages.forEach(msg => {
      const msgDate = new Date(msg.timestamp);
      const diffDays = Math.floor((today.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays < 7) {
        messagesByDay[diffDays]++;
      }
    });
  });
  
  return {
    totalConversations,
    totalMessages,
    unreadMessages,
    conversationsToday,
    messagesByDay, // Messages per day for the last 7 days (index 0 = today)
    activeUsers: mockUsers.filter(u => u.isOnline).length
  };
}