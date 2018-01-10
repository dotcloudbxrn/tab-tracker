const {
  Bookmark,
  Song
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.query
      const where = {
        UserId: userId
      }
      if (songId) {
        where.SongId = songId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [{
          model: Song
        }]
      }).map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend(
          {},
          bookmark.Song,
          bookmark
        ))
      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to fetch the requested bookmark.'
      })
    }
  },
  async post (req, res) {
    try {
      const {songId} = req.body.params
      const userId = req.user.id
      const bookmark = await Bookmark.findOne({
        where: {
          // autocapitalised by sqlize def opts
          SongId: songId,
          UserId: userId
        }
      })
      console.log('what you are LOOOOOOOOOKING FOOOOOOOOR', bookmark)
      if (bookmark) {
        return res.status(400).send({
          error: 'You have already set this as a bookmark.'
        })
      }

      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })

      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create your bookmark.'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        res.status(403).send({
          error: 'You do not have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to delete the bookmark.'
      })
    }
  }
}
