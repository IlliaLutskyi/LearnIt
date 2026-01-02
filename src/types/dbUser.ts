export type DbUser = {
  id: string;
  name: string;
  role?: "Admin" | "User";
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
