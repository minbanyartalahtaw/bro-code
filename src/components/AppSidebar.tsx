"use client";
import { ChevronDown, House, MessageCircle, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,

} from "@/components/ui/sidebar";
import "@/app/globals.css";
import { useEffect, useState } from "react";

interface SideBarChat {
  id: string;
  title: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppSidebar(prop: any) {
  const chat = prop;
  const [items, setItems] = useState<SideBarChat[]>([chat.prop]);

  useEffect(() => {
    setItems(chat.prop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sidebar >
      <SidebarContent className="bg-[#444]">
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible text-white">
            <SidebarGroup >

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"/chat/new"}>
                    <Plus />
                    <span>{"New Chat"}</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <a href={"/"}>
                    <House />
                    <span>{"Home"}</span>
                  </a>
                </SidebarMenuButton>

              </SidebarMenuItem>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="text-white">
                  <MessageCircle className="mr-2 " />Saved Chat
                  <ChevronDown className="ml-auto rotate-270 transition-transform group-data-[state=open]/collapsible:rotate-360" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="mb-3">
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    {items.map((item, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild>
                          <a href={item?.id ? `/chat/${item.id}` : "#"}>
                            <span>{item?.title || "Home"}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenuSub>
                  <SidebarMenu>



                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="bg-[#333]">
        <div className="text-sm text-white text-center">
          Press <kbd className="px-1 py-0.5 rounded">⌘</kbd> + <kbd className="px-1 py-0.5  rounded">B</kbd> to open sidebar
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
