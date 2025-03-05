
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

type LeaveType = 'annual' | 'sick' | 'personal' | 'other';

const LeaveRequestForm = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [leaveType, setLeaveType] = useState<LeaveType>('annual');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (startDate > endDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    // Calculate duration in days
    const durationMs = endDate.getTime() - startDate.getTime();
    const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24)) + 1;

    // Here you would normally send this data to an API
    toast.success(`Leave request submitted for ${durationDays} days`);
    
    // Reset form
    setStartDate(undefined);
    setEndDate(undefined);
    setLeaveType('annual');
    setReason('');
  };

  return (
    <Card className="bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle>Request Leave</CardTitle>
        <CardDescription className="text-blue-100">
          Submit your leave request for approval
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Leave Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button 
                  type="button"
                  variant={leaveType === 'annual' ? 'default' : 'outline'} 
                  className={leaveType === 'annual' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                  onClick={() => setLeaveType('annual')}
                >
                  Annual
                </Button>
                <Button 
                  type="button"
                  variant={leaveType === 'sick' ? 'default' : 'outline'} 
                  className={leaveType === 'sick' ? 'bg-red-500 hover:bg-red-600' : ''}
                  onClick={() => setLeaveType('sick')}
                >
                  Sick
                </Button>
                <Button 
                  type="button"
                  variant={leaveType === 'personal' ? 'default' : 'outline'} 
                  className={leaveType === 'personal' ? 'bg-green-500 hover:bg-green-600' : ''}
                  onClick={() => setLeaveType('personal')}
                >
                  Personal
                </Button>
                <Button 
                  type="button"
                  variant={leaveType === 'other' ? 'default' : 'outline'} 
                  className={leaveType === 'other' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                  onClick={() => setLeaveType('other')}
                >
                  Other
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reason</label>
              <textarea 
                className="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please provide details about your leave request..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeaveRequestForm;
