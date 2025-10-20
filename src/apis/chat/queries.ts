import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChatRoomInfo,
  getMyChatRooms,
  getOrCreateChatRoom,
  sendMessage,
} from ".";
import { ChatRoom, CreateChatRoomParams, SendMessageParams } from "./types";

// 채팅방 생성,조회
export function useGetOrCreateChatRoom() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, CreateChatRoomParams>({
    mutationFn: getOrCreateChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myChatRooms"] });
    },
  });
}

// 메시지 보내기
export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, SendMessageParams>({
    mutationFn: sendMessage,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chatRoom", variables.chatRoomId],
      });
    },
  });
}

// 채팅방 정보 조회
export function useGetChatRoomInfo(chatRoomId: string | null) {
  return useQuery<ChatRoom | null, Error>({
    queryKey: ["chatRoom", chatRoomId],
    queryFn: () => getChatRoomInfo(chatRoomId!),
    enabled: !!chatRoomId,
  });
}

// 나의 채팅방 목록 조회
export function useGetMyChatRooms(userId: string) {
  return useQuery<string[], Error>({
    queryKey: ["myChatRooms", userId],
    queryFn: () => getMyChatRooms(userId),
    enabled: !!userId,
  });
}
