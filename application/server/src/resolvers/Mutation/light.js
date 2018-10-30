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

  async updateLight(parent, {id, color}, ctx, info) {
    const lightExists = await ctx.db.exists.Light({
      id,
    })

    if (!lightExists) {
      throw new Error(`Light not found`)
    }

    return ctx.db.mutation.updateLight({
      where: {id},
      data: {color}
    })
  }

}

module.exports = {light}