cube('orders2', {
  sql: `SELECT *
   FROM 's3://cube-tutorial/orders.csv'`,
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
        sql: `'${SECURITY_CONTEXT.team.unsafeValue()}_' || status`,
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