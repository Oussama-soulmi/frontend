const configs = {
    development: {
      SERVER_URI: 'http://localhost:5000',
    },
    production: {
      SERVER_URI: 'https://local-regine-oussamasouilmi-ccf3a331.koyeb.app',
    },
  };
  
export const config = configs[process.env.NODE_ENV];
