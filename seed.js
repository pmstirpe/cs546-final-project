import { dbConnection, closeConnection, dropCollection } from './config/mongoConnection.js';
import { charityData } from './data/index.js';
import { reviewData } from './data/index.js';
import { donationData } from './data/index.js';


export const createCharities = async () => {

// await db.dropDatabase();
//await dropCollection("charities");
//await dropCollection("donations");


let charity1 = await charityData.createCharity('Make a Wish', 'Children', '04/05/1998', true, 'america', 5, 'N/A', 'Together, we create life-changing wishes for children with critical illnesses – but you can make a childs wish possible.');

let charity2 = await charityData.createCharity('Salvation Army', 'Religion', '02/11/1996', true, 'europe', 7, 'N/A', 'The Salvation Army, an international movement, is an evangelical part of the universal Christian Church. Its message is based on the Bible. Its ministry is motivated by the love of God. Its mission is to preach the gospel of Jesus Christ and to meet human needs in His name without discrimination.');

let charity3 = await charityData.createCharity('Jane Doe', 'Children', '02/11/2019', false, 'africa', 4, '/public/jane.jpg', 'jane doe individual sponsor');

let charity4 = await charityData.createCharity('John Doe', 'Children', '02/11/2016', false, 'europe', 7, '/public/john.png', 'john doe individual sponsor');

let charity5 = await charityData.createCharity('Amy Lee', 'Children', '02/11/2017', false, 'america', 6, '/public/amy.jpeg', 'amy lee individual sponsor');

await reviewData.createReview(charity1._id.toString(), '64d92657c4fd978e90fd1ea4', 'this is a great charity!', 5);
await reviewData.createReview(charity1._id.toString(), '64d94657c4fd978e90fd1ea7', 'this is a bad charity!', 1);
await reviewData.createReview(charity2._id.toString(), '64d93657c4fd978e90fd1ea8', 'this is an ok charity', 3);

await donationData.createDonation('Peter', 'Make a Wish', 'Mountain Bike', 'I hope you like the new bike!', 'Bikes are awesome', '02/11/1996');

};
