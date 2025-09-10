"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from "react";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface TagInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
  errorMessage: string | undefined;
  label?: string;
  labelId?: string;
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
  maxTags?: number;
}

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      className,
      error,
      errorMessage,
      label,
      labelId,
      onFocus,
      onBlur,
      tags: externalTags,
      onTagsChange,
      maxTags,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalTags, setInternalTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [isComposing, setIsComposing] = useState(false);

    const tags = externalTags ?? internalTags;
    const setTags = onTagsChange ?? setInternalTags;

    const hasValue = props.value && String(props.value).length > 0;
    const shouldLabelFloat = isFocused || hasValue || internalTags.length > 0;

    const handleCompositionStart = () => {
      setIsComposing(true);
    };

    const handleCompositionEnd = () => {
      setIsComposing(false);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const addTag = (tagValue: string) => {
      const trimmedTag = tagValue.trim();
      // 빈 값이거나 이미 존재하면 추가하지 않음
      if (!trimmedTag || tags.includes(trimmedTag)) {
        return;
      }
      // 최대 태그 수 초과 시 추가하지 않음
      if (maxTags && tags.length >= maxTags) {
        return;
      }

      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      setTagInput("");
    };

    const removeTag = (indexToRemove: number) => {
      const newTags = tags.filter((_, index) => index !== indexToRemove);
      setTags(newTags);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isComposing) {
        e.preventDefault();
        addTag(tagInput);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            ref={ref}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            type="text"
            className={clsx(
              "w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-md placeholder:pl-20",
              className
            )}
            {...props}
          />
          {label && (
            <label
              htmlFor={labelId}
              className={clsx(
                "absolute text-gray-500",
                shouldLabelFloat
                  ? "-top-5 left-0 text-xs transition-all duration-400"
                  : "top-1/2 left-4 -translate-y-1/2 transition-all duration-400"
              )}
            >
              {label}
            </label>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:bg-blue-200 cursor-pointer rounded-full p-0.5 transition-colors"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        {error && <p className="text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

TagInput.displayName = "TagInput";
export default TagInput;
