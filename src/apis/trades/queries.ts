import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GetCardTrade,
  GetCardTrades,
  GetComments,
  PostCardTrade,
  PostComment,
} from "@/apis/trades";
import { DocumentSnapshot } from "firebase/firestore";
import { PostCommentRequest } from "./types";

export const useGetCardTrades = () => {
  return useInfiniteQuery({
    queryKey: ["card-trades"],
    queryFn: ({ pageParam }) => GetCardTrades(pageParam as DocumentSnapshot),
    getNextPageParam: (lastPage) => lastPage.lastDoc,
    initialPageParam: undefined as DocumentSnapshot | undefined,
  });
};

export const useGetCardTrade = (id: string) => {
  return useQuery({
    queryKey: ["card-trade", id],
    queryFn: () => GetCardTrade(id),
    enabled: !!id,
  });
};

export const usePostCardTrade = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PostCardTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-trades"] });
    },
  });
};

export const useGetComments = (tradeId: string) => {
  return useInfiniteQuery({
    queryKey: ["comments", tradeId],
    queryFn: ({ pageParam }) =>
      GetComments(tradeId, pageParam as DocumentSnapshot),
    getNextPageParam: (lastPage) => lastPage.lastDoc,
    initialPageParam: undefined as DocumentSnapshot | undefined,
    enabled: !!tradeId,
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tradeId,
      commentData,
    }: {
      tradeId: string;
      commentData: PostCommentRequest;
    }) => PostComment(tradeId, commentData),
    onSuccess: (_, { tradeId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", tradeId] });
    },
  });
};
