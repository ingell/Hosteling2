import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarDays, Clock, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface AvailabilitySlot {
  date: Date;
  status: 'available' | 'partial' | 'full' | 'unavailable';
  spotsAvailable?: number;
  totalSpots?: number;
  minDuration?: number; // in days
  maxDuration?: number; // in days
}

interface CalendarIntegrationProps {
  hostelId: string;
  availability?: AvailabilitySlot[];
  onDateSelect?: (date: Date) => void;
  onBookingRequest?: (startDate: Date, endDate: Date, duration: number) => void;
  userType: 'volunteer' | 'hostel';
  mode?: 'view' | 'booking';
}

export function CalendarIntegration({ 
  hostelId, 
  availability = [], 
  onDateSelect, 
  onBookingRequest,
  userType,
  mode = 'view'
}: CalendarIntegrationProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedRange, setSelectedRange] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null });
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  // Generate sample availability data for the next 3 months
  const generateSampleAvailability = (): AvailabilitySlot[] => {
    const slots: AvailabilitySlot[] = [];
    const today = new Date();
    
    for (let i = 0; i < 90; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip past dates
      if (date < today) continue;
      
      // Random availability status based on patterns
      let status: AvailabilitySlot['status'];
      const dayOfWeek = date.getDay();
      const random = Math.random();
      
      if (i < 7) {
        // Next week - mostly full
        status = random > 0.7 ? 'available' : random > 0.4 ? 'partial' : 'full';
      } else if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekends - less available
        status = random > 0.6 ? 'full' : random > 0.3 ? 'partial' : 'available';
      } else {
        // Weekdays - more available
        status = random > 0.8 ? 'full' : random > 0.5 ? 'available' : 'partial';
      }
      
      slots.push({
        date,
        status,
        spotsAvailable: status === 'available' ? 3 : status === 'partial' ? 1 : 0,
        totalSpots: 3,
        minDuration: 14, // 2 weeks minimum
        maxDuration: 84  // 12 weeks maximum
      });
    }
    
    return slots;
  };

  const availabilityData = availability.length > 0 ? availability : generateSampleAvailability();

  const getAvailabilityForDate = (date: Date): AvailabilitySlot | undefined => {
    return availabilityData.find(slot => 
      slot.date.toDateString() === date.toDateString()
    );
  };

  const getStatusColor = (status: AvailabilitySlot['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'partial':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'full':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'unavailable':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: AvailabilitySlot['status']) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'partial':
        return 'Limited spots';
      case 'full':
        return 'Fully booked';
      case 'unavailable':
        return 'Unavailable';
      default:
        return 'Unknown';
    }
  };

  const handleDateClick = (date: Date) => {
    if (mode === 'view') {
      setSelectedDate(date);
      if (onDateSelect) {
        onDateSelect(date);
      }
    } else if (mode === 'booking' && userType === 'volunteer') {
      if (!isSelectingRange) {
        setSelectedRange({ start: date, end: null });
        setIsSelectingRange(true);
      } else {
        const start = selectedRange.start;
        if (start && date >= start) {
          setSelectedRange({ start, end: date });
          setIsSelectingRange(false);
        } else {
          setSelectedRange({ start: date, end: null });
        }
      }
    }
  };

  const calculateDuration = () => {
    if (selectedRange.start && selectedRange.end) {
      const diffTime = Math.abs(selectedRange.end.getTime() - selectedRange.start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const handleBookingRequest = () => {
    if (selectedRange.start && selectedRange.end && onBookingRequest) {
      const duration = calculateDuration();
      onBookingRequest(selectedRange.start, selectedRange.end, duration);
      setSelectedRange({ start: null, end: null });
      setIsSelectingRange(false);
    }
  };

  const modifiers = {
    available: (date: Date) => {
      const slot = getAvailabilityForDate(date);
      return slot?.status === 'available';
    },
    partial: (date: Date) => {
      const slot = getAvailabilityForDate(date);
      return slot?.status === 'partial';
    },
    full: (date: Date) => {
      const slot = getAvailabilityForDate(date);
      return slot?.status === 'full';
    },
    selected: (date: Date) => {
      return selectedDate?.toDateString() === date.toDateString();
    },
    rangeStart: (date: Date) => {
      return selectedRange.start?.toDateString() === date.toDateString();
    },
    rangeEnd: (date: Date) => {
      return selectedRange.end?.toDateString() === date.toDateString();
    },
    rangeMiddle: (date: Date) => {
      const { start, end } = selectedRange;
      if (start && end) {
        return date > start && date < end;
      }
      return false;
    }
  };

  const modifiersStyles = {
    available: { backgroundColor: '#dcfce7', color: '#166534' },
    partial: { backgroundColor: '#fef3c7', color: '#92400e' },
    full: { backgroundColor: '#fee2e2', color: '#991b1b' },
    selected: { backgroundColor: '#f97316', color: 'white' },
    rangeStart: { backgroundColor: '#f97316', color: 'white' },
    rangeEnd: { backgroundColor: '#f97316', color: 'white' },
    rangeMiddle: { backgroundColor: '#fed7aa', color: '#9a3412' }
  };

  const selectedAvailability = selectedDate ? getAvailabilityForDate(selectedDate) : null;
  const duration = calculateDuration();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CalendarDays className="w-5 h-5" />
              <span>Availability Calendar</span>
            </CardTitle>
            {mode === 'booking' && userType === 'volunteer' && (
              <Badge variant="outline" className="text-xs">
                {isSelectingRange ? 'Select end date' : 'Select start date'}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span>Limited</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span>Full</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
              <span>Unavailable</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && handleDateClick(date)}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>

            {/* Date Details */}
            <div className="space-y-4">
              {selectedDate && selectedAvailability && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h4>
                    <Badge className={`${getStatusColor(selectedAvailability.status)} border`}>
                      {getStatusText(selectedAvailability.status)}
                    </Badge>
                  </div>

                  {selectedAvailability.status !== 'unavailable' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>Volunteer spots:</span>
                        </div>
                        <span className="font-medium">
                          {selectedAvailability.spotsAvailable} / {selectedAvailability.totalSpots}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>Min. duration:</span>
                        </div>
                        <span className="font-medium">
                          {selectedAvailability.minDuration} days
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>Max. duration:</span>
                        </div>
                        <span className="font-medium">
                          {selectedAvailability.maxDuration} days
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Booking Range Selection */}
              {mode === 'booking' && userType === 'volunteer' && (
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-semibold">Select your stay period</h4>
                  
                  {selectedRange.start && (
                    <div className="space-y-2">
                      <div className="text-sm">
                        <strong>Start:</strong> {selectedRange.start.toLocaleDateString()}
                      </div>
                      {selectedRange.end && (
                        <>
                          <div className="text-sm">
                            <strong>End:</strong> {selectedRange.end.toLocaleDateString()}
                          </div>
                          <div className="text-sm">
                            <strong>Duration:</strong> {duration} days ({Math.floor(duration / 7)} weeks)
                          </div>
                          
                          {duration < 14 && (
                            <div className="flex items-center space-x-2 text-sm text-amber-600">
                              <AlertCircle className="w-4 h-4" />
                              <span>Minimum stay is 2 weeks</span>
                            </div>
                          )}
                          
                          {duration >= 14 && (
                            <div className="flex items-center space-x-2 text-sm text-green-600">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Valid duration selected</span>
                            </div>
                          )}
                          
                          <Button 
                            onClick={handleBookingRequest}
                            disabled={duration < 14}
                            className="w-full mt-4"
                          >
                            Request Booking
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                  
                  {!selectedRange.start && (
                    <p className="text-sm text-muted-foreground">
                      Click on available dates to select your stay period
                    </p>
                  )}
                </div>
              )}

              {/* Quick Info */}
              <div className="bg-orange-50 rounded-lg p-4 space-y-2">
                <h5 className="font-semibold text-orange-800">Quick Info</h5>
                <div className="text-sm text-orange-700 space-y-1">
                  <div>• Minimum commitment: 2 weeks</div>
                  <div>• Maximum stay: 12 weeks</div>
                  <div>• Work hours: 4-6 hours/day</div>
                  <div>• Free accommodation & meals included</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}