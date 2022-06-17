
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const favicon = require('serve-favicon');
var path = require('path');
const mongoosePaginate = require('mongoose-paginate-v2');



const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(favicon(__dirname + '/public/favicon.ico'));

mongoose.connect("mongodb+srv://admin:test123@cluster0.8d829.mongodb.net/inventoryDB", {useNewUrlParser: true});


const itemsSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  description: String,
  status: String
});

itemsSchema.plugin(mongoosePaginate);

const Item = mongoose.model("Item",itemsSchema);


app.get("/", function(req, res){
  var pagenum = req.query.pagenum ? req.query.pagenum : 1;
  const options = {
  page: pagenum,
  limit: 5,
  collation: {
    locale: 'en',
  },
};

  Item.paginate({}, options, function (err, result) {
    const foundItems = result.docs;
    res.render("index", {newItems: foundItems, result: result});
  });

});

app.post("/add", function(req, res){

  const newItemName = req.body.newItemName;
  const newItemCategory = req.body.newItemCategory;
  const newItemQuantity = req.body.newItemQuantity;
  const newItemDescription = req.body.newItemDescription;
  const newItemStatus = req.body.newItemStatus;

  const item = new Item({
    name: newItemName,
    category: newItemCategory,
    quantity: newItemQuantity,
    description: newItemDescription,
    status: newItemStatus
  });
  item.save();

  console.log("Successfully added an item!");
  res.redirect("/");

});

app.post("/edit", function(req, res){
  const id = req.body.id;
  const updItemName = req.body.updItemName;
  const updItemCategory = req.body.updItemCategory;
  const updItemQuantity = req.body.updItemQuantity;
  const updItemDescription = req.body.updItemDescription;
  const updItemStatus = req.body.updItemStatus;

  Item.updateOne({_id: id}, {name: updItemName, category: updItemCategory, quantity: updItemQuantity, description: updItemDescription, status: updItemStatus}, function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully updated the document!");
    }
  });
res.redirect("/");
});


app.post("/delete", function(req, res){
  const id = req.body.id;
  Item.deleteOne({_id: id}, function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully deleted the document!");
    }
  });

  res.redirect("/");
});

app.post("/delete-many", function(req, res){
  console.log(req.body);

  console.log("hello");
  // Item.deleteMany(
  //   {
  //     _id: {
  //       $in: id
  //     }
  //   }, function(err){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log("Successfully deleted the documents!");
  //   }
  // });

  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
