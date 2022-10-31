import {
  AcademicCapIcon,
  CollectionIcon,
  ColorSwatchIcon,
  CreditCardIcon,
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
    name: "Уроки",
    href: "/lessons",
    icon: AcademicCapIcon,
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
    name: "Подписки",
    href: "/subsctiption-type",
    icon: CreditCardIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Категории",
    href: "/categories",
    icon: CollectionIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Материалы",
    href: "/materials",
    icon: ColorSwatchIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Пользователи",
    href: "/users",
    icon: UserIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
];

export const GenreTableNames = ["Название", "Slug", THead.edit];
export const CategoryTableNames = ["Название", THead.edit];

export const MaterialTableNames = ["Название", THead.edit];
export const BannerTableNames = ["Название", "Активный", THead.edit];

export const UserTableNames = ["Имя", "Email", "Роль", THead.edit];
export const LessonTableNames = [
  "Название",
  "Тематики",
  "Материалы",
  "Бесплатный",
  THead.edit,
];

export const SubscriptionTypeTableNames = [
  "Название",
  "Продолжительность",
  "Цена",
  THead.edit,
];
