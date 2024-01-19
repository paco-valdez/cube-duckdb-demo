module.exports = {
  contextToAppId: ({securityContext}) => `${securityContext.team || 'default'}`,
  contextToOrchestratorId: () => ({securityContext}) => `${securityContext.team || 'default'}`,
  scheduledRefreshContexts: async () => [
    { securityContext: { team: 'default' } },
    { securityContext: { team: 'marketing' } },
    { securityContext: { team: 'product' } },
    { securityContext: { team: 'sales' } }
  ],
  queryRewrite: (query, { securityContext }) => {
    console.log(`tenant id: ${securityContext.team}`);
    return query;
  },
}

// # query_rewrite provides a way to inspect, modify, and restrict queries at runtime.
// # Learn more: https://cube.dev/docs/reference/configuration/config#query_rewrite
// @config('query_rewrite')
// def query_rewrite(query: dict, ctx: dict) -> dict:
//   # print(query)
//   team = ctx['securityContext'].setdefault('team', 'default')

//   # Raising an exception would prevent a query from running
//   if team == 'product':
//     raise Exception('Product team is restricted from running queries. See cube.py for details.')

//   # Modifying a query is also possible.
//   # Learn more: https://cube.dev/docs/guides/recipes#access-control
//   if team == 'sales':
//     query['limit'] = 10

//   return query
