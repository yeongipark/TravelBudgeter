
import React from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, DollarSign, Calendar } from 'lucide-react';

interface BudgetInputProps {
  totalBudget: number;
  setTotalBudget: (budget: number) => void;
  selectedDestination: string;
  setSelectedDestination: (destination: string) => void;
  travelDays: number;
  setTravelDays: (days: number) => void;
  travelNights: number;
  setTravelNights: (nights: number) => void;
}

const destinations = [
  { value: 'tokyo', label: '도쿄, 일본', flag: '🇯🇵' },
  { value: 'paris', label: '파리, 프랑스', flag: '🇫🇷' },
  { value: 'newyork', label: '뉴욕, 미국', flag: '🇺🇸' },
  { value: 'london', label: '런던, 영국', flag: '🇬🇧' },
  { value: 'singapore', label: '싱가포르', flag: '🇸🇬' },
  { value: 'seoul', label: '서울, 한국', flag: '🇰🇷' },
];

const BudgetInput: React.FC<BudgetInputProps> = ({
  totalBudget,
  setTotalBudget,
  selectedDestination,
  setSelectedDestination,
  travelDays,
  setTravelDays,
  travelNights,
  setTravelNights
}) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
          <DollarSign className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">여행 예산 설정</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
            여행 목적지
          </Label>
          <Select value={selectedDestination} onValueChange={setSelectedDestination}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="여행지를 선택해주세요" />
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

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <Label className="text-sm font-medium text-gray-700">여행 기간</Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nights" className="text-xs text-gray-600">
                숙박 일수 (박)
              </Label>
              <Input
                id="nights"
                type="number"
                min="1"
                max="30"
                placeholder="예: 3"
                value={travelNights || ''}
                onChange={(e) => setTravelNights(Number(e.target.value))}
                className="text-center font-semibold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="days" className="text-xs text-gray-600">
                여행 일수 (일)
              </Label>
              <Input
                id="days"
                type="number"
                min="1"
                max="31"
                placeholder="예: 4"
                value={travelDays || ''}
                onChange={(e) => setTravelDays(Number(e.target.value))}
                className="text-center font-semibold"
              />
            </div>
          </div>
          {travelNights > 0 && travelDays > 0 && (
            <div className="text-center">
              <span className="text-sm text-blue-600 font-medium">
                {travelNights}박 {travelDays}일 여행
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
            총 여행 예산 (원)
          </Label>
          <Input
            id="budget"
            type="number"
            placeholder="예: 1500000"
            value={totalBudget || ''}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
            className="text-lg font-semibold"
          />
          {totalBudget > 0 && travelDays > 0 && (
            <p className="text-xs text-gray-500">
              1일 평균 예산: {Math.round(totalBudget / travelDays).toLocaleString()}원
            </p>
          )}
        </div>

        {selectedDestination && totalBudget > 0 && travelDays > 0 && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">
                {destinations.find(d => d.value === selectedDestination)?.label}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              {travelNights}박 {travelDays}일 여행 • 총 예산 {totalBudget.toLocaleString()}원
            </p>
            <p className="text-xs text-blue-600">
              선택한 목적지와 예산으로 여행 계획을 세워보세요!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BudgetInput;
