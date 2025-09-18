import { doc, updateDoc } from "firebase/firestore";
import { UserInfoUpdateFormRequest } from "./types";
import { auth, db } from "@/lib/firebase";

export async function updateUserInfo(data: UserInfoUpdateFormRequest) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("로그인이 필요합니다.");

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      nickname: data.nickname,
      friendId: data.friendId,
    });
    return {
      success: true,
      message: "사용자 정보가 성공적으로 업데이트되었습니다.",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("사용자 정보 업데이트 오류:", error.message);
      throw error;
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}
