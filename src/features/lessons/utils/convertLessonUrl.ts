import { DbVideoSource } from "@/types";

export function convertLessonUrl(url: string, videoSource: DbVideoSource) {
  if (videoSource == "Youtube") {
    const convertedUrl = new URL(url);
    const id = convertedUrl.searchParams.get("v");
    return `https://www.youtube.com/embed/${id}`;
  }
}
