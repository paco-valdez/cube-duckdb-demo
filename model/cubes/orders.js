cube('orders2', {
  sql: `SELECT *
   FROM 's3://cube-tutorial/orders.csv' `,
  //  WHERE ${COMPILE_CONTEXT.securityContext.project_slug === 'default' ? "1=1" : "status='"+COMPILE_CONTEXT.securityContext.project_slug + "'"} 
  // `,
  preAggregations: {
    main:{
      dimensions: [CUBE.project_slug, CUBE.status],
      measures: [CUBE.count],
      timeDimension: CUBE.created_at,
      granularity: `day`,
      refreshKey: {
        every: `1 day`
      }
    }
  },
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
      project_slug: {
        sql: `status`,
        type: `string`,
      },

      slug: {
        sql: `status`,
        type: `string`,
      },

      created_at: {
        sql: `${CUBE}.created_at::TIMESTAMP`,
        type: `time`
      }
  }
})