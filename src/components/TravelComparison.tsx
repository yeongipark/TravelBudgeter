
import React from 'react';
import { Card } from './ui/card';
import { mockDestinationData } from '../data/mockData';
import { Users, MapPin, Calendar, DollarSign } from 'lucide-react';

interface TravelComparisonProps {
  selectedDestination: string;
}

const TravelComparison: React.FC<TravelComparisonProps> = ({ selectedDestination }) => {
  if (!selectedDestination) {
    return (
      <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">여행지를 선택해주세요</h3>
        <p className="text-gray-500">다른 여행자들의 경비 정보를 확인하려면 먼저 여행지를 선택해주세요.</p>
      </Card>
    );
  }

  const destData = mockDestinationData[selectedDestination];
  if (!destData) {
    return (
      <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
        <p className="text-gray-500">해당 여행지의 데이터가 없습니다.</p>
      </Card>
    );
  }

  const categories = [
    { key: 'flight', label: '항공료', icon: '✈️' },
    { key: 'accommodation', label: '숙박비', icon: '🏨' },
    { key: 'food', label: '식비', icon: '🍽️' },
    { key: 'transport', label: '교통비', icon: '🚇' },
    { key: 'attraction', label: '관광/액티비티', icon: '🎭' },
    { key: 'shopping', label: '쇼핑', icon: '🛍️' },
  ];

  return (
    <div className="space-y-6">
      {/* Destination Overview */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{destData.flag}</span>
          <div>
            <h2 className="text-2xl font-bold">{destData.name}</h2>
            <p className="text-blue-100">다른 여행자들의 평균 경비</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-200" />
            <p className="text-sm text-blue-100">참여 여행자</p>
            <p className="text-xl font-bold">{destData.totalTravelers}명</p>
          </div>
          <div className="text-center">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-200" />
            <p className="text-sm text-blue-100">평균 여행기간</p>
            <p className="text-xl font-bold">{destData.averageDays}일</p>
          </div>
          <div className="text-center">
            <DollarSign className="h-6 w-6 mx-auto mb-2 text-blue-200" />
            <p className="text-sm text-blue-100">평균 총 경비</p>
            <p className="text-xl font-bold">{destData.averageTotalCost.toLocaleString()}원</p>
          </div>
          <div className="text-center">
            <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-200" />
            <p className="text-sm text-blue-100">인기 계절</p>
            <p className="text-xl font-bold">{destData.popularSeason}</p>
          </div>
        </div>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const cost = destData.averageCosts[category.key as keyof typeof destData.averageCosts];
          const percentage = ((cost / destData.averageTotalCost) * 100).toFixed(1);
          
          return (
            <Card key={category.key} className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold">{category.label}</h3>
                  <p className="text-sm text-gray-600">평균 비용</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {cost.toLocaleString()}원
                  </span>
                  <span className="text-sm text-gray-500">{percentage}%</span>
                </div>
                
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Reviews */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4">최근 여행 후기</h3>
        <div className="space-y-4">
          {destData.recentReviews.map((review, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {review.traveler.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{review.traveler}</p>
                  <p className="text-sm text-gray-600">{review.date} • {review.duration}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-bold text-blue-600">총 {review.totalCost.toLocaleString()}원</p>
                  <p className="text-sm text-gray-600">1인 기준</p>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TravelComparison;
