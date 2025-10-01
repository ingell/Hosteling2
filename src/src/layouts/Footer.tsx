import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg">Hosteling</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Connecting volunteers with hostels worldwide. Travel more, spend less.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4>For Volunteers</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/how-it-works" className="block hover:text-foreground">
                How it works
              </Link>
              <Link to="/browse" className="block hover:text-foreground">
                Browse opportunities
              </Link>
              <Link to="/safety-guidelines" className="block hover:text-foreground">
                Safety guidelines
              </Link>
              <Link to="/volunteer-community" className="block hover:text-foreground">
                Community
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4>For Hostels</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/for-hostels" className="block hover:text-foreground">
                List your hostel
              </Link>
              <Link to="/for-hostels" className="block hover:text-foreground">
                Find volunteers
              </Link>
              <div className="cursor-pointer hover:text-foreground">Pricing</div>
              <div className="cursor-pointer hover:text-foreground">Resources</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4>Support</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/help-center" className="block hover:text-foreground">
                Help center
              </Link>
              <Link to="/contact" className="block hover:text-foreground">
                Contact us
              </Link>
              <Link to="/terms" className="block hover:text-foreground">
                Terms of service
              </Link>
              <Link to="/privacy" className="block hover:text-foreground">
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 Hosteling. All rights reserved.
        </div>
      </div>
    </footer>
  );
};