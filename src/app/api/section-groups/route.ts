import { orderSectionGroups } from "@/features/sections/services/server/order-section-groups";

export async function PATCH(req: Request) {
  return await orderSectionGroups(req);
}
