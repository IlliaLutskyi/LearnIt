import api from "@/lib/axios";
import { DbCategory } from "@/types";

export async function getCategories(): Promise<DbCategory[] | undefined> {
  const res = await api.get("/categories");
  return res.data?.categories;
}
