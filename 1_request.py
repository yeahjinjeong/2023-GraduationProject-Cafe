import requests
from bs4 import BeautifulSoup

url = 'https://m.map.naver.com/search2/interestSpot.naver?type=CAFE&searchCoord=126.9904900;37.5325270'
response = requests.get(url)
html = response.text
soup = BeautifulSoup(html, 'html.parser')
links = soup.select(".btn_tgg_address")
for link in links:
    content = link.text
    print(content)
# links = soup.select("._item _lazyImgContainer")
# for link in links:
#     code = link.attrs['data-sid']
#     title = link.attrs['data-title']
#     print(code, title)