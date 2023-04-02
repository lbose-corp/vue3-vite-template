export type Authority = {
    id: string;
    name: string;
  };

  export type User = {
    id: number;
    name: string;
    email: string;
    icon_path: string;
    authority: Authority;
  };
