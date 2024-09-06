from konlpy.tag import Okt
import pandas as pd
from collections import Counter

okt = Okt()
review = ""
df = pd.read_csv("/Users/jeong-yejin/2023GP_CRS/last_review_50.csv", encoding="utf-8-sig")

test = df['review'][:100].values

review = ' '.join(test)
test = okt.pos(review, norm=True, stem=True)
#print(test)

# nouns = okt.nouns(test)
# print(nouns)
nouns = []
for tuple in test:
    if tuple[1] == 'Noun':
        nouns += tuple

josas = []
for tuple in test:
    if tuple[1] == 'Josa':
        josas += tuple

adjectives = []
for tuple in test:
    if tuple[1] == 'Adjective':
        adjectives += tuple

adverbs = []
for tuple in test:
    if tuple[1] == 'Adverb':
        adverbs += tuple

verbs = []
for tuple in test:
    if tuple[1] == 'Verb':
        verbs += tuple

noJosa = []
for tuple in test:
    if (tuple[1] != 'Josa'):
        noJosa.append(tuple)
print(noJosa)

# for tuple in test:
#     print(tuple)