// frontend/app/page.tsx
"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("ボタンを押してね");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setMessage("通信中...");
    
    try {
      const res = await fetch("https://6cs4ipgnf9.execute-api.ap-northeast-1.amazonaws.com/api/hello");
      
      if (!res.ok) {
        throw new Error(`エラー発生: ${res.status}`);
      }

      const data = await res.json();
      setMessage(`成功！Lambdaからの返事: 「${data.message}」`);
      
    } catch (error) {
      setMessage("エラーが発生しました。コンソールを確認してください。");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-black font-sans">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">OoX Mirror</h1>
      
      <div className="p-8 bg-white rounded-2xl shadow-xl text-center max-w-md w-full">
        <p className="text-lg mb-6 font-medium text-gray-700 border-b pb-4">
          {message}
        </p>
        
        <button
          onClick={fetchData}
          disabled={loading}
          className={`
            px-8 py-3 rounded-full text-white font-bold text-lg shadow-md transition-all transform hover:scale-105
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"}
          `}
        >
          {loading ? "考え中..." : "Lambdaに接続テスト"}
        </button>
      </div>
      
      <p className="mt-8 text-gray-500 text-sm">
        Frontend: Next.js (Vercel) <br/>
        Backend: Laravel (AWS Lambda)
      </p>
    </div>
  );
}