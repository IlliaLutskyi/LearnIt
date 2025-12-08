import { User } from "next-auth";

export const isAdmin = (user?: User) => user?.role == "Admin";
export const isAuthor = (authorId: number, user?: User) => user?.id == authorId;
