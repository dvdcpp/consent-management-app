interface Config {
    API_BASE_URL: string;
    API_DELAY_MS: number;
  }
  
  const config: Config = {
    API_BASE_URL: 'http://localhost:3000',
    API_DELAY_MS: 300,
  };
  
  export default config;