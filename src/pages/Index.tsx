
import React, { useState } from 'react';
import BudgetInput from '../components/BudgetInput';
import ExpenseTracker from '../components/ExpenseTracker';
import TravelComparison from '../components/TravelComparison';
import RecommendedCourses from '../components/RecommendedCourses';
import BudgetPlanner from '../components/BudgetPlanner';
import TravelHistory from '../components/TravelHistory';
import TravelShare from '../components/TravelShare';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Plane, Calculator, Users, MapPin, PiggyBank, History, Share } from 'lucide-react';

interface ExpenseItem {
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface BudgetPlan {
  category: string;
  plannedAmount: number;
}

const Index = () => {
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [budgetPlan, setBudgetPlan] = useState<BudgetPlan[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [travelDays, setTravelDays] = useState<number>(0);
  const [travelNights, setTravelNights] = useState<number>(0);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalPlannedBudget = budgetPlan.reduce((sum, plan) => sum + plan.plannedAmount, 0);
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <p className="text-blue-100 text-sm">계획 예산</p>
              <p className="text-2xl font-bold">{totalPlannedBudget.toLocaleString()}원</p>
              {totalBudget > 0 && (
                <p className="text-blue-200 text-xs mt-1">
                  {((totalPlannedBudget / totalBudget) * 100).toFixed(1)}% 계획
                </p>
              )}
            </div>
            <div className="text-center">
              <p className="text-blue-100 text-sm">실제 지출</p>
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
          
          {/* Progress Bars */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm text-blue-100">
              <span>계획 예산</span>
              <span>{((totalPlannedBudget / totalBudget) * 100).toFixed(1)}%</span>
            </div>
            <div className="bg-white/20 rounded-full h-2">
              <div 
                className="bg-yellow-300 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalPlannedBudget / totalBudget) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-blue-100">
              <span>실제 지출</span>
              <span>{((totalExpenses / totalBudget) * 100).toFixed(1)}%</span>
            </div>
            <div className="bg-white/20 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  totalExpenses > totalBudget ? 'bg-red-400' : 'bg-white'
                }`}
                style={{ width: `${Math.min((totalExpenses / totalBudget) * 100, 100)}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="budget-setup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="budget-setup" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              예산 설정
            </TabsTrigger>
            <TabsTrigger value="budget-planning" className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4" />
              예산 계획
            </TabsTrigger>
            <TabsTrigger value="expense-tracking" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              지출 관리
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              경비 비교
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              추천 코스
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              여행 기록
            </TabsTrigger>
            <TabsTrigger value="share" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              공유하기
            </TabsTrigger>
          </TabsList>

          <TabsContent value="budget-setup">
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
          </TabsContent>

          <TabsContent value="budget-planning">
            <BudgetPlanner 
              budgetPlan={budgetPlan}
              setBudgetPlan={setBudgetPlan}
              totalBudget={totalBudget}
              selectedDestination={selectedDestination}
            />
          </TabsContent>

          <TabsContent value="expense-tracking">
            <ExpenseTracker 
              expenses={expenses}
              setExpenses={setExpenses}
              remainingBudget={remainingBudget}
              selectedDestination={selectedDestination}
              travelDays={travelDays}
              travelNights={travelNights}
              budgetPlan={budgetPlan}
            />
          </TabsContent>

          <TabsContent value="comparison">
            <TravelComparison />
          </TabsContent>

          <TabsContent value="courses">
            <RecommendedCourses selectedDestination={selectedDestination} />
          </TabsContent>

          <TabsContent value="history">
            <TravelHistory />
          </TabsContent>

          <TabsContent value="share">
            <TravelShare 
              totalBudget={totalBudget}
              budgetPlan={budgetPlan}
              expenses={expenses}
              selectedDestination={selectedDestination}
              travelDays={travelDays}
              travelNights={travelNights}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
