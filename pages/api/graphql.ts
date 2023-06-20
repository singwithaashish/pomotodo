import { createContext } from "@/graphql/context";
import { resolvers } from "@/graphql/resolver";
import { typeDefs } from "@/graphql/schema";

import { createSchema, createYoga } from "graphql-yoga";
import { NextApiRequest, NextApiResponse } from "next";

export default createYoga<{
    req: NextApiRequest
    res: NextApiResponse
}>({
    schema: createSchema({
        typeDefs: typeDefs,
        resolvers: resolvers
    }),
    context: createContext,
    graphqlEndpoint: "/api/graphql",
})

export const config = {
    api : {
        bodyParser: false,
    }
}
    
