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
} from "firebase/firestore";
import { CardTrade, Comment, PostCardTradeRequest } from "./types";
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
    console.error("Error getting card trades: ", error);
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
    console.error("Error getting card trade: ", error);
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
    console.error("Error adding document: ", error);
    throw error;
  }
}

// 댓글 작성
export async function PostComment(tradeId: string, commentData: Comment) {
  try {
    const commentsRef = collection(db, "card-trade", tradeId, "comments");
    const docRef = await addDoc(commentsRef, {
      ...commentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding comment: ", error);
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
      orderBy("createdAt", "desc"),
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
    console.error("Error getting comments infinite: ", error);
    throw error;
  }
}
