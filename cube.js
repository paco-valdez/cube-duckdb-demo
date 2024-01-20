const slugDimensions = new Set(['project_slug', 'slug']);

module.exports = {
  contextToAppId: ({project_slug}) => `CUBEJS_APP_${project_slug || 'default'}`,
  contextToOrchestratorId: () => ({project_slug}) => `CUBEJS_APP_${project_slug || 'default'}`,
  scheduledRefreshContexts: async () => [
    { project_slug: 'default' },
    // { project_slug: 'zep' },
    // { project_slug: 'cdf' },
  ],
  queryRewrite: (query, { project_slug }) => {
    console.log(`tenant id - CUBEJS_APP_${project_slug}`);
    return query;
  },
  extendContext: (req) => {
    if(req.query && req.query.query){
      const query = JSON.parse(req.query.query);
      if(query.filters && query.filters.length > 0){
        const values = new Set(query.filters.map(element => slugDimensions.has(element.member.split('.')[1]) ? element.values : []).flat());
        if(values && values.size == 1){
          // console.log(`Valid tenant - ${values.values().next().value}`)
          return {
            project_slug: values.values().next().value
          }
        }
      }
    }
    return {
      project_slug: 'default'
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
