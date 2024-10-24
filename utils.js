async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}

const columnList = {};

async function fetchColumnList(tenantId) {
  // check if columnList is already present for tenantId in columnList
  if (columnList[tenantId]) {
    console.log(`Tenant ID ${tenantId} memoized`);
    return columnList[tenantId];
  }
  // simulate fetch columnList from DB
  await stall();
  console.log(`Tenant ID ${tenantId}`);
  columnList[tenantId] = {'status1': {}, 'status2': {}, 'status3': {}};
  return columnList[tenantId];
}

module.exports =  { fetchColumnList, stall };