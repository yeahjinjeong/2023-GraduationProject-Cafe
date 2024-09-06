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

res = driver.page_source  # 페이지 소스 가져오기
soup = BeautifulSoup(res, 'html.parser')

df = pd.read_csv('/Users/jeong-yejin/Downloads/서대문구url2.csv', encoding='utf-8-sig')
df['review_lists'] = ''
df['rev_list'] = ''


count = 0
current = 0
goal = len(df['카페명'])

rev_list = []

for i in range(len(df)):
    current += 1

    print('진행상황 : ', current, '/', goal, sep="")

    # 카페 url 접속
    driver.get(df['naver_url'][i])
    thisurl = df['naver_url'][i]
    time.sleep(2)

    print('카페 이름 : ' + df['카페명'][i])

    # 리뷰 더보기 버튼 누르기
    while True:
        try:
            driver.find_element(
                By.CSS_SELECTOR, '#app-root > div > div > div > div:nth-child(7) > div:nth-child(3) > div.place_section.lcndr > div.lfH3O > a')
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
            time.sleep(1)
            driver.execute_script(
                'return document.querySelector("#app-root > div > div > div > div:nth-child(7) > div:nth-child(3) > div.place_section.lcndr > div.lfH3O > a").click()')
            time.sleep(2)
        except NoSuchElementException:
            print("모든 리뷰 더보기 완료")
            break

    # 리뷰 데이터 스크래핑을 위한 html 파싱
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    try:
        # 키워드 리뷰가 아닌 리뷰글 리스트 검색
        review_lists = soup.select(
            '#app-root > div > div > div > div:nth-child(7) > div:nth-child(3) > div.place_section.lcndr > div.place_section_content > ul > li')
        print('총 리뷰 수 : ', len(review_lists))

        if len(review_lists) > 0:
            for j, review in enumerate(review_lists):
                try:
                    # 내용 더보기 누르기
                    try:
                        review.find(' div.ZZ4OK > a > span.rvCSr > svg')
                        more_content = review.select(
                            ' div.ZZ4OK > a > span.rvCSr > svg')
                        more_content.click()
                        time.sleep(1)

                        # 리뷰 정보
                        user_review = review.select(' div.ZZ4OK > a > span')

                        if len(user_review) > 0:
                            rev_list.append(
                                [df['카페명'][i], '', user_review[0].text])
                            driver.close
                            driver.switch_to.window(driver.window_handles[0])

                        time.sleep(1)

                    except:
                        # 리뷰 정보
                        user_review = review.select(
                            ' div.ZZ4OK.IwhtZ > a > span')

                        # 리뷰 정보가 있는 경우 식당 이름, 평점, 리뷰 텍스트, 작성 시간을 가져와서 데이터 프레임으로 만들기
                        if len(user_review) > 0:
                            rev_list.append(
                                [df['카페명'][i], '', user_review[0].text])
                            driver.close
                            driver.switch_to.window(driver.window_handles[0])

                        time.sleep(1)
                except NoSuchElementException:
                    print('리뷰 텍스트가 인식되지 않음')
                    df['rev_list'][j] = '인식X'
                    continue

        else:
            print('리뷰 선택자가 인식되지 않음')
            time.sleep(1)
            df['rev_list'][j] = '인식X'
    except NoSuchElementException:
        rev_list.append([df['카페명'][i]])
        time.sleep(2)
        print("리뷰가 존재하지 않음")
        df['rev_list'][j] = '리뷰가 존재하지 않음'

driver.close()

# 스크래핑한 데이터를 데이터 프레임으로 만들기
column = ["name", 'rate', "review"]
df2 = pd.DataFrame(rev_list, columns=column)
df2.to_csv('/Users/jeong-yejin/Downloads/서대문구url3.csv', encoding='utf-8-sig')
