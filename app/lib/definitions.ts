export interface Issue {
  project: {
    S: string;
  };
  'issue-id': {
    S: string;
  };
  priority: {
    S: string;
  };
  description: {
    S: string;
  };
  title: {
    S: string;
  };
  status: {
    S: string;
  };
}

export interface FetchOptions {
  method: string;
  headers: {
    "Content-Type": string;
    "Access-Control-Request-Headers": string;
  };
}

export interface FetchBody {
  dataSource: string;
  database: string;
  collection: string;
}
