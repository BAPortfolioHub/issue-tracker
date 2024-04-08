export interface Issue {
  project: string;
  title: string;
  description: string;
  priority: number;
  status: string;
}

export interface FetchOptions {
  method: string;
  headers: {
    "Content-Type": string;
    "Access-Control-Request-Headers": string;
    "api-key": string;
  };
}

export interface FetchBody {
  dataSource: string;
  database: string;
  collection: string;
}
