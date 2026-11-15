import { createElement, type ComponentType, type SVGProps } from "react";
import { AirlessPump } from "./AirlessPump";
import { Carton } from "./Carton";
import { DropperBottle } from "./DropperBottle";
import { FillingNozzle } from "./FillingNozzle";
import { HeroSerumComposition } from "./HeroSerumComposition";
import { LabelSheet } from "./LabelSheet";
import { Vial } from "./Vial";

export type IllustrationName =
  | "dropper"
  | "vial"
  | "airless-pump"
  | "carton"
  | "label-sheet"
  | "filling-nozzle";

type IllustrationComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const ILLUSTRATIONS: Record<IllustrationName, IllustrationComponent> = {
  dropper: DropperBottle,
  vial: Vial,
  "airless-pump": AirlessPump,
  carton: Carton,
  "label-sheet": LabelSheet,
  "filling-nozzle": FillingNozzle,
};

export function PackageIllustration({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IllustrationName }) {
  const Illustration = ILLUSTRATIONS[name];
  return createElement(Illustration, props);
}

export { AirlessPump, Carton, DropperBottle, FillingNozzle, HeroSerumComposition, LabelSheet, Vial };
