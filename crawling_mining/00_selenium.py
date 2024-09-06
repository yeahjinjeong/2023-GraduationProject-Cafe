from selenium import webdriver

driver = webdriver.Chrome('chromedriver.exe')
driver.get("https://www.zinnunkebi.com")
driver.close()
driver.quit()