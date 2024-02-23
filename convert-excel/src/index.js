const mongoose = require('mongoose');
const app = require('./app');

const MONGO_URI = `mongodb://localhost:27017/applications`;

const port = process.env.PORT || 5001;

(async () => {
  await mongoose.connect(MONGO_URI);

  app.listen(port, () => {
    console.log(`App listining on port ${port}`);
  });
})();
