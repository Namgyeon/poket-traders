import { useGetComments } from "@/apis/board/queries";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

interface CommentListProps {
  tradeId: string;
  onCloseComments: () => void;
}

export default function CommentList({
  tradeId,
  onCloseComments,
}: CommentListProps) {
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

      <div className="flex mt-4 items-center justify-center">
        <div
          className="flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-md p-1 transition-all duration-200"
          onClick={onCloseComments}
        >
          <ChevronUpIcon className="w-6 h-6" />
        </div>
      </div>

      {comments.length === 0 && <div>No comments</div>}
    </div>
  );
}
