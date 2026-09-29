import { TrialRegistry } from "@/components/trialsphere/TrialSphereShell";

export function meta() {
  return [
    { title: "Public trial registry · AIIA TrialSphere" },
    { name: "description", content: "Search synthetic Ayurveda clinical-trial records in the TrialSphere sandbox registry." },
  ];
}

export default function RegistryRoute() {
  return <TrialRegistry />;
}
