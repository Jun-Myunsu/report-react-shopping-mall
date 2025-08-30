# Shop (Vite + React + Redux Toolkit + Firebase Auth + Tailwind)

과제 이미지처럼 동작하는 쇼핑몰 데모입니다.

- 상태관리: **Redux Toolkit**
- 인증: **Firebase Auth** (Email/Password)
- 상품/카테고리: **https://fakestoreapi.com/**
- 라우팅: **React Router v6**
- 스타일: **Tailwind CSS**
- 장바구니: Redux + localStorage 영속화

## 0) 요구사항
- Node.js 18+ (권장 20+), npm 또는 pnpm/yarn
- Firebase 콘솔 계정 (웹 앱 생성 및 Email/Password 로그인 활성화)

## 1) 설치
```bash
npm install
# 또는
# pnpm install
# yarn
```

## 2) Firebase 설정
1. Firebase 콘솔에서 프로젝트 생성 → Web App 추가.
2. Authentication → Sign-in method → Email/Password **Enable**.
3. 프로젝트 설정에서 Web App config를 복사해서 루트에 `.env.local` 파일을 만들고 다음 값 채우기:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

(샘플: `.env.example` 참고)

## 3) 개발 서버 실행
```bash
npm run dev
```
브라우저에서 http://localhost:5173 접속.

## 4) 기능
- / 로그인 페이지(회원가입 버튼 포함)
- /products 목록 + 카테고리 필터 (홈 `/` 에서 바로 목록 표시)
- /product/:id 상세
- /cart 장바구니, 수량 증감, 합계, 비우기
- /checkout 로그인 필요(PrivateRoute)

## 5) Vite로 처음부터 직접 만들고 싶다면
```bash
npm create vite@latest shop -- --template react-ts
cd shop
npm i @reduxjs/toolkit react-redux react-router-dom firebase tailwindcss postcss autoprefixer
npx tailwindcss init -p
# 이후 본 저장소의 src, tailwind 설정, .env.example 등을 참고해 코드 반영
```
