
export interface Issues {
  project: string;
  'issue-id': string;
  priority: string;
  description: string;
  title: string;
  status: string;
}

export interface FetchOptions {
  method: string;
  headers: {
    "Content-Type": string;
    "Access-Control-Request-Headers": string;
  };
}

export interface Project {
  projectTitle: string;
  id: string;
  createdAt: number;
  expireAt: number;
};

