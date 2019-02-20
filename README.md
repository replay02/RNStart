# RNStart


'- expo 환경 기반 프로젝트
 1. 루트폴더에서 "npm install" 커맨드로 node_modules폴더 생성
 2. 루트폴더에서 "expo start" 커맨드로 expo 상에서 실행 가능
 
 -구현 사항
 1. 'react-navigation'을 통한 탭 화면 구성 및 navigation 스택 구현
  : '메인','미세먼지' 탭 구성
 2. '메인' 화면 내 '현재 위치 날씨' 예제 구현
  : 단말에서 읽어오는 현재 위치 기반 날씨 정보(http://api.openweathermap.org/) 기반 화면 구성
 3. '메인' 화면 내 '이미지그리드' 예제 구현
  : 특정 url의 이미지 가져와 리스트 형태 예제 구현
 4. '미세먼지' 리스트 구현
  : 공공데이터 포탈(http://openapi.airkorea.or.kr/)내의 서울 시내 미세먼지 리스트 예제 구현
 5. '미세먼지' 리스트 항목 선택 시 'react-native-maps' 활용 맵 좌표 이동
  : 공공데이 포탈 내의 미세먼지 측정도 위도 경도 좌표 정보를 수신하여 맵 상의 좌표 이동 및 마커 표시 예제 구현
