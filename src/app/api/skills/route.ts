import createSkill from "@/features/skills/services/api/create-skill";
import updateSkills from "@/features/skills/services/api/update-skills";

export async function POST(req: Request) {
  return await createSkill(req);
}
export async function PATCH(req: Request) {
  return await updateSkills(req);
}
