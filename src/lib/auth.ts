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
            enableMetadata: true,
            rateLimit: {
                enabled: true,
                timeWindow: 1000 * 60 * 60 * 24, // 1 day
                maxRequests: 10, // 5 requests per day
      },
        }) 
    ],
    trustedOrigins: ["http://localhost:1420"]
})