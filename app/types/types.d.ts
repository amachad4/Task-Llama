export type Task = {
  id: string;
  title: string;
  deadline: string;
  created_at: string;
  updated_at: string;
  category_lkp_id: string;
  status_lkp_id: number;
};

export interface User {
  displayName: string;
  token: string;
  username: string;
}

export interface CreateTaskErrorsObject {
  titleError: boolean;
  deadlineError: boolean;
  categoryError: boolean;
}

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
