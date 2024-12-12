import React, { useState } from "react";
import { PlusCircle, HelpCircle, Send } from "lucide-react";
import { useCurrentFolder } from "../context/FolderContext";

const Tabs = {
  PARAMS: "Params",
  BODY: "Body",
} as const;

type TabType = (typeof Tabs)[keyof typeof Tabs];

const EndpointDetails: React.FC = () => {
  const { currentEndpoint } = useCurrentFolder();
  const [activeTab, setActiveTab] = useState<TabType>(Tabs.PARAMS);

  if (!currentEndpoint) {
    return null;
  }

  return (
    <div className="flex-1 bg-gray-900 text-gray-300 min-h-screen">
      {/* Request URL Bar */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-green-900 text-green-400 px-3 py-1 rounded text-sm font-mono">
            {currentEndpoint.request.method}
          </span>
          <input
            type="text"
            value={currentEndpoint.request.url}
            className="flex-1 bg-gray-800 text-gray-300 px-3 py-1.5 rounded font-mono text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
            readOnly
          />
          <button className="p-1.5 hover:bg-gray-800 rounded">
            <Send className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-800">
          {Object.values(Tabs).map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-1 text-sm ${
                activeTab === tab
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === Tabs.PARAMS && (
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Query</h3>
              <div className="bg-gray-800 rounded-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3 text-gray-400 font-medium">
                        Name
                      </th>
                      <th className="text-left p-3 text-gray-400 font-medium">
                        Value
                      </th>
                      <th className="text-left p-3 text-gray-400 font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEndpoint.request.params.map((param, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 last:border-0"
                      >
                        <td className="p-3">
                          <input
                            type="text"
                            value={param.name}
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded w-full"
                            readOnly
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={param.value}
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded w-full"
                            readOnly
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            placeholder="Add a description..."
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded w-full"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-2 flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300">
                <PlusCircle className="h-4 w-4" />
                Add Query Param
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-medium">Path Variables</h3>
                <HelpCircle className="h-4 w-4 text-gray-500" />
              </div>
              <div className="bg-gray-800 rounded-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3 text-gray-400 font-medium">
                        Name
                      </th>
                      <th className="text-left p-3 text-gray-400 font-medium">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 text-gray-500 text-center" colSpan={2}>
                        No path variables
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === Tabs.BODY && (
          <div className="bg-gray-800 rounded-md p-4">
            <div className="text-sm text-gray-400">
              {currentEndpoint.request.body.mode === "none" ? (
                "This request does not have a body"
              ) : (
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(currentEndpoint.request.body, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndpointDetails;
