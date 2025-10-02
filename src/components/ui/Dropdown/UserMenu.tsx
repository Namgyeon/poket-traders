import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Avatar from "@/components/ui/Avatar";
import { User } from "@/apis/auth/types";
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

      <MenuItems
        modal={false}
        anchor="bottom start"
        className="absolute z-100 [--anchor-gap:8px] focus:outline-none border border-gray-200 rounded-md bg-white"
      >
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
    </Menu>
  );
}
