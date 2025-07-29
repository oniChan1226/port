import {
  BriefcaseBusiness,
  CodeXml,
  Flame,
  FolderPen,
  Layers,
  LayoutDashboard,
  Newspaper,
  Notebook,
  Phone,
  User,
} from "lucide-react";
import { SiGithub, SiHashnode, SiLinkedin, SiPeerlist } from "react-icons/si";

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
        label: "Services",
        href: "/services",
        icon: <Flame size={18} />,
        number: 2,
      },
      {
        label: "Experience",
        href: "/experience",
        icon: <BriefcaseBusiness size={18} />,
        number: 3,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: <CodeXml size={18} />,
        number: 4,
      },
      { label: "About", href: "/about", icon: <User size={18} />, number: 5 },
    ],
  },
  {
    group: "Resouces",
    links: [
      {
        label: "Articles",
        href: "/articles",
        icon: <FolderPen size={18} />,
        number: 6,
      },
      {
        label: "Stack",
        href: "/stack",
        icon: <Layers size={18} />,
        number: 7,
      },
      {
        label: "Feed",
        href: "/feed",
        icon: <Newspaper size={18} />,
        number: 8,
      },
    ],
  },
  {
    group: "Extras",
    links: [
      {
        label: "Guest Book",
        href: "/guest-book",
        icon: <Notebook size={18} />,
        number: "G",
      },
    ],
  },
  {
    group: "Connect",
    links: [
      {
        label: "Contact",
        href: "/contact",
        icon: <Phone size={18} />,
        number: "C",
      },
    ],
  },
];

export const ExternalLinksData = [
  {
    label: "Peerlist",
    href: "https://peerlist.io/fahadkhan",
    icon: <SiPeerlist size={18}/>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fahad-khan-72a639305/",
    icon: <SiLinkedin size={18}/>,
  },
  {
    label: "Hashnode",
    href: "https://www.linkedin.com/in/fahad-khan-72a639305/",
    icon: <SiHashnode size={18}/>,
  },
  {
    label: "Github",
    href: "https://github.com/oniChan1226",
    icon: <SiGithub size={18}/>,
  },
];
