// OoX アプリケーション共通型定義

export type FunctionCode =
  | "Ni"
  | "Ne"
  | "Ti"
  | "Te"
  | "Fi"
  | "Fe"
  | "Si"
  | "Se";
export type OrderElement = FunctionCode | FunctionCode[];

// バックエンドからのレスポンス型
export type CalculateResponse = {
  order: OrderElement[];
  health: Record<FunctionCode, "O" | "o" | "x">;
  healthScore?: Record<FunctionCode, number>; // デバッグ用（将来削除可）
};

export type DescribeResponse = {
  title: string;
  description: string;
};

// 選択肢の効果（health質問用）
export type ChoiceEffect = {
  health?: 0 | 1; // 0: 不健全寄り, 1: 健全寄り
};

// 選択肢型
export type Choice = {
  id: "A" | "B" | "C";
  text: string;
  // order質問の場合
  winner?: FunctionCode;
  loser?: FunctionCode;
  // health質問の場合
  effect?: ChoiceEffect;
};

// 質問データ型（kind で分岐）
export type OrderQuestion = {
  id: string;
  kind: "order";
  pair: [FunctionCode, FunctionCode];
  text: string;
  choices: Choice[];
};

export type HealthQuestion = {
  id: string;
  kind: "health";
  target: FunctionCode;
  text: string;
  choices: Choice[];
};

export type Question = OrderQuestion | HealthQuestion;

// 型ガード関数
export function isOrderQuestion(q: Question): q is OrderQuestion {
  return q.kind === "order";
}

export function isHealthQuestion(q: Question): q is HealthQuestion {
  return q.kind === "health";
}

// ステップ型（constants/steps.ts の OOX_STEPS から導出）
export type Step = "start" | "quiz" | "resolve" | "hierarchy" | "result";

// 階層型（constants/tier.ts の OOX_TIER から導出）
export type Tier = "Dominant" | "High" | "Middle" | "Low";
