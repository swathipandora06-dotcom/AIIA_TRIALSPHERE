import { TrialTwinDashboard } from "@/components/trialsphere/TrialSphereShell";

export function meta() {
  return [
    { title: "Trial operations · AIIA TrialSphere" },
    { name: "description", content: "Synthetic Ayurveda clinical-trial operations and digital twin prototype." },
  ];
}

export default function HomeRoute() {
  return <TrialTwinDashboard />;
}
