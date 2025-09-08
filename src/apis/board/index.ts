import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { PostCardTradeRequest } from "./types";
import { db } from "@/lib/firebase";

// 모든 카드 트레이드 게시글 가져오기
export async function GetCardTrades() {
  try {
    // 최신순으로 정렬된 게시글 가져오기
    const q = query(collection(db, "card-trade"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const trades = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return trades;
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
