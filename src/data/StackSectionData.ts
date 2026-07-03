import { myAIStack, myBackendTechStack, myDesignTools, myDevOpsAndCloudTools, myDevTools, myFrontEndTechStack, type TechItem } from "./StackData";

export interface MyStackSections {
  title: string;
  data: TechItem[];
}

export const myStackSections: MyStackSections[] = [
  {
    title: "Frontend Development",
    data: myFrontEndTechStack,
  },
  {
    title: "Backend, Databases & ORMs",
    data: myBackendTechStack,
  },
  {
    title: "AI / LLM & Analytics",
    data: myAIStack,
  },
  {
    title: "DevOps & Cloud",
    data: myDevOpsAndCloudTools,
  },
  {
    title: "Development Tools",
    data: myDevTools,
  },
  {
    title: "Design Tools",
    data: myDesignTools,
  },
];
