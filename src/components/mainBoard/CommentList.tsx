import { Comment } from "@/apis/board/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  const { ref } = useInfiniteScroll({
    hasNextPage: true,
    isFetchingNextPage: false,
    fetchNextPage: () => {},
  });

  return (
    <div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col gap-2 border border-gray-200 rounded-md px-4 py-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <p>{comment.authorName}</p>
              <p className="text-sm text-gray-500">
                {comment.createdAt.toDate().toLocaleString()}
              </p>
            </div>
            <div>
              <p className="px-2 py-1 test-sm bg-blue-100 rounded-full">
                친구 ID : {comment.friendId}
              </p>
            </div>
          </div>
          <div>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}

      <div ref={ref}></div>
    </div>
  );
}
