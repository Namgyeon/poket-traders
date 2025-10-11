import { useGetUser } from "@/apis/auth/queries";
import { User } from "@/apis/auth/types";
import { useAuth } from "@/hooks/useAuth";
import { UseQueryResult } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as tradesApi from "@/apis/trades";
import CommentForm from "@/components/mainBoard/CommentForm";
import { render, screen, waitFor } from "@testing-library/react";
import { createWrapper } from "@/test/setup";
import { toast } from "sonner";

vi.mock("@/apis/trades", async () => ({
  PostComment: vi.fn(),
}));

vi.mock("@/apis/auth/queries", async () => ({
  useGetUser: vi.fn(),
}));

vi.mock("@/hooks/useAuth", async () => ({
  useAuth: vi.fn(),
}));

describe("댓글 작성 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("로그인하고 friendId가 있는 사용자는 댓글 작성 성공", async () => {
    const user = userEvent.setup();
    const mockUser: User = {
      uid: "test-uid",
      email: "test@test.com",
      nickname: "test",
      createdAt: null,
      friendId: "1234123412341234",
    };

    vi.mocked(useGetUser).mockReturnValue({
      data: mockUser,
      isLoading: false,
      isError: false,
      isSuccess: true,
      status: "success",
      error: null,
    } as UseQueryResult<User, Error>);

    vi.mocked(useAuth).mockReturnValue({
      isUserHasFriendId: true,
    } as ReturnType<typeof useAuth>);

    vi.mocked(tradesApi.PostComment).mockResolvedValue("test-comment");

    render(<CommentForm tradeId="test-trade-id" />, {
      wrapper: createWrapper(),
    });

    await user.type(
      screen.getByPlaceholderText("댓글을 입력해주세요."),
      "테스트 댓글"
    );

    await user.click(screen.getByRole("button", { name: /댓글 작성/i }));

    await waitFor(() => {
      expect(tradesApi.PostComment).toHaveBeenCalledWith("test-trade-id", {
        content: "테스트 댓글",
        friendId: mockUser.friendId,
        authorId: mockUser.uid,
        authorName: mockUser.nickname,
      });

      expect(toast.success).toHaveBeenCalledWith("댓글 작성 완료");

      expect(screen.getByPlaceholderText("댓글을 입력해주세요.")).toHaveValue(
        ""
      );
    });
  });

  it("로그인하고 friendId가 없는 사용자는 댓글 실패", async () => {
    const user = userEvent.setup();
    const mockUser: User = {
      uid: "test-uid",
      email: "test@test.com",
      nickname: "test",
      createdAt: null,
      friendId: "",
    };

    vi.mocked(useGetUser).mockReturnValue({
      data: mockUser,
      isLoading: false,
      isError: false,
      isSuccess: true,
      status: "success",
      error: null,
    } as UseQueryResult<User, Error>);

    vi.mocked(useAuth).mockReturnValue({
      isUserHasFriendId: false,
    } as ReturnType<typeof useAuth>);

    render(<CommentForm tradeId="test-trade-id" />, {
      wrapper: createWrapper(),
    });

    await user.type(
      screen.getByPlaceholderText("댓글을 입력해주세요."),
      "테스트 댓글"
    );
    await user.click(screen.getByRole("button", { name: /댓글 작성/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "친구 ID가 설정되지 않았습니다."
      );
      expect(tradesApi.PostComment).not.toHaveBeenCalled();
    });
  });

  it("로그인하지 않은 사용자는 댓글 실패", async () => {
    const user = userEvent.setup();

    vi.mocked(useGetUser).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      isSuccess: true,
      status: "success",
      error: null,
    } as unknown as UseQueryResult<User, Error>);

    vi.mocked(useAuth).mockReturnValue({
      isUserHasFriendId: false,
    } as ReturnType<typeof useAuth>);

    render(<CommentForm tradeId="test-trade-id" />, {
      wrapper: createWrapper(),
    });

    await user.type(
      screen.getByPlaceholderText("댓글을 입력해주세요."),
      "테스트 댓글"
    );
    await user.click(screen.getByRole("button", { name: /댓글 작성/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("로그인 후 이용해주세요.");
      expect(tradesApi.PostComment).not.toHaveBeenCalled();
    });
  });
});
