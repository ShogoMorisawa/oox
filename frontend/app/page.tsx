// frontend/app/page.tsx
"use client";

import { useState } from "react";

// 心理機能のコード
type FunctionCode = "Ni" | "Ne" | "Ti" | "Te" | "Fi" | "Fe" | "Si" | "Se";

// 28件のダミーデータ（ここでは簡略化のため8件だけ記載）
const MOCK_MATCHES = [
  { winner: "Ni", loser: "Se", id: "q01" },
  { winner: "Ti", loser: "Fe", id: "q02" },
  { winner: "Fi", loser: "Te", id: "q03" },
  { winner: "Ne", loser: "Si", id: "q04" },
  { winner: "Ni", loser: "Fi", id: "q05" },
  { winner: "Se", loser: "Ti", id: "q06" },
  { winner: "Te", loser: "Ne", id: "q07" },
  { winner: "Fe", loser: "Si", id: "q08" },
  // ... 実際は28件分をここに定義
];

const COMPLEX_MOCK_MATCHES = [
  // 🥇 支配ノード (Ni, Ti)
  { winner: "Ni", loser: "Ti", id: "q01" },
  { winner: "Ni", loser: "Ne", id: "q02" },
  // 🔗 支配ノードからサイクルへ
  { winner: "Ti", loser: "Fe", id: "q03" },
  { winner: "Ti", loser: "Fi", id: "q04" },
  // 🔄 循環 (葛藤ブロック: Fe, Fi, Te)
  { winner: "Fe", loser: "Fi", id: "q05" },
  { winner: "Fi", loser: "Te", id: "q06" },
  { winner: "Te", loser: "Fe", id: "q07" }, // ⬅️ これがサイクルを形成する
  // 🔗 サイクルから従属ノードへ
  { winner: "Fe", loser: "Se", id: "q08" },
  // 🥈 中間ノード (Ne)
  { winner: "Ne", loser: "Se", id: "q09" },
  // 🥉 従属ノード (Si, Se)
  { winner: "Se", loser: "Si", id: "q10" },
  { winner: "Ti", loser: "Si", id: "q11" },
  { winner: "Ni", loser: "Si", id: "q12" },
];

// Responseの型
type OrderElement = FunctionCode | FunctionCode[];
type CalculateResponse = {
  order?: OrderElement[]; // optional for future ordering response
  graph?: Record<string, FunctionCode[]>;
  sccs?: FunctionCode[][];
};

export default function Home() {
  const [result, setResult] = useState<CalculateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL =
    "https://6cs4ipgnf9.execute-api.ap-northeast-1.amazonaws.com";

  const fetchData = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${BASE_URL}/api/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matches: COMPLEX_MOCK_MATCHES }),
      });

      if (!res.ok) {
        throw new Error(`APIエラー: ${res.status}`);
      }

      const data: CalculateResponse = await res.json();
      setResult(data);
    } catch (error) {
      console.error("通信エラー:", error);
      alert(
        "通信またはAPI処理でエラーが発生しました。コンソールを確認してください。"
      );
    } finally {
      setLoading(false);
    }
  };

  const hasOrder = Array.isArray(result?.order);
  const sccs = result?.sccs ?? [];
  const graph = result?.graph ?? {};

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-indigo-600">
        OoX Mirror Core Test
      </h1>

      <div className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <button
          onClick={fetchData}
          disabled={loading}
          className={`mb-8 w-full px-8 py-3 rounded-xl text-white font-bold text-lg shadow-md transition-all 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            }
          `}
        >
          {loading ? "計算中..." : "Step 2: Calculate APIを叩く"}
        </button>

        {hasOrder && result?.order && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
              結果序列 (Order)
            </h2>
            <ol className="space-y-3">
              {result.order.map((element, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-xl font-mono mr-3 text-gray-500 w-6 text-right">
                    {index + 1}.
                  </span>

                  {/* 要素が配列かどうかで表示を分ける */}
                  {Array.isArray(element) ? (
                    // 葛藤ブロック (配列) の表示
                    <div className="p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-sm flex-grow">
                      <p className="font-bold text-yellow-800 text-sm mb-1">
                        葛藤ブロック (要手動決定)
                      </p>
                      <div className="flex space-x-2">
                        {element.map((func, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-yellow-400 text-white rounded-full text-sm font-semibold"
                          >
                            {func}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // 確定ノード (文字列) の表示
                    <span className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm font-semibold text-lg flex-grow">
                      {element}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {!hasOrder && result && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 border-b pb-2">
                強連結成分 (SCC)
              </h2>
              {sccs.length === 0 ? (
                <p className="text-gray-600 text-sm">
                  SCC は検出されていません。
                </p>
              ) : (
                <ul className="space-y-3">
                  {sccs.map((component, idx) => (
                    <li
                      key={idx}
                      className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm"
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        SCC #{idx + 1}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {component.map((func, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-yellow-400 text-white rounded-full text-sm font-semibold"
                          >
                            {func}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 border-b pb-2">
                グラフ (隣接リスト)
              </h2>
              {Object.keys(graph).length === 0 ? (
                <p className="text-gray-600 text-sm">
                  グラフ情報がありません。
                </p>
              ) : (
                <ul className="space-y-2">
                  {Object.entries(graph).map(([node, edges]) => (
                    <li key={node} className="flex items-start gap-2">
                      <span className="font-mono text-sm text-gray-700">
                        {node}
                      </span>
                      <span className="text-gray-500">→</span>
                      <div className="flex flex-wrap gap-2">
                        {edges.map((edge, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded"
                          >
                            {edge}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
