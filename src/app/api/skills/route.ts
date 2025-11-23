import updateSkills from "@/features/skills/services/server/update-skills";

export async function PATCH(req: Request) {
  return await updateSkills(req);
}
