<?php

namespace App\Services;

class CalculateService
{
    public function __construct()
    {
        //
    }

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
}
