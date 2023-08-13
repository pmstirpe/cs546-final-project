import {charities} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import * as helper from "../helpers.js";
import * as validation from "../validation.js";
import moment from 'moment';

const createCharity = async (
    charityName,
    category,
    creationDate,
    details,
    reviews,
    comments
  ) => {

//input validation
charityName = helper.checkString(charityName, 'charity name');
category = helper.checkString(category, 'category');
details = helper.checkString(details, 'details');
reviews = validation.checkStringArray(reviews, 'reviews');
comments = helper.checkStringArray(comments, 'comments');
creationDate = validation.checkDate(creationDate);

let newCharity = {
    charityName: charityName,
    category: category,
    creationDate: creationDate,
    details: details,
    reviews: reviews,
    comments: comments
  }

const charityCollection = await charities();
const insertInfo = await charityCollection.insertOne(newCharity);
if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw 'Could not add charity';
} else {
    return {insertedUser: true};
}

};

const getAll = async () => {

    const charityCollection = await charities();
    let charityList = await charityCollection.find({}).toArray();
    if (!charityList) throw 'Could not get all charities';
    charityList = charityList.map((element) => {
      element._id = element._id.toString();
      return element;
    });
    return charityList;
};

const get = async (id) => {
    id = validation.checkId(id, 'Charity Id')
    const charityCollection = await charities();
    const charity = await charityCollection.findOne({_id: new ObjectId(id)});
    if (charity === null) throw 'No charity with that id';
    charity._id = charity._id.toString();
    return charity;
  };

const getCharityByName = async (charityName) => {
    
    charityName = helpers.checkString(charityName, 'charity');

    const charities = await getAll();
    let returnCharity = undefined;
    for(let i = 0; i < charities.length; i++){
      if(charities[i].charityName.toLowerCase() === charityName.toLowerCase()){
        returnCharity = charities[i];
      }
    }
    return returnCharity;
};

const remove = async (id) => {

    validation.checkId(id, 'Charity Id')

    const charityCollection = await charities();
    const deletionInfo = await charityCollection.findOneAndDelete({
      _id: new ObjectId(id)
    });

    if (deletionInfo.lastErrorObject.n === 0) {
      throw `Could not delete product with id of ${id}`;
    }
    return `${deletionInfo.value.charityName} has been successfully deleted!`;
};

export default {createCharity, getAll, get, getCharityByName, remove};
