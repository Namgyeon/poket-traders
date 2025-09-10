"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  header?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  header,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 transition-opacity" />
      {/* 모달 내용 */}
      <div className="relative w-full p-4 max-w-lg mx-auto bg-white rounded-lg space-y-6">
        <div
          className={clsx(
            "flex items-center",
            header ? "justify-between" : "justify-end"
          )}
        >
          {header && <p className="text-lg font-bold">{header}</p>}
          <button
            onClick={onClose}
            className="cursor-pointer hover:bg-gray-200 rounded-lg"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
