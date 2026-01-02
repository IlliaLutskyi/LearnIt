import { User } from "next-auth";

export const isAdmin = (user?: User) => user?.role == "Admin";
export const isAuthor = (authorId: string, user?: User) => user?.id == authorId;
