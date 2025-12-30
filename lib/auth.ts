import Database from "better-sqlite3";

import { betterAuth } from "better-auth";
import { apiKey, username } from "better-auth/plugins";

export const auth = betterAuth({
    database: new Database("./dbs/auth.db"),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [ 
        username(),
        apiKey({
            enableMetadata: true
        }) 
    ],
    trustedOrigins: ["http://localhost:1420"]
})