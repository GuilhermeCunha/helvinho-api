import { Router } from 'express'
import UsersController from './controllers/UsersController'
import EmployeesController from './controllers/EmployeesController'
import ProductsControllers from './controllers/ProductsControllers'
import ClientsController from './controllers/ClientsController'
import ParametersController from './controllers/ParametersController'
import PoolsController from './controllers/PoolsController'
import StocksController from './controllers/StocksController'
import ReportsController from '@controllers/ReportsController'

const routes = Router()

routes.route('/users')
  .get(UsersController.get)
  .post(UsersController.post)

routes.route('/users/:id')
  .get(UsersController.getOne)
  .put(UsersController.update)
  .delete(UsersController.delete)

routes.route('/employees')
  .get(EmployeesController.get)
  .post(EmployeesController.post)

routes.route('/employees/:id')
  .get(EmployeesController.getOne)
  .put(EmployeesController.update)
  .delete(EmployeesController.delete)

routes.route('/products')
  .get(ProductsControllers.get)
  .post(ProductsControllers.post)

routes.route('/products/:id')
  .get(ProductsControllers.getOne)
  .put(ProductsControllers.update)
  .delete(ProductsControllers.delete)

routes.route('/clients')
  .get(ClientsController.get)
  .post(ClientsController.post)

routes.route('/clients/:id')
  .get(ClientsController.getOne)
  .put(ClientsController.update)
  .delete(ClientsController.delete)

routes.route('/parameters')
  .get(ParametersController.get)
  .post(ParametersController.post)

routes.route('/parameters/:id')
  .get(ParametersController.getOne)
  .put(ParametersController.update)
  .delete(ParametersController.delete)

routes.get('/clients/pools/:client_id', PoolsController.getByClient)
routes.get('/clients/stocks/:client_id', StocksController.getByClient)
routes.get('/clients/reports/:client_id', ReportsController.getByClient)

routes.route('/pools')
  .get(PoolsController.get)
  .post(PoolsController.post)

routes.route('/pools/:id')
  .get(PoolsController.getOne)
  .put(PoolsController.update)
  .delete(PoolsController.delete)

routes.get('/pools/parameters/:pool_id', ParametersController.getByPool)
routes.get('/pools/parameters/byClient/:client_id', ParametersController.getByClient)

routes.route('/stocks')
  .get(StocksController.get)
  .post(StocksController.post)

routes.route('/stocks/:id')
  .get(StocksController.getOne)
  .put(StocksController.update)
  .delete(StocksController.delete)

routes.route('/reports')
  .get(ReportsController.get)
  .post(ReportsController.post)

routes.route('/reports/:id')
  .get(ReportsController.getOne)
  .put(ReportsController.update)
  .delete(ReportsController.delete)

export default routes
