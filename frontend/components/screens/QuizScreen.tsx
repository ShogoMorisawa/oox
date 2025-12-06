"use client";

import { useState } from "react";
import { FunctionCode, Question } from "@/types/oox";

type Props = {
  questions: Question[];
  answers: Record<string, FunctionCode>;
  loading: boolean;
  loadingMessage: string;
  onChange: (id: string, value: FunctionCode) => void;
  onCalculate: () => void;
};

export default function QuizScreen({
  questions,
  answers,
  loading,
  loadingMessage,
  onChange,
  onCalculate,
}: Props) {
  const [index, setIndex] = useState(0);

  const totalQuestions = questions.length;
  const currentQuestion = questions[index];
  const currentAnswer = answers[currentQuestion.id];
  const isLastQuestion = index === totalQuestions - 1;
  const progress = (index + 1) / totalQuestions;

  const handleSelect = (choice: "left" | "right") => {
    if (loading) return;
    const value =
      choice === "left" ? currentQuestion.left : currentQuestion.right;
    onChange(currentQuestion.id, value);
  };
  const handleNext = () => {
    if (loading) return;
    if (!currentAnswer) return;
    if (!isLastQuestion) {
      setIndex(index + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onCalculate();
    }
  };
  const handlePrev = () => {
    if (loading) return;
    if (index === 0) return;
    setIndex(index - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-indigo-700 tracking-tight">
        OoX Mirror{" "}
        <span className="text-sm font-normal text-gray-500 ml-2">
          Prototype v0.1
        </span>
      </h1>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
        {/* 現在の質問 */}
        <div className="space-y-4 border border-gray-100 rounded-xl p-4 bg-gray-50/50">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 mb-2 font-mono">
              Q{index + 1} / {totalQuestions}
            </p>

            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-600 font-medium">
                {currentQuestion.text}
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() =>
                    onChange(currentQuestion.id, currentQuestion.left)
                  }
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                    currentAnswer === currentQuestion.left
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {currentQuestion.left}
                </button>
                <button
                  onClick={() =>
                    onChange(currentQuestion.id, currentQuestion.right)
                  }
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                    currentAnswer === currentQuestion.right
                      ? "bg-pink-500 text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {currentQuestion.right}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {index > 0 ? "〈 戻る" : ""}
          </button>
          <button
            onClick={handleNext}
            disabled={loading || !currentAnswer}
            className="px-8 py-3 rounded-full text-white font-bold bg-indigo-500 disabled:opacity-60"
          >
            {loading
              ? loadingMessage || "分析中..."
              : isLastQuestion
              ? "結果を見る"
              : "次の質問へ"}
          </button>
        </div>
      </div>
    </div>
  );
}
