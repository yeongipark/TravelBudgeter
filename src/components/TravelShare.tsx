
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Share, Link, Copy, Users, QrCode, Mail } from 'lucide-react';

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

interface TravelShareProps {
  totalBudget: number;
  budgetPlan: BudgetPlan[];
  expenses: ExpenseItem[];
  selectedDestination: string;
  travelDays: number;
  travelNights: number;
}

const TravelShare: React.FC<TravelShareProps> = ({
  totalBudget,
  budgetPlan,
  expenses,
  selectedDestination,
  travelDays,
  travelNights
}) => {
  const [shareCode] = useState('TRAVEL-' + Math.random().toString(36).substr(2, 8).toUpperCase());
  const [shareUrl] = useState(`https://travelbudgeter.app/shared/${shareCode}`);
  const [inviteEmail, setInviteEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const totalPlanned = budgetPlan.reduce((sum, plan) => sum + plan.plannedAmount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('복사 실패:', err);
    }
  };

  const handleSendInvite = () => {
    if (inviteEmail) {
      const subject = encodeURIComponent(`${selectedDestination || '여행'} 예산 공유`);
      const body = encodeURIComponent(
        `안녕하세요! ${selectedDestination || '여행'} 예산을 함께 관리해요.\n\n` +
        `공유 링크: ${shareUrl}\n` +
        `공유 코드: ${shareCode}\n\n` +
        `TravelBudgeter에서 함께 여행 계획을 세워보세요!`
      );
      window.location.href = `mailto:${inviteEmail}?subject=${subject}&body=${body}`;
      setInviteEmail('');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Share className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold">여행 예산 공유</h2>
        </div>

        {/* Current Trip Summary */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3">현재 여행 정보</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-600">목적지</p>
              <p className="font-bold text-blue-600">{selectedDestination || '미설정'}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">여행 기간</p>
              <p className="font-bold text-green-600">
                {travelNights > 0 ? `${travelNights}박 ${travelDays}일` : '미설정'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">총 예산</p>
              <p className="font-bold text-purple-600">{totalBudget.toLocaleString()}원</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">진행률</p>
              <p className="font-bold text-orange-600">
                {totalBudget > 0 ? ((totalExpenses / totalBudget) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Share Link */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Link className="h-5 w-5 text-blue-500" />
              <h4 className="font-medium">링크로 공유</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-600">공유 코드</Label>
                <div className="flex gap-2">
                  <Input value={shareCode} readOnly className="bg-gray-50" />
                  <Button 
                    onClick={handleCopyLink}
                    variant="outline" 
                    size="sm"
                    className={copied ? 'bg-green-50 text-green-600' : ''}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-gray-600">공유 링크</Label>
                <div className="flex gap-2">
                  <Input value={shareUrl} readOnly className="bg-gray-50 text-xs" />
                  <Button 
                    onClick={handleCopyLink}
                    variant="outline" 
                    size="sm"
                    className={copied ? 'bg-green-50 text-green-600' : ''}
                  >
                    {copied ? '복사됨!' : '복사'}
                  </Button>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                이 링크를 통해 다른 사람들과 여행 예산을 실시간으로 공유하고 함께 관리할 수 있습니다.
              </p>
            </div>
          </Card>

          {/* Email Invite */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-green-500" />
              <h4 className="font-medium">이메일 초대</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-600">이메일 주소</Label>
                <Input
                  type="email"
                  placeholder="friend@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleSendInvite}
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={!inviteEmail}
              >
                <Mail className="h-4 w-4 mr-2" />
                초대 이메일 보내기
              </Button>
              
              <p className="text-xs text-gray-500">
                이메일로 여행 예산 공유 링크와 참여 방법을 안내해드립니다.
              </p>
            </div>
          </Card>
        </div>

        {/* Share Features */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            공유 기능
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h5 className="font-medium text-gray-700">실시간 동기화</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• 예산 변경사항 실시간 반영</li>
                <li>• 지출 내역 공동 관리</li>
                <li>• 카테고리별 예산 계획 공유</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium text-gray-700">협업 기능</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• 다중 사용자 동시 편집</li>
                <li>• 역할별 권한 관리</li>
                <li>• 변경내역 추적</li>
              </ul>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mt-6 text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <QrCode className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">QR 코드로 빠른 공유</p>
          <Button variant="outline" size="sm">
            QR 코드 생성
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            모바일에서 QR 코드를 스캔하여 바로 접속할 수 있습니다.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TravelShare;
