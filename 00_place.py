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

service = Service(executable_path=ChromeDriverManager().install())
browser = webdriver.Chrome(service=service, options=chrome_options)

browser.implicitly_wait(5) #웹페이지가 로딩 될 때까지 5초는 기다림
browser.maximize_window()
browser.get("https://m.map.naver.com/")
browser.implicitly_wait(10)
#네이버지도 검색창 클릭
search = browser.find_element(By.CSS_SELECTOR, '#header > header > div.Nsearch._searchKeywordView._searchGuide > div > div > div > span.Nbox_text._textPanel > input')
time.sleep(3)
search.click()
time.sleep(3)
search2 = browser.find_element(By.CSS_SELECTOR, '.Nbox_input_text._search_input')
search2.click()
search2.send_keys('동대문구')
search2.send_keys(Keys.ENTER)
time.sleep(3)
cafearea = browser.find_element(By.CSS_SELECTOR,'#ct > div.search_listview._content._ctAddress > div.search_list_head > div.search_category.select_all > div > div > div > a:nth-child(2)')
cafearea.click()
time.sleep(3)

Num = 1
f = open(r'/Users/jeong-yejin/practiceCRAWLING/CreateExcel/동대문구.csv', 'w', encoding='CP949', newline='')
csvWriter = csv.writer(f)

browser.find_element(By.CSS_SELECTOR, "body").send_keys(Keys.END)

lists = browser.find_elements(By.CSS_SELECTOR, ".item_info")

for list in lists:
    name = list.find_element(By.CSS_SELECTOR, '.item_tit._title > strong').text
    code = list.find_element(By.CSS_SELECTOR, '.a_item.a_item_distance._linkSiteview')
    code = code.get_attribute("data-cid")

    print(f'{Num}: ')
    print(name, code)
    csvWriter.writerow([name, code])

    Num += 1

f.close()



"""
#리스트에서 가격 버튼 누르기
prices = browser.find_elements(By.CSS_SELECTOR, '#ct > div.search_listview._content._ctList > ul > li:nth-child(7) > div.item_info > div.item_common._itemCommon > a.sp_map.btn_price._linkMenu')
for price in prices:
    price.click()
    time.sleep(5)
    menus = browser.find_elements(By.CSS_SELECTOR, '#app-root > div > div > div > div:nth-child(7) > div > div:nth-child(3) > div.place_section_content > ul > li:nth-child(1) > div > div > span > a.place_bluelink.ihmWt')
    for menu in menus:
        menu_name = menu.text
        print(menu_name)
    prices2 = browser.find_elements(By.CSS_SELECTOR, '#app-root > div > div > div > div:nth-child(7) > div > div:nth-child(3) > div.place_section_content > ul > li:nth-child(1) > div > em')
    for price2 in prices2:
        menu_price = price2.text
        print(menu_price)
"""