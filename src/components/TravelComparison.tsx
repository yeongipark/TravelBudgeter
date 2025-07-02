
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { mockDestinationData } from '../data/mockData';
import { MapPin, DollarSign, Calendar, Users, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

const TravelComparison: React.FC = () => {
  const [destination1, setDestination1] = useState<string>('');
  const [destination2, setDestination2] = useState<string>('');

  const destinations = [
    { value: 'tokyo', label: '도쿄, 일본', flag: '🇯🇵' },
    { value: 'paris', label: '파리, 프랑스', flag: '🇫🇷' },
    { value: 'newyork', label: '뉴욕, 미국', flag: '🇺🇸' },
    { value: 'london', label: '런던, 영국', flag: '🇬🇧' },
    { value: 'singapore', label: '싱가포르', flag: '🇸🇬' },
    { value: 'seoul', label: '서울, 한국', flag: '🇰🇷' },
  ];

  const categories = [
    { key: 'flight', label: '항공료', icon: '✈️' },
    { key: 'accommodation', label: '숙박비', icon: '🏨' },
    { key: 'food', label: '식비', icon: '🍽️' },
    { key: 'transport', label: '교통비', icon: '🚇' },
    { key: 'attraction', label: '관광/액티비티', icon: '🎭' },
    { key: 'shopping', label: '쇼핑', icon: '🛍️' },
  ];

  const dest1Data = destination1 ? mockDestinationData[destination1] : null;
  const dest2Data = destination2 ? mockDestinationData[destination2] : null;

  const compareValues = (value1: number, value2: number) => {
    const difference = ((value1 - value2) / value2) * 100;
    return {
      difference: Math.abs(difference),
      isHigher: value1 > value2,
      isSame: Math.abs(difference) < 5
    };
  };

  const resetComparison = () => {
    setDestination1('');
    setDestination2('');
  };

  if (!destination1 || !destination2) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-4">여행지 비교하기</h3>
          <p className="text-gray-600 mb-6">두 개의 여행지를 선택하여 경비와 여행 정보를 비교해보세요.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">첫 번째 여행지</label>
              <Select value={destination1} onValueChange={setDestination1}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="여행지를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.value} value={dest.value}>
                      <div className="flex items-center gap-2">
                        <span>{dest.flag}</span>
                        <span>{dest.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">두 번째 여행지</label>
              <Select value={destination2} onValueChange={setDestination2}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="여행지를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.filter(d => d.value !== destination1).map((dest) => (
                    <SelectItem key={dest.value} value={dest.value}>
                      <div className="flex items-center gap-2">
                        <span>{dest.flag}</span>
                        <span>{dest.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comparison Header */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">여행지 비교</h2>
          <Button onClick={resetComparison} variant="secondary" size="sm">
            다시 선택하기
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">{dest1Data?.flag}</span>
              <h3 className="text-xl font-bold">{dest1Data?.name}</h3>
            </div>
            <p className="text-blue-100">평균 총 경비: {dest1Data?.averageTotalCost.toLocaleString()}원</p>
            <p className="text-blue-200 text-sm">평균 {dest1Data?.averageDays}일 여행</p>
          </div>
          
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">{dest2Data?.flag}</span>
              <h3 className="text-xl font-bold">{dest2Data?.name}</h3>
            </div>
            <p className="text-blue-100">평균 총 경비: {dest2Data?.averageTotalCost.toLocaleString()}원</p>
            <p className="text-blue-200 text-sm">평균 {dest2Data?.averageDays}일 여행</p>
          </div>
        </div>
      </Card>

      {/* Overall Comparison */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4">종합 비교</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <DollarSign className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-gray-600">총 경비 차이</p>
            <p className="text-lg font-bold text-blue-800">
              {Math.abs(dest1Data!.averageTotalCost - dest2Data!.averageTotalCost).toLocaleString()}원
            </p>
            <p className="text-xs text-gray-500">
              {dest1Data!.averageTotalCost > dest2Data!.averageTotalCost 
                ? `${dest1Data!.name}이 더 비쌈` 
                : `${dest2Data!.name}이 더 비쌈`}
            </p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <p className="text-sm text-gray-600">인기 여행 시즌</p>
            <p className="text-lg font-bold text-green-800">{dest1Data!.popularSeason}</p>
            <p className="text-xs text-gray-500">vs {dest2Data!.popularSeason}</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <p className="text-sm text-gray-600">여행자 데이터</p>
            <p className="text-lg font-bold text-purple-800">{dest1Data!.totalTravelers}명</p>
            <p className="text-xs text-gray-500">vs {dest2Data!.totalTravelers}명</p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <MapPin className="h-6 w-6 mx-auto mb-2 text-orange-600" />
            <p className="text-sm text-gray-600">평균 여행 기간</p>
            <p className="text-lg font-bold text-orange-800">{dest1Data!.averageDays}일</p>
            <p className="text-xs text-gray-500">vs {dest2Data!.averageDays}일</p>
          </div>
        </div>
      </Card>

      {/* Category Comparison */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4">항목별 경비 비교</h3>
        
        <div className="space-y-4">
          {categories.map((category) => {
            const cost1 = dest1Data!.averageCosts[category.key as keyof typeof dest1Data!.averageCosts];
            const cost2 = dest2Data!.averageCosts[category.key as keyof typeof dest2Data!.averageCosts];
            const comparison = compareValues(cost1, cost2);
            
            return (
              <div key={category.key} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h4 className="font-semibold text-lg">{category.label}</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{dest1Data!.name}</p>
                    <p className="text-xl font-bold text-blue-600">{cost1.toLocaleString()}원</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {comparison.isSame ? (
                        <span className="text-gray-500 text-sm">비슷함</span>
                      ) : (
                        <>
                          {comparison.isHigher ? (
                            <TrendingUp className="h-4 w-4 text-red-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-green-500" />
                          )}
                          <span className={`text-sm font-medium ${comparison.isHigher ? 'text-red-600' : 'text-green-600'}`}>
                            {comparison.difference.toFixed(1)}% 차이
                          </span>
                        </>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 mx-auto mt-1" />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{dest2Data!.name}</p>
                    <p className="text-xl font-bold text-green-600">{cost2.toLocaleString()}원</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recommendation */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <h3 className="text-xl font-semibold mb-4 text-green-800">💡 여행지 추천</h3>
        
        <div className="space-y-3">
          {dest1Data!.averageTotalCost < dest2Data!.averageTotalCost ? (
            <div className="p-3 bg-green-100 rounded-lg">
              <p className="font-medium text-green-800">💰 예산 절약을 원한다면</p>
              <p className="text-sm text-green-700">
                {dest1Data!.name}이 {dest2Data!.name}보다 평균 {(dest2Data!.averageTotalCost - dest1Data!.averageTotalCost).toLocaleString()}원 저렴합니다.
              </p>
            </div>
          ) : (
            <div className="p-3 bg-green-100 rounded-lg">
              <p className="font-medium text-green-800">💰 예산 절약을 원한다면</p>
              <p className="text-sm text-green-700">
                {dest2Data!.name}이 {dest1Data!.name}보다 평균 {(dest1Data!.averageTotalCost - dest2Data!.averageTotalCost).toLocaleString()}원 저렴합니다.
              </p>
            </div>
          )}
          
          <div className="p-3 bg-blue-100 rounded-lg">
            <p className="font-medium text-blue-800">🗓️ 여행 시기</p>
            <p className="text-sm text-blue-700">
              {dest1Data!.name}은 {dest1Data!.popularSeason}이, {dest2Data!.name}은 {dest2Data!.popularSeason}이 인기 시즌입니다.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TravelComparison;
