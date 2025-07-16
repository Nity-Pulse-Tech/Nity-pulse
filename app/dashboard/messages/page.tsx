'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { dashboardService } from '@/lib/services/dashboardService';
import { ContactMessage } from '@/lib/types/dashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Trash2, 
  Mail,
  Calendar,
  User,
  MessageSquare,
  Reply
} from 'lucide-react';

export default function MessagesManagementPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm]);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const data = await dashboardService.getAllContactMessages();
      setMessages(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to delete ');
      }
    }
     finally {
      setIsLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await dashboardService.deleteContactMessage(id);
      toast.success('Message deleted successfully');
      loadMessages(); // Reload the list
      setSelectedMessage(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to ');
      }
    }
    
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleReply = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages Management</h1>
        <p className="mt-2 text-gray-600">
          View and manage contact messages from your website visitors.
        </p>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search messages by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center bg-gray-50 rounded-md p-3">
            <Mail className="text-gray-600 mr-2" size={20} />
            <span className="text-sm text-gray-600">
              {filteredMessages.length} of {messages.length} messages
            </span>
          </div>
        </div>
      </motion.div>

      {/* Messages List and Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Contact Messages</h2>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No messages found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm 
                  ? 'Try adjusting your search criteria.'
                  : 'No contact messages have been received yet.'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id 
                      ? 'bg-purple-50 border-l-4 border-purple-500' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {message.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.created)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {message.email}
                      </p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Message Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg shadow overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Message Details</h2>
          </div>

          {selectedMessage ? (
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedMessage.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedMessage.email}
                    </p>
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedMessage.subject}
                </h4>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(selectedMessage.created)}
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Message:</h5>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => handleReply(selectedMessage.email)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Reply size={16} className="mr-2" />
                  Reply
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No message selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Click on a message from the list to view its details.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 