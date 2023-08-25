const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.json());

const { PORT = 3000 } = process.env;

class Book {
  constructor(
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    id = uuid(),
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

const booksStor = {
  books: [
    new Book(),
    new Book(),
  ],
};

// метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" }
app.post('/api/user/login', (req, res) => {
  res.status(201).json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
  const { books } = booksStor;
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const { books } = booksStor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | страница не найдена');
  }
});

app.post('/api/books', (req, res) => {
  const { books } = booksStor;
  const {
    title, description, authors, favorite, fileCover, fileName,
  } = req.body;

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
  books.push(newBook);

  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const { books } = booksStor;
  const {
    title, description, authors, favorite, fileCover, fileName,
  } = req.body;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    };

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | страница не найдена');
  }
});

app.delete('/api/books/:id', (req, res) => {
  const { books } = booksStor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json({ message: 'ok' });
  } else {
    res.status(404);
    res.json('404 | страница не найдена');
  }
});

app.listen(PORT);

// {
//   "title": "RandomYrt",
//   "description": "TRRTTshshhs",
//   "authors": "",
//   "favorite": "",
//   "fileCover": "",
//   "fileName": ""
// }
