// Gerado por scripts/generate-routes.mjs — não editar à mão.
import data from "@/data/diplomas/iec.json";
import type { Diploma } from "@/data/diplomas/types";
import { DiplomaReader, diplomaMetadata } from "../reader";

export const generateMetadata = () => diplomaMetadata("iec");

export default function Page() {
  return <DiplomaReader data={data as unknown as Diploma} />;
}
