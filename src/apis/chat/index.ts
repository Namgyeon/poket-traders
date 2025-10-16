import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { ChatRoom, CreateChatRoomParams, SendMessageParams } from "./types";
import { db } from "@/lib/firebase";

export async function getOrCreateChatRoom(
  params: CreateChatRoomParams
): Promise<string> {
  const {
    currentUserId,
    currentUserNickname,
    otherUserId,
    otherUserNickname,
    currentUserAvatar,
    otherUserAvatar,
  } = params;

  // 이미 존재하는 채팅방 찾기
  const chatRoomRef = collection(db, "chatRooms");
  const q = query(
    chatRoomRef,
    where("participants", "array-contains", currentUserId)
  );

  const querySnapshot = await getDocs(q);

  // 두 사용자가 모두 참여하는 채팅방 찾기
  let existingChatRoomId: string | null = null;
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.participants.includes(otherUserId)) {
      existingChatRoomId = doc.id;
    }
  });

  if (existingChatRoomId) {
    return existingChatRoomId;
  }

  // 없으면 새로 생성
  const newChatRoomRef = doc(collection(db, "chatRooms"));
  await setDoc(newChatRoomRef, {
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

  return newChatRoomRef.id;
}

// 메시지 보내기
export async function sendMessage(params: SendMessageParams): Promise<void> {
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
}

// 채팅방 정보 가져오기
export async function getChatRoomInfo(
  chatRoomId: string
): Promise<ChatRoom | null> {
  const chatRoomRef = doc(db, "chatRooms", chatRoomId);
  const chatRoomsSnap = await getDoc(chatRoomRef);

  if (!chatRoomsSnap.exists()) {
    return null;
  }

  const data = chatRoomsSnap.data();
  return {
    id: chatRoomsSnap.id,
    participants: data.participants,
    participantInfo: data.participantInfo,
    lastMessage: data.lastMessage,
    lastMessageAt: data.lastMessageAt?.toDate(),
    createdAt: data.createdAt?.toDate(),
  };
}
