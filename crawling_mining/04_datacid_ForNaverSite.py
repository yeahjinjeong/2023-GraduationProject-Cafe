import csv
import requests
from bs4 import BeautifulSoup
from urllib.request import urlopen

f1 = open(r'/Users/jeong-yejin/2023GP_CRS/naverkakaososang3.csv', 'r', newline='')
rdr = csv.reader(f1)
#next(rdr)
# for code in rdr:
#     code[1]
# f.close() 

f2 = open(r'/Users/jeong-yejin/2023GP_CRS/yongsangu_site3.csv', 'w', newline='')
csvWriter = csv.writer(f2)

for code in rdr:
    url = urlopen(f'https://m.place.naver.com/restaurant/{code[2]}/home')
    encoding = url.info().get_content_charset(failobj='utf-8')
    text = url.read().decode(encoding)
    soup = BeautifulSoup(text, 'html.parser') #html번역선생님으로 수프 만듦
    links = soup.select(".YouOG")
    classify =""
    realsite=""
    for link in links:
        classify = link.select_one(".DJJvD").text
        print(classify)
    sites = soup.select(".PkgBl")
    for site in sites:
        realsite = site.select_one(".LDgIH").text
        print(realsite)
    csvWriter.writerow([code[0], code[1], code[2], 0, classify, realsite])

f1.close()
f2.close()