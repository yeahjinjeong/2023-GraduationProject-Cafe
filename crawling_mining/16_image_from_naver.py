from ast import excepthandler
from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
from urllib.parse import quote_plus

n=0
for i in range(1,287):
    url = 'https://pcmap.place.naver.com/restaurant/1275361497/photo?filterType=%EC%97%85%EC%B2%B4'
    html = urlopen(url)
    soup = bs(html, "html.parser")
    img = soup.find_all('img')
    for j in img:
        try:
            j.attrs['data-original']
            tmp_url = j.attrs['data-original']
            try:
                with urlopen(tmp_url) as f:
                    print(j.attrs['data-original'])
                    with open('./images/img' + str(n)+'.jpg','wb') as h: # w - write b - binary
                        img = f.read()
                        h.write(img)
                        n+=1
                    
            except:
                continue
        except:
            continue
print("step1 done!!!!!!!!!!!!!!!!!!!!!!!!!!!!")