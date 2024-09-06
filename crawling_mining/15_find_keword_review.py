import pandas as pd
from konlpy.tag import Okt
from collections import Counter
import csv

find_pos = {'페스츄리':[0], '한끼':[0], '핸드드립':[1], '커피맛집':[1], '차종류':[2], '티세트':[2], '1인석':[5], '2층':[5, 7], '3층':[5, 7], '잘들려요':[5], '5인':[6], '넓은 책상':[6], '넓은 테이블':[6], 
            '주차공간':[7], '대형카페':[7], '생일파티':[11], '반입 가능':[11], '인생샷':[11, 13], '기분전환':[12], '인생사진':[13], '이색카페':[14], '만화카페':[14], '원데이클래스':[14], 
            '애견카페':[14], '플라워카페':[14]}
find_neg = {'시간제한':[5]}

find_poss = ['페스츄리', '한끼', '핸드드립', '커피맛집', '차종류', '티세트', '1인석', '2층', '3층', '잘들려요', '5인', '넓은 책상', '넓은 테이블', '짱맛', '주차공간', '대형카페', '생일파티', '반입 가능', '인생샷', '기분전환', '인생사진', '이색카페', '만화카페', '원데이클래스', '애견카페', '플라워카페']

classes = ['브런치/식사', '커피', '차', '디저트', '비건', '공부/개인작업/업무(1인)', '팀플/회의/스터디', '대모임', '대화/수다', '아이', '할아버지/할머니', '파티', '휴식', 'sns/핫플', '테마카페']
score = {'브런치/식사':0, '커피':0, '차':0, '디저트':0, '비건':0, '공부/개인작업/업무(1인)':0, '팀플/회의/스터디':0, '대모임':0, '대화/수다':0, '아이':0, '할아버지/할머니':0, '파티':0, '휴식':0, 'sns/핫플':0, '테마카페':0}
        
def findReview(i):
    df = pd.read_csv(f"/Users/jeong-yejin/2023GP_CRS/reviews/cafe{i}.csv", encoding="utf-8", header = 0)  # 코랩 경로 or 각자 경로 지정
    for k in range(len(df)):
        if df['review'][k].find('페스츄리') != -1: #없다가 아니면
            score[classes[0]] += 1
        if df['review'][k].find('한끼') != -1: #없다가 아니면
            score[classes[0]] += 1
        if df['review'][k].find('핸드드립') != -1: #없다가 아니면
            score[classes[1]] += 1
        if df['review'][k].find('커피맛집') != -1: #없다가 아니면
            score[classes[1]] += 1
        if df['review'][k].find('차종류') != -1: #없다가 아니면
            score[classes[2]] += 1
        if df['review'][k].find('티세트') != -1: #없다가 아니면
            score[classes[2]] += 1
        if df['review'][k].find('1인석') != -1: #없다가 아니면
            score[classes[5]] += 1
        if df['review'][k].find('2층') != -1: #없다가 아니면
            score[classes[5]] += 1
            score[classes[7]] += 1
        if df['review'][k].find('3층') != -1: #없다가 아니면
            score[classes[5]] += 1
            score[classes[7]] += 1
        if df['review'][k].find('잘들려요') != -1: #없다가 아니면
            score[classes[5]] += 1
            score[classes[8]] += 1
        if df['review'][k].find('5인') != -1: #없다가 아니면
            score[classes[6]] += 1
        if df['review'][k].find('넓은 책상') != -1: #없다가 아니면
            score[classes[6]] += 1
        if df['review'][k].find('넓은 테이블') != -1: #없다가 아니면
            score[classes[6]] += 1
        if df['review'][k].find('주차공간') != -1: #없다가 아니면
            score[classes[7]] += 1
        if df['review'][k].find('대형카페') != -1: #없다가 아니면
            score[classes[7]] += 1
        if df['review'][k].find('생일파티') != -1: #없다가 아니면
            score[classes[11]] += 1
        if df['review'][k].find('반입 가능') != -1: #없다가 아니면
            score[classes[11]] += 1
        if df['review'][k].find('인생샷') != -1: #없다가 아니면
            score[classes[11]] += 1
            score[classes[13]] += 1
        if df['review'][k].find('기분전환') != -1: #없다가 아니면
            score[classes[12]] += 1
        if df['review'][k].find('인생사진') != -1: #없다가 아니면
            score[classes[13]] += 1
        if df['review'][k].find('이색카페') != -1: #없다가 아니면
            score[classes[14]] += 1
        if df['review'][k].find('만화카페') != -1: #없다가 아니면
            score[classes[14]] += 1
        if df['review'][k].find('애견카페') != -1: #없다가 아니면
            score[classes[14]] += 1
        if df['review'][k].find('플라워카페') != -1: #없다가 아니면
            score[classes[14]] += 1

for i in range(0, 272):
    print(f"cafe {i}: ")
    findReview(i)