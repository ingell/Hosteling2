import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HostelDetailView } from '../../components/hostel-detail-view';
import { useApp } from '../shared/contexts/AppContext';
import { LocalStorageManager } from '../../components/utils/local-storage';
import { featuredHostels } from '../../constants/data';

export const HostelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userType, isLoggedIn } = useApp();

  const hostel = featuredHostels.find(h => h.id === parseInt(id || '0'));

  if (!hostel) {
    navigate('/browse');
    return null;
  }

  const handleApply = (hostelId: string) => {
    if (!isLoggedIn) {
      LocalStorageManager.addNotification({
        type: "warning",
        title: "Please Log In",
        message: "You need to log in to apply for positions.",
        priority: "high"
      });
      navigate('/login');
      return;
    }
    
    LocalStorageManager.addNotification({
      type: "success",
      title: "Application Sent!",
      message: "Your application has been sent to the hostel.",
      priority: "high"
    });
  };

  const handleContact = (hostelId: string) => {
    if (!isLoggedIn) {
      LocalStorageManager.addNotification({
        type: "warning",
        title: "Please Log In",
        message: "You need to log in to contact hostels.",
        priority: "high"
      });
      navigate('/login');
      return;
    }
    
    LocalStorageManager.addNotification({
      type: "info",
      title: "Message Sent!",
      message: "Your message has been sent to the hostel.",
      priority: "medium"
    });
  };

  const handleBack = () => {
    navigate('/browse');
  };

  return (
    <HostelDetailView
      hostel={hostel}
      onBack={handleBack}
      onApply={handleApply}
      onContact={handleContact}
      userType={userType}
    />
  );
};