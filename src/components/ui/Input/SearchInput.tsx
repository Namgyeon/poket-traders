import { InputHTMLAttributes, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Button from "@/components/ui/Button/Button";
import { CardTrade } from "@/apis/board/types";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  className?: string;
  allTrades: CardTrade[];
  onSearchResult: (trades: CardTrade[]) => void;
}

export default function SearchInput({
  placeholder,
  className,
  allTrades,
  onSearchResult,
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      setIsSearching(true);

      const filteredTrades = allTrades.filter((trade) => {
        const matchWantCards = trade.wantCards.some((card) =>
          card.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchWantCards;
      });
      onSearchResult(filteredTrades);
      setIsSearching(false);
    } else {
      onSearchResult(allTrades);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch(searchTerm);
    }
  };

  const handleSearchClick = () => {
    performSearch(searchTerm);
  };

  return (
    <div
      className={clsx(
        "relative w-full border border-gray-300 rounded-md",
        className
      )}
    >
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="w-full px-4 py-2 placeholder:pl-8"
      />
      {!searchTerm && (
        <MagnifyingGlassIcon className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      )}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20">
        <Button onClick={handleSearchClick} variant="primary">
          검색
        </Button>
      </div>
    </div>
  );
}
