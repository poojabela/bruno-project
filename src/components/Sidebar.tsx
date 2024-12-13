import React, { useState } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import collectionData from "../data/collection.json";
import { ExpandedSections, FolderItem, HttpItem } from "../types";
import { useCurrentFolder } from "../context/FolderContext";

const Sidebar: React.FC = () => {
  const { setCurrentFolder, setCurrentEndpoint } = useCurrentFolder();

  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    () => {
      const sections: ExpandedSections = { [collectionData.name]: true };
      collectionData.items.forEach((item) => {
        if (item.type === "folder") {
          sections[item.name] = true;
        }
      });
      return sections;
    }
  );

  const toggleSection = (sectionId: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
    setCurrentFolder(sectionId);
  };

  const renderItems = (items: (HttpItem | FolderItem)[]): React.ReactNode => {
    const sortedItems = [...items].sort((a, b) => {
      if ("seq" in a && "seq" in b) {
        return a.seq - b.seq;
      }
      return 0;
    });

    return sortedItems.map((item) => {
      if (item.type === "folder") {
        return (
          <div key={item.name} className="ml-4 space-y-1">
            <div
              className="flex items-center space-x-2 cursor-pointer hover:text-gray-100"
              onClick={() => toggleSection(item.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  toggleSection(item.name);
                }
              }}
            >
              {expandedSections[item.name] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="text-sm">{item.name}</span>
            </div>
            {expandedSections[item.name] && (
              <div className="ml-4 space-y-1">{renderItems(item.items)}</div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={item.name}
            className="flex items-center space-x-2 cursor-pointer hover:text-gray-100 py-1"
            role="button"
            tabIndex={0}
            onClick={() => handleEndpointClick(item)}
          >
            <span className="text-green-500 text-xs">
              {item.request.method}
            </span>
            <span className="text-sm">{item.name}</span>
          </div>
        );
      }
    });
  };

  const handleEndpointClick = (item: HttpItem) => {
    setCurrentEndpoint(item);
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-300 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="text-sm">Collections</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="search"
          className="w-full bg-gray-800 text-gray-300 pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
      </div>

      {/* Sidebar Content */}
      <div className="space-y-2">
        <div className="space-y-1">
          <div
            className="flex items-center space-x-2 cursor-pointer hover:text-gray-100"
            onClick={() => toggleSection(collectionData.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleSection(collectionData.name);
              }
            }}
          >
            {expandedSections[collectionData.name] ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <span className="text-sm">{collectionData.name}</span>
          </div>
          {expandedSections[collectionData.name] &&
            renderItems(collectionData.items as (HttpItem | FolderItem)[])}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
