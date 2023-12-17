import * as request from 'supertest';
import app from '../../../app';
import { readFileSync, writeFileSync } from 'fs';

let data = JSON.parse(readFileSync('./data/data.json', 'utf-8'));

describe('bookControler', () => {
  beforeEach(() => {
    writeFileSync('./data/data.json', JSON.stringify(data, null, 2), 'utf-8');
  });

  afterEach(() => {
    writeFileSync('./data/data.json', JSON.stringify(data, null, 2), 'utf-8');
  });

  describe('GET', () => {
    it('should get all books', async () => {
      const res = await request(app).get('/books');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(15);
    });

    it('should get one book', async () => {
      const res = await request(app).get('/books/' + '1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', '1');
    });

    it('should throw and error when a book was not founded', async () => {
      const res = await request(app).get('/books/' + '35');

      expect(res.statusCode).toBe(404);
    });

    it('should get hisory of loans', async () => {
      const res = await request(app).get('/books/history');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(3);
    });
  });

  describe('POST', () => {
    it('should post a book', async () => {
      const res = await request(app)
        .post('/books')
        .send({
          title: 'Diario de um banana',
          author: 'Frank Herbert',
          genre: 'Ficção Cientifica',
          status: {
            isActive: true,
            description: '',
          },
          isBorrowed: false,
          image: 'livro20.png',
          systemEntryDate: '02/01/2020',
          synopsis:
            'Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
          rentHistory: [],
        });

      const books = await request(app).get('/books');

      expect(res.statusCode).toBe(201);
      expect(books.body).toHaveLength(16);
    });

    it('should throw and error when the posted book do not have enough informations', async () => {
      const res = await request(app)
        .post('/books')
        .send({
          genre: 'Ficção Cientifica',
          status: {
            isActive: true,
            description: '',
          },
          isBorrowed: false,
          image: 'livro20.png',
          systemEntryDate: '02/01/2020',
          synopsis:
            'Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
          rentHistory: [],
        });

      expect(res.statusCode).toBe(400);
    });

    it('should throw and error when the posted book has a title that already exists', async () => {
      const res = await request(app)
        .post('/books')
        .send({
          title: 'A revolução dos bichos',
          author: 'Frank Herbert',
          genre: 'Ficção Cientifica',
          status: {
            isActive: true,
            description: '',
          },
          isBorrowed: false,
          image: 'livro20.png',
          systemEntryDate: '02/01/2020',
          synopsis:
            'Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
          rentHistory: [],
        });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('PATCH', () => {
    it('should udpate a book', async () => {
      const res = await request(app)
        .patch('/books/' + '2')
        .send({
          title: 'Planeta dos macacos',
          author: 'George Orwell',
          genre: 'Romance',
          status: {
            isActive: true,
            description: '',
          },
          isBorrowed: false,
          image: 'livro21.png',
          systemEntryDate: '02/01/2020',
          synopsis:
            'Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
          rentHistory: [],
        });

      const book = await request(app).get('/books/' + '2');

      expect(res.statusCode).toBe(200);
      expect(book.body).toHaveProperty('title', 'Planeta dos macacos');
    });

    it('should throw an error when the book was not found', async () => {
      const res = await request(app)
        .patch('/books/' + '33')
        .send({
          title: 'Planeta dos macacos',
          author: 'George Orwell',
          genre: 'Romance',
          status: {
            isActive: true,
            description: '',
          },
          isBorrowed: false,
          image: 'livro21.png',
          systemEntryDate: '02/01/2020',
          synopsis:
            'Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
          rentHistory: [],
        });

      expect(res.statusCode).toBe(404);
    });

    it('should throw an error when the book has not enough informations', async () => {
      const res = await request(app)
        .patch('/books/' + '2')
        .send({
          title: 'Planeta dos macacos',
          author: 'George Orwell',
          genre: 'Romance',
          status: {
            isActive: true,
            description: '',
          },
          isBorrowed: false,
          image: 'livro21.png',
        });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('DELETE', () => {
    it('should delete a book', async () => {
      let books = await request(app).get('/books');

      expect(books.body).toHaveLength(16);

      const res = await request(app).delete('/books/' + '15');

      books = await request(app).get('/books');

      expect(res.statusCode).toBe(204);
      expect(books.body).toHaveLength(15);
    });

    it('should throw an error when the book was not found', async () => {
      const res = await request(app).delete('/books/' + '23');

      expect(res.statusCode).toBe(404);
    });
  });
});
