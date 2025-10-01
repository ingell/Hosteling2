import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Share2, Heart } from "lucide-react";

interface HostelHeaderProps {
  onBack: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

export function HostelHeader({ onBack, onShare, onFavorite, isFavorited }: HostelHeaderProps) {
  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Browse</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onFavorite}
              className={isFavorited ? "text-red-500" : ""}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}