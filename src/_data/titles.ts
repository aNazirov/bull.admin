import {
  ColorSwatchIcon,
  FilmIcon,
  SwitchHorizontalIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/solid";
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
    name: "Фильмы",
    href: "/movies",
    icon: FilmIcon,
    permissions: [RoleType.Admin, RoleType.Moderator],
    current: false,
  },
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
  {
    name: "Продюсеры",
    href: "/producers",
    icon: UserCircleIcon,
    permissions: [RoleType.Admin, RoleType.Moderator],
    current: false,
  },
  {
    name: "Категории",
    href: "/categories",
    icon: ColorSwatchIcon,
    permissions: [RoleType.Admin, RoleType.Moderator],
    current: false,
  },
  {
    name: "Пользователи",
    href: "/users",
    icon: UserIcon,
    permissions: [RoleType.Admin, RoleType.Moderator],
    current: false,
  },
];

export const GenreTableNames = ["Название", "Slug", THead.edit];
export const CategoryTableNames = ["Название", "Slug", THead.edit];

export const UserTableNames = ["Имя", "Email", "Роль", THead.edit];
export const MovieTableNames = [
  "Название",
  "Жанры",
  "Категории",
  "Страны",
  THead.edit,
];

export const ActerTableNames = [THead.avatar, "Имя", "Slug", THead.edit];
export const ProducerTableNames = [THead.avatar, "Имя", "Slug", THead.edit];
