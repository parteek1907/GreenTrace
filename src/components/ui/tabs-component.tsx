"use client";

import { Tabs } from "@ark-ui/react/tabs";
import { Home, FolderOpen, Package } from "lucide-react";

const tabs = [
  {
    value: "tab1",
    label: "Dashboard",
    content: "Main dashboard with key metrics and insights.",
  },
  {
    value: "tab2",
    label: "Analytics",
    content: "Track performance with detailed reports.",
  },
  {
    value: "tab3",
    label: "Settings",
    content: "Configure preferences and account options.",
  },
];

export function TabsBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Tabs.Root
        defaultValue="tab1"
        className="w-full flex flex-col items-center"
      >
        <Tabs.List className="flex gap-1 p-1 bg-gray-100 rounded-lg dark:bg-gray-700 w-fit mb-8">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md transition-all data-selected:bg-white data-selected:text-gray-900 data-selected:shadow-sm dark:text-gray-300 dark:data-selected:bg-gray-800 dark:data-selected:text-gray-100"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Content
            key={tab.value}
            value={tab.value}
            className="text-center text-gray-600 dark:text-gray-300"
          >
            {tab.content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}

const verticalTabs = [
  {
    value: "tab1",
    label: "Overview",
    icon: Home,
    content: "Dashboard with key metrics and insights.",
  },
  {
    value: "tab2",
    label: "Projects",
    icon: FolderOpen,
    content: "Manage active development projects.",
  },
  {
    value: "tab3",
    label: "Packages",
    icon: Package,
    content: "View and organize package dependencies.",
  },
];

export function TabsVerticalWithIcons() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-start justify-center">
      <Tabs.Root defaultValue="tab3" className="flex gap-4 w-full">
        <Tabs.List className="flex flex-col relative border-l border-gray-200 dark:border-gray-700 w-fit">
          {verticalTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-3 text-left px-2.5 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors data-selected:text-gray-900 relative border-l-2 border-transparent data-selected:border-gray-900 dark:text-gray-400 dark:hover:text-gray-200 dark:data-selected:text-gray-100 dark:data-selected:border-gray-100"
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        <div className="flex-1 border border-gray-200 rounded-lg p-4 dark:border-gray-700">
          {verticalTabs.map((tab) => (
            <Tabs.Content
              key={tab.value}
              value={tab.value}
              className="text-gray-600 dark:text-gray-300"
            >
              {tab.content}
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </div>
  );
}
