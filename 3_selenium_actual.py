from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from webdriver_manager.chrome import ChromeDriverManager

import time
#import pyperclip

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])

service = Service(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

#웹페이지 해당 주소 이동
driver.implicitly_wait(5) #웹페이지가 로딩 될 때까지 5초는 기다림
driver.maximize_window()
driver.get("https://nid.naver.com/nidlogin.login?mode=form&url=https%3A%2F%2Fwww.naver.com")

id = driver.find_element(By.CSS_SELECTOR, "#id")
id.click()
id.send_keys("")
# pyperclip.copy("")
# pyautogui.hotkey("ctrl", "v")
# time.sleep(2)

pw = driver.find_element(By.CSS_SELECTOR, "#pw")
pw.click()
pw.send_keys("")
# pyperclip.copy("")
# pyautogui.hotkey("ctrl", "v")
# time.sleep(2)

login_btn = driver.find_element(By.CSS_SELECTOR, "#log\.login")
login_btn.click()

browser = webdriver.Chrome('/Users/jeong-yejin/Documents/chromedriver')

browser.get('https://www.naver.com')
browser.implicitly_wait(10)

browser.find_element_by_css_selector('a.nav.shop').click()
time.sleep(2)

search = browser.find_element_by_css_selector('input.co_srh_input._input')
search.click()

search.send_keys('아이폰 13')
search.send_keys(Keys.ENTER)

before_h = browser.execute_script("return window.scrollY")

while True:
    browser.find_element_by_css_selector("body").send_keys(Keys.END)

    time.sleep(1)

    after_h = browser.execute_script("return window.scrollY")

    if after_h == before_h:
        break
    before_h = after_h

items = browser.find_elements_by_css_selector(".basicList_info_area__TWvzp")

for item in items:
    name = item.find_element_by_css_selector(".basicList_title__VfX3c").text
    try:
        price = item.find_element_by_css_selector(".price_num__2WUXn").text
    except:
        price= "판매중단"
    link = item.find_element_by_css_selector(".basicList_title__VfX3c > a").get_attribute('href')
    print(name, price, link)


