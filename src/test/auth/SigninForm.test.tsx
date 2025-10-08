import React from "react";
import SigninForm from "@/components/auth/SigninForm";
import { userEvent } from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it } from "vitest";
import { vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import * as authApi from "@/apis/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

vi.mock("@/apis/auth", () => ({
  signin: vi.fn(),
}));

describe("로그인 테스트", () => {
  let mockReplace: ReturnType<typeof vi.fn>;
  let mockPush: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockReplace = vi.fn();
    mockPush = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      replace: mockReplace,
      push: mockPush,
      back: vi.fn(),
    } as unknown as AppRouterInstance);
  });

  it("로그인 성공 시 홈페이지로 리다이렉트되어야 함", async () => {
    const user = userEvent.setup();
    const mockPassword = "qwer1234";
    const mockUser = {
      uid: "test-uid",
      email: "test@test.com",
      nickname: "test",
      createdAt: null, // date | null
      friendId: "1234123412341234",
    };

    vi.mocked(authApi.signin).mockResolvedValue(mockUser);
    render(<SigninForm />);

    // 폼 입력
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    await user.type(emailInput, mockUser.email);
    await user.type(passwordInput, mockPassword);

    // 로그인 버튼 클릭
    const submitButton = screen.getByRole("button", { name: /로그인/i });
    await user.click(submitButton);

    // 결과 확인
    await waitFor(() => {
      expect(authApi.signin).toHaveBeenCalledWith({
        email: mockUser.email,
        password: mockPassword,
      });
      expect(mockReplace).toHaveBeenCalledWith("/");
      expect(toast.promise).toHaveBeenCalled();
    });
  });

  it("로그인 실패시 에러 메시지가 표시되어야 함", async () => {
    const user = userEvent.setup();
    const mockPassword = "qwer12344";
    const mockUser = {
      uid: "test-uid",
      email: "test@test.com",
      nickname: "test",
      createdAt: null, // date | null
      friendId: "1234123412341234",
    };

    vi.mocked(authApi.signin).mockRejectedValue({
      code: "auth/invalid-credential",
    });
    render(<SigninForm />);

    // 폼입력
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    await user.type(emailInput, mockUser.email);
    await user.type(passwordInput, mockPassword);
    // 로그인 버튼 클릭
    const submitButton = screen.getByRole("button", { name: /로그인/i });
    await user.click(submitButton);

    // 결과 확인
    await waitFor(() => {
      expect(authApi.signin).toHaveBeenCalled();
      expect(toast.promise).toHaveBeenCalled();
    });
  });
});
