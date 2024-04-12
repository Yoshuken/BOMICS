/**
 * @swagger
 * /popular:
 *   get:
 *     summary: Get popular books
 *     description: Retrieve a list of popular books from the database
 *     responses:
 *       200:
 *         description: List of popular books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       class:
 *                         type: string
 *                         description: The Class of the book
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       author:
 *                         type: string
 *                         description: The author of the book
 *                       publish_date:
 *                         type: date
 *                         description: The date of launch
 *                       description:
 *                         type: text
 *                         description: The description of the book
 *                       pagecount:
 *                         type: integer
 *                         description: Number of pages
 *                       category:
 *                         type: string
 *                         description: Main category of the book
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: Google API based cover URL
 *                       infoLink:
 *                         type: string
 *                         format: url
 *                         description: Google API based information URL
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: HTTP error code
 *                 message:
 *                   type: string
 *                   description: Error message
 * /best:
 *   get:
 *     summary: Get best-selling books
 *     description: Retrieve a list of best-selling books from the database
 *     responses:
 *       200:
 *         description: List of best-selling books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Class:
 *                         type: string
 *                         description: The Class of the book
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       author:
 *                         type: string
 *                         description: The author of the book
 *                       publish_date:
 *                         type: date
 *                         description: The date of launch
 *                       description:
 *                         type: text
 *                         description: The description of the book
 *                       pagecount:
 *                         type: integer
 *                         description: Number of pages
 *                       category:
 *                         type: string
 *                         description: Main category of the book
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: Google API based cover URL
 *                       infoLink:
 *                         type: string
 *                         format: url
 *                         description: Google API based information URL
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: HTTP error code
 *                 message:
 *                   type: string
 *                   description: Error message
 * 
 * /rec:
 *   get:
 *     summary: Get recommended books
 *     description: Retrieve a list of recommended books from the database
 *     responses:
 *       200:
 *         description: List of recommended books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       class:
 *                         type: string
 *                         description: The Class of the book
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       author:
 *                         type: string
 *                         description: The author of the book
 *                       publish_date:
 *                         type: date
 *                         description: The date of launch
 *                       description:
 *                         type: text
 *                         description: The description of the book
 *                       pagecount:
 *                         type: integer
 *                         description: Number of pages
 *                       category:
 *                         type: string
 *                         description: Main category of the book
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: Google API based cover URL
 *                       infoLink:
 *                         type: string
 *                         format: url
 *                         description: Google API based information URL
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: HTTP error code
 *                 message:
 *                   type: string
 *                   description: Error message
 * /new:
 *   get:
 *     summary: Get new releases
 *     description: Retrieve a list of new release books from the database
 *     responses:
 *       200:
 *         description: List of new release books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       class:
 *                         type: string
 *                         description: The Class of the book
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       author:
 *                         type: string
 *                         description: The author of the book
 *                       publish_date:
 *                         type: date
 *                         description: The date of launch
 *                       description:
 *                         type: text
 *                         description: The description of the book
 *                       pagecount:
 *                         type: integer
 *                         description: Number of pages
 *                       category:
 *                         type: string
 *                         description: Main category of the book
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: Google API based cover URL
 *                       infoLink:
 *                         type: string
 *                         format: url
 *                         description: Google API based information URL
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: HTTP error code
 *                 message:
 *                   type: string
 *                   description: Error message
 * /relics:
 *   get:
 *     summary: Get relics
 *     description: Retrieve a list of relic books from the database
 *     responses:
 *       200:
 *         description: List of relic books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       class:
 *                         type: string
 *                         description: The Class of the book
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       author:
 *                         type: string
 *                         description: The author of the book
 *                       publish_date:
 *                         type: date
 *                         description: The date of launch
 *                       description:
 *                         type: text
 *                         description: The description of the book
 *                       pagecount:
 *                         type: integer
 *                         description: Number of pages
 *                       category:
 *                         type: string
 *                         description: Main category of the book
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: Google API based cover URL
 *                       infoLink:
 *                         type: string
 *                         format: url
 *                         description: Google API based information URL
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: HTTP error code
 *                 message:
 *                   type: string
 *                   description: Error message
 * /adventure:
 *   get:
 *     summary: Get new types of books
 *     description: Retrieve a list of new adventure books from the database
 *     responses:
 *       200:
 *         description: List of new adventure books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       class:
 *                         type: string
 *                         description: The Class of the book
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       author:
 *                         type: string
 *                         description: The author of the book
 *                       publish_date:
 *                         type: date
 *                         description: The date of launch
 *                       description:
 *                         type: text
 *                         description: The description of the book
 *                       pagecount:
 *                         type: integer
 *                         description: Number of pages
 *                       category:
 *                         type: string
 *                         description: Main category of the book
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: Google API based cover URL
 *                       infoLink:
 *                         type: string
 *                         format: url
 *                         description: Google API based information URL
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: HTTP error code
 *                 message:
 *                   type: string
 *                   description: Error message
 * /topManga:
 *   get:
 *     summary: Get top manga books
 *     description: Retrieve a list of top manga books from the database
 *     responses:
 *       200:
 *         description: List of top manga books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       properties:
 *                       class:
 *                         type: string
 *                         description: The Class of the manga
 *                       id:
 *                         type: string
 *                         description: The id of the manga
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: The URL of the cover image 
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 * /bestManga:
 *   get:
 *     summary: Get best-selling manga books
 *     description: Retrieve a list of best-selling manga books from the database
 *     responses:
 *       200:
 *         description: List of best-selling manga books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       class:
 *                         type: string
 *                         description: The Class of the manga
 *                       id:
 *                         type: string
 *                         description: The id of the manga
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: The URL of the cover image
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 * /classicManga:
 *   get:
 *     summary: Get classic manga books
 *     description: Retrieve a list of classic manga books from the database
 *     responses:
 *       200:
 *         description: List of classic manga books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       class:
 *                         type: string
 *                         description: The Class of the manga
 *                       id:
 *                         type: string
 *                         description: The id of the manga
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: The URL of the cover image
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 * /searchBooks:
 *   post:
 *     summary: Search for books
 *     description: Search for books based on provided query
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: title to search your book on googleBooksAPI
 *     responses:
 *       200:
 *         description: Information on the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: json
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 * /searchComics:
 *   post:
 *     summary: Search for comics
 *     description: Search for comics based on provided query
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 description: The search query
 *     responses:
 *       200:
 *         description: Information on the manga you have search for
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: json
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message 
 * /insertBooks:
 *   post:
 *     summary: Insert a new book
 *     description: Insert a new book into the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               values:
 *                 type: object
 *                 properties:
 *                   isbn:
 *                     type: string
 *                     description: The ISBN of the book
 *                   title:
 *                     type: string
 *                     description: The title of the book
 *                   author:
 *                     type: string
 *                     description: The author of the book
 *                   publish_date:
 *                     type: string
 *                     description: The publish date of the book
 *                   description:
 *                     type: string
 *                     description: The description of the book
 *                   pagecount:
 *                     type: integer
 *                     description: The page count of the book
 *                   image:
 *                     type: string
 *                     format: url
 *                     description: The URL of the cover image
 *                   infoLink:
 *                     type: string
 *                     format: url
 *                     description: The URL for additional information about the book
 *     responses:
 *       200:
 *         description: Book inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Message indicating the success of the insertion
 *                 response:
 *                   type: string
 *                   description: Indicates whether the insertion was successful
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 * /insertComics:
 *   post:
 *     summary: Insert a new comic
 *     description: Insert a new comic into the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               values:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the comic
 *                   title:
 *                     type: string
 *                     description: The title of the comic
 *                   image:
 *                     type: string
 *                     format: url
 *                     description: The URL of the cover image
 *     responses:
 *       200:
 *         description: Comic inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Message indicating the success of the insertion
 *                 response:
 *                   type: string
 *                   description: Indicates whether the insertion was successful
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 * /searchInsertBooks:
 *   post:
 *     summary: Insert a new book based on search results
 *     description: Insert a new book into the database using search results
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               values:
 *                 type: object
 *                 properties:
 *                   industryIdentifiers:
 *                     type: array
 *                     description: Array of industry identifiers for the book
 *                   title:
 *                     type: string
 *                     description: The title of the book
 *                   authors:
 *                     type: array
 *                     description: Array of authors of the book
 *                   publishedDate:
 *                     type: string
 *                     description: The publish date of the book
 *                   description:
 *                     type: string
 *                     description: The description of the book
 *                   pageCount:
 *                     type: integer
 *                     description: The page count of the book
 *                   imageLinks:
 *                     type: object
 *                     description: Object containing image links for the book
 *                   infoLink:
 *                     type: string
 *                     format: url
 *                     description: The URL for additional information about the book
 *     responses:
 *       200:
 *         description: Book inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Message indicating the success of the insertion
 *                 response:
 *                   type: string
 *                   description: Indicates whether the insertion was successful
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 * /bookCollection:
 *   get:
 *     summary: Get all books in the collection
 *     description: Retrieve all books from the book collection database table
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the user
 *                       isbn:
 *                         type: string
 *                         description: The ISBN of the book
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       author:
 *                         type: string
 *                         description: The author of the book
 *                       publish_date:
 *                         type: date
 *                         description: The publish date of the book
 *                       description:
 *                         type: string
 *                         description: The description of the book
 *                       pagecount:
 *                         type: integer
 *                         description: The page count of the book
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: The URL of the cover image
 *                       infoLink:
 *                         type: string
 *                         format: url
 *                         description: The URL for additional information about the book
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: HTTP error code
 *                 message:
 *                   type: string
 *                   description: Error message
 * /comicCollection:
 *   get:
 *     summary: Get all comics in the collection
 *     description: Retrieve all comics from the comics collection database table
 *     responses:
 *       200:
 *         description: List of comics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the comic
 *                       title:
 *                         type: string
 *                         description: The title of the comic
 *                       image:
 *                         type: string
 *                         format: url
 *                         description: The URL of the cover image
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: HTTP error code
 *                 message:
 *                   type: string
 *                   description: Error message
 * /deleteBook:
 *   delete:
 *     summary: Delete a book from the collection
 *     description: Delete a book from the book collection database table based on ISBN
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ISBN of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Message indicating the success of the deletion
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 * /deleteComic:
 *   delete:
 *     summary: Delete a comic from the collection
 *     description: Delete a comic from the comics collection database table based on ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the comic to delete
 *     responses:
 *       200:
 *         description: Comic deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Message indicating the success of the deletion
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 */


