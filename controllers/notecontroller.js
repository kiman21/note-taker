const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const itemData = JSON.parse(data);
        console.log(itemData)
        res.json(itemData);
      }
    });
  });

router.post("/", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error");
      throw err;
    } else {
      const itemData = JSON.parse(data);
      itemData.push(req.body);
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(itemData, null, 4),
        (err) => {
          if (err) {
            res.status(500).send("Error");
            throw err;
          } else {
            res.send("data added!");
          }
        }
      );
    }
  });
});

router.delete("/:title", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("Error");
        throw err;
      } else {
        let itemData = JSON.parse(data);
        itemData = itemData.filter((item) => {
          if (item.title == req.params.title) {
            return false;
          } else {
            return true;
          }
        });
        fs.writeFile("./db/db.json", JSON.stringify(itemData, null, 4), (err) => {
          if (err) {
            res.status(500).send("Error");
            throw err;
          } else {
            res.send("data deleted!");
          }
        });
      }
    });
  });

module.exports = router;