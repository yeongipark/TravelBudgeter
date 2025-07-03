
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PiggyBank, Plus, Edit2, Check, X, TrendingUp, TrendingDown } from 'lucide-react';
import { mockDestinationData } from '../data/mockData';

interface BudgetPlan {
  category: string;
  plannedAmount: number;
}

interface BudgetPlannerProps {
  budgetPlan: BudgetPlan[];
  setBudgetPlan: (plan: BudgetPlan[]) => void;
  totalBudget: number;
  selectedDestination: string;
}

const categories = [
  { value: 'flight', label: '항공료', icon: '✈️' },
  { value: 'accommodation', label: '숙박비', icon: '🏨' },
  { value: 'food', label: '식비', icon: '🍽️' },
  { value: 'transport', label: '교통비', icon: '🚇' },
  { value: 'attraction', label: '관광/액티비티', icon: '🎭' },
  { value: 'shopping', label: '쇼핑', icon: '🛍️' },
  { value: 'other', label: '기타', icon: '💰' },
];

const BudgetPlanner: React.FC<BudgetPlannerProps> = ({
  budgetPlan,
  setBudgetPlan,
  totalBudget,
  selectedDestination
}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [plannedAmount, setPlannedAmount] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState('');

  const totalPlanned = budgetPlan.reduce((sum, plan) => sum + plan.plannedAmount, 0);
  const remainingBudget = totalBudget - totalPlanned;

  const handleAddPlan = () => {
    if (selectedCategory && plannedAmount) {
      const categoryLabel = categories.find(c => c.value === selectedCategory)?.label || selectedCategory;
      const existingIndex = budgetPlan.findIndex(plan => plan.category === categoryLabel);
      
      if (existingIndex >= 0) {
        // Update existing category
        const updatedPlan = [...budgetPlan];
        updatedPlan[existingIndex].plannedAmount = Number(plannedAmount);
        setBudgetPlan(updatedPlan);
      } else {
        // Add new category
        setBudgetPlan([...budgetPlan, {
          category: categoryLabel,
          plannedAmount: Number(plannedAmount)
        }]);
      }
      
      setSelectedCategory('');
      setPlannedAmount('');
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditAmount(budgetPlan[index].plannedAmount.toString());
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editAmount) {
      const updatedPlan = [...budgetPlan];
      updatedPlan[editingIndex].plannedAmount = Number(editAmount);
      setBudgetPlan(updatedPlan);
      setEditingIndex(null);
      setEditAmount('');
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditAmount('');
  };

  const handleRemove = (index: number) => {
    setBudgetPlan(budgetPlan.filter((_, i) => i !== index));
  };

  const getAverageComparison = (category: string, amount: number) => {
    if (!selectedDestination) return null;
    
    const destData = mockDestinationData[selectedDestination];
    if (!destData) return null;

    const categoryMapping: Record<string, keyof typeof destData.averageCosts> = {
      '항공료': 'flight',
      '숙박비': 'accommodation',
      '식비': 'food',
      '교통비': 'transport',
      '관광/액티비티': 'attraction',
      '쇼핑': 'shopping'
    };

    const avgKey = categoryMapping[category];
    if (!avgKey) return null;

    const avgCost = destData.averageCosts[avgKey];
    const difference = amount - avgCost;
    const percentage = ((difference / avgCost) * 100).toFixed(1);

    return {
      average: avgCost,
      difference,
      percentage,
      isHigher: difference > 0
    };
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <PiggyBank className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold">예산 계획</h2>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            remainingBudget >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            남은 예산: {remainingBudget.toLocaleString()}원
          </div>
        </div>

        {/* Add Budget Plan */}
        <div className="space-y-4 mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium text-green-800">카테고리별 예산 계획</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs text-gray-600">카테고리</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs text-gray-600">계획 금액</Label>
              <Input
                type="number"
                placeholder="금액 입력"
                value={plannedAmount}
                onChange={(e) => setPlannedAmount(e.target.value)}
              />
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleAddPlan} className="w-full bg-green-500 hover:bg-green-600">
                <Plus className="h-4 w-4 mr-2" />
                계획 추가
              </Button>
            </div>
          </div>
        </div>

        {/* Budget Plan List */}
        <div className="space-y-3">
          {budgetPlan.length === 0 ? (
            <p className="text-gray-500 text-center py-8">아직 예산 계획이 없습니다.</p>
          ) : (
            budgetPlan.map((plan, index) => {
              const comparison = getAverageComparison(plan.category, plan.plannedAmount);
              const isEditing = editingIndex === index;
              
              return (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  {isEditing ? (
                    <div className="flex items-center gap-3">
                      <span className="font-medium min-w-[100px]">{plan.category}</span>
                      <Input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="max-w-[150px]"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveEdit} size="sm" className="bg-green-500 hover:bg-green-600">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleCancelEdit} variant="outline" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{plan.category}</span>
                          <span className="text-lg font-bold text-green-600">
                            {plan.plannedAmount.toLocaleString()}원
                          </span>
                        </div>
                        
                        {comparison && (
                          <div className="flex items-center gap-2">
                            {comparison.isHigher ? (
                              <TrendingUp className="h-4 w-4 text-red-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-green-500" />
                            )}
                            <span className={`text-xs ${comparison.isHigher ? 'text-red-600' : 'text-green-600'}`}>
                              평균보다 {Math.abs(Number(comparison.percentage))}% {comparison.isHigher ? '높게' : '낮게'} 계획 
                              (평균: {comparison.average.toLocaleString()}원)
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(index)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Budget Summary */}
        {budgetPlan.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">총 계획 예산</span>
              <span className="text-xl font-bold text-green-600">{totalPlanned.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>전체 예산 대비 비율</span>
              <span>{totalBudget > 0 ? ((totalPlanned / totalBudget) * 100).toFixed(1) : 0}%</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BudgetPlanner;
