import { Message } from "@/apis/chat/types";
import { db } from "@/lib/firebase";
import { getErrorMessage } from "@/lib/utils/errorMessage";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useMessages(chatRoomId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chatRoomId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const messagesRef = collection(db, "chatRooms", chatRoomId, "messages");

    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newMessages: Message[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          newMessages.push({
            id: doc.id,
            text: data.text,
            senderId: data.senderId,
            senderName: data.senderName,
            createdAt: data.createdAt?.toDate() || new Date(),
            isRead: data.isRead,
          });
        });

        setMessages(newMessages);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("채팅 메시지 가져오기 오류: ", error);
        setError(getErrorMessage(error));
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [chatRoomId]);

  return { messages, loading, error };
}
