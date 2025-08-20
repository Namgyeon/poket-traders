import { User } from "@/apis/auth/types";

export default function Avatar({ user }: { user: User }) {
  return (
    <div>
      <p>{user.nickname}</p>
    </div>
  );
}
