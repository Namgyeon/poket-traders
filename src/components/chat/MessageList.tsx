import { useMessages } from "@/hooks/useChat";
import { useEffect, useRef } from "react";

interface MessageListProps {
  chatRoomId: string;
  currentUserId: string;
}

export default function MessageList({
  chatRoomId,
  currentUserId,
}: MessageListProps) {
  const { messages, loading, error } = useMessages(chatRoomId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-2 max-h-[300px] overflow-y-scroll bg-gray-100 rounded-lg p-4">
      {messages.map((message) => {
        const isMyMessage = currentUserId === message.senderId;
        return (
          <div
            key={message.id}
            className={`flex flex-col gap-1 ${
              isMyMessage ? "items-end" : "items-start"
            } `}
          >
            <div className="flex gap-1">
              <span
                className={`text-sm bg-gray-200 rounded-lg p-1 whitespace-nowrap self-start ${
                  isMyMessage ? "order-2" : "order-1"
                }`}
              >
                {message.senderName}
              </span>
              <span
                className={`p-2 font-semibold rounded-lg ${
                  isMyMessage ? "bg-amber-300 order-1" : "bg-sky-200 order-2"
                } break-all wrap-break-word`}
              >
                {message.text}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {message.createdAt.toLocaleString("ko-KR", {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
