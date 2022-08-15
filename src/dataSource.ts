require('dotenv').config();
import { DataSource } from "typeorm";
import { URL } from "url";
import { Organization } from './entity/Organization';
import { Tribe } from './entity/Tribe';
import { Metric } from './entity/Metric';
import { Repository } from './entity/Repository';

const dbUrl = new URL(process.env.DATABASE_URL || "");
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

export const AppDataSource = new DataSource({
    type: "cockroachdb",
    url: dbUrl.toString(),
    ssl: true,
    extra: {
        options: routingId
    },
    database: "defaultdb",
    logging: true,
    synchronize: true,
    entities: [Organization, Tribe, Repository, Metric]
});