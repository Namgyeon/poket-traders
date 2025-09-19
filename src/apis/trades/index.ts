import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  writeBatch,
} from "firebase/firestore";
import {
  CardTrade,
  Comment,
  PostCardTradeRequest,
  PostCommentRequest,
} from "./types";
import { db } from "@/lib/firebase";

// 모든 카드 트레이드 게시글 가져오기
export async function GetCardTrades(
  lastDoc: DocumentSnapshot
): Promise<{ trades: CardTrade[]; lastDoc: DocumentSnapshot | null }> {
  try {
    let q = query(
      collection(db, "card-trade"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const trades = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as CardTrade[];
    return {
      trades,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("트레이드 카드 리스트 가져오기 오류: ", error);
    throw error;
  }
}

// 특정 카드 트레이드 게시글 가져오기
export async function GetCardTrade(id: string) {
  try {
    const docRef = await doc(db, "card-trade", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error("No such document");
    }
  } catch (error) {
    console.error("트레이드 카드 가져오기: ", error);
    throw error;
  }
}

// 카드 트레이드 게시글 작성
export async function PostCardTrade(data: PostCardTradeRequest) {
  try {
    const docRef = await addDoc(collection(db, "card-trade"), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("트레이드 카드 작성 오류: ", error);
    throw error;
  }
}

// 댓글 작성
export async function PostComment(
  tradeId: string,
  commentData: PostCommentRequest
) {
  try {
    const batch = writeBatch(db);

    const commentsRef = collection(db, "card-trade", tradeId, "comments");
    const commentDocRef = doc(commentsRef);

    const userCommentsRef = collection(
      db,
      "users",
      commentData.authorId,
      "comments"
    );
    const userCommentDocRef = doc(userCommentsRef);

    const commentDataWithTimestamp = {
      ...commentData,
      createdAt: serverTimestamp(),
      tradeId,
    };

    batch.set(commentDocRef, commentDataWithTimestamp);
    batch.set(userCommentDocRef, {
      ...commentDataWithTimestamp,
      commentId: commentDocRef.id,
    });

    await batch.commit();
    return commentDocRef.id;
  } catch (error) {
    console.error("댓글 작성 오류: ", error);
    throw error;
  }
}

// 댓글 가져오기
export async function GetComments(
  tradeId: string,
  lastDoc: DocumentSnapshot
): Promise<{ comments: Comment[]; lastDoc: DocumentSnapshot | null }> {
  try {
    let q = query(
      collection(db, "card-trade", tradeId, "comments"),
      orderBy("createdAt", "asc"),
      limit(6)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as Comment[];

    return {
      comments,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("댓글 가져오기 오류: ", error);
    throw error;
  }
}

// 사용자별 댓글 조회
export async function GetUserComments(
  userId: string,
  lastDoc: DocumentSnapshot
): Promise<{ comments: Comment[]; lastDoc: DocumentSnapshot | null }> {
  try {
    const userCommentsRef = collection(db, "users", userId, "comments");
    let q = query(userCommentsRef, orderBy("createdAt", "desc"), limit(10));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as Comment[];

    return {
      comments,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("사용자별 댓글 조회 오류: ", error);
    throw error;
  }
}
