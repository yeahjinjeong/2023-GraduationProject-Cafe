import pandas as pd
import numpy as np
import folium
import pandas as pd
import openpyxl
import os
import sys
import json

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException

import time
import re
from bs4 import BeautifulSoup
from tqdm import tqdm

# 크롬 드라이버 자동 업데이트
from webdriver_manager.chrome import ChromeDriverManager

# 브라우저 꺼짐 방지
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

# 불필요한 에러 메시지 없애기
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])

service = Service(execute_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# driver = webdriver.Chrome(
#     ChromeDriverManager().install(), options=chrome_options)

df = pd.read_csv('/Users/jeong-yejin/Downloads/서대문구url2.csv')
df['review_count'] = ''

for i in range(len(df)):
    print(str(i)+'번째 식당')

    # 카페 url 접속
    driver.get(df['naver_url'][i])
    thisurl = df['naver_url'][i]
    time.sleep(2)

    cafe_name = df['카페명'][i]
    print('카페 이름 : ' + cafe_name)

    try:
        count = driver.find_element(
            by='xpath', value='//*[@id="app-root"]/div/div/div/div[7]/div[3]/div[3]/h2/span[1]').text
        df['review_count'][i] = count

        driver.close
        driver.switch_to.window(driver.window_handles[0])
    except NoSuchElementException:
        try:
            count = driver.find_element(
                by='xpath', value='//*[@id="app-root"]/div/div/div/div[7]/div[2]/div[3]/h2/span[1]').text
            df['review_count'][i] = count

        except NoSuchElementException:
            none_riview = '네이버 리뷰 없음'
            print(none_riview)
            count = 0

    print('\n')
    df.to_csv('/Users/jeong-yejin/2023GP_CRS/reviewss/review_count.csv', encoding='utf-8-sig')
