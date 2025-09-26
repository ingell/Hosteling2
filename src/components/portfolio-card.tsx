import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from "react";

interface PortfolioCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
}

export function PortfolioCard({
  title,
  description,
  image,
  tags,
  category,
}: PortfolioCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <h3>{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
