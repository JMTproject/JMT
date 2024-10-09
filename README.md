
<h1>📖 JMT - 1인 가구를 위한 요리 레시피 제공 서비스</h1>
<a href="http://3.38.252.133/"><img alt="main" src="https://github.com/user-attachments/assets/73648c88-0845-4ead-99b7-723514426c87"/></a>

<br/><br/>

- 배포 URL : http://3.38.252.133/

<br/><br/>

## ❓ 프로젝트 소개

- 1인 가구를 위한 요리레시피 제공 서비스입니다.
- 1인 가구를 위한 레시피인만큼 재료의 개수와 단계를 제한했습니다.
- 사용자 로그인
- 요리 레시피 업로드
- Gemini를 이용한 자동 레시피 생성
- 검색, 정렬, 조회수 기능
- 리뷰 및 별점 기능

<br>

## 💻 개발 환경

- 기술 스택 : HTML, CSS, JavaScript, Node.js
- 버전 관리 : GitHub
- 툴 : Slack, Figma
- 배포 : AWS

<br>

## 👤 팀원 소개

민경현 - 기획 총괄, 메인 및 어드민페이지
김문정 - 기획 및 디자인, 레시피 상세페이지
신세용 - 데이터베이스 설계, 로그인 및 회원가입 페이지
정영훈 - Git, 레시피 작성 페이지


## 📅 프로젝트 일정

- 전체 프로젝트 일정 : 2024-07-25 ~ 2024-08-14
- 기획 설계 : 2024-07-25 ~ 2024-07-29
- 기능 구현 : 2024-07-30 ~ 2024-08-13
- 발표 및 시연 : 2024-08-14

<br>

## 💻 구현 사항

### 메인 페이지(시작화면)
<a><img src="https://github.com/user-attachments/assets/73648c88-0845-4ead-99b7-723514426c87" alt="main page"/></a>

<div align="center">
<a><img src="https://github.com/user-attachments/assets/b33997bc-c991-4502-adfa-f3ef6360fd60" alt="main page"/></a>
</div>

<br>

- 업로드 된 요리 레시피 목록을 볼 수 있는 페이지입니다.
- 정렬, 검색 기능을 제공합니다.

<br>

### 로그인 페이지
<div align="center">
  <a><img src="https://github.com/user-attachments/assets/635eb97f-819a-4921-a2c9-706d25d95586" alt="login page"/></a>
</div>

<br>

- 테스트 계정 정보를 추가하여 개발 단계에서 편의성을 높였습니다.
- JWT 토큰을 이용했습니다.

<br>

### 레시피 업로드 페이지
<a><img src="https://github.com/user-attachments/assets/5e91eb10-88f6-441f-ad2b-5513c330857c" alt ="recipe upload page"/></a>

<br>

- 1인가구에 맞게 재료 개수를 제한했습니다.
- 단계별 이미지와 설명을 할 수 있습니다.
- Gemini를 통해 간단하게 레시피를 업로드하거나 직접 업로드 할 수 있습니다.


<br>

### 레시피 상세 페이지
<a><img src="https://github.com/user-attachments/assets/085714fe-db72-43b5-b9c4-c0ce51e48b11" alt="recipe detail page"/></a>
<a><img src="https://github.com/user-attachments/assets/80c45c93-5d75-47f0-b952-9e14ffbba150" alt="review"/></a>

<br>

- 실제 레시피가 나오는 페이지이자 리뷰 공간입니다.
- 레시피의 조회수와 몇인분인가와 조리시간을 한 눈에 볼 수 있도록 배치하였습니다.
- 재료의 양과 함께 구매 버튼을 누르면 쿠팡에서 해당 재료를 검색한 결과창이 나와 바로 구매가 가능합니다.
- 리뷰와 함께 별점을 남겨 사용자의 편의성을 높였습니다.
- Admin계정에 한해서 모든 리뷰를 수정, 삭제 할 수 있습니다.
<br/><br/>
