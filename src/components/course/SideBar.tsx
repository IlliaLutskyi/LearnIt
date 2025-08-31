"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import SectionGroup from "./SectionGroup";
import { DbSectionGroup } from "@/types/dbSectionGroup";

type Props = {
  sectionGroups: DbSectionGroup[];
};
const Sidebar = ({ sectionGroups }: Props) => {
  return (
    <>
      <div
        className="max-sm:hidden p-4 bg-purple-950 max-sm:h-full h-[calc(100vh-3.5rem)] min-w-[200px] overflow-y-auto"
        id="scrollbar"
      >
        <div className="flex flex-col gap-2 justify-center">
          {sectionGroups.map((sectionGroup) => {
            return (
              <SectionGroup key={sectionGroup.id} sectionGroup={sectionGroup} />
            );
          })}
        </div>
      </div>
      <MobileSidebar sectionGroups={sectionGroups} />
    </>
  );
};
const MobileSidebar = ({ sectionGroups }: Props) => {
  return (
    <div className="sticky sm:hidden top-0 bg-purple-700 w-full h-10 text-white p-2">
      <Drawer direction="left">
        <DrawerTrigger>
          <IoMenu />
        </DrawerTrigger>
        <DrawerContent className="bg-black">
          <DrawerHeader>
            <DrawerClose>
              <IoMdClose className="text-white" />
            </DrawerClose>
          </DrawerHeader>
          <DrawerTitle
            className="flex flex-col gap-2 mx-8 h-full mb-4 overflow-y-auto"
            id="scrollbar"
          >
            {sectionGroups.map((sectionGroup) => {
              return (
                <SectionGroup
                  key={sectionGroup.id}
                  sectionGroup={sectionGroup}
                />
              );
            })}
          </DrawerTitle>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default Sidebar;
