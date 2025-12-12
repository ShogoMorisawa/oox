import { Question } from "@/types/oox";

export const QUESTIONS: Question[] = [
  // Order質問の例
  {
    id: "q01",
    kind: "order",
    pair: ["Ni", "Ne"],
    text: "未来の一点の意味を読む vs 可能性を広げ続ける",
    choices: [
      {
        id: "A",
        text: "未来の一点の意味を読む",
        winner: "Ni",
        loser: "Ne",
      },
      {
        id: "B",
        text: "可能性を広げ続ける",
        winner: "Ne",
        loser: "Ni",
      },
    ],
  },
  // Health質問の例（Ni の健全度を測る）
  {
    id: "q02",
    kind: "health",
    target: "Ni",
    text: "Ni（内的直観）の使い方について、どちらに近いですか？",
    choices: [
      {
        id: "A",
        text: "長期的なビジョンを描き、今日やるべきことを見定める",
        effect: { health: 1 }, // 健全寄り
      },
      {
        id: "B",
        text: "どうせ悪いことが起きると悲観的な予言に囚われる",
        effect: { health: 0 }, // 不健全寄り
      },
    ],
  },
  // 以下、追加の質問をここに定義していく
  // {
  //   id: "q03",
  //   kind: "order",
  //   pair: ["Ni", "Ti"],
  //   text: "直感で本質を掴む vs 論理で構造化する",
  //   choices: [
  //     { id: "A", text: "直感で本質を掴む", winner: "Ni", loser: "Ti" },
  //     { id: "B", text: "論理で構造化する", winner: "Ti", loser: "Ni" },
  //   ],
  // },
];
