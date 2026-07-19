import type { Metadata } from "next";
import dashboard from "../../analytics/data/processed/dashboard.json";
import PeerModel from "./peer-model";

export const metadata: Metadata = {
  title: "How far from normal? — The Messi Index",
  description: "Lionel Messi measured in standard deviations against qualified La Liga forwards.",
};

export default function PeerModelPage() {
  return <PeerModel data={dashboard} />;
}

