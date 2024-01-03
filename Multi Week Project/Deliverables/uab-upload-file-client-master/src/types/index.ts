export interface User {
  id: number;
  username: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface Attachment {
  id: number;
  userid: number;
  filename: string;
  link: string;
  createdat: string;
}

export type UploadPageView = "upload" | "success-message";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
