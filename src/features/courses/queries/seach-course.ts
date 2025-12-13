import api from "@/lib/axios";
import { DbCourse } from "@/types";
import { isAxiosError } from "axios";

export async function searchCourse(
  keyword: string,
  signal: AbortSignal,
  params?: {
    limit: number;
  }
): Promise<{ courses: DbCourse[]; message: string }> {
  const res = await api.get(`/courses/search`, {
    signal,
    params: { keyword, limit: params?.limit },
  });
  return res.data;
}
