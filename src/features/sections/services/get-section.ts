import api from "@/lib/axios";
import { DbNextOrPrevSection, DbSection } from "@/types";
export type Data = {
  section: DbSection;
  prevSection: DbNextOrPrevSection | null;
  nextSection: DbNextOrPrevSection | null;
};
export async function getSection(
  courseSlug: string,
  sectionSlug: string
): Promise<Data> {
  const res = await api.get(`/sections/${courseSlug}/${sectionSlug}`);
  return res.data;
}
