import { User } from "@/apis/auth/types";
import getRandomColor from "@/lib/utils/getRandomColor";

export default function Avatar({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-lg md:text-xl font-bold text-white
         rounded-full"
        style={{ backgroundColor: getRandomColor(user.nickname) }}
      >
        {user.nickname[0].toUpperCase()}
      </div>
      <p className="text-md md:text-lg font-semibold whitespace-nowrap">
        {user.nickname}
      </p>
    </div>
  );
}
