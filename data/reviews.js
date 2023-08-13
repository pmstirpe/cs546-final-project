import {charities, reviews, users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import * as helper from "../helpers.js";
import * as validation from "../validation.js";

const createReview = async (
    charityId,
    userId,
    reviewText,
    rating
) => {

//input validation
reviewText = helper.checkString(reviewName, 'review name');
rating = validation.checkRating(rating);
userId = validation.checkId(userId, 'User Id'); //this might need to be check string depending on how the id is supplied
charityId = validation.checkId(userId, 'Charity Id'); //this might need to be check string depending on how the id is supplied


let newReview = {_id: new ObjectId(), charityId: charityId, userId: userId, reviewText: reviewText, rating: rating};

const charityCollection = await charities();

await prodCollection.updateOne({_id: new ObjectId(charityId)}, {$push: {reviews: newReview}});


return newReview;
}

const getAllReviews = async (charityId) => {

    charityId = validation.checkId(charityId, 'Charity Id');
    const charityCollection = await charities();
    const charity = await charities.get(charityId);
    if (!charity) throw 'Could not get charity';
    
    return charity.reviews;
};

const get = async (id) => {
    id = validation.checkId(id, 'Charity Id')
    const charityCollection = await charities();
    const charity = await charityCollection.findOne({_id: new ObjectId(id)});
    if (charity === null) throw 'No charity with that id';
    charity._id = charity._id.toString();
    return charity;
  };

const removeReview = async (reviewId) => {
    reviewId = validation.checkId(reviewId, 'review Id')

    await get(reviewId);
    
    const charityCollection = await charities();
    
    charity = await charityCollection
        .find({ 'reviews._id': reviewId });
    
    await prodCollection.updateOne(
        { _id: charity._id },
        { $pull: {reviews: { _id: reviewId } } });
    
    return charities.get(charity._id);
};

export default {createReview, getAllReviews, get, removeReview};


