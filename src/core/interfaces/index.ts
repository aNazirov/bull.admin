import {
  BannerComponent,
  BannerPosition,
  BannerSize,
  ContextPriority,
} from "core/utils/enums";

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
  size: BannerSize;
  price: number;
  index?: number;
  position: BannerPosition;
  component: BannerComponent;
}

export interface IBanner {
  id: number;
  type: IBannerType;
  poster: IFile;
  url: string;
  activeAt: string;
}

export interface IChainType {
  id: number;
  price: number;
  active: boolean;
}

export interface IChain {
  id: number;
  type: IChainType;
  url: string;
  title: string;
  activeAt: string;
}

export interface IContextType {
  id: number;
  name: string;
  price: number;
  priority: ContextPriority;
}

export interface IContext {
  id: number;
  type: IContextType;
  url: string;
  title: string;
  description?: string;
  activeAt: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: IRole;
  contexts: IContext[];
  banners: IBanner[];
  chains: IChain[];

  balance?: number;
}

export interface IFile {
  id: number;
  name: string;
  url: string;
}
