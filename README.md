# weatherApp
expo와 react-native를 이용하여 weatherApp 개발

## 사용 기술
|기술|설명|
|--|--|
|expo-location|위치 사용 여부를 체크하고 현재 위치와 좌표를 가져오는 패키지|
|axios|open api인 openweathermap에서 날씨 정보를 가져올때 사용하는 통신 패키지|
|ScrollView|스크롤뷰를 사용하여 좌우 스크롤하여 7일간의 날씨를 보여주는 태그 <br/> horizontal, pagingEnabled, indicatorStyle="white"를 사용하여 가로스크롤, 자연스러운 스크롤, 스크롤바 색상을 변경|
|dayjs|dayjs를 사용하여 현재 날짜를 가져오고 add함수를 이용하여 7일간의 날짜를 출력함|

