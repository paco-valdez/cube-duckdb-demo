async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}

const columnList = {};

async function fetchColumnList(tenantId) {
  // check if columnList is already present for tenantId in columnList
  if (columnList[tenantId]) {
    return columnList[tenantId];
  }
  // simulate fetch columnList from DB
  await stall();
  console.log(`Tenant ID ${tenantId}`);
  return {'status1': {}, 'status2': {}, 'status3': {}};
}

module.exports =  { fetchColumnList, stall };