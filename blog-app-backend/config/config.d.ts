import { ConfigService } from '@nestjs/config';
export declare const config: (configService: ConfigService) => {
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        node_env: string;
        ssl: any;
    };
};
