from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time
import csv
import requests
from bs4 import BeautifulSoup
from urllib.request import urlopen
import openpyxl

f1 = open(r'/Users/jeong-yejin/2023GP_CRS/csv/yongsangu_0.csv', 'r', newline='')
rdr = csv.reader(f1)

f2 = open(r'/Users/jeong-yejin/2023GP_CRS/yongsangu_datacid.csv', 'w', encoding='CP949', newline='')
csvWriter = csv.writer(f2)

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])

service = Service(executable_path=ChromeDriverManager().install())
browser = webdriver.Chrome(service=service, options=chrome_options)

browser.implicitly_wait(5) #웹페이지가 로딩 될 때까지 5초는 기다림
browser.maximize_window()
browser.get("https://m.map.naver.com/")
browser.implicitly_wait(10)
#네이버지도 검색창 클릭
search = browser.find_element(By.CSS_SELECTOR, '#header > header > div.Nsearch._searchKeywordView._searchGuide > div > div > div > span.Nbox_text._textPanel > input')
search.click()
time.sleep(3)

for cafe in rdr:
    string = f"{cafe[5]} {cafe[2]}"
    search.send_keys(string)
    search.send_keys(Keys.ENTER)
    time.sleep(3)

    lists = browser.find_elements(By.CSS_SELECTOR, ".item_info")

    for list in lists:
        code = list.find_element(By.CSS_SELECTOR, '.a_item.a_item_distance._linkSiteview')
        rank = code.get_attribute("data-rank")
        if rank == 1:
            cid = code.get_attribute("data-cid")
            csvWriter.writerow([cafe[2], cid])
        else:
             break

    browser.get("https://m.map.naver.com/")
    browser.implicitly_wait(10)
    search = browser.find_element(By.CSS_SELECTOR, '#header > header > div.Nsearch._searchKeywordView._searchGuide > div > div > div > span.Nbox_text._textPanel > input')
    search.click()
    time.sleep(3)

f2.close()
f1.close()
# if datarank==1: datacid 저장