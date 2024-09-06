from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
import time
import csv
import requests
from bs4 import BeautifulSoup
from urllib.request import urlopen
import openpyxl

f1 = open(r'/Users/jeong-yejin/2023GP_CRS/yongsangu.csv', 'r', newline='')
rdr = csv.reader(f1)

f2 = open(r'/Users/jeong-yejin/2023GP_CRS/yongsangu_price2.csv', 'w', encoding='CP949', newline='')
csvWriter = csv.writer(f2)

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
#chrome_options.add_argument("headless")

service = Service(executable_path=ChromeDriverManager().install())
browser = webdriver.Chrome(service=service, options=chrome_options)

browser.implicitly_wait(5) #웹페이지가 로딩 될 때까지 5초는 기다림
browser.maximize_window()

for code in rdr:
    cafemenu =[]
    try:
        browser.get(f"https://place.map.kakao.com/{code[1]}")
        browser.implicitly_wait(10)
        lists = browser.find_elements(By.CSS_SELECTOR, ".info_menu")
        for list in lists:
            onemenu = {}
            name = list.find_element(By.CSS_SELECTOR, '.loss_word').text
            price = list.find_element(By.CSS_SELECTOR, '.price_menu').text
            onemenu[name] = price
            cafemenu.append(onemenu)
        print(cafemenu)
        csvWriter.writerow([code[0], code[1], code[2], cafemenu])
    except Exception as e:
        print("error")

'''
for code in rdr:
    cafemenu =[]
    browser.get(f"https://place.map.kakao.com/{code[1]}")
    browser.implicitly_wait(10)
    lists = browser.find_elements(By.CSS_SELECTOR, ".info_menu")
    for list in lists:
        onemenu = {}
        name = list.find_element(By.CSS_SELECTOR, '.loss_word').text
        price = list.find_element(By.CSS_SELECTOR, '.price_menu').text
        print(name, price)
        onemenu[name] = price
        cafemenu.append(onemenu)
    print(cafemenu)
'''

f2.close()
f1.close()
# if datarank==1: datacid 저장