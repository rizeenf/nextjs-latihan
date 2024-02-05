export type TUsers = {
  id: string;
  createdAt: Date;
  name: string;
  avatar: string;
  datas: Datas;
};

type Datas = {
  response: string;
  email: string;
  password: string;
};

export type TAuth = {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  password: string;
};
