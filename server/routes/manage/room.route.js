const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const roomCtrl = require('../../controllers/manage/room.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/')
  .get(asyncHandler(get));

router.route('/:id')
  .delete(asyncHandler(deleteArea));


async function insert(req, res) {
  let area = await roomCtrl.insert(req);
  res.json(area);
}

async function get(req, res) {
  let area = await roomCtrl.get(req);
  res.json(area);
}

async function deleteArea(req, res) {
  let area = await roomCtrl.deleteRoom(req);
  res.json(area);
}

