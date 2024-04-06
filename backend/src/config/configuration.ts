export default () => ({
    mode: process.env.NODE_ENV,
    port: Number(process.env.PORT) || 3001,
    version: '0.0.1',
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: process.env.DB_CHARSET,
        timezone: 'local',
        synchronize: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev',
        autoLoadEntities: true
    },
})