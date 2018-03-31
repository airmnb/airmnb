import "reflect-metadata";
import * as typeorm from "typeorm";

// This will load the ormconfig.json
export const createConnection = typeorm.createConnection;
