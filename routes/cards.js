const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json({ success: true, data: cards });
  } catch (error) {
    res.status(500).join({ success: false, error: "Something went wrong" });
  }
});

// To get single card
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.json({ success: true, data: card });
  } catch (error) {
    res.status(500).json({ sucess: false, error: "Something went wrong" });
  }
});

//add a card
router.post("/", async (req, res) => {
  const card = new Card({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedCard = await card.save();
    res.json({ success: true, data: savedCard });
  } catch (error) {
    res.status(500).json({ sucess: false, error: "Something went wrong" });
  }
});

// update card
router.put("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    // Match the usernames
    if (card.username === req.body.username) {
      const updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updatedCard });
    }

    // Usernames do not match
    res.status(403).json({
      success: false,
      error: "You are not authorized to update this resource",
    });
  } catch (error) {
    res.status(500).json({ sucess: false, error: "Something went wrong" });
  }
});

// delete card
router.delete("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    // check if usernames match
    if (card.username === req.body.username) {
      await Card.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    // Usernames do not match
    res.status(403).json({
      success: false,
      error: "You are not authorized to delete this resource",
    });
  } catch (error) {
    res.status(500).json({ sucess: false, error: "Something went wrong" });
  }
});

module.exports = router;
