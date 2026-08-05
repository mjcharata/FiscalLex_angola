// Gerado por scripts/generate-routes.mjs — não editar à mão.
import data from "@/data/diplomas/beneficios-fiscais.json";
import type { Diploma } from "@/data/diplomas/types";
import { DiplomaReader, diplomaMetadata } from "../reader";

export const generateMetadata = () => diplomaMetadata("beneficios-fiscais");

export default function Page() {
  return <DiplomaReader data={data as unknown as Diploma} />;
}
