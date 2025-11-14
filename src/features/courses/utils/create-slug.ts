export function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`\s]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
