import { SwitchHorizontalIcon, UserIcon } from "@heroicons/react/solid";
import { RoleType, THead } from "utils/enums";

export const navigation = [
  {
    name: "Inboxes",
    href: "#",
    children: [
      { name: "Technical Support", href: "#" },
      { name: "Sales", href: "#" },
      { name: "General", href: "#" },
    ],
  },
  { name: "Reporting", href: "#", children: [] },
  { name: "Settings", href: "#", children: [] },
];

export const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Sign out", href: "/login" },
];

export const sidebarNavigation = [
  {
    name: "Жанры",
    href: "/genres",
    icon: SwitchHorizontalIcon,
    permissions: [RoleType.Admin, RoleType.Moderator],
    current: false,
  },
  {
    name: "Актеры",
    href: "/acters",
    icon: UserIcon,
    permissions: [RoleType.Admin, RoleType.Moderator],
    current: false,
  },
];

export const GenreTableNames = ["Название", "Slug", THead.edit];

export const ActerTableNames = [THead.avatar, "Имя", "Slug", THead.edit];
export const ProducerTableNames = [THead.avatar, "Имя", "Slug", THead.edit];

