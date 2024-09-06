import requests
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

# # 크롬 드라이버 자동 업데이트
# from webdriver_manager.chrome import ChromeDriverManager

# # 브라우저 꺼짐 방지
# chrome_options = Options()
# chrome_options.add_experimental_option("detach", True)

# # 불필요한 에러 메시지 없애기
# chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])

# service = Service(execute_path=ChromeDriverManager().install())
# driver = webdriver.Chrome(service=service, options=chrome_options)

df = pd.read_csv('/Users/jeong-yejin/Downloads/서대문구url.csv', encoding='utf-8-sig')
df['naver_url'] = ''


for i, datacid in enumerate(df['data-cid'].tolist()):
    print(str(i)+'번째 식당')
    res_code = str(datacid)

    final_url = 'https://pcmap.place.naver.com/restaurant/' + \
        res_code + '/review/visitor#'
    print(final_url)
    df['naver_url'][i] = final_url

    df.to_csv('/Users/jeong-yejin/Downloads/서대문구url2.csv', encoding='utf-8-sig')
