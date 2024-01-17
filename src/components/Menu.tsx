import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/UI/components/ui/menubar";
import Link from "next/link";

export function Menu() {
  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <MenubarMenu>
        <Link href="/">
          <MenubarTrigger className="font-bold cursor-pointer">
            Tools INC.
          </MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link href="/rent">
          <MenubarTrigger className="relative cursor-pointer">
            Rent
          </MenubarTrigger>
        </Link>
      </MenubarMenu>
    </Menubar>
  );
}
