export interface IForm {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  passwordRepeat: string;
  files: FileList;
  accept: boolean;
  country: string;
}

export interface IProfile {
  name: string;
  age: number;
  email: string;
  gender: string;
  accept: boolean;
  file: string;
  country: string;
  password: string;
}
