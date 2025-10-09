import { User } from "@/apis/auth/types";
import CardTradeForm from "@/components/mainBoard/CardTradeForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createWrapper } from "../setup";
import { toast } from "sonner";
import { usePostCardTrade } from "@/apis/trades/queries";
import { UseMutationResult } from "@tanstack/react-query";

vi.mock("@/apis/trades", () => ({
  PostCardTrade: vi.fn(),
}));

vi.mock("@/apis/trades/queries", () => ({
  usePostCardTrade: vi.fn(),
}));

const mockUser: User = {
  uid: "test-uid",
  email: "test@example.com",
  nickname: "테스트유저",
  friendId: "1234123412341234",
  createdAt: null,
};

describe("카드 거래글 작성", () => {
  const mockOnClose = vi.fn();
  const mockMutateAsync = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(usePostCardTrade).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof usePostCardTrade>);
  });

  it("모든 필드를 입력하면 게시글이 성공적으로 등록됨", async () => {
    const user = userEvent.setup();

    mockMutateAsync.mockResolvedValue({ success: true });

    render(<CardTradeForm user={mockUser} onClose={mockOnClose} />, {
      wrapper: createWrapper(),
    });

    const titleInput = screen.getByLabelText("제목");
    await user.type(titleInput, "테스트 제목");

    const contentInput = screen.getByLabelText("내용");
    await user.type(contentInput, "테스트 내용");

    const friendIdInput = screen.getByLabelText("친구 ID");
    expect(friendIdInput).toHaveValue(mockUser.friendId);

    const offerCardsInput = screen.getByLabelText("보유중인 카드");
    await user.type(offerCardsInput, "테스트 카드");
    await user.keyboard("{Enter}");

    const wantCardsInput = screen.getByLabelText("원하는 카드");
    await user.type(wantCardsInput, "테스트 카드");
    await user.keyboard("{Enter}");

    const submitButton = screen.getByRole("button", { name: /제출/i });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "테스트 제목",
          content: "테스트 내용",
          friendId: mockUser.friendId,
          offerCards: ["테스트 카드"],
          wantCards: ["테스트 카드"],
          authorName: mockUser.nickname,
          uid: mockUser.uid,
        })
      );
      expect(toast.success).toHaveBeenCalledWith("게시글 등록 완료");
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
