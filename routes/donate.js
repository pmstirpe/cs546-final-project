import {Router} from 'express';
import {donationData} from '../data/index.js';
import {ObjectId} from 'mongodb';
import * as helper from '../helpers.js';
import validation from "../validation.js";



const router = Router();



router.route('/').get(async (req, res) => {
    try {
        const donationList = await donationData.getAllDonations();
        return res.render('donate', {donations: donationList})      
    } 
        catch (e) {
        res.status(500).json({error: e});
      }
})
.post(async (req, res) => {
    const donation = req.body;

    if (!donation || Object.keys(donation).length === 0) {
      return res.status(400).json({error: 'There are no fields in the request body'});
    }

    try {
        donation.userName = helper.checkString(donation.userName, 'user name');
        donation.charityName = helper.checkString(donation.charityName, 'charity name');
        donation.giftName = helper.checkString(donation.giftName, 'giftName');
        donation.giftNote = helper.checkString(donation.giftNote, 'gift note');
        donation.donateDate = validation.checkDate(donation.donateDate);

        if (donation.comments) {
            donation.comments = helper.checkString(donation.comments, 'comments');
        }

        const newDonation = await donationData.createDonation(donation);
        res.status(200).json(newDonation);

    } catch (e) {
        res.status(500).json({ error: e });
    }
});



router
  .route('/donationId/:donationId')
  .get(async (req, res) => {
    try {
        req.params.donationId = validation.checkId(req.params.donationId, 'Id URL Param');
        const donation = await donationData.get(req.params.donationId);
        return res.render('donation', { donation: donation });
    } catch (e) {
        res.status(404).json({ error: e });
    }
});


router.route('/userName/:userName')
.get(async (req, res) => {
    try {
        const username = req.params.username;

        const username1 = helper.checkString(username, 'username'); 

        const userDonations = await donationData.getByUserName(username1);
        
        if (userDonations && userDonations.length > 0) {
            return res.render('userDonations', { donations: userDonations });
        } else {
            throw 'No donations found for this username';
        }

    } catch (e) {
        res.status(404).json({ error: e });
    }
});



router.route('/charityName/:charityName')
.get(async (req, res) => {
    try {
        const charityName = req.params.charityName;

        const charityName1 = helper.checkString(charityName, 'charityName'); 

        const charityDonations = await donationData.getByCharityname(charityName1);
        
        if (charityDonations && charityDonations.length > 0) {
            return res.render('donate', { donations: charityDonations });
        } 
        //else {
        //     throw 'No donations found for this charityName';
        // }

        return res.render('donate', { donations: charityDonations });

    } catch (e) {
        res.status(404).json({ error: e });
    }
});






export default router;

