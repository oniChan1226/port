import {
  BriefcaseBusiness,
  CodeXml,
  FolderPen,
  Layers,
  LayoutDashboard,
  User,
} from "lucide-react";

export const NavlinksData = [
  {
    group: "Main",
    links: [
      {
        label: "Explore",
        href: "/",
        icon: <LayoutDashboard size={18} />,
        number: 1,
      },
      {
        label: "Experience",
        href: "/experience",
        icon: <BriefcaseBusiness size={18} />,
        number: 2,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: <CodeXml size={18} />,
        number: 3,
      },
      { label: "About", href: "/about", icon: <User size={18} />, number: 4 },
    ],
  },
  {
    group: "Resouces",
    links: [
      {
        label: "Articles",
        href: "/articles",
        icon: <FolderPen size={18} />,
        number: 5,
      },
      {
        label: "Stack",
        href: "/stack",
        icon: <Layers size={18} />,
        number: 6,
      },
    ],
  },
];
