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
  phone: string;
  password: string;
}

export interface IAutoComplete {
  index: string;
  search: string;
  filter?: string[];
}

export interface IUser {
  id: number;
  name: string;
  phone?: string;
  role?: IRole;
  orders?: IOrder[];
  bonuses?: number;
  cashback?: number;
  password?: string;
}

export interface IRole {
  id: number;
  title: string;
}

export interface IOrder {
  id: number;
  status: IOrderStatus;
  user?: IUser;
  items?: IItem[];
  summa?: number;
  createdAt?: Date;
}

export interface IOrderStatus {
  id: number;
  title: string;
}

export interface IItem {
  id: number;
  title: string;
  price?: number;
  byBonus?: boolean;
}
