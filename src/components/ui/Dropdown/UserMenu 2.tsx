import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Avatar from "../Avatar";
import { User } from "@/apis/auth/types";
import { Fragment } from "react";
import Link from "next/link";

interface MenuOption {
  value: string;
  onClick?: () => void;
  href?: string;
}

interface UserMenuProps {
  user: User;
  options: MenuOption[];
}

export default function UserMenu({ user, options }: UserMenuProps) {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="cursor-pointer hover:opacity-70 transition-all duration-300 focus:outline-none">
        <Avatar user={user} />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform scale-80"
        enterTo="transform scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform scale-100"
        leaveTo="transform scale-95"
      >
        <MenuItems className="absolute z-100 mt-2 focus:outline-none border border-gray-200 rounded-md bg-white">
          {options.map((option, index) => {
            return (
              <MenuItem key={index}>
                {option.href ? (
                  <Link
                    href={option.href}
                    className="w-full flex items-center justify-between px-4 py-2 border-b border-gray-200 truncate hover:bg-gray-200 cursor-pointer"
                  >
                    {option.value}
                  </Link>
                ) : (
                  <button
                    onClick={option.onClick}
                    className="w-full flex items-center justify-between px-4 py-2 border-b border-gray-200 truncate hover:bg-gray-200 cursor-pointer"
                  >
                    {option.value}
                  </button>
                )}
              </MenuItem>
            );
          })}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
