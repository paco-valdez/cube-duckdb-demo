
module.exports = {
  extendContext: (req) => {
    console.log(req)
    return {
      securityContext: {
        tenant_id: 1
      }
    }
  }
}

