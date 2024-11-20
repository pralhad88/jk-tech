"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config = (configService) => ({
    database: {
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DATABASE'),
        node_env: process.env.NODE_ENV,
        ssl: configService.get('DB_SSL')
            ? JSON.parse(configService.get('DB_SSL'))
            : true,
    },
});
exports.config = config;
//# sourceMappingURL=config.js.map