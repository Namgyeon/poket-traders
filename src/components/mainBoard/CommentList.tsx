import { useGetComments } from "@/apis/board/queries";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface CommentListProps {
  tradeId: string;
}

export default function CommentList({ tradeId }: CommentListProps) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useGetComments(tradeId);
  const { ref } = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col gap-2 border border-gray-500 rounded-md px-4 py-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <p className="text-lg font-semibold">{comment.authorName}</p>
              <p className="text-sm text-gray-500">
                {comment.createdAt.toDate().toLocaleString()}
              </p>
            </div>
            <div>
              <p className="px-2 py-1 text-sm font-medium bg-blue-100 rounded-full">
                <span className="font-semibold">친구 ID</span> :{" "}
                {comment.friendId}
              </p>
            </div>
          </div>
          <div>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}

      {/* 무한스크롤 옵저버 */}
      {hasNextPage && (
        <div ref={ref}>
          {isFetchingNextPage ? <div>Loading...</div> : <div>Load More</div>}
        </div>
      )}

      {comments.length === 0 && <div>No comments</div>}
    </div>
  );
}
