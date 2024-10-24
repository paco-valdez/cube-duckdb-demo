async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}

async function fetchColumnList(tenantId) {
  await stall();
  console.log(`Tenant ID ${tenantId}`);
  return {'status1': {}, 'status2': {}, 'status3': {}};
}

module.exports =  { fetchColumnList, stall };