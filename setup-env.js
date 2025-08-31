// 개발용 환경변수 설정 스크립트
// 사용법: node setup-env.js

import fs from "fs";
import path from "path";

// 환경변수를 외부 소스에서 가져오는 함수들
const getEnvFromRemote = async () => {
  // 예시: 외부 API나 설정 서비스에서 가져오기
  // const response = await fetch('https://your-config-service.com/config');
  // return await response.json();

  // 로컬 개발용 더미 데이터 (실제 배포는 GitHub Secrets 사용)
  return {
    VITE_FIREBASE_API_KEY: "demo-api-key",
    VITE_FIREBASE_AUTH_DOMAIN: "demo-project.firebaseapp.com",
    VITE_FIREBASE_PROJECT_ID: "demo-project",
    VITE_FIREBASE_APP_ID: "demo-app-id",
  };
};

const createEnvFile = async () => {
  try {
    const config = await getEnvFromRemote();

    const envContent = Object.entries(config)
      .map(([key, value]) => `${key}="${value}"`)
      .join("\n");

    fs.writeFileSync(".env.local", envContent);
    console.log("✅ .env.local 파일이 생성되었습니다.");
  } catch (error) {
    console.error("❌ 환경변수 설정 실패:", error);
  }
};

createEnvFile();
