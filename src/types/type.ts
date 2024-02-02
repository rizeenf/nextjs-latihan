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
