const bcrypt = require('bcrypt');
const Joi = require('joi');
const FbContent = require('../models/fb-content.model');

const fbContentSchema = Joi.object({
  id: Joi.string().required(),
  content: Joi.string(),
  contentTypes: Joi.array(),
  costs: Joi.array(),
  numberCosts: Joi.array(),
  postTime: Joi.date(),
  url: Joi.string(),
  commentCount: Joi.number(),
  groupId: Joi.string(),
  authorId: Joi.string()
})

const bulkSchema = Joi.array().items(fbContentSchema)

const findRoomConst = 'TIM_PHONG';
const FOR_RENT = 'CHO_THUE_PHONG';
module.exports = {
  insert,
  insertBulk,
  get,
  getGroupFindRoomChart,
  getTopPostChart
}

async function insert(content) {
  content = await Joi.validate(content, fbContentSchema, {abortEarly: false});
  return await new FbContent(content).save();
}

async function insertBulk(content) {
  content = await Joi.validate(content.data, bulkSchema, {abortEarly: false});
  return await new Promise((resolve, reject) => {
    try {
      content.forEach(async (c, i) => {
        await FbContent.updateOne({'id': c.id}, c, {upsert: true})
      })
    } catch (e) {
      reject(error);
    }
    resolve('Success!');
  })
}

async function get(request) {
  let query = {
    'postTime': {$gte: new Date(request.query.postTime)},
  }
  if (request.query.groupIds && request.query.groupIds.length > 0) {
    query.groupId = {$in: request.query.groupIds.split(',')};
  }
  let users = FbContent.find(query);
  return users;
}

async function getGroupFindRoomChart(request) {
  let rs = FbContent.aggregate([
    // First Stage
    {
      $match: {
        $and: [
          {contentTypes: {$elemMatch: {$eq: findRoomConst}}},
          {postTime: {$gte: new Date(request.query.postTime)}}
        ]
      }
    },
    {
      $group:
        {
          _id: "$groupId",
          totalPost: {$sum: 1}
        }
    },
    {
      $sort: {totalPost: -1}
    },
    {$limit: request.query.limit ? parseInt(request.query.limit) : 10}
  ]);
  return rs;
}


async function getTopPostChart(request) {
  let rs = FbContent.aggregate([
    // First Stage
    {
      $match: {
        $and: [
          {contentTypes: {$elemMatch: {$eq: FOR_RENT}}},
          {postTime: {$gte: new Date(request.query.postTime)}}
        ]
      }
    },
    {
      $sort: {commentCount: -1}
    },
    {$limit: request.query.limit ? parseInt(request.query.limit) : 10}
  ]);
  return rs;
}
