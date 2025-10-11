import userEvent from "@testing-library/user-event";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { describe } from "node:test";
import { beforeEach, expect, it, vi } from "vitest";
import * as authApi from "@/apis/auth";
import { User } from "@/apis/auth/types";
import SignupForm from "@/components/auth/SignupForm";
import { render, screen, waitFor } from "@testing-library/react";
import { createWrapper } from "../setup";
import { toast } from "sonner";

vi.mock("@/apis/auth", () => ({
  signup: vi.fn(),
}));

const mockUser = {
  email: "test@test.com",
  nickname: "테스트코드유저",
  friendId: "4321432143214321",
  password: "qwer1234",
  confirmPassword: "qwer1234",
};

const mockUserResponse: User = {
  uid: "test-uid",
  email: mockUser.email,
  nickname: mockUser.nickname,
  friendId: mockUser.friendId,
  createdAt: null,
};

describe("회원가입 테스트", () => {
  let mockPush: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockPush = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as unknown as AppRouterInstance);
  });

  it("일반 회원가입 성공 시 홈페이지로 리다이렉트되어야 함", async () => {
    const user = userEvent.setup();

    vi.mocked(authApi.signup).mockResolvedValue(mockUserResponse);

    render(<SignupForm />, {
      wrapper: createWrapper(),
    });

    await user.type(screen.getByLabelText("Email Address"), mockUser.email);
    await user.type(screen.getByLabelText("Nickname"), mockUser.nickname);
    await user.type(screen.getByLabelText("Friend ID"), mockUser.friendId);
    await user.type(screen.getByLabelText("Password"), mockUser.password);
    await user.type(
      screen.getByLabelText("Confirm Password"),
      mockUser.confirmPassword
    );

    const submitButton = screen.getByRole("button", { name: /회원가입/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(authApi.signup).toHaveBeenCalledWith(
        {
          email: mockUser.email,
          nickname: mockUser.nickname,
          friendId: mockUser.friendId,
          password: mockUser.password,
          confirmPassword: mockUser.confirmPassword,
        },
        expect.anything()
      );
      expect(mockPush).toHaveBeenCalledWith("/signin");
      expect(toast.promise).toHaveBeenCalled();
    });
  });

  it("중복된 이메일로 회원가입시 오류 메시지 표시", async () => {
    const user = userEvent.setup();

    vi.mocked(authApi.signup).mockRejectedValue({
      code: "auth/email-already-in-use",
    });

    render(<SignupForm />, {
      wrapper: createWrapper(),
    });

    await user.type(screen.getByLabelText("Email Address"), mockUser.email);
    await user.type(screen.getByLabelText("Nickname"), mockUser.nickname);
    await user.type(screen.getByLabelText("Friend ID"), mockUser.friendId);
    await user.type(screen.getByLabelText("Password"), mockUser.password);
    await user.type(
      screen.getByLabelText("Confirm Password"),
      mockUser.confirmPassword
    );

    const submitButton = screen.getByRole("button", { name: /회원가입/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(authApi.signup).toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
      expect(toast.promise).toHaveBeenCalled();
    });
  });
});
