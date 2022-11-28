import { BannerPosition, ContextPriority } from "core/utils/enums";
import { ReactElement } from "react";

export interface ILinkObj {
  name: string;
  href: string;
  icon: ReactElement;
  current: boolean;
}

export interface IStatus {
  id: number;
  title: string;
}

export interface IType {
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILogin {
  login: string;
  password: string;
}

export interface IRole {
  id: number;
  title: string;
}

export interface IBannerType {
  id: number;
  name: string;
  size: string;
  price: number;
  index?: number;
  position: BannerPosition;
}

export interface IChainType {
  id: number;
  price: number;
  active: boolean;
}

export interface IContextType {
  id: number;
  name: string;
  price: number;
  priority: ContextPriority;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: IRole;
  balance?: number;
}

export interface IFile {
  id: number;
  name: string;
  url: string;
}
