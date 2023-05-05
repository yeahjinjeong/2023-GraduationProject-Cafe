from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time
import csv

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
# chrome_options.add_experimental_option("headless")

service = Service(executable_path=ChromeDriverManager().install())
browser = webdriver.Chrome(service=service, options=chrome_options)

browser.implicitly_wait(5)  # 웹페이지가 로딩 될 때까지 5초는 기다림
browser.maximize_window()
browser.get("https://www.naver.com/")
browser.implicitly_wait(10)
# 네이버 검색창 클릭
search = browser.find_element(By.CSS_SELECTOR, '#query')
search.click()
time.sleep(3)
search.send_keys('청파동 조용한 카페')
search.send_keys(Keys.ENTER)
time.sleep(3)
# view창 더보기
search = browser.find_element(
    By.CSS_SELECTOR, '#main_pack > section.sc_new.sp_nreview._prs_rvw._au_view_collection > div > div._svp_list > panel-list > div > more-button > div > a')
search.click()
time.sleep(3)

# 스크롤

# 스크롤 전 높이
before_h = browser.execute_script("return window.scrollY")

while True:
    try:  # is_disaplyed 로 더보기 버튼 유무 구별 해서 없으면 while 루프 빠져나가고 싶었는데, 자꾸 오류떠서 우선 예외처리함. 근데 예외처리해서 다른 예외들 있을 경우 break 될수도...

        browser.find_element(By.CSS_SELECTOR, "body").send_keys(Keys.END)

        time.sleep(1)  # 스크롤 기다리기

        # 스크롤 후 높이
        after_h = browser.execute_script("return window.scrollY")

        if after_h == before_h:
            break

        before_h = after_h
    except:
        break

lists = browser.find_elements(
    By.CSS_SELECTOR, '.total_tit')
for list in lists:
    title = list.text
    print(title)
