import {
    fetchColumnList
  } from "../utils.js";

asyncModule(async () => {

let {
  securityContext: { tenant_id },
} = COMPILE_CONTEXT;
  // Fetch Dimensions
  
  let allowedDimensions = await ( await fetchColumnList(tenant_id));

  cube('orders2', {
    sql: `SELECT *
    FROM 's3://cube-tutorial/orders.csv' `,
    // preAggregations: {
    //   main2:{
    //     dimensions: [CUBE.status],
    //     measures: [CUBE.count],
    //     timeDimension: CUBE.created_at,
    //     granularity: `day`,
    //     refreshKey: {
    //       every: `1 day`
    //     }
    //   }
    // },
    measures: {
      count: {
        type: `count`
      }
    },
    dimensions: {
        id: {
          sql: `id`,
          type: `number`,
          primary_key: true,
        },
        user_id: {
          sql: `user_id`,
          type: `number`,
          public: false
        },
        status: {
          sql: `status`,
          type: `string`,
        },
        created_at: {
          sql: `${CUBE}.created_at::TIMESTAMP`,
          type: `time`
        },
        ...Object.entries(allowedDimensions).reduce((acc, [dimname, metadata]) => {
          acc[dimname] = {
            sql: `status`,
            type: `string`
          };
          return acc;
        }, {})
    }
  });
})