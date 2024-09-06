import pandas as pd
import urllib.request
import csv

import requests

import time
from bs4 import BeautifulSoup

df = pd.read_csv('/Users/jeong-yejin/2023GP_CRS/review_최종_781.csv')

f = open(f'/Users/jeong-yejin/2023GP_CRS/classes/imgsrc67.csv', 'w', encoding='utf-8-sig', newline='')
csvWriter = csv.writer(f)
csvWriter.writerow(['data-cid', '카페명', 'imgsrc'])
num = 0
# current = 738

current = 750
goal = len(df['카페명'])
in_list = []

for index in range(750, 755, 1):
    datacid = df['data-cid'][index]
    print('진행상황 : ', current, '/', goal, sep="")

    res_code = str(datacid)
    url = 'https://pcmap.place.naver.com/restaurant/' + res_code + '/photo'
    print(url)

    response = requests.get(url)
    time.sleep(2)

    print('카페 이름 : ' + df['카페명'][index] + '\n')

    response.encoding = 'utf-8-sig'

    if response.status_code == 200:
        html = urllib.request.urlopen(url)
        # source = html.read()
        soup = BeautifulSoup(html, 'html.parser')

        title = soup.select_one("#_header").get_text()

        # img = soup.find("img")
        # img_src = img.get("src")
        img_src = soup.select_one('.place_thumb > img')['src']
        print(title)

        print(img_src)
        csvWriter.writerow([df['data-cid'][index], df['카페명'][index], img_src])
        current += 1
    else:
        print(response.status_code)

f.close()

'''''
for i, datacid in enumerate(df['data-cid'].tolist()):

    #i = i+531
    datacid = datacid[i]
    current += 1

    print('진행상황 : ', current, '/', goal, sep="")

    res_code = str(datacid)
    url = 'https://pcmap.place.naver.com/restaurant/' + \
        res_code + '/photo'

    response = requests.get(url)
    time.sleep(2)

    print('카페 이름 : ' + df['카페명'][i] + '\n')

    response.encoding = 'utf-8-sig'

    if response.status_code == 200:
        html = urllib.request.urlopen(url)
        source = html.read()
        soup = BeautifulSoup(source, 'html.parser')

        title = soup.select_one("#_header").get_text()

        # img = soup.find("img")
        # img_src = img.get("src")
        img_src = soup.select_one('.place_thumb > img')['src']
        print('카페 이름 : ' + {title} + '\n')

        print(img_src)
        urllib.request.urlretrieve(
            img_src, f"/Users/surimkim/Desktop/기본정보 크롤링/img/img{i}_{title}" + ".jpg")
        print(f'img{i} 저장완료 \n')

    else:
        print(response.status_code)
'''