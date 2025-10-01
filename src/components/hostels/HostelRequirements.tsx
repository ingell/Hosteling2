import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";

interface HostelRequirementsProps {
  hostel: {
    skillsNeeded?: string[];
    commitment?: string;
    minAge?: number;
    languages?: string[];
    experience?: string[];
  };
}

export function HostelRequirements({ hostel }: HostelRequirementsProps) {
  const defaultSkills = ['English speaking', 'Customer service', 'Teamwork', 'Flexibility'];
  const defaultLanguages = ['English'];
  const defaultExperience = ['No experience required', 'Willingness to learn'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Skills needed:</h4>
              <div className="flex flex-wrap gap-2">
                {(hostel.skillsNeeded || defaultSkills).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Languages:</h4>
              <div className="flex flex-wrap gap-2">
                {(hostel.languages || defaultLanguages).map((language, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Experience level:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {(hostel.experience || defaultExperience).map((exp, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">General requirements:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span>Minimum age: {hostel.minAge || 18} years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span>Minimum commitment: {hostel.commitment || '2 weeks'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span>Travel insurance recommended</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span>Valid passport required</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h5 className="font-semibold text-green-800 mb-2">Perfect for:</h5>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-green-700">
              <div>• First-time volunteers</div>
              <div>• Gap year travelers</div>
              <div>• Career changers</div>
              <div>• Digital nomads</div>
              <div>• Students & graduates</div>
              <div>• Cultural enthusiasts</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}