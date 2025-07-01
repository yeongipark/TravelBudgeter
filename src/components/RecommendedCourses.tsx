
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { mockDestinationData } from '../data/mockData';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react';

interface RecommendedCoursesProps {
  selectedDestination: string;
}

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({ selectedDestination }) => {
  if (!selectedDestination) {
    return (
      <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">여행지를 선택해주세요</h3>
        <p className="text-gray-500">추천 여행 코스를 확인하려면 먼저 여행지를 선택해주세요.</p>
      </Card>
    );
  }

  const destData = mockDestinationData[selectedDestination];
  if (!destData || !destData.recommendedCourses) {
    return (
      <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
        <p className="text-gray-500">해당 여행지의 추천 코스 데이터가 없습니다.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{destData.flag}</span>
          <div>
            <h2 className="text-2xl font-bold">{destData.name} 추천 코스</h2>
            <p className="text-blue-100">여행자들이 직접 추천하는 베스트 코스</p>
          </div>
        </div>
      </Card>

      {/* Recommended Courses */}
      <div className="space-y-6">
        {destData.recommendedCourses.map((course, index) => (
          <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-3">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>약 {course.estimatedCost.toLocaleString()}원</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{course.rating}/5</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="bg-blue-100 text-blue-800">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">코스 일정</h4>
              <div className="space-y-2">
                {course.itinerary.map((item, dayIndex) => (
                  <div key={dayIndex} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">Day {item.day}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{item.location}</span>
                        <span className="text-sm text-gray-600">• {item.activity}</span>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      {item.cost && (
                        <p className="text-sm font-medium text-blue-600 mt-1">
                          예상 비용: {item.cost.toLocaleString()}원
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {course.tips && course.tips.length > 0 && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h5 className="font-medium text-yellow-800 mb-2">💡 여행 팁</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {course.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;
