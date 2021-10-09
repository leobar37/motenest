export interface IContact {
  id: string | null;
  name: string;
  lastName: string;
  phone: string;
  description: string;
}

export enum ModeReuForm {
  CREATE,
  EDIT,
}
