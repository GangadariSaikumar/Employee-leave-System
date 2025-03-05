
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeaveRequestForm from '@/components/LeaveRequestForm';
import { Filter, Plus, Search } from 'lucide-react';

interface LeaveRequest {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const LeaveRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  
  const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: '2023-10-15',
      endDate: '2023-10-18',
      days: 4,
      reason: 'Family vacation',
      status: 'Approved',
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2023-11-10',
      endDate: '2023-11-10',
      days: 1,
      reason: 'Doctor appointment',
      status: 'Pending',
    },
    {
      id: 3,
      type: 'Personal Leave',
      startDate: '2023-11-24',
      endDate: '2023-11-24',
      days: 1,
      reason: 'Personal matters',
      status: 'Rejected',
    },
    {
      id: 4,
      type: 'Annual Leave',
      startDate: '2023-12-20',
      endDate: '2023-12-31',
      days: 12,
      reason: 'Year-end holidays',
      status: 'Pending',
    },
  ];

  const filteredRequests = leaveRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status.toLowerCase() === filter;
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Leave Requests</h1>
            <p className="text-muted-foreground">Manage all your leave requests</p>
          </div>
          <Button onClick={toggleForm} className="mt-4 md:mt-0">
            {showForm ? 'Hide Form' : <><Plus className="mr-2 h-4 w-4" /> New Request</>}
          </Button>
        </div>

        {showForm && (
          <div className="mt-6 animate-fade-in">
            <LeaveRequestForm />
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 border rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={18} className="text-gray-500" />
            <select 
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-lg">My Leave Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Duration</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Days</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Reason</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-muted/30">
                        <td className="px-4 py-3 text-sm">{request.type}</td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">{request.days}</td>
                        <td className="px-4 py-3 text-sm">{request.reason}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            request.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                            request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <Button variant="ghost" size="sm" className="text-blue-500 h-8">
                            View
                          </Button>
                          {request.status === 'Pending' && (
                            <Button variant="ghost" size="sm" className="text-red-500 h-8">
                              Cancel
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                        No leave requests found matching your filter
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LeaveRequests;
