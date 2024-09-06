import pandas as pd

df2 = pd.read_csv(f'/content/drive/MyDrive/collab/기본정보count.csv')
df2['콘센트'] = ''
df2['테라스'] = ''

for i in range(0, 780):  # 엑셀파일개수(카페수)
    review = ""
    df = pd.read_csv(f"/Users/jeong-yejin/2023GP_CRS/reviews/cafe{i}.csv", encoding="utf-8")  # 코랩 경로 or 각자 경로 지정
    print(df['name'][1])
    test = df['review'].values
    review = ' '.join(test)

    if review.find('콘센트') != -1:
        df2['콘센트'][i] = 1
    if review.find('전기 단자') != -1:
        df2['콘센트'][i] = 1
    if review.find('테라스') != -1:
        df2['테라스'][i] = 1

df2
# df2.to_csv(f"/content/drive/MyDrive/collab/기본정보count_update.csv", encoding='utf-8-sig')