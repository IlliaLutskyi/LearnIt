export function extractFromJSON(json: string | undefined): string {
  if (!json) return " ";
  return json.match(/```json\s*([\s\S]*?)\s*```/)?.[1].trim() || "";
}
