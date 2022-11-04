import { DifficultyLevel, Gender } from "core/utils/enums";
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
  email: string;
  password: string;
}

export interface IAutoComplete {
  index: string;
  search: string;
  filter?: string[];
}

export interface IRole {
  id: number;
  title: string;
}

export type ITranslate = {
  ru: string;
  uz: string;
};

export interface ICategory {
  id: number;
  title: ITranslate;
  poster?: IFile;
}

export interface IMaterial {
  id: number;
  title: ITranslate;
  description?: ITranslate;
}

export interface IBanner {
  id: number;
  title: ITranslate;
  description: ITranslate;
  poster: IFile;
  active: boolean;
}

export interface ISubscriptionType {
  id: number;
  title: ITranslate;
  description?: ITranslate;
  months: number;
  price: number;
}

export interface ILesson {
  id: number;
  title: ITranslate;
  description?: ITranslate;
  poster?: IFile;
  video?: IFile;
  free: boolean;
  difficultyLevel: DifficultyLevel;
  genders: Gender[];
  categories: ICategory[];
  materials: IMaterial[];
}

export interface IUser {
  id: number;
  name: string;
  contact: IContact;
  firstDevice?: string;
  secondDevice?: string;
  role: IRole;
  balance?: number;
  activeBefore: Date;
}

export interface IContact {
  email: string;
}

export interface IFile {
  id: number;
  name: string;
  url: string;
}
