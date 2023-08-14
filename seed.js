import { dbConnection, closeConnection } from './config/mongoConnection.js';
import { charityData } from './data/index.js';
import { reviewData } from './data/index.js';
import { commentData } from './data/index.js';
import { giftData } from './data/index.js';
import { userData } from './data/index.js';


const db = await dbConnection();
await db.dropDatabase();

let charity1 = await charityData.createCharity('Make a Wish', 'Children', '04/05/1998', 'Together, we create life-changing wishes for children with critical illnesses – but you can make a childs wish possible.');

let charity2 = await charityData.createCharity('Salvation Army', 'Religion', '02/11/1996', 'The Salvation Army, an international movement, is an evangelical part of the universal Christian Church. Its message is based on the Bible. Its ministry is motivated by the love of God. Its mission is to preach the gospel of Jesus Christ and to meet human needs in His name without discrimination.');

await reviewData.createReview(charity1._id.toString(), '64d92657c4fd978e90fd1ea4', 'this is a great charity!', 5);
await reviewData.createReview(charity1._id.toString(), '64d94657c4fd978e90fd1ea7', 'this is a bad charity!', 1);
await reviewData.createReview(charity2._id.toString(), '64d93657c4fd978e90fd1ea8', 'this is an ok charity', 3);





await closeConnection();
