export const getAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "이미 사용 중인 이메일입니다.";
    case "auth/weak-password":
      return "비밀번호가 너무 간단합니다.";
    case "auth/invalid-email":
      return "올바르지 않은 이메일 형식입니다.";
    case "auth/user-not-found":
      return "등록되지 않은 이메일입니다.";
    case "auth/wrong-password":
      return "잘못된 비밀번호입니다.";
    case "auth/invalid-credential":
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    case "auth/network-request-failed":
      return "네트워크 연결을 확인해주세요.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
};
