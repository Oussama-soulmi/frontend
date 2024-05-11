const configs = {
    development: {
      SERVER_URI: 'localhost:8080',
    },
    production: {
      SERVER_URI: 'Railway_URI',
    },
  };
  
export const config = configs[process.env.NODE_ENV];
