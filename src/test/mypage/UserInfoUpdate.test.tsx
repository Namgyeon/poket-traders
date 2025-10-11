import { beforeEach, describe, expect, it, vi } from "vitest";
import * as userApi from "@/apis/user";
import UserInfoUpdateForm from "@/components/mypage/UserInfoUpdateForm";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { toast } from "sonner";
import { createWrapper } from "@/test/setup";
import { useGetUser } from "@/apis/auth/queries";
import { UseQueryResult } from "@tanstack/react-query";
import { User } from "@/apis/auth/types";

vi.mock("@/apis/user", () => ({
  updateUserInfo: vi.fn(),
}));

vi.mock("@/apis/auth/queries", () => ({
  useGetUser: vi.fn(),
}));

describe("사용자 정보 수정 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useGetUser).mockReturnValue({
      data: {
        uid: "test-uid",
        email: "test@example.com",
        nickname: "기존닉네임",
        friendId: "1234567890123456",
        createdAt: null,
      },
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
      status: "success",
    } as UseQueryResult<User, Error>);
  });

  it("사용자 정보가 성공적으로 수정됨", async () => {
    const user = userEvent.setup();
    const nickname = `test${Math.floor(Math.random() * 10000)}`;
    const friendId = `${Math.floor(
      1000000000000000 + Math.random() * 9000000000000000
    )}`;

    vi.mocked(userApi.updateUserInfo).mockResolvedValue({
      success: true,
      message: "사용자 정보가 성공적으로 수정되었습니다.",
    });

    render(<UserInfoUpdateForm />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(screen.getByLabelText("닉네임")).toHaveValue("기존닉네임");
    });

    const nicknameInput = screen.getByLabelText("닉네임");
    const friendIdInput = screen.getByLabelText("친구 ID");

    await user.clear(nicknameInput);
    await user.clear(friendIdInput);

    await waitFor(() => {
      expect(nicknameInput).toHaveValue("");
      expect(friendIdInput).toHaveValue("");
    });

    await user.type(nicknameInput, nickname);
    await user.type(friendIdInput, friendId);

    const submitButton = screen.getByRole("button", { name: /정보 수정/i });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(
      () => {
        expect(userApi.updateUserInfo).toHaveBeenCalledWith({
          nickname,
          friendId,
        });
        expect(toast.success).toHaveBeenCalledWith(
          "사용자 정보가 성공적으로 업데이트되었습니다."
        );
      },
      { timeout: 5000 }
    );
  });
});
