import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { UserInfoUpdateFormRequest } from "./types";
import { auth, db } from "@/lib/firebase";

export async function updateUserInfo(data: UserInfoUpdateFormRequest) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("로그인이 필요합니다.");

    const batch = writeBatch(db);

    // 사용자 정보 업데이트
    const userRef = doc(db, "users", user.uid);
    batch.update(userRef, {
      nickname: data.nickname,
      friendId: data.friendId,
    });

    // 사용자가 작성한 모든 게시글의 닉네임 업데이트
    const cardTradesQuery = query(
      collection(db, "card-trade"),
      where("uid", "==", user.uid)
    );
    const cardTradesSnapshot = await getDocs(cardTradesQuery);

    cardTradesSnapshot.forEach((docSnapshot) => {
      const tradeRef = doc(db, "card-trade", docSnapshot.id);
      batch.update(tradeRef, {
        authorName: data.nickname,
        friendId: data.friendId,
      });
    });

    // 3. 사용자가 작성한 모든 댓글의 authorName 업데이트
    const userCommentsQuery = query(
      collection(db, "users", user.uid, "comments")
    );
    const userCommentsSnapshot = await getDocs(userCommentsQuery);

    for (const commentDoc of userCommentsSnapshot.docs) {
      const commentData = commentDoc.data();
      if (commentData.tradeId && commentData.commentId) {
        // 각 게시글의 댓글 컬렉션에서도 업데이트
        const commentRef = doc(
          db,
          "card-trade",
          commentData.tradeId,
          "comments",
          commentData.commentId
        );
        batch.update(commentRef, {
          authorName: data.nickname,
          friendId: data.friendId,
        });
      }

      // 사용자별 댓글 컬렉션도 업데이트
      const userCommentRef = doc(
        db,
        "users",
        user.uid,
        "comments",
        commentDoc.id
      );
      batch.update(userCommentRef, {
        authorName: data.nickname,
        friendId: data.friendId,
      });
    }

    // 모든 업데이트를 한 번에 실행
    await batch.commit();
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
