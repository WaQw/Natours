const express = require('express');
const fs = require('fs');

const app = express();

// use middleware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours },
  });
});

// get a specific tour
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1; // convert a string to a number
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((el) => el.id == id); // regular JS array function

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

// post a tour
app.post('/api/v1/tours', (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: id }, req.body); // merge attributes

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
});

// update part of a tour (demo)
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here...>' },
  });
});

// delete a tour (demo)
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
