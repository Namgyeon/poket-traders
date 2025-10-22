import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ChatRoom, CreateChatRoomParams, SendMessageParams } from "./types";
import { db } from "@/lib/firebase";
import { getErrorMessage } from "@/lib/utils/errorMessage";

export async function getOrCreateChatRoom(
  params: CreateChatRoomParams
): Promise<string> {
  try {
    const {
      tradeCardId,
      tradeCardTitle,
      currentUserId,
      currentUserNickname,
      otherUserId,
      otherUserNickname,
      currentUserAvatar,
      otherUserAvatar,
    } = params;

    const chatKey = `${tradeCardId}_${otherUserId}`;
    const reverseChatKey = `${tradeCardId}_${currentUserId}`;

    const currentUserDoc = await getDoc(doc(db, "users", currentUserId));
    const chatRoomMap = currentUserDoc.data()?.chatRoomMap || {};

    if (chatRoomMap[chatKey]) {
      return chatRoomMap[chatKey];
    }

    const otherUserDoc = await getDoc(doc(db, "users", otherUserId));
    const otherUserChatRoomMap = otherUserDoc.data()?.chatRoomMap || {};

    if (otherUserChatRoomMap[reverseChatKey]) {
      await updateDoc(doc(db, "users", currentUserId), {
        [`chatRoomMap.${chatKey}`]: otherUserChatRoomMap[reverseChatKey],
      });
      return otherUserChatRoomMap[reverseChatKey];
    }

    // 없으면 새로 생성
    const newChatRoomRef = doc(collection(db, "chatRooms"));
    await setDoc(newChatRoomRef, {
      tradeCardId,
      tradeCardTitle,
      participants: [currentUserId, otherUserId],
      participantInfo: {
        [currentUserId]: {
          name: currentUserNickname,
          avatar: currentUserAvatar || null,
        },
        [otherUserId]: {
          name: otherUserNickname,
          avatar: otherUserAvatar || null,
        },
      },
      createdAt: serverTimestamp(),
      lastMessage: null,
      lastMessageAt: null,
    });

    await updateDoc(doc(db, "users", currentUserId), {
      [`chatRoomMap.${chatKey}`]: newChatRoomRef.id,
    });

    await updateDoc(doc(db, "users", otherUserId), {
      [`chatRoomMap.${reverseChatKey}`]: newChatRoomRef.id,
    });

    return newChatRoomRef.id;
  } catch (error) {
    console.error("채팅방 생성 오류:", getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
}

// 메시지 보내기
export async function sendMessage(params: SendMessageParams): Promise<void> {
  try {
    const { chatRoomId, senderId, senderName, senderAvatar, text } = params;

    const messageRef = collection(db, "chatRooms", chatRoomId, "messages");
    await addDoc(messageRef, {
      text,
      senderId,
      senderName,
      senderAvatar: senderAvatar || null,
      createdAt: serverTimestamp(),
      isRead: false,
    });

    // 채팅방의 lastMessage 업데이트
    const chatRoomRef = doc(db, "chatRooms", chatRoomId);
    await setDoc(
      chatRoomRef,
      {
        lastMessage: text,
        lastMessageAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  } catch (error) {
    console.error("메시지 보내기 오류:", getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
}

// 채팅방 정보 가져오기
export async function getChatRoomInfo(
  chatRoomId: string
): Promise<ChatRoom | null> {
  try {
    const chatRoomRef = doc(db, "chatRooms", chatRoomId);
    const chatRoomsSnap = await getDoc(chatRoomRef);

    if (!chatRoomsSnap.exists()) {
      return null;
    }

    const data = chatRoomsSnap.data();
    return {
      id: chatRoomsSnap.id,
      tradeCardId: data.tradeCardId,
      tradeCardTitle: data.tradeCardTitle,
      participants: data.participants,
      participantInfo: data.participantInfo,
      lastMessage: data.lastMessage,
      lastMessageAt: data.lastMessageAt?.toDate(),
      createdAt: data.createdAt?.toDate(),
    };
  } catch (error) {
    console.error("채팅방 정보 가져오기 오류:", getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
}

// 나의 채팅방 목록 가져오기
export async function getMyChatRooms(userId: string): Promise<ChatRoom[]> {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    const chatRoomMap = userDoc.data()?.chatRoomMap || {};
    const chatRoomIds = Object.values(chatRoomMap) as string[];

    if (chatRoomIds.length === 0) return [];

    const chatRoomsPromises = chatRoomIds.map((id) => getChatRoomInfo(id));
    const chatRooms = await Promise.all(chatRoomsPromises);

    return chatRooms
      .filter((room) => room !== null)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error("나의 채팅방 목록 가져오기 오류:", getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
}
