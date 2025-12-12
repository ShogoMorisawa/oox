import { useOoX } from "@/hooks/useOoX";

type Props = {
  oox: ReturnType<typeof useOoX>;
};

export default function MobileScreens({ oox }: Props) {
  return (
    <div>
      <h1>Mobile Screens</h1>
    </div>
  );
}
