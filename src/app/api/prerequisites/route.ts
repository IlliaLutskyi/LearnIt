import createPrerequisite from "@/features/prerequisites/services/api/create-prerequisite";
import updatePrerequisites from "@/features/prerequisites/services/api/update-prerequisites";

export async function POST(req: Request) {
  return await createPrerequisite(req);
}
export async function PATCH(req: Request) {
  return await updatePrerequisites(req);
}
