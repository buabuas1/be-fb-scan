// config should be imported before importing any other file
const config = require('./server/config/config');
const app = require('./server/config/express');
require('./server/config/mongoose');

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(process.env.PORT || config.port, () => {
    console.info(`server started on port ${process.env.PORT || config.port} (${config.env})`);
  });
}

module.exports = app;
