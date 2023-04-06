
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://ayushman45:moon1234@cluster0.125gux7.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
  name: "A Simple To-Do-List"
});

const defaultItems = [item1];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

 

  Item.find()
  .then(function (listValues) {
    if (listValues.length === 0) {
      Item.insertMany(defaultItems)
      .then(function () {
        console.log("Successfully saved defult items to DB");
      })
      .catch(function (err) {
        console.log(err);
      });
    res.redirect("/")
  }
  else{res.render("index", {newListItems: listValues});
}
  
  
})
.catch(function (err) {
  console.log(err);
});

});






app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });
    item.save();
    res.redirect("/");
});




app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;

  
    

    Item.findByIdAndRemove(checkedItemId)
    .then((foundItem) => {
        if(foundItem){
            console.log("Successfully Deleted !!")
        }
        res.redirect("/")
   })
   .catch((error) => {
        console.log(err);
   });

});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
