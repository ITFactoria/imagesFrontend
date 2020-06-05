export interface IRespuestaPosts {
  ok: boolean;
  posts: IPost[];
}

export interface IPost {
  imgs?: any[];
  _id: string;
  message?: string;
  coordenadas?: string;
  user: IUser;
  created: string;
  
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  password?: string
}

export interface ILogin {
  ok: boolean;
  token: string;
}