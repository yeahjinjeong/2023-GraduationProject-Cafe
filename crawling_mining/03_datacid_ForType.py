import csv
import requests
from bs4 import BeautifulSoup
from urllib.request import urlopen
import openpyxl

f1 = open(r'/Users/jeong-yejin/2023GP_CRS/용산구동별.csv', 'r', encoding='utf-8-sig', newline='')
rdr = csv.reader(f1)
#next(rdr)
# for code in rdr:
#     code[1]
# f.close() 

f2 = open(r'/Users/jeong-yejin/2023GP_CRS/용산구동별종류.csv', 'w', encoding='CP949', newline='')
csvWriter = csv.writer(f2)

for code in rdr:
    url = urlopen(f'https://m.place.naver.com/restaurant/{code[1]}/home')
    encoding = url.info().get_content_charset(failobj='utf-8')
    text = url.read().decode(encoding)
    soup = BeautifulSoup(text, 'html.parser') #html번역선생님으로 수프 만듦
    links = soup.select(".YouOG")
    for link in links:
        classify = link.select_one(".DJJvD").text
        print(classify)
        csvWriter.writerow([code[0], code[1], code[2], classify])

f1.close()
f2.close()