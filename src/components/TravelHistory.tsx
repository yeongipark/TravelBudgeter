
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { History, MapPin, Calendar, DollarSign, Eye, Trash2 } from 'lucide-react';

interface TravelRecord {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  totalExpense: number;
  duration: string;
  flag: string;
}

const TravelHistory: React.FC = () => {
  const [travelHistory] = useState<TravelRecord[]>([
    {
      id: '1',
      destination: '도쿄, 일본',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      totalBudget: 1500000,
      totalExpense: 1350000,
      duration: '4박 5일',
      flag: '🇯🇵'
    },
    {
      id: '2',
      destination: '파리, 프랑스',
      startDate: '2023-12-10',
      endDate: '2023-12-17',
      totalBudget: 2500000,
      totalExpense: 2750000,
      duration: '6박 7일',
      flag: '🇫🇷'
    },
    {
      id: '3',
      destination: '싱가포르',
      startDate: '2023-08-05',
      endDate: '2023-08-09',
      totalBudget: 1200000,
      totalExpense: 1100000,
      duration: '3박 4일',
      flag: '🇸🇬'
    }
  ]);

  const [selectedRecord, setSelectedRecord] = useState<TravelRecord | null>(null);

  const handleViewDetails = (record: TravelRecord) => {
    setSelectedRecord(record);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const getSavingsRate = (budget: number, expense: number) => {
    const rate = ((budget - expense) / budget) * 100;
    return rate.toFixed(1);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <History className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold">여행 기록</h2>
          <span className="ml-auto text-sm text-gray-500">{travelHistory.length}건의 여행</span>
        </div>

        {travelHistory.length === 0 ? (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">아직 여행 기록이 없습니다.</p>
            <p className="text-sm text-gray-400 mt-2">여행을 완료하면 자동으로 기록됩니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelHistory.map((record) => {
              const savingsRate = Number(getSavingsRate(record.totalBudget, record.totalExpense));
              const isOverBudget = record.totalExpense > record.totalBudget;
              
              return (
                <Card key={record.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{record.flag}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{record.destination}</h3>
                        <p className="text-sm text-gray-500">{record.duration}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isOverBudget ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {isOverBudget ? '초과' : '절약'}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {formatDate(record.startDate)} - {formatDate(record.endDate)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {record.totalExpense.toLocaleString()}원 / {record.totalBudget.toLocaleString()}원
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isOverBudget ? 'bg-red-400' : 'bg-green-400'
                        }`}
                        style={{ width: `${Math.min((record.totalExpense / record.totalBudget) * 100, 100)}%` }}
                      />
                    </div>
                    
                    <p className={`text-xs text-center ${
                      isOverBudget ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {isOverBudget 
                        ? `${Math.abs(savingsRate)}% 초과` 
                        : `${savingsRate}% 절약`
                      }
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleViewDetails(record)}
                      size="sm" 
                      className="flex-1 bg-purple-500 hover:bg-purple-600"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      상세보기
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      {selectedRecord && (
        <Card className="p-6 bg-white border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedRecord.flag}</span>
              <div>
                <h3 className="text-xl font-bold">{selectedRecord.destination}</h3>
                <p className="text-gray-600">{selectedRecord.duration}</p>
              </div>
            </div>
            <Button 
              onClick={() => setSelectedRecord(null)}
              variant="outline" 
              size="sm"
            >
              닫기
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">여행 정보</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>출발일:</span>
                    <span>{selectedRecord.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>귀국일:</span>
                    <span>{selectedRecord.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>여행 기간:</span>
                    <span>{selectedRecord.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">예산 정보</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>총 예산:</span>
                    <span className="font-bold">{selectedRecord.totalBudget.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 지출:</span>
                    <span className="font-bold">{selectedRecord.totalExpense.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>차액:</span>
                    <span className={`font-bold ${
                      selectedRecord.totalExpense > selectedRecord.totalBudget ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {selectedRecord.totalExpense > selectedRecord.totalBudget ? '+' : ''}
                      {(selectedRecord.totalExpense - selectedRecord.totalBudget).toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TravelHistory;
