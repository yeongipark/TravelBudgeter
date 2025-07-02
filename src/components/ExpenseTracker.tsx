
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Trash2, Plus, TrendingUp, TrendingDown, Edit2, Check, X, Calendar } from 'lucide-react';
import { mockDestinationData } from '../data/mockData';

interface ExpenseItem {
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface ExpenseTrackerProps {
  expenses: ExpenseItem[];
  setExpenses: (expenses: ExpenseItem[]) => void;
  remainingBudget: number;
  selectedDestination: string;
  travelDays: number;
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

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  expenses,
  setExpenses,
  remainingBudget,
  selectedDestination,
  travelDays
}) => {
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: ''
  });
  
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editExpense, setEditExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: ''
  });

  // Generate date options based on travel days
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < Math.max(travelDays, 7); i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: `${i + 1}일차 (${date.getMonth() + 1}/${date.getDate()})`
      });
    }
    return dates;
  };

  const dateOptions = generateDateOptions();

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount && newExpense.description && newExpense.date) {
      const expense: ExpenseItem = {
        category: categories.find(c => c.value === newExpense.category)?.label || newExpense.category,
        amount: Number(newExpense.amount),
        description: newExpense.description,
        date: newExpense.date
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ category: '', amount: '', description: '', date: '' });
    }
  };

  const handleRemoveExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleEditExpense = (index: number) => {
    const expense = expenses[index];
    setEditExpense({
      category: categories.find(c => c.label === expense.category)?.value || 'other',
      amount: expense.amount.toString(),
      description: expense.description,
      date: expense.date
    });
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editExpense.category && editExpense.amount && editExpense.description && editExpense.date) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editingIndex] = {
        category: categories.find(c => c.value === editExpense.category)?.label || editExpense.category,
        amount: Number(editExpense.amount),
        description: editExpense.description,
        date: editExpense.date
      };
      setExpenses(updatedExpenses);
      setEditingIndex(null);
      setEditExpense({ category: '', amount: '', description: '', date: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditExpense({ category: '', amount: '', description: '', date: '' });
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

  // Group expenses by date
  const expensesByDate = expenses.reduce((acc, expense, index) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({ ...expense, originalIndex: index });
    return acc;
  }, {} as Record<string, Array<ExpenseItem & { originalIndex: number }>>);

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">지출 관리</h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          remainingBudget >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {remainingBudget >= 0 ? '예산 내' : '예산 초과'}
        </div>
      </div>

      {/* Add New Expense */}
      <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800">새 지출 추가</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <Label className="text-xs text-gray-600">여행 일차</Label>
            <Select value={newExpense.date} onValueChange={(value) => 
              setNewExpense({...newExpense, date: value})
            }>
              <SelectTrigger>
                <SelectValue placeholder="일차 선택" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((date) => (
                  <SelectItem key={date.value} value={date.value}>
                    {date.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-gray-600">카테고리</Label>
            <Select value={newExpense.category} onValueChange={(value) => 
              setNewExpense({...newExpense, category: value})
            }>
              <SelectTrigger>
                <SelectValue placeholder="선택" />
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
            <Label className="text-xs text-gray-600">금액</Label>
            <Input
              type="number"
              placeholder="금액"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            />
          </div>
          
          <div>
            <Label className="text-xs text-gray-600">설명</Label>
            <Input
              placeholder="설명"
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            />
          </div>
        </div>
        
        <Button onClick={handleAddExpense} className="w-full bg-gradient-to-r from-blue-500 to-green-500">
          <Plus className="h-4 w-4 mr-2" />
          지출 추가
        </Button>
      </div>

      {/* Expense List by Date */}
      <div className="space-y-4">
        {Object.keys(expensesByDate).length === 0 ? (
          <p className="text-gray-500 text-center py-8">아직 지출 내역이 없습니다.</p>
        ) : (
          Object.entries(expensesByDate)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, dayExpenses]) => {
              const dateOption = dateOptions.find(d => d.value === date);
              const dayTotal = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
              
              return (
                <div key={date} className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">
                      {dateOption?.label || `${date}`}
                    </span>
                    <span className="ml-auto text-sm text-blue-600 font-medium">
                      일일 총액: {dayTotal.toLocaleString()}원
                    </span>
                  </div>
                  
                  {dayExpenses.map((expense) => {
                    const comparison = getAverageComparison(expense.category, expense.amount);
                    const isEditing = editingIndex === expense.originalIndex;
                    
                    return (
                      <div key={expense.originalIndex} className="ml-6 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        {isEditing ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                              <Select value={editExpense.date} onValueChange={(value) => 
                                setEditExpense({...editExpense, date: value})
                              }>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {dateOptions.map((date) => (
                                    <SelectItem key={date.value} value={date.value}>
                                      {date.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Select value={editExpense.category} onValueChange={(value) => 
                                setEditExpense({...editExpense, category: value})
                              }>
                                <SelectTrigger>
                                  <SelectValue />
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

                              <Input
                                type="number"
                                value={editExpense.amount}
                                onChange={(e) => setEditExpense({...editExpense, amount: e.target.value})}
                              />

                              <Input
                                value={editExpense.description}
                                onChange={(e) => setEditExpense({...editExpense, description: e.target.value})}
                              />
                            </div>
                            
                            <div className="flex gap-2">
                              <Button onClick={handleSaveEdit} size="sm" className="bg-green-500 hover:bg-green-600">
                                <Check className="h-4 w-4 mr-1" />
                                저장
                              </Button>
                              <Button onClick={handleCancelEdit} variant="outline" size="sm">
                                <X className="h-4 w-4 mr-1" />
                                취소
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{expense.category}</span>
                                <span className="text-lg font-bold text-blue-600">
                                  {expense.amount.toLocaleString()}원
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{expense.description}</p>
                              
                              {comparison && (
                                <div className="mt-2 flex items-center gap-2">
                                  {comparison.isHigher ? (
                                    <TrendingUp className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <TrendingDown className="h-4 w-4 text-green-500" />
                                  )}
                                  <span className={`text-xs ${comparison.isHigher ? 'text-red-600' : 'text-green-600'}`}>
                                    평균보다 {Math.abs(Number(comparison.percentage))}% {comparison.isHigher ? '높음' : '낮음'} 
                                    (평균: {comparison.average.toLocaleString()}원)
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditExpense(expense.originalIndex)}
                                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveExpense(expense.originalIndex)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
        )}
      </div>
    </Card>
  );
};

export default ExpenseTracker;
