export interface IConfiguration {
  NODE_ENV: string | undefined;
  firebase: any;
  server: {
    port: number;
    secret: string;
    hostName: string;
    isLocalhost: string | boolean;
    logger: any;
  };
  database: {
    mongodb: {
      mainUri: string;
    };
  };
}
