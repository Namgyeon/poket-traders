import { SigninFormRequest, SignupFormRequest, User } from "@/apis/auth/types";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export async function signup({
  email,
  nickname,
  password,
}: SignupFormRequest): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(cred.user, { displayName: nickname });

  const userRef = doc(db, "users", cred.user.uid);
  await setDoc(userRef, {
    uid: cred.user.uid,
    email,
    nickname,
    createdAt: serverTimestamp(),
  });

  return {
    uid: cred.user.uid,
    email,
    nickname,
    createdAt: null,
  };
}

export async function signin({
  email,
  password,
}: SigninFormRequest): Promise<User> {
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
      createdAt: userData.createdAt?.toDate() || null,
    };
  } else {
    throw new Error("사용자 정보를 찾을 수 없습니다.");
  }
}
