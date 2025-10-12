import createPrerequisite from "@/services/create-prerequisite";
import updatePrerequisites from "@/services/update-prerequisites";

export async function POST(req: Request) {
  return await createPrerequisite(req);
}
export async function PATCH(req: Request) {
  return await updatePrerequisites(req);
}
