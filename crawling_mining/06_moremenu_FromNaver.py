import csv
import requests
from bs4 import BeautifulSoup
from urllib.request import urlopen
import openpyxl

f1 = open(r'/Users/jeong-yejin/2023GP_CRS/yongsangu.csv', 'r', encoding='utf-8-sig', newline='')
rdr = csv.reader(f1)
#next(rdr)
# for code in rdr:
#     code[1]
# f.close()

cafemenu =[]

for code in rdr:
    onemenu = {}
    for i in range(1,50):
        url = urlopen(f'https://m.place.naver.com/restaurant/{code[0]}/menu/{code[0]}_{i}')
        encoding = url.info().get_content_charset(failobj='utf-8')
        text = url.read().decode(encoding)
        soup = BeautifulSoup(text, 'html.parser')
        tops = soup.select(".TLCFv")
        for top in tops:
            name = top.select_one(".mJtfr").text
            price = top.select_one(".Xac1z").text
            onemenu[name] = price
    cafemenu.append(onemenu)
    print(cafemenu)

f1.close()