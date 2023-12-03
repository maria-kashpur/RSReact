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

export interface FormFields {
  name: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  gender: HTMLInputElement;
  password: HTMLInputElement;
  passwordRepeat: HTMLInputElement;
  files: HTMLInputElement;
  accept: HTMLInputElement;
  country: HTMLInputElement;
}
export interface Errors {
  name?: string;
  age?: string;
  email?: string;
  gender?: string;
  password?: string;
  passwordRepeat?: string;
  files?: string;
  accept?: string;
  country?: string;
}
