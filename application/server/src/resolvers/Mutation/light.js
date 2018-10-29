const { getUserId } = require('../../utils')

const light = {
  async createLight(parent, {color}, ctx, info) {
    return ctx.db.mutation.createLight(
      {
        data: {
          color
        }
      },
      info
    )
  },

}

module.exports = {light}