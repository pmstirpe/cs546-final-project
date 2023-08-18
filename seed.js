import { dbConnection, closeConnection, dropCollection } from './config/mongoConnection.js';
import { charityData } from './data/index.js';
import { reviewData } from './data/index.js';
import { donationData } from './data/index.js';
import { commentData } from './data/index.js';
import { userData } from './data/index.js';
import { giftData } from './data/index.js';


export const createCharities = async () => {

// await db.dropDatabase();
//await dropCollection("charities");
//await dropCollection("donations");



//charity data
//variables' name: charityName, category, creationDate, isCharity, location, age,  picture, details
  
let charity1 = await charityData.createCharity('Make a Wish', 'Children', '04/05/1998', true, 'america', 5, 'N/A', 'Together, we create life-changing wishes for children with critical illnesses – but you can make a childs wish possible.');

let charity2 = await charityData.createCharity('Salvation Army', 'Religion', '02/11/1996', true, 'europe', 7, 'N/A', 'The Salvation Army, an international movement, is an evangelical part of the universal Christian Church. Its message is based on the Bible. Its ministry is motivated by the love of God. Its mission is to preach the gospel of Jesus Christ and to meet human needs in His name without discrimination.');



let charity3 = await charityData.createCharity('Jane Doe', 'Children', '02/11/2019', false, 'africa', 4, '/public/jane.jpg', 'jane doe individual sponsor');

let charity4 = await charityData.createCharity('John Doe', 'Children', '02/11/2016', false, 'europe', 7, '/public/john.png', 'john doe individual sponsor');

let charity5 = await charityData.createCharity('Amy Lee', 'Children', '02/11/2017', false, 'america', 6, '/public/amy.jpeg', 'amy lee individual sponsor');



  //reviews data
  //variables' name: charityId, userId, reviewText, rating(max 5)
await reviewData.createReview(charity1._id.toString(), '64d92657c4fd978e90fd1ea4', 'this is a great charity!', 5);
await reviewData.createReview(charity1._id.toString(), '64d94657c4fd978e90fd1ea7', 'this is a bad charity!', 1);
await reviewData.createReview(charity2._id.toString(), '64d93657c4fd978e90fd1ea8', 'this is an ok charity', 3);
await reviewData.createReview(charity2._id.toString(), '64d97532rw34533453fd1ea8', 'Good charity, could do better', 3);

  //I will assume the charity variable name to be charity6,charity7, etc. If anyone create other variable name, please change the variable names below, thanks.
await reviewData.createReview(charity6._id.toString(), '64db0bf5fc13ae52a4089fe0', 'This charity stands out for its transparency, ensuring donors know exactly where their contributions are going.', 5);
await reviewData.createReview(charity6._id.toString(), '64d92657c4fd978e90fd1ea4', 'Their dedication to on-ground work has made a tangible difference in communities, showcasing true commitment.', 5);
await reviewData.createReview(charity7._id.toString(), '64db0c81fc13ae524108a093', 'The organization's volunteer programs are well-structured, allowing individuals from all walks of life to contribute meaningfully.', 4); 
await reviewData.createReview(charity7._id.toString(), '64db0c81fc13ae524108a09c', 'With a focus on sustainability, this charity's projects are not just a quick fix but offer long-term solutions to pressing issues.', 4); 
await reviewData.createReview(charity1._id.toString(), '64db0c81fc13ae524108a0a2', 'With an impressive track record, this organization has continuously delivered on its promises, making it a trustworthy choice for donors.', 5); 
await reviewData.createReview(charity1._id.toString(), '64db0c81fc13ae524108a09a', 'Their grassroots approach ensures that the needs of the local communities are always at the forefront of their initiatives.', 4); 
await reviewData.createReview(charity2._id.toString(), '64db0c81fc13ae524108a091', 'The organization's emphasis on collaboration means they regularly partner with other groups, amplifying their impact.', 3); 
await reviewData.createReview(charity2._id.toString(), '64db0c81fc13ae524108a0a3', 'This charity's continuous pursuit of feedback and self-improvement is commendable, reflecting a genuine desire to serve better.', 5); 


//donation data  
//variables' name: userName, charityName, giftName, giftNote, comments
await donationData.createDonation('pAndds', 'Make a Wish', 'Mountain Bike', 'I hope you like the new bike!', 'Bikes are awesome');
await donationData.createDonation('hasking', 'Make a Wish', 'Blankets', 'Hope everyone enjoy the new blankets!', 'Keep warm');
await donationData.createDonation('bcess1', 'Children's Education Foundation', 'Books', 'A little help can light up a child's future. Enjoy these educational tools!', 'Looking forward to seeing these supplies make a difference!);
await donationData.createDonation('hfernehough6', 'Save the Oceans', 'Reusable Water Bottles', 'Reduce single-use plastic with these bottles!', 'Every little bit counts for our planet');
await donationData.createDonation('tpardewe', 'Animal Rescue League', 'Pet Foods', 'For our furry friends in need.', 'Remember to adopt, not shop!');
await donationData.createDonation('cguppy8', 'Help for the Homeless', 'Tents', 'A little shelter during tough times.', 'Hope this provides some relief');
await donationData.createDonation('mbewshire0', 'Plant a Tree Foundation', 'Saplings', 'Let's make the world greener, one tree at a time!', 'Greener future ahead!');
await donationData.createDonation('polligan2', 'Musicians Without Borders', 'Guitars', 'Music heals all wounds. Enjoy!', 'Looking forward to some great music');
await donationData.createDonation('nmanes3', 'Local Food Bank', 'Non-perishable Foods', 'Helping out families in need.', 'Stay strong and keep going');
await donationData.createDonation('cguppy8', 'Habitat for Humanity', 'Bricks', 'Building homes and futures.', 'Everyone deserves a roof over their head');


 



//user data
//variables' name: firstName, lastName, userName, emailAddress, password, role
await userData.createUser('Peter','Anderson','pAndds', 'pandy1243@gmail.com', 'pF5\\3Oo\\f4/T~\\)g', 'user');
await userData.createUser('Heidie','Fernehough','hfernehough6', 'hfernehough6@arstechnica.com', 'sK1|2zq,GaL+MRs', 'user');
await userData.createUser('Horten','Askin','hasking', 'hasking@prnewswire.com', 'wI2!cY0TjAX,E', 'user');  
await userData.createUser('Tybi','Pardew','tpardewe', 'tpardewe@berkeley.edu', 'nT0)spbn3u8\', 'user'); 
await userData.createUser('Bastien','Cess','bcess1', 'bcess1@fc2.com', 'jO4'_0uJ0s)>', 'user');  
await userData.createUser('Case','Guppy','cguppy8', 'cguppy8@newyorker.com', 'dI1.t\"2Q`', 'user');   
await userData.createUser('Marge', 'Bewshire', 'mbewshire0', 'mbewshire0@va.gov', 'uT5\"E1xM', 'user');
await userData.createUser('Bastien', 'Cess', 'bcess1', 'bcess1@fc2.com', 'jO4\'_0uJ0s)>', 'user');
await userData.createUser('Phillipe', 'Olligan', 'polligan2', 'polligan2@intel.com', 'nP0{hqG\\1m', 'user');
await userData.createUser('Norbert', 'Manes', 'nmanes3', 'nmanes3@bravesites.com', 'eM1_*mK}fpd@#\"', 'user');




//comments data
//variables' name: userId, donationId, commentText
//await commentData.createComment();


//gifts data
//variables' name: giftName,category,price,reviewText
//await giftData.createGift();


};
