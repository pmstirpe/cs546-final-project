//Here you will import route files and export them as used in previous labs
import peopleRoutes from './people.js';

const constructorMethod = (app) => {
  app.use('/', peopleRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;