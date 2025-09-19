"use client";

import { useGetUser } from "@/apis/auth/queries";
import { useGetUserComments } from "@/apis/trades/queries";

export default function MyCommentList() {
  const { data: user } = useGetUser();
  const { data: myComments } = useGetUserComments(user?.uid || "");
  console.log("내가 작성한 댓글 목록:", myComments);
  return <div>MyCommentList</div>;
}
