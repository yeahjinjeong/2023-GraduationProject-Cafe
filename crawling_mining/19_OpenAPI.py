import requests
import csv
from urllib.parse import urlparse

import pandas as pd
import numpy as np
import folium
from folium.plugins import MiniMap
import json

##카카오 API
## region에는 '성산일출봉 전기충전소' 검색명이 들어갈 것임
## page_num은 1~3이 입력될 건데, 한 페이지 당 검색목록이 최대 15개임.
## 만약 page_num이 4이상이 되면 3페이지랑 같은 15개의 결과 값을 가져옴. 그래서 1~3만 쓰는 것임
## 입력 예시 -->> headers = {"Authorization": "KakaoAK f221u3894o198123r9"}
## ['meta']['total_count']은 내가 '성산일출봉 전기충전소'를 검색했을 때, 나오는 총 결과 값. 
## ['meta']['total_count']이 45보다 크면 45개만 가져오게 됨

def elec_location(region,page_num):
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json'
    params = {'query': region,'page': page_num}
    headers = {"Authorization": "KakaoAK 9f8bb08d9861a708a97b9cbbabc7ea21"}

    places = requests.get(url, params=params, headers=headers).json()['documents']
    total = requests.get(url, params=params, headers=headers).json()['meta']['total_count']
    if total > 45:
        print(total,'개 중 45개 데이터밖에 가져오지 못했습니다!')
    else :
        print('모든 데이터를 가져왔습니다!')
    return places

## 이 함수는 위 함수 결과 값(1 ~ 45개) 하나하나 분리해서 저장할 것임
## 1번 결과 값 안에는 1번 충전소 이름, 위도, 경도, 전화번호, 도로명 주소 등이 있는데 각각 배열에 저장
## 우리는 충전소 ID, 충전소 이름, 위도, 경도, 도로명주소, 사이트주소를 저장할 것임

def elec_info(places):
    X = []
    Y = []
    stores = []
    road_address = []
    place_url = []
    ID = []
    for place in places:
        X.append(float(place['x']))
        Y.append(float(place['y']))
        stores.append(place['place_name'])
        road_address.append(place['road_address_name'])
        place_url.append(place['place_url'])
        ID.append(place['id'])

    ar = np.array([ID,stores, X, Y, road_address,place_url]).T
    df = pd.DataFrame(ar, columns = ['ID','stores', 'X', 'Y','road_address','place_url'])
    return df

## 여러개으 키워드를 검색할 때 사용할 함수임
## location_name에는 ['성산일출봉 전기충전소, '한림공원 전기충전소', ... ,'모슬포 전기충전소']처럼 배열이 입력

def keywords(location_name):
    df = None
    for loca in location:
        for page in range(1,4):
            local_name = elec_location(loca, page)
            local_elec_info = elec_info(local_name)

            if df is None:
                df = local_elec_info
            elif local_elec_info is None:
                continue
            else:
                df = pd.concat([df, local_elec_info],join='outer', ignore_index = True)
    return df

##지도로 보여주기

def make_map(dfs):
    # 지도 생성하기
    m = folium.Map(location=[33.4935,126.6266],   # 기준좌표: 제주어딘가로 내가 대충 설정
                   zoom_start=12)

    # 미니맵 추가하기
    minimap = MiniMap() 
    m.add_child(minimap)

    # 마커 추가하기
    for i in range(len(dfs)):
        folium.Marker([df['Y'][i],df['X'][i]],
                  tooltip=dfs['stores'][i],
                  popup=dfs['place_url'][i],
                  ).add_to(m)
    return m

# location = ['서울 용산구 원효로1길 20', '광치기해수욕장 전기충전소']
# df = keywords(location)
# df = df.drop_duplicates(['ID'])
# df = df.reset_index()

# make_map(df)

# address = '서울 용산구 한강대로 95'
# url = 'https://dapi.kakao.com/v2/local/search/address.json?&query=' + address
# headers = {"Authorization": "KakaoAK 9f8bb08d9861a708a97b9cbbabc7ea21"}
# result = requests.get(urlparse(url).geturl(), headers=headers).json()
# print(result)
# match_first = result['documents'][0]['address']
# lat = float(match_first['y'])
# lng = float(match_first['x'])
# print('lat, lng : ')
# print(lat, lng)


f1 = open('/Users/jeong-yejin/2023GP_CRS/review_최종_781.csv', 'r', encoding='utf-8-sig', newline='')
rdr = csv.reader(f1)

f2 = open(f'/Users/jeong-yejin/2023GP_CRS/classes/review_latlng.csv', 'w', encoding='utf-8-sig', newline='')
csvWriter = csv.writer(f2)
csvWriter.writerow(['data-cid', '카페명', 'lng(x)', 'lat(y)'])

for r in rdr:
    address = f'{r[4]}'
    url = 'https://dapi.kakao.com/v2/local/search/address.json?&query=' + address
    headers = {"Authorization": "KakaoAK 9f8bb08d9861a708a97b9cbbabc7ea21"}
    result = requests.get(urlparse(url).geturl(), headers=headers).json()
    try :
        print(result['documents'])
        match_first = result['documents'][0]['address']
        lat = float(match_first['y'])
        lng = float(match_first['x'])
        print('lat, lng : ')
        print(lat, lng)
        csvWriter.writerow([r[1], r[3], lng, lat]) #롱랫 위치 주의
    except:
        print(result['documents'])
        csvWriter.writerow([r[1], r[3], 'NaN', 'NaN'])