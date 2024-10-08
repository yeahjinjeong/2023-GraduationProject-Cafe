# -*- coding: utf-8 -*-
import pandas as pd
from konlpy.tag import Okt
from collections import Counter
import csv


# 점수를 저장할 딕셔너리
score = {'브런치/식사': 0, '커피': 0, '차': 0, '디저트': 0, '비건': 0,
         '공부/개인작업/업무(1인)': 0, '팀플/회의/스터디': 0, '대모임': 0, '대화/수다': 0, '아이': 0, '할아버지/할머니': 0, '파티': 0, '휴식': 0, 'sns/핫플': 0, '테마카페': 0}
# score.keys()
# score.values()

# 분류를 비교할 리스트
classes = ['브런치/식사', '커피', '차', '디저트', '비건',
           '공부/개인작업/업무(1인)', '팀플/회의/스터디', '대모임', '대화/수다', '아이', '할아버지/할머니', '파티', '휴식', 'sns/핫플', '테마카페']
# 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14

positive = {'빵집': [0], '샐러드': [0], '브런치': [0], '파스타': [0], '식사': [0], '아침식사': [0], '아점': [0], '다이어트': [0], '베이글': [0], '샌드위치': [0], '페스츄리': [0], '베이커리': [0], '신선': [0], '브레드': [0], '수프': [0], '라자냐': [0], '뇨끼': [0], '키쉬': [0], '잠봉뵈르': [0], '마르게리따': [0], '피자': [0], '요리': [0], '스테이크': [0], '밥': [0], '오므라이스': [0], '파니니 ': [0], '치킨': [0], '버거': [0], '햄버거': [0], '슈니첼': [0, 3], '타코': [0], '토스트': [0], '프렌치토스트': [0], '핫도그': [0], 'bread': [0], 'brunch': [0], '싱싱하다': [0], '잠봉': [0], '신선하다': [0], '싱싱': [0], '음식': [0], '신선도': [0], '끼니': [0], '끼': [0], '로스터리': [1], '원두': [1], '씨앗': [1], '바리스타': [1], '핸드드립': [1], '드립커피': [1], '로스팅': [1], '커피전문점': [1], '전문적': [1], '장인': [1], '산미': [1], '볶다': [1], '라떼아트': [1], '드립백': [1], '블렌딩': [1, 2], '블랜딩': [1, 2], '블렌디드': [1, 2], '블랜디드': [1, 2], '커피맛집': [1], '#커피맛집': [1], '블렌드': [1, 2], '블랜드': [1, 2], '찻집': [2, 10], '홍차': [2], '차종류': [2], '다식': [2], '우려': [2], '애프터눈티': [2], '크림티': [2], 'tea': [2], '찻잔': [2], '티 전문': [2], '티팟': [2], '차주전자': [2], '복분자차': [2], '십전대보차': [2], '전통': [2], '오미자차': [2], '수정과': [2], '대추차': [2], '달이다': [2], '찻잎': [2], '고급티': [2], '백차': [2], '보이차': [2], '루이보스': [2], '찻자리': [2], '한방카페': [2, 10], '쌍화차': [2], '티백': [2], '블렌딩티': [2], '티세트': [2], '티 세트': [2], '차': [2], '우롱': [2], '쌍화탕': [2],
            '디저트': [3, 9], 'dessert': [3], '빵지순례': [3], '겉바': [3], '굽다': [3], '겉바속촉': [3],
            '비건': [4], '채식': [4], '베지테리언': [4], '페스코': [4], '락토': [4], '오보': [4], '스트릭트': [4], '식물성': [4],
            '조용하다': [10, 12, 5], '조용': [5], '넓다': [11, 5, 6, 7], '널찍하다': [5, 6, 7], '널찍널찍': [5, 6, 7], '널찍': [5, 6, 7], '쾌적하다': [5], '쾌적': [5], '집중': [5], '와이파이': [5, 6], 'WIFI': [5, 6], '콘센트': [5, 6], '충전기': [5, 6], '1인석': [5], '혼공': [5], '혼자서': [12, 5], '혼자': [12, 5], '위층': [5, 7], '아래층': [5, 7], '층': [5, 7], '2층': [5, 7], '3층': [5, 7], '칸막이': [5], '밝다': [9, 5, 6, 7], '#북카페': [5], '북카페': [5], '과제': [5, 6], '카공': [5, 6], '공부': [5, 6], '업무': [5], '작업': [5, 6], '책': [12, 5], '노트북': [5, 6], '서점': [5], '24시간': [5], '잔잔하다': [10, 12, 5], '잔잔한': [8, 5], '잔잔': [8, 10, 12, 5], '파티션': [5], '장시간': [5], '스탠드': [5], '시험': [5], '자격증': [5], '토익': [5], '토플': [5], '컴활': [5], '패드': [5], '아이패드': [5], '고요함': [5], '고요한': [12, 5], '고요': [12, 5], '고요하다': [12, 5],
            '넓어지다': [6, 7], '5인': [6], '다인석': [11, 6, 7], '다인용': [11, 6, 7], '동아리': [6, 7], '팀플': [6], '회의': [6, 7], '스터디': [6], '모임': [6], '토론': [6], '토의': [6], '프로젝트': [6], '미팅룸': [6], '세미나': [6, 7], '넓은 책상': [6], '역세권': [6], '위치': [6], '접근성': [6], '인근': [6], '조별': [6], '출구': [6], '팀원': [6], '회의실': [6], '회의룸': [6], '회의장': [6], '서울역': [6], '용산역': [6], '신용산역': [6], '삼각지역': [6], '이태원역': [6], '숙대입구역': [6], '남영역': [6], '녹사평역': [6], '효창공원역': [6], '지하철역': [6], '한강진역': [6], '이촌역': [6], '역앞': [6], '기차역': [6], '전철역': [6], '숙대역': [6], '마포역': [6],
            '주차': [10, 7], '주차장': [10, 7], '주차공간': [10, 7], '회식': [7], '동호회': [7], '교회': [7], '단체석': [11, 7], '학부모': [7], '확장': [7], '공간분리': [11, 7], '분리': [7], '떠들다': [8, 7], '한적': [8, 12, 7], '한적하다': [8, 12, 7], '한산': [8, 7], '한산하다': [8, 7], '한가롭다': [8, 7], '큰소리': [7], '대형': [7], '대형카페': [7], '자유': [7], '자유로운': [7], '자유롭다': [7], '개방': [7], '단체': [11, 7], '테라스': [9, 10, 7], '식구들': [7], '대관': [11, 7], '가족': [10, 7], '대가족': [7], '연말': [11, 7], '송별회': [11, 7], '송년회': [11, 7], '발렛': [7], '발렛비': [7], '발렛파킹': [7], '발렛주차': [7], '발렛대': [7], '발렛됩니': [7], '발렛돼': [7],
            '평화': [8, 10, 12], '평화로운': [8, 10, 12], '평화롭다': [8, 10, 12], '평화로움': [8, 10], '편하다': [8], '아늑하다': [8, 10, 12], '아늑': [8, 10, 12], '편안하다': [8, 10, 12], '편안': [8, 10, 12], '편안함': [8, 10], '쇼파': [8, 10], '소파': [8, 10], '대화': [8], '수다': [8], '사담': [8], '잡담': [8], '떠들기': [8], '떠드는': [8], '데이트': [8], '친구': [8], '정모': [8], '담소': [8], '소개팅': [8], '도란도란': [8], '도란': [8], '로맨틱': [8], '로맨틱하다': [8], '연인': [8], '애인': [8], '남자친구': [8], '여자친구': [8], '남친': [8], '여친': [8], 'Cozy': [8, 10, 12], 'cozy': [8, 10, 12], '코지': [8, 10, 12], 'bgm': [8, 12], '전망': [8, 10, 12], '경치': [8, 10, 12], '운치': [8, 10, 12], '선곡': [8, 12], '둘이서': [8], '단정': [8], '단정하다': [8],
            '아기': [9], '아이': [9], '유아차': [9], '유모차': [9], '기저귀': [9], '정원': [9, 10], '가든': [9], '청결하다': [9, 10], '청결': [9, 10], '깨끗하다': [9, 10], '깨끗': [9, 10], '안전': [9], '안전하다': [9], '어린이': [9], '유치원': [9], '딸': [9], '아들': [9], '애들': [9], '애기': [9], '유아': [9], '베이비': [9], '아기체어': [9], '아기의자': [9], '초등학생': [9], '초딩': [9], '조카': [9], '수유': [9], '돌잔치': [9], '생일잔치': [9], '놀이터': [9], '마당': [9, 10], '유기농': [9, 10], '상냥하다': [9, 10, 12], '잘해주다': [9, 10], 'Friendly': [9, 10, 12], 'friendly': [9, 10, 12],
            '엘레베이터': [10], '엘리베이터': [10], '엘베': [10], '노인': [10], '휠체어': [10], '어르신': [10], '친숙한': [10], '친숙하다': [10], '옛스럽다': [10], '다과': [10], '양갱': [10], '약과': [10], '떡': [10], '곧감': [10], '한방': [10], '채광': [10, 12], '설기': [10], '백설기': [10], '한옥': [10], '할머니': [10], '할아버지': [10], '생신': [10], '모시다': [10], '부모님': [10], '고전': [10], '한국': [10], '월병': [10], '정갈': [10], '정갈하다': [10], '앤티크': [10], '식혜': [10], '잡수다': [10], '외할아버지': [10], '툇마루': [10], '어머니': [10], '아버지': [10], '대추': [10], '명절': [10], '팥죽': [10], '쑥떡': [10], '단팥빵': [10], '팥빙수': [10],
            '독립': [11], '대여': [11], '생일파티': [11], '반입 가능': [11], '축하파티': [11], '인테리어': [11, 12, 13], '신나다': [11], '신나요': [11], '룸': [11], '파티룸': [11], 'EDM': [11], '시끌시끌': [11], '힙합': [11], '인생샷': [11, 13], '풍선': [11], '소품': [11, 13], '조명': [11, 13], '생일': [11], '생파': [11], '축하': [11], '촛불': [11], '파티': [11], '이벤트': [11], '브라이덜': [11], '베이비샤워': [11], '용품': [11], '서프라이즈': [11], '재미있다': [11], '재밌다': [11], '재미': [11], '즐겁다': [11], '화려하다': [11], '이쁘다': [11, 12, 13], '장식': [11, 13], '컨셉': [11, 13, 14], '힙한': [11, 13], '힙해': [11, 13], '힙': [11, 13], '힙하': [11, 13], '힙한곳': [11, 13], '힙플': [11, 13], '힙한데': [11, 13], '힙지로': [11, 13], '간지나다': [11], '시끌벅적하다': [11],
            '쉬다': [12], '예쁘다': [12, 13], '고즈넉하다': [12], '고즈넉': [12], '따스하다': [12], '따스함': [12], '포근': [12], '포근하다': [12], '여유': [12], '여유롭다': [12], '차분': [12], '차분하다': [12], '뷰': [12, 13], '분위기': [12, 13], '힐링': [12], '풍경': [12], '아지트': [12], '낭만': [12], '경치뷰': [12], '자연': [12], '디자인': [12], '창가': [12], '독서': [12], '사색': [12], '다이어리': [12], '일기': [12], '햇살': [12], '기분전환': [12], '보상': [12], '멍때리기': [12], '멍때리다': [12], '멍': [12], '가만히': [12], '고요히': [12], '명상': [12], '휴식': [12], '산책': [12], '음악': [12], '클래식': [12], '재즈': [12], '아기자기': [12], '조용조': [12], '식물': [12], '향기': [12], '구경': [12, 13], '느긋하다': [12], '심신': [12], '다스리다': [12], '스트레스': [12], '레코드': [12], '소확행': [12], 'music': [12], '우연히': [12], '야외': [12, 13], '볼거리': [12, 13], '인디': [12], '인디음악': [12], '밴드': [12], '은은하다': [12], '은은한': [12], '은은': [12], '센치하다': [12], '센치': [12], '상냥': [12],
            '잘나오다': [13], '데코': [13], '데코레이션': [13], '귀엽다': [13], '구경하다': [13], '웨이팅': [13], '세련': [13], '인스타': [13], '인스타그램': [13], '감성': [13], '갬성': [13], '트렌드': [13], '트랜드': [13], '핫하다': [13], '핫': [13], '핫한': [13], 'sns': [13], '포토': [13], '감각적이다': [13], '감각': [13], '센스': [13], '핫플': [13], '핫플레이스': [13], '색감': [13], '외관': [13], '촬영': [13], '오픈런': [13], '유명': [13], 'MZ': [13], '인생사진': [13], '비주얼': [13], '야경': [13], '인기': [13], '동화': [13], '셀카': [13], '유럽': [13], '테이블링': [13], '예약': [13], '대기': [13], '품절대란': [13], '프랑스': [13], '런던': [13], '선물': [13], '시그니처메뉴': [13], '시그니처': [13], '줄': [13], '기다리다': [13], '줄서다': [13], '외국': [13], '만석': [13], '이국적이다': [13], '이국적': [13], '이국': [13], '화제': [13], '샌프란시스코': [13], '미국': [13], '해외': [13], '유니크': [13], '독특': [13], '독특하다': [13], '붐비다': [13], '독일': [13], '거울샷': [13], '연예인': [13], '방송': [13], '유튜브': [13], '유튜버': [13], '특별하다': [13], '특별': [13], '외부조경': [13], '조경': [13], '사진포인트': [13], '루프': [13], '특이하다': [13], '영국': [13], '뉴욕': [13], '명소': [13], '소문': [13], '소문나다': [13], '소문내다': [13], '바글바글': [13], '스팟': [13],
            '갤러리': [14], '쇼룸': [14], '이색카페': [14], '#이색카페': [14], '#이태원이색카페': [14], '체험': [14], '게임': [14], '보드게임': [14], '만화책': [14], '만화': [14], '만화카페': [14], '원데이클래스': [14], '드로잉': [14], '도자기': [14], '수면': [14], '애견': [14], '애견카페': [14], '고양이': [14], '강아지': [14], '사모예드': [14], '플라워카페': [14], '테마': [14], '마사지': [14], '온순하다': [14], '캠핑': [14]}

negative = {'어둡다': [5], '어두컴컴하다': [5], '어두움': [5], '어둠': [5], '어두컴컴': [5], '시간제한': [5], '엉덩이': [5, 6, 7, 9, 10], '허리': [5, 6, 7, 9, 10], '눈치': [5], '시끌시끌': [5], '시끌벅적': [5], '바글바글': [5], '소음': [5], '협소해': [6, 7], '협소': [6, 7], '협소하': [6, 7], '협소했': [6, 7], '협소합니': [6, 7], '협소한': [6, 7], '협소했어': [6, 7], '협소함': [6, 7], '웨이팅': [7], '웨이': [7], '카공': [8, 9, 7], '공부': [8, 9, 7], 
            '조용한': [7, 11], '조용조': [7, 11], '조용하다': [7, 11], '좁다': [7], '답답하다': [7], '위험#위험하다': [9], '노키즈': [9], '더럽다': [9], '흡연': [9], '담배': [9], '지저분하다': [9], '지저분': [9], '뾰족하다': [9], '날카롭다': [9], '계단': [10], '언덕': [10], '언덕길': [10], '키오스크': [10], '특전': [11], '아이돌': [11], '웨이팅 ': [12], '핫플 ': [12], '만석': [12], '시끄럽다': [12], '불친절': [12], '불친절하다': [12], '말투': [12]}

strong_pos = {'브런치': [0], '식사': [0], '아점': [0], '끼니': [0], '아침식사': [0], '비건': [4], '채식': [4], '베지테리언': [4], '페스코': [4], '락토': [4], '오보': [4], '스트릭트': [4], '식물성': [4], '공부': [5], 
            '작업': [5], '업무': [5], '카공': [5], '팀플': [6], '회의': [6], '스터디': [6], '단체석': [7], '대화': [8], '아이': [9], '아기': [9], '아이들': [9], '할머니': [10], '할아버지': [10], '파티': [11]}


def pos_scoring(num, r):  # positive와 겹치는 키워드의 value가 저장된 리스트
    for n in num:
        score[classes[n]] += r


def neg_scoring(num, r):  # negative와 겹치는 키워드의 value가 저장된 리스트
    for n in num:
        score[classes[n]] -= r*5


def strpos_scoring(num, r):  # positive와 겹치는 키워드의 value가 저장된 리스트
    for n in num:
        score[classes[n]] += r*3


'''
def pos_compare(list): #형태소가 저장된 리스트
    for i in range(len(list)):
        num = []
        if list[i][0] in positive:
            num.append(positive.get(list[i][0]))
            pos_scoring(num)

def neg_compare(list): #형태소가 저장된 리스트
    for i in range(len(list)):
        num = []
        if list[i][0] in negative:
            num.append(negative.get(list[i][0]))
            neg_scoring(num)

def classify(score): #score에서 가장 높은 점수로 목적 분류
    rank = []
    for i in score:
        rank.append(score[i])
    max = 0
    for j in range(len(rank)):
        if rank[j] > max:
            max = rank[j]
            index = j
    return classes[index]

'''

def makeReview(i):
    f1 = open(f'/Users/jeong-yejin/2023GP_CRS/words/cafe{i}형태소분석.csv', 'r', encoding='utf-8-sig', newline='')
    rdr = csv.reader(f1)
    return rdr

def pos_comparing(rdr):
    for r in rdr:
        for c in positive:
            if r[1] == c:
                num = positive.get(c)
                # print(c,  r[3], num)
                pos_scoring(num, int(r[3]))


def neg_comparing(rdr):
    for r in rdr:
        for c in negative:
            if r[1] == c:
                num = negative.get(c)
                # print("제외: " + c,  r[3], num)
                neg_scoring(num, int(r[3]))


def strpos_comparing(rdr):
    for r in rdr:
        for c in strong_pos:
            if r[1] == c:
                num = strong_pos.get(c)
                # print("가산점: " + c,  r[3], num)
                strpos_scoring(num, int(r[3]))


def final(score):
    # print(score)
    score_list = sorted(score.items(), key=lambda x: x[1], reverse=True)
    # first = score_list[0]
    # second = score_list[1]
    # third = score_list[2]
    # four = score_list[3]
    # five = score_list[4]

    # return first, second, third
    return score_list

    # max = 0
    # index = 0
    # for i in range(15):
    #     if max < score[classes[i]]:
    #         max = score[classes[i]]
    #         index = i
    # print(classes[index])
    # return classes[index]

def findReview(i):
    # 코랩 경로 or 각자 경로 지정
    df = pd.read_csv(f"/Users/jeong-yejin/2023GP_CRS/reviews/cafe{i}.csv", encoding="utf-8", header=0)
    for k in range(len(df)):
        if df['review'][k].find('페스츄리') != -1:  # 없다가 아니면
            score[classes[0]] += 1
        if df['review'][k].find('한끼') != -1:  # 없다가 아니면
            score[classes[0]] += 1
        if df['review'][k].find('로스터리') != -1:  # 없다가 아니면
            score[classes[1]] += 1
        if df['review'][k].find('핸드드립') != -1:  # 없다가 아니면
            score[classes[1]] += 1
        if df['review'][k].find('커피맛집') != -1:  # 없다가 아니면
            score[classes[1]] += 1
        if df['review'][k].find('차종류') != -1:  # 없다가 아니면
            score[classes[2]] += 1
        if df['review'][k].find('티세트') != -1:  # 없다가 아니면
            score[classes[2]] += 1
        if df['review'][k].find('티 세트') != -1:  # 없다가 아니면
            score[classes[2]] += 1
        if df['review'][k].find('시간제한') != -1:  # 없다가 아니면 #제외
            score[classes[5]] -= 5
        if df['review'][k].find('1인석') != -1:  # 없다가 아니면
            score[classes[5]] += 1
        if df['review'][k].find('2층') != -1:  # 없다가 아니면
            score[classes[5]] += 1
            score[classes[7]] += 1
        if df['review'][k].find('3층') != -1:  # 없다가 아니면
            score[classes[5]] += 1
            score[classes[7]] += 1
        if df['review'][k].find('잘들려요') != -1:  # 없다가 아니면
            score[classes[5]] += 1
            score[classes[8]] += 1
        if df['review'][k].find('5인') != -1:  # 없다가 아니면
            score[classes[6]] += 1
        if df['review'][k].find('넓은 책상') != -1:  # 없다가 아니면
            score[classes[6]] += 1
        if df['review'][k].find('넓은 테이블') != -1:  # 없다가 아니면
            score[classes[6]] += 1
        if df['review'][k].find('주차공간') != -1:  # 없다가 아니면
            score[classes[7]] += 1
        if df['review'][k].find('대형카페') != -1:  # 없다가 아니면
            score[classes[7]] += 1
        if df['review'][k].find('단체석') != -1:  # 없다가 아니면
            score[classes[7]] += 1
            score[classes[11]] += 1
        if df['review'][k].find('생일파티') != -1:  # 없다가 아니면
            score[classes[11]] += 1
        if df['review'][k].find('반입 가능') != -1:  # 없다가 아니면
            score[classes[11]] += 1
        if df['review'][k].find('인생샷') != -1:  # 없다가 아니면
            score[classes[11]] += 1
            score[classes[13]] += 1
        if df['review'][k].find('기분전환') != -1:  # 없다가 아니면
            score[classes[12]] += 1
        if df['review'][k].find('인생사진') != -1:  # 없다가 아니면
            score[classes[13]] += 1
        if df['review'][k].find('원데이클래스') != -1:  # 없다가 아니면
            score[classes[14]] += 1
        if df['review'][k].find('이색카페') != -1:  # 없다가 아니면
            score[classes[14]] += 1
        if df['review'][k].find('만화카페') != -1:  # 없다가 아니면
            score[classes[14]] += 1
        if df['review'][k].find('애견카페') != -1:  # 없다가 아니면
            score[classes[14]] += 1
        if df['review'][k].find('플라워카페') != -1:  # 없다가 아니면
            score[classes[14]] += 1

def bonusToSeats():  # 단체석 10점 추가
    df = pd.read_csv(
        "/Users/jeong-yejin/2023GP_CRS/기본정보count.csv", encoding="utf-8", header=0)
    s = df[df['단체석'] == 1]
    slist = s['Column1'].values.tolist()
    return slist

f3 = open('/Users/jeong-yejin/2023GP_CRS/classes/classify2.csv', 'w', encoding='utf-8-sig', newline='')
csvWriter = csv.writer(f3)
# csvWriter.writerow(['no.', '1 - 2 - 3'])
csvWriter.writerow(['no.', '[0]브런치/식사', '[1]커피', '[2]차', '[3]디저트', '[4]비건', '[5]공부/개인작업/업무', '[6]팀플/회의/스터디', '[7]대모임',
                   '[8]대화/수다', '[9]아이', '[10]할아버지/할머니', '[11]파티', '[12]휴식', '[13]sns/핫플', '[14]테마', 'TOP1', 'TOP2', 'TOP3', 'TOP4', 'TOP5'])

for j in range(0, 272):
    # print(f"{j}번 카페 입니다.")
    score = {'브런치/식사': 0, '커피': 0, '차': 0, '디저트': 0, '비건': 0,
             '공부/개인작업/업무(1인)': 0, '팀플/회의/스터디': 0, '대모임': 0, '대화/수다': 0, '아이': 0, '할아버지/할머니': 0, '파티': 0, '휴식': 0, 'sns/핫플': 0, '테마카페': 0}
    pos_comparing(makeReview(j))
    neg_comparing(makeReview(j))
    strpos_comparing(makeReview(j))
    findReview(j)
    slist = bonusToSeats()
    if j in slist:
        score[classes[7]] += 10
    score_list = final(score)
    # csvWriter.writerow([j, final(score)])
    csvWriter.writerow([j, score[classes[0]], score[classes[1]], score[classes[2]], score[classes[3]], score[classes[4]], score[classes[5]], score[classes[6]],
                       score[classes[7]], score[classes[8]], score[classes[9]], score[classes[10]], score[classes[11]], score[classes[12]], score[classes[13]], score[classes[14]], score_list[0], score_list[1], score_list[2], score_list[3], score_list[4]])

f3.close()

# pos_comparing(makeReview(303))
# neg_comparing(makeReview(303))
# final(score)

# 인덱싱