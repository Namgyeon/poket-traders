import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo } from ".";
import { UserInfoUpdateFormRequest } from "./types";

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserInfoUpdateFormRequest) => updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
