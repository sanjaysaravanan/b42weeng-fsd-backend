// Fucntions/Methods that allows the Communication to DB
// i.e, basic utility methods to do CRUD operations

import { ObjectId } from 'mongodb';

import DbClient from './db-client.js'

const DB_NAME = 'e-com';

// GET All
// entity name
const readAll = async (entityName) => {
  return await DbClient.db(DB_NAME).collection(entityName).find(
    {},
    {
      projection: {
        _id: 0
      }
    }).toArray();
};

// GET One Entity --> READ One
const readOneEntity = async (entityName, entityId) => {
  return await DbClient.db(DB_NAME).collection(entityName).findOne(
    { 'id': entityId },
    {
      projection: {
        _id: 0
      }
    }
  );
}

// create --> CREATE
const createEntity = async (entityName, entityObj) => {
  return await DbClient.db(DB_NAME).collection(entityName).insertOne(
    { ...entityObj, id: new ObjectId().toString() }
  );
}

// update one entity --> PUT
const updateEntity = async (entityName, entityId, entityObj) => {
  return await DbClient.db(DB_NAME).collection(entityName).updateOne(
    { 'id': entityId },
    { '$set': entityObj }
  );
}

const deleteEntity = async (entityName, entityId) => {
  return await DbClient.db(DB_NAME).collection(entityName).deleteOne(
    { 'id': entityId });
}

const findWithQuery = async (entityName, query) => {
  return await DbClient.db(DB_NAME).collection(entityName).findOne(
    query,
    {
      projection: {
        _id: 0
      }
    }
  );
}

export {
  readAll,
  readOneEntity,
  createEntity,
  updateEntity,
  deleteEntity,
  findWithQuery
}

