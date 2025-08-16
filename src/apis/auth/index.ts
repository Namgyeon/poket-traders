import { SignupFormRequest, User } from "@/apis/auth/types";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

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
