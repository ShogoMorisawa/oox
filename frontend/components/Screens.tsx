"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useOoX } from "@/hooks/useOoX";
import PcScreens from "@/components/screens/pc/Screens";
import MobileScreens from "@/components/screens/mobile/Screens";

export default function Screens() {
  const isMobile = useIsMobile();
  const oox = useOoX();

  return isMobile ? <MobileScreens oox={oox} /> : <PcScreens oox={oox} />;
}
