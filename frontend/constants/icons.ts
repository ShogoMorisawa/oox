import { FunctionCode } from "@/types/oox";

export function getIcon(dominant: FunctionCode, second: FunctionCode): string {
  return `/images/icons/oox_icon_${second}_${dominant}.png`;
}

export function getCellImage(func: FunctionCode): string {
  return `/images/cells/oox_cell_${func}_left.png`;
}
