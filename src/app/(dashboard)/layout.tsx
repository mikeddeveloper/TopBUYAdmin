import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex h-full min-h-screen">
      <Sidebar userEmail={user?.email ?? ""} />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1400px] px-10 py-8">{children}</div>
      </main>
    </div>
  );
}
