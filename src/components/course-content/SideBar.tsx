"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoClose, IoMenu } from "react-icons/io5";
import SectionGroup from "@/features/sections/components/SectionGroup";
import { DbSectionGroup } from "@/types";

type Props = {
  sectionGroups: DbSectionGroup[];
};
const Sidebar = ({ sectionGroups }: Props) => {
  return (
    <>
      <DesktopSidebar sectionGroups={sectionGroups} />
      <MobileSidebar sectionGroups={sectionGroups} />
    </>
  );
};

const DesktopSidebar = ({ sectionGroups }: Props) => {
  return (
    <div
      className="hidden sm:block p-4 bg-sidebar-primary text-sidebar-primary-foreground h-[calc(100vh-var(--navbar-height))] min-w-[200px] overflow-y-auto"
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
  );
};
const MobileSidebar = ({ sectionGroups }: Props) => {
  return (
    <div className="sticky sm:hidden top-0 bg-navbar text-navbar-foreground w-full h-10 p-2 z-10">
      <Drawer direction="left">
        <DrawerTrigger>
          <IoMenu />
        </DrawerTrigger>

        <DrawerContent className="bg-sidebar-primary text-sidebar-primary-foreground">
          <DrawerTitle className="hidden">Sections List</DrawerTitle>
          <DrawerHeader>
            <DrawerClose>
              <IoClose />
            </DrawerClose>
          </DrawerHeader>

          <div
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
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default Sidebar;
