const express = require("express");
const connexion = require("../utilities/connexion.js");
const assets = require("../utilities/assets-functions.js");
const assets2 = require("../utilities/scraping-2.js");
const verifyToken = require("../middleware/authjwt.js");


class BookRouter {
  constructor() {
    this.router = express.Router();
  }

  handleError(res, error, message) {
    console.error(error);
    res.status(400).json({
      "result": `${message}. ${error}`,
    });
  }

  setupRoute(endpoint, class_, table = "display_books") {
    this.router.get(endpoint, async (req, res) => {
      try {
        connexion.query(`select * from ${table} where class = '${class_}'`, (error, results, fields) => {
          if (error) {
            this.handleError(res, error, "Query Error")
          } else {
            res.status(200).json({
              "result": results
            });
          }
        });
      } catch (err) {
        this.handleError(res, err, "Server Error");
      }
    });
  }

  setQueryRoute(endpoint, fn) {
    this.router.post(endpoint, async (req, res) => {
      const search = req.body.value;
      try {
        const result = await fn(search);
        res.status(200).json({
          "result": result,
        });
      } catch (err) {
        this.handleError(res, err, "Server Error")
      }
    })
  }

  setInsertBookRoute(endpoint) {
    this.router.post(endpoint, verifyToken, async (req, res) => {
      const values = req.body.values;
      const result = await connexion.query("select id from user where email = ?", [req.email]);
      try {
        let query = `insert into book_collection values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connexion.query(query, [result[0].id, values.isbn, values.title, values.author, values.publish_date, values.description, values.pagecount, values.image, values.infoLink], (error, results, fields) => {
          if (error) {
            console.error(error);
            res.json({
              "result": `You've already added this book`,
              "response": "no",
            });
          } else {
            res.status(200).json({
              "result": "Added into your library",
              "response": "yes",
            });
          }
        });
      } catch (err) {
        this.handleError(res, err, "Server Error")
      }
    })
  }

  setInsertSearchBookRoute(endpoint) {
    this.router.post(endpoint, verifyToken, async (req, res) => {
      const values = req.body.values;
      const result = await connexion.query("select id from user where email = ?", [req.email]);
      try {
        let query = `insert into book_collection values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connexion.query(query, [result[0].id, values.industryIdentifiers[0].identifier, values.title, values.authors[0], values.publishedDate, values.description, values.pageCount, this.thumbnailTry(values), values.infoLink], (error, results, fields) => {
          if (error) {
            console.error(error);
            res.json({
              "result": `You've already added this book`,
              "response": "no",
            });
          } else {
            res.status(200).json({
              "result": "Added into your library",
              "response": "yes",
            });
          }
        });
      } catch (err) {
        this.handleError(res, err, "Server Error")
      }
    })
  }

  thumbnailTry(book) {
    try {
      return book.imageLinks.thumbnail;
    } catch (error) {
      try {
        return book.imageLinks.smallThumbnail;
      } catch (error) {
        return null;
      }
    }
  }

  setInsertComicRoute(endpoint) {
    this.router.post(endpoint, verifyToken, async (req, res) => {
      const values = req.body.values;
      const result = await connexion.query("select id from user where email = ?", [req.email]);
      try {
        let query = `insert into comics_collection values (?, ?, ?, ?)`;
        connexion.query(query, [result[0].id, values.id, values.title, values.image], (error, results, fields) => {
          if (error) {
            console.error(error);
            res.json({
              "result": `You've already added this Comic`,
              "response": "no",
            });
          } else {
            res.status(200).json({
              "result": "Added into your library",
              "response": "yes",
            });
          }
        });
      } catch (err) {
        this.handleError(res, err, "Server Error")
      }
    })
  }

  setupRouteLibrary(endpoint, table) {
    this.router.get(endpoint, verifyToken, async (req, res) => {
      const result = await connexion.query("select id from user where email = ?", [req.email]);
      try {
        connexion.query(`select * from ${table} where user_id = ?`, [result[0].id], (error, results, fields) => {
          if (error) {
            this.handleError(res, error, "Query Error")
          } else {
            res.status(200).json({
              "result": results
            });
          }
        });
      } catch (err) {
        this.handleError(res, err, "Server Error");
      }
    });
  }

  setDeleteRoute(endpoint, query) {
    this.router.delete(endpoint, verifyToken, (req, res) => {
      const data = req.body;
      try {
        connexion.query(query, [data.id], (error, results, fields) => {
          if (error) {
            this.handleError(res, error, "Query Error");
          } else {
            res.status(200).json({
              "result": "correct"
            });
          }
        })
      } catch (err) {
        this.handleError(res, err, "Server Error");
      }
    });
  }


  getRouter() {
    return this.router;
  }
}

// create routing and export this.router 
const Router = new BookRouter();
Router.setupRoute("/popular", "popular");
Router.setupRoute("/best", "best");
Router.setupRoute("/rec", "recommendation");
Router.setupRoute("/new", "newRelease");
Router.setupRoute("/relics", "relics");
Router.setupRoute("/adventure", "newAdventure");
Router.setupRoute("/topManga", "topMangas", "display_comics");
Router.setupRoute("/bestManga", "bestSelling", "display_comics");
Router.setupRoute("/classicManga", "classicManga", "display_comics");
Router.setQueryRoute("/searchBooks", assets.fetchBookInfo);
Router.setQueryRoute("/searchComics", assets2.getMangaInfo);
Router.setInsertBookRoute("/insertBooks");
Router.setInsertComicRoute("/insertComics");
Router.setInsertSearchBookRoute("/searchInsertBooks");
Router.setupRouteLibrary("/bookCollection", "book_collection");
Router.setupRouteLibrary("/comicCollection", "comics_collection");
Router.setDeleteRoute("/deleteBook", "delete from book_collection where isbn = ?");
Router.setDeleteRoute("/deleteComic", "delete from comics_collection where id = ?");


module.exports = Router.getRouter();

