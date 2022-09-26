const cloudinary = require("../middleware/cloudinary");
const Item = require("../models/Item");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const items = await Item.find({ user: req.user.id });
      console.log(items)
      for (let i = 0; i < items.length; i++) {
        console.log(items[i].item)
        console.log(items[i].prices)
      }
      res.render("profile.ejs", { items: items, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const items = await Item.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { items: items });
    } catch (err) {
      console.log(err);
    }
  },
  getItem: async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean().populate('user');
      console.log(comments)
      res.render("item.ejs", { item: item, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createItem: async (req, res) => {
    try {
      const newPrice = req.body.prices
      const newPriceEntry = {price: newPrice, Date}
      console.log(newPriceEntry)
      await Item.create({
        item: req.body.item,
        sale: req.body.sale,
        prices: newPriceEntry,
        user: req.user.id,
      });
      console.log("Item has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deleteItem: async (req, res) => {
    try {
      // Find post by id
      let item = await Item.findById({ _id: req.params.id });
      // Delete post from db
      await Item.remove({ _id: req.params.id });
      console.log("Deleted Item");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
