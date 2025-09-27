import {
  Database,
  Boxes,
  Workflow,
  Cpu,
  FileText,
  ShieldCheck,
  GaugeCircle
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;
export const ICONS: Record<string, IconCmp> = {
  Database,
  Boxes,
  Workflow,
  Cpu,
  FileText,
  GaugeCircle,
  ShieldCheck
};

export function getIcon(name: string): IconCmp | null {
  return ICONS[name] ?? null;
}
