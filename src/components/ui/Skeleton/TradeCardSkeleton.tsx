import Skeleton from "react-loading-skeleton";

export default function TradeCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      {/* 헤더 스켈레톤 */}
      <div className="flex flex-col md:flex-row gap-2 items-start justify-between mb-4">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <Skeleton height={24} width="80%" />
          <Skeleton height={16} width="60%" />
        </div>
        <Skeleton height={32} width={120} />
      </div>

      {/* 내용 스켈레톤 */}
      <Skeleton height={60} className="mb-4" />

      {/* 카드 정보 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <Skeleton height={20} width="40%" className="mb-2" />
          <div className="flex flex-wrap gap-2">
            <Skeleton height={24} width={60} />
            <Skeleton height={24} width={80} />
            <Skeleton height={24} width={70} />
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <Skeleton height={20} width="40%" className="mb-2" />
          <div className="flex flex-wrap gap-2">
            <Skeleton height={24} width={60} />
            <Skeleton height={24} width={80} />
          </div>
        </div>
      </div>
    </div>
  );
}
