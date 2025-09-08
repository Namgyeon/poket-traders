import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCardTrade, GetCardTrades, PostCardTrade } from ".";

export const useGetCardTrades = () => {
  return useQuery({
    queryKey: ["card-trades"],
    queryFn: GetCardTrades,
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
