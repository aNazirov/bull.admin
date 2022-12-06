import {
  ColorSwatchIcon,
  DocumentTextIcon,
  PhotographIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { RoleType, THead } from "core/utils/enums";

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
    name: "Пользователи",
    href: "/users",
    icon: UserIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Баннеры",
    href: "/banners",
    icon: PhotographIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Контексты",
    href: "/contexts",
    icon: DocumentTextIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Цепочки",
    href: "/chains",
    icon: ColorSwatchIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
];

export const BannerTableNames = [
  "Название",
  "Размер",
  "Цена",
  "Ряд",
  "Раздел",
  "Позиция",
  THead.edit,
];

export const ChainTableNames = ["Цена", "Активный", THead.edit];
export const ContextTableNames = ["Название", "Цена", "Приоритет", THead.edit];

export const UserTableNames = ["Имя", "Email", "Роль", THead.edit];
