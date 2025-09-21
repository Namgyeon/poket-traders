import { useGetComments } from "@/apis/trades/queries";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import FriendId from "@/components/ui/FriendId";
import Spinner from "@/components/ui/Spinner";
import CommentSkeleton from "@/components/ui/Skeleton/CommentSkeleton";

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
    return <CommentSkeleton />;
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
              <FriendId friendId={comment.friendId} />
            </div>
          </div>
          <div>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}

      {/* 무한스크롤 옵저버 */}
      {hasNextPage && <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>}

      {comments.length === 0 && <div>No comments</div>}
    </div>
  );
}
