export type Request = {
  url: string;
  method: string;
  headers: any[];
  params: {
    name: string;
    value: string;
    type: string;
    enabled: boolean;
  }[];
  body: {
    mode: string;
    formUrlEncoded: any[];
    multipartForm: any[];
  };
  script: Record<string, unknown>;
  vars: Record<string, unknown>;
  assertions: any[];
  tests: string;
  docs: string;
  auth: {
    mode: string;
  };
};

export type HttpItem = {
  type: "http";
  name: string;
  seq: number;
  request: Request;
};

export type FolderItem = {
  type: "folder";
  name: string;
  items: (HttpItem | FolderItem)[];
};

export type ExpandedSections = {
  [key: string]: boolean;
};

export type FolderContextType = {
  currentFolder: string;
  setCurrentFolder: (folder: string) => void;
  currentEndpoint: HttpItem | null;
  setCurrentEndpoint: (endpoint: HttpItem | null) => void;
};
