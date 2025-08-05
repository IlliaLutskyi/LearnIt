import AdminBar from "@/components/admin/AdminBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Manage the site from the admin dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[1fr_4fr]">
      <div>
        <AdminBar />
      </div>
      <div className="bg-slate-200 px-4">{children}</div>
    </div>
  );
}
