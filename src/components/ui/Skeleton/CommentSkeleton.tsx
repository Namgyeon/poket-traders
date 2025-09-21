import Skeleton from "react-loading-skeleton";

export default function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-2 border border-gray-500 rounded-md px-4 py-2">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <Skeleton width={20} height={10} />
          <Skeleton width={60} height={10} />
        </div>
        <div>
          <Skeleton width={60} height={10} />
        </div>
      </div>
      <div>
        <Skeleton width={200} height={10} />
      </div>
    </div>
  );
}
