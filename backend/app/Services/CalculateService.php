<?php

namespace App\Services;

class CalculateService
{
    protected array $ids = [];

    protected array $low = [];

    protected array $onStack = [];

    protected array $stack = [];

    protected int $timer = 0;

    protected array $sccs = [];

    public function buildGraph(array $matches): array
    {
        $graph = [];
        foreach ($matches as $match) {
            $winner = $match['winner'];
            $loser = $match['loser'];

            if (! isset($graph[$winner])) {
                $graph[$winner] = [];
            }
            if (! isset($graph[$loser])) {
                $graph[$loser] = [];
            }

            if (! in_array($loser, $graph[$winner], true)) {
                $graph[$winner][] = $loser;
            }
        }

        return $graph;
    }

    public function findSCCs(array $graph): array
    {
        $this->ids = [];
        $this->low = [];
        $this->onStack = [];
        $this->stack = [];
        $this->sccs = [];
        $this->timer = 0;

        foreach (array_keys($graph) as $node) {
            if (! isset($this->ids[$node])) {
                $this->dfsTarjan($node, $graph);
            }
        }

        return $this->sccs;
    }

    protected function dfsTarjan(string $at, array $graph): void
    {
        // 初回訪問で id/low を同じ値にセットし、スタックに積む
        $this->ids[$at] = $this->low[$at] = $this->timer++;
        $this->stack[] = $at;
        $this->onStack[$at] = true;

        foreach ($graph[$at] as $to) {
            if (! isset($this->ids[$to])) {
                $this->dfsTarjan($to, $graph);
                // 子が見つけた「より古い」ノード情報で low を更新
                $this->low[$at] = min($this->low[$at], $this->low[$to]);
            } elseif (! empty($this->onStack[$to])) {
                // スタック上への戻り辺があれば ids で low を更新
                $this->low[$at] = min($this->low[$at], $this->ids[$to]);
            }
        }

        if ($this->ids[$at] === $this->low[$at]) {
            // 自分が強連結成分の根なら、根に戻るまでスタックを取り出す
            $scc = [];
            while (true) {
                $node = array_pop($this->stack);
                $this->onStack[$node] = false;
                $scc[] = $node;

                if ($node === $at) {
                    break;
                }
            }
            $this->sccs[] = $scc;
        }
    }
}
