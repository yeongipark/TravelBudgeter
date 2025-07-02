
import React, { useState } from 'react';
import BudgetInput from '../components/BudgetInput';
import ExpenseTracker from '../components/ExpenseTracker';
import TravelComparison from '../components/TravelComparison';
import RecommendedCourses from '../components/RecommendedCourses';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Plane, Calculator, Users, MapPin } from 'lucide-react';

interface ExpenseItem {
  category: string;
  amount: number;
  description: string;
  date: string;
}

const Index = () => {
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [travelDays, setTravelDays] = useState<number>(0);
  const [travelNights, setTravelNights] = useState<number>(0);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = totalBudget - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                TravelBudgeter
              </h1>
              <p className="text-sm text-gray-600">똑똑한 여행 예산 관리</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Budget Overview */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-blue-100 text-sm">총 예산</p>
              <p className="text-2xl font-bold">{totalBudget.toLocaleString()}원</p>
              {travelDays > 0 && (
                <p className="text-blue-200 text-xs mt-1">
                  {travelNights}박 {travelDays}일 여행
                </p>
              )}
            </div>
            <div className="text-center">
              <p className="text-blue-100 text-sm">사용한 금액</p>
              <p className="text-2xl font-bold">{totalExpenses.toLocaleString()}원</p>
              {totalBudget > 0 && (
                <p className="text-blue-200 text-xs mt-1">
                  {((totalExpenses / totalBudget) * 100).toFixed(1)}% 사용
                </p>
              )}
            </div>
            <div className="text-center">
              <p className="text-blue-100 text-sm">남은 예산</p>
              <p className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-red-200' : 'text-green-200'}`}>
                {remainingBudget.toLocaleString()}원
              </p>
              {travelDays > 0 && remainingBudget > 0 && (
                <p className="text-blue-200 text-xs mt-1">
                  1일 평균 {Math.round(remainingBudget / travelDays).toLocaleString()}원
                </p>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="bg-white/20 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  totalExpenses > totalBudget ? 'bg-red-400' : 'bg-white'
                }`}
                style={{ width: `${Math.min((totalExpenses / totalBudget) * 100, 100)}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="budget" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              예산 관리
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              경비 비교
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              추천 코스
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              분석
            </TabsTrigger>
          </TabsList>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BudgetInput 
                totalBudget={totalBudget}
                setTotalBudget={setTotalBudget}
                selectedDestination={selectedDestination}
                setSelectedDestination={setSelectedDestination}
                travelDays={travelDays}
                setTravelDays={setTravelDays}
                travelNights={travelNights}
                setTravelNights={setTravelNights}
              />
              <ExpenseTracker 
                expenses={expenses}
                setExpenses={setExpenses}
                remainingBudget={remainingBudget}
                selectedDestination={selectedDestination}
                travelDays={travelDays}
              />
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <TravelComparison />
          </TabsContent>

          <TabsContent value="courses">
            <RecommendedCourses selectedDestination={selectedDestination} />
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">지출 분석</h3>
              {expenses.length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(
                    expenses.reduce((acc, expense) => {
                      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([category, amount]) => {
                    const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category}</span>
                          <span className="text-lg font-bold text-blue-600">
                            {amount.toLocaleString()}원 ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">아직 지출 내역이 없습니다.</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
