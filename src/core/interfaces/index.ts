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
}

export interface IRole {
  id: number;
  title: string;
}

export interface IActer {
  id: number;
  avatar: IFile;
  name: string;
  slug: string;
  movies?: IMovie[];
  createdAt: string;
}

export interface ICategory {
  id: number;
  title: string;
  slug: string;
  movies?: IMovie[];
  createdAt: string;
}

export interface IComment {
  id: number;
  user: IUser;
  movie?: IMovie;
  text: string;
  createdAt: string;
}

export interface ICountry {
  id: number;
  title: string;
  slug: string;
  movie?: IMovie[];
  createdAt: string;
}

export interface IGenre {
  id: number;
  title: string;
  slug: string;
  movie?: IMovie[];
  createdAt: string;
}

export interface ISubscriptionType {
  id: number;
  title: string;
  price: number;
  poster: IFile;
  genres: IGenre[];
  countries: ICountry[];
  categories: ICategory[];
}

export interface IMovie {
  id: number;
  title: string;
  slug?: string;
  poster?: IFile;
  description?: string;
  isNew?: boolean;
  isSerial?: boolean;
  bySubscription?: boolean;
  imdb?: number;
  rating?: number;
  ageRemark?: number;
  year?: number;
  genres?: IGenre[];
  countries?: ICountry[];
  acters?: IActer[];
  comments?: IComment[];
  categories?: ICategory[];
  producers?: IProducer[];
  directors?: IDirector[];
  seasons?: ISeason[];
  treiler?: IFile;
  file?: IMovieFile;
}

export interface IMovieFile {
  id: number;
  movie?: IMovie;
  cd?: IFile;
  hd?: IFile;
  fullHD?: IFile;
  uHD?: IFile;
  createdAt: string;
}

export interface IProducer {
  id: number;
  avatar: IFile;
  name: string;
  slug: string;
  movie?: IMovie[];
  createdAt: string;
}

export interface IDirector {
  id: number;
  avatar: IFile;
  name: string;
  slug: string;
  movie?: IMovie[];
  createdAt: string;
}

export interface ISeason {
  id: number;
  season: number;
  movieId?: number;
  episodes: IEpisode[];
  createdAt: string;
}

export interface IEpisode {
  id: number;
  episode: number;
  seasonId?: number;
  file: IFile;
  createdAt: string;
}

export interface IUser {
  id: number;
  name: string;
  parent?: IUser;
  subUsers?: IUser[];
  contact?: IContact;
  role?: IRole;
  balance?: number;
  ageRemark?: number;
}

export interface IContact {
  email: string;
}

export interface IFile {
  id: number;
  name: string;
  url: string;
}
