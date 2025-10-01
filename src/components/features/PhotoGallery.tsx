import React, { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "../ui/dialog";
import { ChevronLeft, ChevronRight, X, Grid3X3, Star, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PhotoGalleryProps {
  images: string[];
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  onViewAll?: () => void;
}

export function PhotoGallery({ images, name, location, rating, reviewCount, onViewAll }: PhotoGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  // Fallback images if none provided
  const galleryImages = images.length > 0 ? images : [
    `https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop`
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden"
    >
      {/* Main Gallery Layout */}
      <div className="grid grid-cols-4 gap-2 h-80">
        {/* Main large image */}
        <div className="col-span-2 relative group cursor-pointer" onClick={() => setShowLightbox(true)}>
          <ImageWithFallback
            src={galleryImages[0]}
            alt={`${name} - Main view`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold">{rating}</span>
              <span className="text-white/80">• {reviewCount} reviews</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{name}</h1>
            <div className="flex items-center space-x-2 text-white/90">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>

        {/* Grid of smaller images */}
        <div className="col-span-2 grid grid-cols-2 gap-2">
          {galleryImages.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => {
                setCurrentImageIndex(index + 1);
                setShowLightbox(true);
              }}
            >
              <ImageWithFallback
                src={image}
                alt={`${name} - View ${index + 2}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
              
              {/* Show all photos overlay on last image */}
              {index === 3 && galleryImages.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Grid3X3 className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-semibold">+{galleryImages.length - 4} more</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* View All Photos Button */}
      {galleryImages.length > 1 && (
        <Button
          variant="secondary"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black border-0"
          onClick={() => setShowLightbox(true)}
        >
          <Grid3X3 className="w-4 h-4 mr-2" />
          View all photos ({galleryImages.length})
        </Button>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <DialogDescription className="sr-only">
            Photo gallery lightbox showing images of {name}
          </DialogDescription>
          <div className="relative w-full h-full bg-black">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setShowLightbox(false)}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-50 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>

            {/* Main image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={galleryImages[currentImageIndex]}
                    alt={`${name} - Photo ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            {galleryImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/50 p-2 rounded-lg max-w-lg overflow-x-auto">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? "border-white" : "border-transparent"
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}