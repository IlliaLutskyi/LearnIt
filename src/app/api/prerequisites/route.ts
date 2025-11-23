import updatePrerequisites from "@/features/prerequisites/services/api/update-prerequisites";

export async function PATCH(req: Request) {
  return await updatePrerequisites(req);
}
