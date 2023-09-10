export default () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3001,
  
    version: process.env.VERSION || '1.0.0',
    urls: {
      main_server: process.env.WWW_SERVER,
      api_server: process.env.API_SERVER
    },
    data_base: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dbname: process.env.DATABASE_DBNAME,
    },
  
    config: {
      default_on_page: process.env.CONFIG_DEFAULT_ON_PAGE,
      default_language_id: process.env.CONFIG_DEFAULT_LANGUAGE_ID,
    },
  
    jwt: {
      access_secret: process.env.JWT_ACCESS_SECRET,
      access_lifetime: process.env.JWT_ACCESS_LIFETIME,
    },
    user: {
      roles: {
        default_sign_up_role: process.env.DEFAULT_SIGN_UP_ROLE,
        default_admin: process.env.DEFAULT_ADMIN_ROLE,
        default_teacher: process.env.DEFAULT_TEACHER_ROLE_ID,
      },
    },
    storage: {
      main_path: process.env.STORAGE_PATH,
      public_path: process.env.STORAGE_PUBLIC_PATH,
      private_path: process.env.STORAGE_PRIVATE_PATH,
    },
    google: {
      console_clientid: process.env.GCONSOLE_CLIENTID,
      console_clientsecret: process.env.GCONSOLE_CLIENTSECRET,
    },
  
  });