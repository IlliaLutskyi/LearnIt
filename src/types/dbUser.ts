export type DbUser = {
  id: number;
  name: string;
  role?: "Admin" | "User";
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
