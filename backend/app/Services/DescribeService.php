<?php

namespace App\Services;

use Exception;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Log;

class DescribeService
{
    /**
     * Geminiに最終データに基づく分析と描写を生成させる。
     */
    public function generateDescription(array $finalOrder, array $healthStatus, array $tierMap): array
    {
        $prompt = $this->buildGeminiPrompt($finalOrder, $healthStatus, $tierMap);

        try {
            $result = Gemini::generativeModel(model: 'models/gemini-pro-latest')
                ->generateContent($prompt);
            $fullText = $result->text();
            $description = $fullText ?? '描写に失敗しました。再度お試しください。';

            $title = $this->generateTitle($finalOrder);

            return [
                'title' => $title,
                'description' => $description,
            ];
        } catch (Exception $e) {
            Log::error('Gemini API Error: '.$e->getMessage());

            return [
                'title' => 'Error Debug',
                'description' => $e->getMessage(),
            ];
        }
    }

    private function buildGeminiPrompt(array $finalOrder, array $healthStatus, array $tierMap): string
    {
        $orderStr = json_encode($finalOrder, JSON_UNESCAPED_UNICODE);
        $healthStr = json_encode($healthStatus, JSON_UNESCAPED_UNICODE);
        $tierStr = json_encode($tierMap, JSON_UNESCAPED_UNICODE);

        return <<<EOT
            あなたは心理機能の並びと状態から、その人の内面世界を物語的に描写する心理学者です。
            以下の心理機能データに基づき、この人物の「現在の姿」を描写する、日本語で 400〜600 文字程度の説明文として描写してください。

            # 入力データの説明
            - Order: 心理機能の優先順位（1位〜8位）
            - Health: 各機能の状態 (O=調子が良い/強み, o=普通, x=葛藤/不健全)
            - Tier: 各機能の階層 (Dominant=その人の核となる機能, High=その人がよく使う機能, Middle=その人が時々使う機能, Low=その人がほとんど使わない機能)

            # 入力データ
            - Order: {$orderStr}
            - Health: {$healthStr}
            - Tier: {$tierStr}

            # 描写のルール
            1. 専門用語の禁止: "Ni"や"Se"などの用語は一切使わず、日常語に翻訳してください。
            2. トーン:
            - ファンタジーやRPGのような世界観は不要です。
            - 落ち着いた、知的で温かみのある「分析文」あるいは「コラム」のような口調。
            - 診断結果のような「あなたは〜です」という断定よりも、「今のあなたは〜という印象です」という寄り添う姿勢。
            3. 構成:
            - 1〜3段落程度でまとめてください。

            # 出力の形式
            - 出力は本文だけにしてください。
            - 見出しやタイトル（例：「〜なあなたへ」など）は付けないでください。
            - JSONやマークダウンは使わず、段落テキストだけを書いてください。
        EOT;
    }

    private function generateTitle(array $finalOrder): string
    {
        // 葛藤ブロック（配列）が混ざっていても安全に処理できるよう平坦化してから上位3件を取得
        $flattened = [];
        foreach ($finalOrder as $item) {
            if (is_array($item)) {
                $flattened = array_merge($flattened, $item);
            } else {
                $flattened[] = $item;
            }
        }
        $sliced = array_pad(array_slice($flattened, 0, 3), 3, 'Fi');
        [$first, $second, $third] = $sliced;

        $habitatMap = [
            'Ni' => '深海の',
            'Ne' => '空の',
            'Ti' => '静かな書斎の',
            'Te' => '工房の',
            'Fi' => '森の',
            'Fe' => '広場の',
            'Si' => '図書館の',
            'Se' => '前線の',
        ];
        $adjectiveMap = [
            'Ni' => '静かな',
            'Ne' => 'ひらめき豊かな',
            'Ti' => '賢い',
            'Te' => '合理的な',
            'Fi' => '繊細な',
            'Fe' => 'あたたかい',
            'Si' => '懐かしさを宿した',
            'Se' => '瞬発力のある',
        ];
        $roleMap = [
            'Ni' => '観測者',
            'Ne' => 'トリックスター',
            'Ti' => '分析者',
            'Te' => '戦略家',
            'Fi' => '語り手',
            'Fe' => 'ムードメーカー',
            'Si' => '記憶の番人',
            'Se' => 'プレイヤー',
        ];

        $habitat = $habitatMap[$first] ?? '森の';
        $adjective = $adjectiveMap[$second] ?? '繊細な';
        $role = $roleMap[$third] ?? '語り手';

        return "{$habitat}{$adjective}{$role}";
    }
}
