export type PhoneBookType = {
  id?: number;
  phone: string;
  name: string;
  surname?: string;
  secondName?: string;
  email?: string;
  description?: string;
}

export enum PhoneBookValidationEnum {
  CREATE,
  READ,
  LIST,
  UPDATE,
  DELETE,
}
