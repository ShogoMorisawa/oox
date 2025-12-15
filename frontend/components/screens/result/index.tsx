"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import ResultMobile from "./ResultMobile";
import ResultPC from "./ResultPC";
import { CalculateResponse, DescribeResponse } from "@/types/oox";

type Props = {
  calculateResult: CalculateResponse;
  describeResult: DescribeResponse;
  onGoToWorld: () => void;
};

export type ResultViewProps = {
  calculateResult: CalculateResponse;
  describeResult: DescribeResponse;
  onGoToWorld: () => void;
};

export default function ResultContainer(props: Props) {
  const isMobile = useIsMobile();

  return isMobile ? <ResultMobile {...props} /> : <ResultPC {...props} />;
}
