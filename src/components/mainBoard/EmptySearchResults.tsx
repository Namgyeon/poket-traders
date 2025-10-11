import Image from "next/image";

export default function EmptySearchResults() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
        <Image
          src="/images/search-empty.png"
          alt="empty-search"
          fill
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <p className="text-gray-500">검색 결과가 없습니다.</p>
    </div>
  );
}
