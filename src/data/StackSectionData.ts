import { myBackendTechStack, myDesignTools, myDevOpsAndCloudTools, myDevTools, myFrontEndTechStack, type TechItem } from "./StackData";

export interface MyStackSections {
    title: string;
    data: TechItem[],
};

export const myStackSections = [
    {
        title: "Frontend Development",
        data: myFrontEndTechStack,
    },
    {
        title: "Backend Development",
        data: myBackendTechStack,
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