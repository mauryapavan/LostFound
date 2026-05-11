import addContact from "../chat/addContact.js";
import findContact from "../chat/findContact.js";
import Getconversation from "../chat/getconversation.js";

import express from 'express';
const router = express.Router();

// Send message
router.get("/messages", Getconversation);
// addcontact
router.post("/newContact", addContact);
// findcontact
router.post("/findContact", findContact);

let chatapi=router;
export default chatapi;