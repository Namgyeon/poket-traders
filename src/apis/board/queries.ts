import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GetCardTrade, GetCardTrades, PostCardTrade } from ".";
import { DocumentSnapshot } from "firebase/firestore";

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
