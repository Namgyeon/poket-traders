import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo } from ".";
import { UserInfoUpdateFormRequest } from "./types";

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserInfoUpdateFormRequest) => updateUserInfo(data),
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["cardTrades"] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}
