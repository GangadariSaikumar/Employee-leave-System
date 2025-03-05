import React from 'react';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, PlusCircle, Users } from 'lucide-react';

const Dashboard = () => {
  const leaveBalance = [
    { type: 'Annual Leave', total: 20, used: 8, color: 'bg-blue-500' },
    { type: 'Sick Leave', total: 10, used: 3, color: 'bg-red-500' },
    { type: 'Personal Leave', total: 5, used: 1, color: 'bg-green-500' },
  ];

  const upcomingLeaves = [
    { id: 1, type: 'Annual Leave', from: '2023-10-15', to: '2023-10-18', status: 'Approved' },
    { id: 2, type: 'Sick Leave', from: '2023-11-10', to: '2023-11-10', status: 'Pending' },
  ];

  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'UX Designer', status: 'On Leave', avatar: '👨‍💼' },
    { id: 2, name: 'Jane Smith', role: 'Developer', status: 'Available', avatar: '👩‍💻' },
    { id: 3, name: 'Alice Johnson', role: 'Project Manager', status: 'Available', avatar: '👩‍💼' },
  ];

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome, Alex!</h1>
            <p className="text-muted-foreground">Here's your leave overview</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" /> Request Leave
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {leaveBalance.map((leave, index) => (
            <Card key={index} className="border-t-4" style={{ borderTopColor: leave.color.replace('bg-', '').includes('blue') ? '#3b82f6' : leave.color.replace('bg-', '').includes('red') ? '#ef4444' : '#22c55e' }}>
              <CardHeader>
                <CardTitle className="text-lg">{leave.type}</CardTitle>
                <CardDescription>
                  Used {leave.used} of {leave.total} days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(leave.used / leave.total) * 100} className={leave.color} />
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  {leave.total - leave.used} days remaining
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-purple-500" /> 
                Upcoming Leaves
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingLeaves.length > 0 ? (
                <div className="space-y-4">
                  {upcomingLeaves.map((leave) => (
                    <div key={leave.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                      <div>
                        <p className="font-medium">{leave.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(leave.from).toLocaleDateString()} - {new Date(leave.to).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        leave.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                        leave.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {leave.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">No upcoming leaves</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View All Leave History</Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" /> 
                Team Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg mr-3">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      member.status === 'Available' ? 'bg-green-100 text-green-800' : 
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {member.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View Full Team</Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-6 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-amber-500" /> 
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-sm">
                  <span className="font-medium">John Doe</span> requested annual leave for 3 days
                </p>
                <p className="text-xs text-muted-foreground mt-1">Today, 10:23 AM</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-sm">
                  <span className="font-medium">Jane Smith</span> approved your leave request
                </p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday, 3:45 PM</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-sm">
                  <span className="font-medium">HR Department</span> updated the leave policy
                </p>
                <p className="text-xs text-muted-foreground mt-1">Oct 12, 2023, 9:00 AM</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View All Activities</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
