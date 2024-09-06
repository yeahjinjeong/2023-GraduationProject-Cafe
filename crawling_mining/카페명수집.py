import pandas as pd
from konlpy.tag import Okt
from collections import Counter

# df1 = pd.read_csv(f"/Users/jeong-yejin/2023GP_CRS/성능평가/cafe_list.csv", encoding="utf-8")
# df2 = pd.read_csv(f"/Users/jeong-yejin/2023GP_CRS/성능평가/datacid_list.csv", encoding="utf-8")

# merge_outer = pd.merge(df1,df2, how='outer',on='카페명')

# print(merge_outer)

# merge_outer.to_csv(
#         f"/Users/jeong-yejin/2023GP_CRS/성능평가/list.csv", encoding='utf-8-sig')

basic = pd.read_csv("/Users/jeong-yejin/2023GP_CRS/성능평가/기본정보last.csv", encoding="utf-8", header = 0)

cafe = []
text = ""
for i in range(len(basic)):
  if basic['num'][i] != 0:
    text += basic['inform'][i] + "\n"
  else:
    cafe.append(text)
    text = ""

df3 = pd.DataFrame(cafe,columns=['cafe'])
df3.to_csv("/Users/jeong-yejin/2023GP_CRS/성능평가/기본정보last뭉침.csv", encoding="utf-8-sig")