// API 設定
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://6cs4ipgnf9.execute-api.ap-northeast-1.amazonaws.com";

// ポーリング設定
export const POLL_INTERVAL = 3000; // 3秒ごとに確認
