const slugDimensions = new Set(['project_slug', 'slug']);

module.exports = {
  contextToAppId: ({securityContext}) => `CUBEJS_APP_${securityContext.project_slug || 'default'}`,
  contextToOrchestratorId: ({securityContext}) => `CUBEJS_APP_${securityContext.project_slug || 'default'}`,
  preAggregationsSchema: ({securityContext}) => `pre_aggregations_${securityContext.project_slug || 'default'}`,
  scheduledRefreshContexts: async () => [
    { securityContext: { project_slug: 'default' }},
    { securityContext: { project_slug: 'completed' }},
    // { securityContext: { { project_slug: 'zep' }},
    // { securityContext: { { project_slug: 'cdf' }},
  ],
  queryRewrite: (query, { securityContext }) => {
    console.log(`tenant id - CUBEJS_APP_${securityContext.project_slug}`);
    return query;
  },
  extendContext: (req) => {
    if(req.securityContext.project_slug)
      return {};
    if(req.query && req.query.query){
      const query = JSON.parse(req.query.query);
      if(query.filters && query.filters.length > 0){
        const values = new Set(query.filters.map(element => slugDimensions.has(element.member.split('.')[1]) ? element.values : []).flat());
        if(values && values.size == 1){
          // console.log(`Valid tenant - ${values.values().next().value}`)
          return {
            securityContext: {
              ...req.securityContext,
              project_slug: values.values().next().value
            }
          }
        }
      }
    }
    return {
      securityContext: {
        ...req.securityContext,
        project_slug: 'default'
      }
    };
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
