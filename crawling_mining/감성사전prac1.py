import pandas as pd
from konlpy.tag import Okt
from collections import Counter
# 메뉴

brunch_str = "빵집 샐러드 브런치 파스타 식사 베이글 샌드위치 페스츄리 베이커리 신선 브레드 수프 라자냐 뇨끼 키쉬 잠봉뵈르 과카몰리 마르게리따 피자 요리 스테이크 밥 오므라이스 파니니 치킨 버거 슈니첼 맛집 빠네 타코 토스트 핫도그"

brunch_list = brunch_str.split()  # 브런치 키워드 리스트

# print(brunch_str)
# print(brunch_list[0])

# 🚩 르브푈르 리뷰 200개 합치는 함수
# 수정해야함
# - 인자로 카페받아서 카페파일 배정하기
# 카페 파일에서 200개까지 끊어서 가져오기 (보다 적은 경우도 고려)

def makeReview():
    review = ""
    df = pd.read_csv(
        "C:/Users/cherr/crawling_startcoding/기본정보/last_review_50.csv", encoding="utf-8-sig")
    test = df['review'][:201].values
    review = ' '.join(test)
    return review


# 🚩 형태소분석(count까지) 해주는 runOkt 함수
# ✅ to do : 위의 리뷰 합치기 & 형태소분석 코드 따로 빼서 파일 만들기
okt = Okt()


def runOkt(review):
    review_okt = okt.pos(review, norm=True, stem=True)
    count = Counter(review_okt)
    review_okt_count = count.most_common(500)  # 세기

    # 단어와 횟수만 빼서 2차원 리스트 만들기
    review_okt_count_list = []
    for i in range(0, len(review_okt_count)):
        line = []
        line.append(review_okt_count[i][0][0])
        line.append(review_okt_count[i][1])
        review_okt_count_list.append(line)

    return review_okt_count_list  # 2차원 리스트 반환


# 🚩 각 카테고리에 몇개 있는지 세는 countKeyword 함수


def countKeyword(review_okt, categoryList):
    countNum = 0
    for r in review_okt:
        for c in categoryList:
            if r[0] == c:
                countNum += r[1]
    return countNum


lefe_review = makeReview()
lefe_review_okt = runOkt(lefe_review)
lefe_review_count = countKeyword(lefe_review_okt, brunch_list)  # 브런치 count

print(lefe_review_count)  # 브런치에서 몇번 나왔는지 체크 (=점수)
