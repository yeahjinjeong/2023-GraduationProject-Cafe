import pandas as pd
from konlpy.tag import Okt
from collections import Counter

okt = Okt()

for index in range(0, 272, 1):  # 엑셀파일개수(카페수)
    review = ""
    df = pd.read_csv(
        f"/Users/jeong-yejin/2023GP_CRS/reviews/cafe{index}.csv", encoding="utf-8")  # 코랩 경로 or 각자 경로 지정
    print(df['name'][1])
    test = df['review'].values
    review = ' '.join(test)
    review_okt = okt.pos(review, norm=True, stem=True)
    count = Counter(review_okt)
    review_okt_count = count.most_common()

    df2 = pd.DataFrame(columns=['단어', '품사', '횟수'])

    for i in range(0, len(review_okt_count)):
        df2.loc[i] = [review_okt_count[i][0][0],
                      review_okt_count[i][0][1], review_okt_count[i][1]]
    #print(df2)
    df2.to_csv(
        f"/Users/jeong-yejin/2023GP_CRS/words/cafe{index}형태소분석.csv", encoding='utf-8-sig')
