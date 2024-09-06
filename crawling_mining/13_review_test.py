import pandas as pd

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException

import time
from bs4 import BeautifulSoup

# 크롬 드라이버 자동 업데이트
from webdriver_manager.chrome import ChromeDriverManager


# 브라우저 꺼짐 방지
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

# 불필요한 에러 메시지 없애기
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
chrome_options.add_argument("headless")

service = Service(execute_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

df = pd.read_csv('/Users/jeong-yejin/2023GP_CRS/review_최종_781.csv')
df['review_lists'] = ''
df['rev_list'] = ''

current = 0
goal = len(df['카페명'])

for i in range(len(df)):
    rev_list = []
    current += 1

    print('진행상황 : ', current, '/', goal, sep="")

    # 카페 url 접속
    driver.get(df['naver_url'][i])
    thisurl = df['naver_url'][i]
    driver.implicitly_wait(2)

    print('카페 이름 : ' + df['카페명'][i])

    # 리뷰 더보기 버튼 누르기
    view_more_count = 0
    while True:
        try:
            if view_more_count > 25:
                break
            driver.find_element(
                By.CSS_SELECTOR, '.lfH3O > .fvwqf')
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
            driver.implicitly_wait(1)
            view_more_count += 1
            driver.execute_script(
                'return document.querySelector(".lfH3O > .fvwqf").click()')
            time.sleep(2)
        except NoSuchElementException:
            print("모든 리뷰 더보기 완료")
            break

    # 리뷰 데이터 스크래핑을 위한 html 파싱
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    count_200 = 0
    try:
        # 키워드 리뷰가 아닌 리뷰글 리스트 검색
        review_lists = soup.select('.eCPGL > .YeINN')
        print('총 리뷰 수 : ', len(review_lists))

        if len(review_lists) > 0:
            for j, review in enumerate(review_lists):
                if count_200 > 200:
                    break
                try:
                    # 내용 더보기 누르기
                    try:
                        # review.find(' div.ZZ4OK > a > span.rvCSr > svg')
                        more_content = review.select(
                            ' div.ZZ4OK > a > span.rvCSr > svg')
                        more_content.click()
                        time.sleep(1)

                        # 리뷰 정보
                        user_review = review.select(' div.ZZ4OK > a > span')

                        if len(user_review) > 0:
                            rev_list.append(
                                [df['카페명'][i], '', user_review[0].text])
                            count_200 += 1
                            # driver.close
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
                            count_200 += 1
                            # driver.close()
                            driver.switch_to.window(driver.window_handles[0])

                        time.sleep(1)
                except NoSuchElementException:
                    print('리뷰 텍스트가 인식되지 않음')
                    df['rev_list'][j] = '인식X'
                    continue

        else:
            print('리뷰 선택자가 인식되지 않음')
            time.sleep(1)

    except NoSuchElementException:
        df['rev_list'][j] = '리뷰가 존재하지 않음'

    # 스크래핑한 데이터를 데이터 프레임으로 만들기
    column = ["name", 'rate', "review"]
    df2 = pd.DataFrame(rev_list, columns=column)
    df2.to_csv(f'/Users/jeong-yejin/2023GP_CRS/reviews/cafe{i+231}.csv', encoding='utf-8-sig')

driver.close()