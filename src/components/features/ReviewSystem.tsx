import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Star, ThumbsUp, Flag, Filter, SortDesc } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { motion } from "motion/react";

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  verified: boolean;
  photos?: string[];
  stayDuration: string;
  role: string;
}

interface ReviewSystemProps {
  hostelId: string;
  averageRating: number;
  totalReviews: number;
  reviews?: Review[];
  onSubmitReview?: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'date' | 'helpful'>) => void;
  userType: 'volunteer' | 'hostel';
}

const sampleReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    rating: 5,
    title: "Amazing experience in Bangkok!",
    content: "I spent 3 weeks volunteering at this hostel and it was incredible. The staff was so welcoming and I learned so much about Thai culture. The accommodation was clean and comfortable, and the location is perfect for exploring the city. Would definitely recommend to other volunteers!",
    date: "2024-01-15",
    helpful: 12,
    verified: true,
    stayDuration: "3 weeks",
    role: "Reception & Tours"
  },
  {
    id: "2",
    userId: "user2",
    userName: "Marco Rodriguez",
    rating: 4,
    title: "Great learning opportunity",
    content: "Volunteered here for 6 weeks and gained valuable hospitality experience. The work was varied and interesting, from front desk duties to organizing events. Only minor issue was the WiFi could be better, but overall a fantastic experience. Made lifelong friends here!",
    date: "2024-01-10",
    helpful: 8,
    verified: true,
    stayDuration: "6 weeks",
    role: "Reception & Events"
  },
  {
    id: "3",
    userId: "user3",
    userName: "Emma Chen",
    rating: 5,
    title: "Perfect for first-time volunteers",
    content: "This was my first volunteering experience and I couldn't have chosen better. The hostel provides excellent orientation and support. The tasks were clearly explained and the team was always available to help. Bangkok is an amazing city to volunteer in!",
    date: "2024-01-05",
    helpful: 15,
    verified: true,
    stayDuration: "4 weeks",
    role: "Social Media & Reception"
  }
];

export function ReviewSystem({ 
  hostelId, 
  averageRating, 
  totalReviews, 
  reviews = sampleReviews,
  onSubmitReview,
  userType 
}: ReviewSystemProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState("all");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
    stayDuration: "",
    role: "",
    verified: false,
    photos: []
  });

  const ratingDistribution = [
    { stars: 5, count: Math.floor(totalReviews * 0.6) },
    { stars: 4, count: Math.floor(totalReviews * 0.25) },
    { stars: 3, count: Math.floor(totalReviews * 0.1) },
    { stars: 2, count: Math.floor(totalReviews * 0.03) },
    { stars: 1, count: Math.floor(totalReviews * 0.02) }
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const filteredReviews = sortedReviews.filter(review => {
    if (filterRating === "all") return true;
    return review.rating === parseInt(filterRating);
  });

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6"
    };

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = () => {
    if (onSubmitReview) {
      onSubmitReview({
        ...newReview,
        verified: true // Assume verified if through the platform
      });
    }
    setShowReviewForm(false);
    setNewReview({
      rating: 5,
      title: "",
      content: "",
      stayDuration: "",
      role: "",
      verified: false,
      photos: []
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reviews & Ratings</CardTitle>
            {userType === 'volunteer' && (
              <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Write Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>
                      Share your experience to help other volunteers make informed decisions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Overall Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                            className="p-1"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Review Title</label>
                      <input
                        type="text"
                        value={newReview.title}
                        onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Summarize your experience"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Experience</label>
                      <Textarea
                        value={newReview.content}
                        onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Tell other volunteers about your experience..."
                        className="min-h-32"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Stay Duration</label>
                        <input
                          type="text"
                          value={newReview.stayDuration}
                          onChange={(e) => setNewReview(prev => ({ ...prev, stayDuration: e.target.value }))}
                          className="w-full p-2 border rounded-lg"
                          placeholder="e.g., 3 weeks"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Role</label>
                        <input
                          type="text"
                          value={newReview.role}
                          onChange={(e) => setNewReview(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full p-2 border rounded-lg"
                          placeholder="e.g., Reception & Tours"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitReview}>
                        Submit Review
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{averageRating}</div>
              {renderStars(averageRating, "lg")}
              <div className="text-sm text-muted-foreground mt-2">
                Based on {totalReviews} reviews
              </div>
            </div>
            
            <div className="space-y-2">
              {ratingDistribution.map(({ stars, count }) => (
                <div key={stars} className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm">{stars}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${(count / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-wrap gap-4 items-center justify-between border-t pt-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter:</span>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All ratings</SelectItem>
                    <SelectItem value="5">5 stars</SelectItem>
                    <SelectItem value="4">4 stars</SelectItem>
                    <SelectItem value="3">3 stars</SelectItem>
                    <SelectItem value="2">2 stars</SelectItem>
                    <SelectItem value="1">1 star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <SortDesc className="w-4 h-4" />
              <span className="text-sm font-medium">Sort:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="highest">Highest rated</SelectItem>
                  <SelectItem value="lowest">Lowest rated</SelectItem>
                  <SelectItem value="helpful">Most helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {review.userName[0]}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{review.userName}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            Verified Stay
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {review.stayDuration} • {review.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {renderStars(review.rating)}
                    <div className="text-sm text-muted-foreground mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold mb-2">{review.title}</h4>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  {review.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Flag className="w-4 h-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No reviews match your current filters.
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}