import { UserPlus } from "lucide-react";
import { Card } from "@/components/card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { AvatarPhoto } from "@/components/avatar-photo";
import { staffMembers } from "@/lib/data";
import { seedFromName } from "@/lib/utils";

export default function StaffPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink">
            Staff and roles
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Manage team access and permissions · sample data
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep">
          <UserPlus className="h-4 w-4" />
          Invite staff
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <StatCard label="Team members" value="5" note="across 4 roles" accent="blue" />
        <StatCard label="Admins" value="2" note="full access" accent="brand" />
        <StatCard label="Support staff" value="2" note="orders and customers only" accent="amber" />
        <StatCard label="Pending invites" value="1" note="awaiting sign-in" accent="red" />
      </div>

      <Card className="p-0">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-soft text-left text-xs font-medium text-ink-faint">
              <th className="py-4 pl-6 font-medium">Staff</th>
              <th className="py-4 font-medium">Role</th>
              <th className="py-4 font-medium">Last active</th>
              <th className="py-4 pr-6 pl-6 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {staffMembers.map((member) => (
              <tr key={member.email}>
                <td className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <AvatarPhoto seed={seedFromName(member.name)} alt={member.name} size="sm" />
                    <div>
                      <p className="font-medium text-ink">{member.name}</p>
                      <p className="text-xs text-ink-soft">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-ink-soft">{member.role}</td>
                <td className="py-4 text-ink-soft">{member.lastActive}</td>
                <td className="py-4 pr-6 pl-6">
                  <StatusBadge status={member.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
