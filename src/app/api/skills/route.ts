import createSkill from "@/services/create-skill";
import updateSkills from "@/services/update-skills";

export async function POST(req: Request) {
  return await createSkill(req);
}
export async function PATCH(req: Request) {
  return await updateSkills(req);
}
