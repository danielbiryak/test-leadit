declare namespace NodeJS {
  interface ProcessEnv {
    host: string;
    port: string;
    login: string;
    password: string;
    database: string;
  }
}
