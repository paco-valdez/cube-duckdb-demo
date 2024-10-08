
module.exports = {
  contextToAppId: ({securityContext}) => `CUBEJS_APP_${securityContext.tenant_id || 'default'}`,
  // contextToOrchestratorId: ({securityContext}) => `CUBEJS_APP_${securityContext.tenant_id || 'default'}`,
  // preAggregationsSchema: ({securityContext}) => `pre_aggregations_${securityContext.tenant_id || 'default'}`,
  scheduledRefreshContexts: async () => {
    const number_of_tenants = Array.from({length: 20}, (x, i) => i);
    let tenants = [];
    for(const element of number_of_tenants){
      tenants.push({ securityContext: { tenant_id: element }})
    }
    return tenants;
  },
}

