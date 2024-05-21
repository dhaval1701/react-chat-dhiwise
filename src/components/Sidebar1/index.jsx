import React from "react";
import { Img, Text } from "./..";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

export default function Sidebar1({ ...props }) {
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}

  return (
    <Sidebar
      {...props}
      width="247px !important"
      collapsedWidth="80px !important"
      collapsed={collapsed}
      rootStyles={{ [`.${sidebarClasses.container}`]: { gap: 31 } }}
      className={`${props.className} flex flex-col h-screen pt-10 gap-[31px] top-0 md:p-5 sm:pt-5 border-gray-300_01 border-r border-solid !sticky overflow-auto md:hidden`}
    >
      <Img
        src="images/img_sidebar_logo.svg"
        alt="sidebar logo"
        className="ml-6 h-[29px] w-[103px] object-contain md:ml-0"
      />
      <Menu
        menuItemStyles={{
          button: {
            padding: "15px 15px 15px 23px",
            gap: "16px",
            alignSelf: "start",
            color: "#000000",
            fontWeight: 400,
            fontSize: "16px",
          },
        }}
        className="flex w-full flex-col items-center self-stretch"
      >
        <div className="flex self-stretch">
          <MenuItem icon={<Img src="images/img_home.svg" alt="home icon" className="h-[24px] w-[24px]" />}>
            Home
          </MenuItem>
        </div>
        <div className="flex items-center gap-4 self-start px-3 py-4">
          <Img src="images/img_icon_black_900_01.svg" alt="search icon" className="ml-2.5 h-[24px] w-[24px]" />
          <Text size="2xl" as="p" className="self-start">
            Search
          </Text>
        </div>
        <div className="flex flex-col gap-[0.68px] self-stretch">
          <MenuItem
            icon={<Img src="images/img_icon_black_900_01_24x24.svg" alt="explore icon" className="h-[24px] w-[24px]" />}
          >
            Explore
          </MenuItem>
          <MenuItem icon={<Img src="images/img_icon_24x24.svg" alt="reels icon" className="h-[24px] w-[24px]" />}>
            Reels
          </MenuItem>
          <MenuItem icon={<Img src="images/img_4.svg" alt="messages icon" className="h-[13px] w-[7px]" />}>
            Messages
          </MenuItem>
          <MenuItem icon={<Img src="images/img_favorite.svg" alt="notifications icon" className="h-[24px] w-[24px]" />}>
            Notifications
          </MenuItem>
          <MenuItem icon={<Img src="images/img_icon_5.svg" alt="create icon" className="h-[24px] w-[24px]" />}>
            Create
          </MenuItem>
          <MenuItem
            icon={
              <Img
                src="images/img_image_24x24.png"
                alt="profile icon"
                className="h-[24px] w-[24px] rounded-[12px] object-cover"
              />
            }
          >
            Profile
          </MenuItem>
        </div>
        <div className="mt-[232px] flex self-stretch">
          <MenuItem icon={<Img src="images/img_icon_6.svg" alt="more icon" className="h-[24px] w-[24px]" />}>
            More
          </MenuItem>
        </div>
      </Menu>
    </Sidebar>
  );
}
