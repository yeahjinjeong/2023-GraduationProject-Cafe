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

f2 = open(r'/Users/jeong-yejin/2023GP_CRS/yongsangu_price.csv', 'w', newline='')
csvWriter = csv.writer(f2)

cafemenu =[]
num = 0

for code in rdr:
    url = urlopen(f'https://m.place.naver.com/restaurant/{code[0]}/menu/list')
    encoding = url.info().get_content_charset(failobj='utf-8')
    text = url.read().decode(encoding)
    soup = BeautifulSoup(text, 'html.parser')
    cafemenu = []
    links = soup.select(".zOrgr") #메뉴 뭉치
    for link in links:
        menus = link.select(".MXkFw") #메뉴 하나 고름
        for menu in menus:
            onemenu = {}
            name = menu.select_one(".lPzHi").text
            price = menu.select_one(".GXS1X").text
            onemenu[name] = price
        cafemenu.append(onemenu)
    num += 1
    print(str(num)+code[2]+": ")
    print(cafemenu)
    csvWriter.writerow([code[0], code[1], code[2], cafemenu])


f1.close()
f2.close()