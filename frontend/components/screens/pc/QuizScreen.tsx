"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import type { Choice, Question } from "@/types/oox";

type AnswerValue = Choice["id"];

type Props = {
  questions: Question[];
  answers: Record<string, AnswerValue>;
  loading: boolean;
  loadingMessage: string;
  onChange: (questionId: string, choiceId: AnswerValue) => void;
  onCalculate: () => void;
};

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
  const isLastQuestion = index === totalQuestions - 1;
  const progress = (index + 1) / totalQuestions;

  const currentAnswer = answers[currentQuestion.id];

  const choices = useMemo(() => currentQuestion.choices, [currentQuestion]);

  const gridColsClass = choices.length === 3 ? "grid-cols-3" : "grid-cols-2";

  const handleSelect = (choiceId: AnswerValue) => {
    if (loading) return;
    onChange(currentQuestion.id, choiceId);
  };

  const handleNext = () => {
    if (loading) return;
    if (!currentAnswer) return;

    if (!isLastQuestion) {
      setIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onCalculate();
    }
  };

  const handlePrev = () => {
    if (loading) return;
    if (index === 0) return;

    setIndex((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans flex items-center justify-center py-10">
      {/* 背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url(/images/oox_background.png)" }}
      />
      {/* 背景オーバーレイ */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none" />

      {/* --- コンテンツラッパー --- */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center gap-6">
        {/* 1. 質問バブル */}
        <div className="w-full relative min-h-[12rem] flex items-center justify-center shrink-0">
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none drop-shadow-lg">
            <Image
              src="/images/oox_quiz_question.png"
              alt="Question bubble"
              fill
              className="object-fill"
              priority
            />
          </div>

          <div className="relative z-10 p-8 text-center pb-10">
            <p className="text-gray-500 text-xs font-bold tracking-widest mb-3 uppercase">
              Question {index + 1} / {totalQuestions}
            </p>

            {/* kind をさりげなく表示（任意） */}
            <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-widest">
              {currentQuestion.kind}
            </p>

            <h2 className="text-slate-800 text-lg md:text-xl font-medium leading-relaxed tracking-wide">
              {currentQuestion.text}
            </h2>
          </div>
        </div>

        {/* ローディング表示（任意） */}
        {loading && (
          <div className="text-xs text-slate-600 font-medium">
            {loadingMessage}
          </div>
        )}

        {/* 2. 回答ボタンエリア */}
        <div className={`w-full grid ${gridColsClass} gap-4 shrink-0`}>
          {choices.map((c) => {
            const isSelected = currentAnswer === c.id;

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelect(c.id)}
                disabled={loading}
                className={[
                  "relative group aspect-square rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-300",
                  isSelected ? "scale-105" : "hover:-translate-y-1",
                  loading ? "opacity-60" : "",
                ].join(" ")}
              >
                <div className="absolute inset-0 w-full h-full z-0 rounded-[2.5rem] overflow-hidden drop-shadow-md">
                  <Image
                    src="/images/oox_quiz_choice-lightBlue.png"
                    alt={`Choice ${c.id} background`}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={[
                      "absolute inset-0 mix-blend-overlay transition-opacity duration-300",
                      isSelected
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-50",
                      // ここは好み：選択肢ごとに雰囲気変えるなら条件分岐してもOK
                      "bg-sky-500/20",
                    ].join(" ")}
                  />
                </div>

                <div className="relative z-10 flex flex-col items-center p-4">
                  <span
                    className={`text-xl font-bold mb-2 ${quicksand.className} text-slate-700`}
                  >
                    {c.id}
                  </span>

                  <span className="text-xs md:text-sm font-bold text-center leading-tight text-slate-700 whitespace-pre-line">
                    {c.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex w-full justify-between items-center px-2 relative z-20 h-10 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            disabled={index === 0 || loading}
            className="text-sm text-slate-500 hover:text-slate-700 disabled:opacity-0 transition-colors font-medium"
          >
            ← Back
          </button>

          {currentAnswer && (
            <button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="px-6 py-2 rounded-full bg-white text-sky-600 font-bold text-sm shadow-md hover:shadow-lg transition-all animate-bounce-slow disabled:opacity-60"
            >
              {isLastQuestion ? "結果を見る" : "Next →"}
            </button>
          )}
        </div>

        {/* 3. 下部のシーン（ポッドと細胞） */}
        <div className="relative w-full h-40 mt-4 flex justify-center items-end shrink-0">
          {/* 左の細胞（赤） */}
          <div className="absolute left-4 bottom-8 w-20 h-20 animate-float-medium z-20">
            <Image
              src="/images/oox_start_cell-red.png"
              alt="Red Cell"
              width={100}
              height={100}
              className="object-contain drop-shadow-xl"
            />
          </div>

          {/* 右の細胞（青） */}
          <div className="absolute right-4 bottom-12 w-20 h-20 animate-float-fast z-20">
            <Image
              src="/images/oox_start_cell-lightBlue.png"
              alt="Blue Cell"
              width={80}
              height={80}
              className="object-contain drop-shadow-xl"
            />
          </div>

          {/* 中央のポッド（水位計） */}
          <div className="relative z-10 w-32 h-40 flex items-end justify-center">
            <div
              className="absolute bottom-2 w-[80%] bg-sky-300/40 rounded-b-[2rem] overflow-hidden transition-all duration-1000 ease-in-out"
              style={{ height: `${20 + progress * 70}%` }}
            >
              <div className="absolute top-0 left-0 w-[200%] h-4 bg-sky-200/50 animate-wave opacity-70" />
              <div className="w-full h-full bg-gradient-to-t from-sky-400/30 to-sky-100/10" />
            </div>
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/oox_start_pod.png"
                alt="Pod"
                fill
                className="object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
