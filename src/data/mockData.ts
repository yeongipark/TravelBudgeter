
export const mockDestinationData: Record<string, any> = {
  tokyo: {
    name: '도쿄, 일본',
    flag: '🇯🇵',
    totalTravelers: 1247,
    averageDays: 5,
    averageTotalCost: 1580000,
    popularSeason: '봄/가을',
    averageCosts: {
      flight: 350000,
      accommodation: 480000,
      food: 380000,
      transport: 120000,
      attraction: 200000,
      shopping: 150000,
    },
    recentReviews: [
      {
        traveler: '김지은',
        date: '2024.06.15',
        duration: '4박 5일',
        totalCost: 1420000,
        comment: '벚꽃 시즌이라 숙박비가 비쌌지만 정말 아름다웠어요! 교통비는 7일 패스를 사서 절약했습니다.'
      },
      {
        traveler: '박민수',
        date: '2024.06.10',
        duration: '3박 4일',
        totalCost: 1230000,
        comment: '아키하바라와 하라주쿠에서 쇼핑을 많이 했는데 예상보다 저렴했어요. 라멘 맛집 투어도 추천!'
      },
      {
        traveler: '이서연',
        date: '2024.06.05',
        duration: '6박 7일',
        totalCost: 1850000,
        comment: '디즈니랜드, 유니버설 스튜디오 둘 다 갔더니 액티비티 비용이 좀 나왔네요. 그래도 만족!'
      }
    ],
    recommendedCourses: [
      {
        title: '도쿄 클래식 코스 (첫 도쿄 여행자 추천)',
        description: '도쿄의 대표적인 관광지들을 효율적으로 둘러보는 5일 코스',
        duration: '4박 5일',
        estimatedCost: 1450000,
        rating: 4.8,
        tags: ['첫 방문', '대중교통', '문화체험'],
        itinerary: [
          {
            day: 1,
            location: '아사쿠사 & 스카이트리',
            activity: '전통문화 체험',
            description: '센소지 절 참배 후 도쿄 스카이트리에서 야경 감상',
            cost: 25000
          },
          {
            day: 2,
            location: '시부야 & 하라주쿠',
            activity: '쇼핑 & 거리문화',
            description: '시부야 스크램블 교차로, 하라주쿠 다케시타도리 쇼핑',
            cost: 80000
          },
          {
            day: 3,
            location: '우에노 & 아메요코',
            activity: '박물관 & 시장 탐방',
            description: '우에노 동물원, 국립박물관 관람 후 아메요코 시장에서 쇼핑',
            cost: 35000
          },
          {
            day: 4,
            location: '긴자 & 츠키지',
            activity: '미식투어',
            description: '츠키지 장외시장 아침식사, 긴자에서 럭셔리 쇼핑',
            cost: 120000
          },
          {
            day: 5,
            location: '오다이바',
            activity: '레저 & 휴식',
            description: '팔레트타운, 아쿠아시티에서 쇼핑 후 온천 휴식',
            cost: 45000
          }
        ],
        tips: [
          'JR 패스보다 도쿄 메트로 7일권이 더 경제적입니다',
          '아침 일찍 츠키지 시장에 가면 신선한 해산물을 저렴하게 드실 수 있어요',
          '백화점에서 Tax Free 쇼핑 잊지 마세요!'
        ]
      },
      {
        title: '도쿄 테마파크 올인원',
        description: '디즈니랜드와 유니버설 스튜디오를 포함한 테마파크 중심 코스',
        duration: '5박 6일',
        estimatedCost: 1920000,
        rating: 4.6,
        tags: ['테마파크', '가족여행', '액티비티'],
        itinerary: [
          {
            day: 1,
            location: '도쿄 디즈니랜드',
            activity: '테마파크',
            description: '클래식한 디즈니 캐릭터들과 함께하는 하루',
            cost: 85000
          },
          {
            day: 2,
            location: '도쿄 디즈니씨',
            activity: '테마파크',
            description: '바다를 테마로 한 독특한 디즈니 파크',
            cost: 85000
          },
          {
            day: 3,
            location: '유니버설 스튜디오 재팬',
            activity: '테마파크',
            description: '해리포터, 미니언즈 등 인기 캐릭터 체험',
            cost: 90000
          },
          {
            day: 4,
            location: '산리오 퓨어랜드',
            activity: '테마파크',
            description: '헬로키티와 친구들의 테마파크',
            cost: 35000
          },
          {
            day: 5,
            location: '도쿄 돔시티',
            activity: '놀이공원',
            description: '도심 속 놀이공원에서 스릴 만끽',
            cost: 40000
          },
          {
            day: 6,
            location: '쇼핑 & 휴식',
            activity: '자유시간',
            description: '기념품 쇼핑 및 마지막 여행 정리',
            cost: 50000
          }
        ],
        tips: [
          '테마파크 티켓을 미리 온라인으로 예약하면 할인받을 수 있어요',
          '패스트패스를 적극 활용하세요',
          '테마파크 근처 호텔을 예약하면 이동시간을 절약할 수 있습니다'
        ]
      }
    ]
  },
  paris: {
    name: '파리, 프랑스',
    flag: '🇫🇷',
    totalTravelers: 892,
    averageDays: 6,
    averageTotalCost: 2150000,
    popularSeason: '봄/여름',
    averageCosts: {
      flight: 650000,
      accommodation: 720000,
      food: 420000,
      transport: 180000,
      attraction: 250000,
      shopping: 230000,
    },
    recentReviews: [
      {
        traveler: '최유진',
        date: '2024.06.12',
        duration: '5박 7일',
        totalCost: 2380000,
        comment: '에펠탑 야경이 정말 환상적이었어요! 루브르 박물관은 하루 종일 봐도 부족하더라구요.'
      },
      {
        traveler: '이동현',
        date: '2024.06.08',
        duration: '4박 6일',
        totalCost: 1950000,
        comment: '카페 문화가 정말 좋았어요. 몽마르트르 언덕에서 보는 파리 전경도 추천!'
      }
    ],
    recommendedCourses: [
      {
        title: '파리 로맨틱 클래식',
        description: '파리의 대표 명소들을 낭만적으로 둘러보는 코스',
        duration: '5박 6일',
        estimatedCost: 2100000,
        rating: 4.9,
        tags: ['로맨틱', '문화', '예술'],
        itinerary: [
          {
            day: 1,
            location: '에펠탑 & 샹드마르스 공원',
            activity: '랜드마크 관광',
            description: '파리의 상징 에펠탑과 주변 공원에서 피크닉',
            cost: 30000
          },
          {
            day: 2,
            location: '루브르 박물관',
            activity: '예술 감상',
            description: '모나리자와 세계적인 예술품 감상',
            cost: 45000
          },
          {
            day: 3,
            location: '몽마르트르 & 사크레쾨르',
            activity: '예술가 마을 탐방',
            description: '화가들의 거리에서 초상화 그리기 체험',
            cost: 60000
          }
        ],
        tips: [
          '뮤지엄 패스를 구매하면 여러 박물관을 할인가로 입장할 수 있어요',
          '카페에서 커피는 서서 마시면 더 저렴합니다'
        ]
      }
    ]
  },
  newyork: {
    name: '뉴욕, 미국',
    flag: '🇺🇸',
    totalTravelers: 756,
    averageDays: 5,
    averageTotalCost: 2450000,
    popularSeason: '봄/가을',
    averageCosts: {
      flight: 800000,
      accommodation: 950000,
      food: 380000,
      transport: 150000,
      attraction: 280000,
      shopping: 190000,
    },
    recentReviews: [
      {
        traveler: '김태윤',
        date: '2024.06.14',
        duration: '4박 6일',
        totalCost: 2280000,
        comment: '자유의 여신상과 브로드웨이 뮤지컬이 인상깊었어요. 물가가 비싸긴 하지만 그만한 가치가 있습니다!'
      }
    ],
    recommendedCourses: [
      {
        title: '뉴욕 시티투어 베스트',
        description: '뉴욕의 핵심 명소들을 효율적으로 도는 코스',
        duration: '4박 5일',
        estimatedCost: 2350000,
        rating: 4.7,
        tags: ['도시관광', '문화', '쇼핑'],
        itinerary: [
          {
            day: 1,
            location: '타임스퀘어 & 브로드웨이',
            activity: '뮤지컬 관람',
            description: '뉴욕의 심장부에서 브로드웨이 뮤지컬 관람',
            cost: 180000
          },
          {
            day: 2,
            location: '자유의 여신상 & 엘리스 아일랜드',
            activity: '역사 탐방',
            description: '미국 이민 역사와 자유의 상징 탐방',
            cost: 65000
          }
        ],
        tips: [
          '메트로카드를 구매하면 지하철을 저렴하게 이용할 수 있어요',
          '브로드웨이 뮤지컬은 미리 예약하는 것이 좋습니다'
        ]
      }
    ]
  },
  london: {
    name: '런던, 영국',
    flag: '🇬🇧',
    totalTravelers: 645,
    averageDays: 5,
    averageTotalCost: 2200000,
    popularSeason: '여름',
    averageCosts: {
      flight: 750000,
      accommodation: 850000,
      food: 350000,
      transport: 160000,
      attraction: 220000,
      shopping: 170000,
    },
    recentReviews: [
      {
        traveler: '박서현',
        date: '2024.06.16',
        duration: '5박 6일',
        totalCost: 2180000,
        comment: '대영박물관과 버킹엄 궁전이 정말 웅장했어요. 애프터눈 티 문화도 체험해볼 만 합니다!'
      }
    ],
    recommendedCourses: [
      {
        title: '런던 로열투어',
        description: '영국 왕실의 역사와 전통을 체험하는 코스',
        duration: '4박 5일',
        estimatedCost: 2100000,
        rating: 4.8,
        tags: ['역사', '왕실', '전통'],
        itinerary: [
          {
            day: 1,
            location: '버킹엄 궁전 & 세인트 제임스 파크',
            activity: '왕실 투어',
            description: '근위병 교대식 관람 및 왕실 정원 산책',
            cost: 40000
          },
          {
            day: 2,
            location: '대영박물관',
            activity: '문화 탐방',
            description: '세계 최대 규모의 박물관에서 인류 문명사 탐방',
            cost: 35000
          }
        ],
        tips: [
          '옥스터 카드를 구매하면 런던 대중교통을 편리하게 이용할 수 있어요',
          '많은 박물관이 무료입니다!'
        ]
      }
    ]
  },
  singapore: {
    name: '싱가포르',
    flag: '🇸🇬',
    totalTravelers: 923,
    averageDays: 4,
    averageTotalCost: 1650000,
    popularSeason: '연중',
    averageCosts: {
      flight: 420000,
      accommodation: 480000,
      food: 320000,
      transport: 80000,
      attraction: 250000,
      shopping: 200000,
    },
    recentReviews: [
      {
        traveler: '한지민',
        date: '2024.06.18',
        duration: '3박 4일',
        totalCost: 1520000,
        comment: '가든스 바이 더 베이가 정말 멋있었어요! 호커센터 음식들도 저렴하고 맛있습니다.'
      }
    ],
    recommendedCourses: [
      {
        title: '싱가포르 모던시티',
        description: '현대적인 싱가포르의 매력을 만끽하는 코스',
        duration: '3박 4일',
        estimatedCost: 1550000,
        rating: 4.6,
        tags: ['모던', '도시', '미식'],
        itinerary: [
          {
            day: 1,
            location: '마리나 베이 & 가든스 바이 더 베이',
            activity: '미래도시 체험',
            description: '슈퍼트리와 플라워돔에서 미래 정원 체험',
            cost: 55000
          },
          {
            day: 2,
            location: '센토사 아일랜드',
            activity: '레저 & 휴양',
            description: '유니버설 스튜디오와 해변에서 휴식',
            cost: 120000
          }
        ],
        tips: [
          '호커센터에서 현지 음식을 저렴하게 드실 수 있어요',
          'MRT로 이동하면 교통비를 절약할 수 있습니다'
        ]
      }
    ]
  },
  seoul: {
    name: '서울, 한국',
    flag: '🇰🇷',
    totalTravelers: 1500,
    averageDays: 3,
    averageTotalCost: 850000,
    popularSeason: '봄/가을',
    averageCosts: {
      flight: 0,
      accommodation: 180000,
      food: 250000,
      transport: 50000,
      attraction: 120000,
      shopping: 250000,
    },
    recentReviews: [
      {
        traveler: '김서울',
        date: '2024.06.20',
        duration: '2박 3일',
        totalCost: 780000,
        comment: '경복궁 한복 체험이 정말 좋았어요! 명동과 홍대에서 쇼핑도 재미있었습니다.'
      }
    ],
    recommendedCourses: [
      {
        title: '서울 전통과 현대',
        description: '서울의 전통문화와 현대적 매력을 동시에 체험',
        duration: '2박 3일',
        estimatedCost: 800000,
        rating: 4.7,
        tags: ['전통', '현대', 'K-문화'],
        itinerary: [
          {
            day: 1,
            location: '경복궁 & 북촌한옥마을',
            activity: '전통문화 체험',
            description: '한복 입고 궁궐 투어 및 한옥마을 산책',
            cost: 80000
          },
          {
            day: 2,
            location: '강남 & 홍대',
            activity: '현대문화 체험',
            description: 'K-pop 문화와 젊은 거리문화 체험',
            cost: 120000
          }
        ],
        tips: [
          'T-money 카드로 대중교통을 편리하게 이용하세요',
          '한복 대여점이 많으니 미리 예약해보세요'
        ]
      }
    ]
  }
};
