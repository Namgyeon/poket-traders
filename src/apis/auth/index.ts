import { SigninFormRequest, SignupFormRequest, User } from "@/apis/auth/types";
import { auth, db } from "@/lib/firebase";
import { getErrorMessage } from "@/lib/utils/errorMessage";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export async function signup({
  email,
  nickname,
  password,
  friendId,
}: SignupFormRequest): Promise<User> {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(cred.user, { displayName: nickname });

    const userRef = doc(db, "users", cred.user.uid);
    await setDoc(userRef, {
      uid: cred.user.uid,
      email,
      nickname,
      friendId,
      createdAt: serverTimestamp(),
    });

    return {
      uid: cred.user.uid,
      email,
      nickname,
      friendId,
      createdAt: null,
    };
  } catch (error) {
    console.error("회원가입 오류:", getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
}

export async function signin({
  email,
  password,
}: SigninFormRequest): Promise<User> {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    // firestore에서 사용자 정보 가져오기
    const userRef = doc(db, "users", cred.user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        uid: cred.user.uid,
        email: cred.user.email!,
        nickname: userData.nickname,
        friendId: userData.friendId,
        createdAt: userData.createdAt?.toDate() || null,
      };
    } else {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("로그인 오류:", getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
}

export async function signinWithGoogle(): Promise<User> {
  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // 기존 사용자
      const userData = userDoc.data();
      return {
        uid: user.uid,
        email: user.email!,
        nickname: userData.nickname,
        friendId: userData.friendId,
        createdAt: userData.createdAt?.toDate() || null,
      };
    } else {
      // 신규 사용자 - Firestore에 정보 저장
      const nickname = user.displayName || user.email?.split("@")[0] || "User";

      await setDoc(userRef, {
        uid: user.uid,
        email: user.email!,
        nickname,
        friendId: "",
        createdAt: serverTimestamp(),
        provider: "google", // OAuth 제공업체 표시
        photoURL: user.photoURL, // 프로필 이미지
      });

      return {
        uid: user.uid,
        email: user.email!,
        nickname,
        friendId: "",
        createdAt: null,
      };
    }
  } catch (error) {
    console.error("Google 로그인 오류:", getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export async function getUser(): Promise<User> {
  try {
    const user = auth.currentUser;

    if (!user) throw new Error("로그인된 사용자가 없습니다.");

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        uid: user.uid,
        email: user.email!,
        nickname: userData.nickname,
        friendId: userData.friendId,
        createdAt: userData.createdAt?.toDate() || null,
      };
    } else {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("사용자 정보 조회 오류:", getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
}
