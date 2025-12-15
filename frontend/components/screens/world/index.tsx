"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import WorldMobile from "./WorldMobile";
import WorldPC from "./WorldPC";

export default function WorldScreen() {
  const isMobile = useIsMobile();

  return isMobile ? <WorldMobile /> : <WorldPC />;
}
