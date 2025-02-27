var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')


const productRoute = require('./app/product/routes');
const categoryRoute = require('./app/category/routes');
const tagRoute = require('./app/tag/routes');
const authRoute = require('./app/auth/routes');
const deliveryAddressRoute = require('./app/deliveryAddress/routes');
const cartRoute = require('./app/cart/routes');
const orderRoute = require('./app/order/routes');
const invoiceRoute = require('./app/invoice/routes');
const courierRoute = require('./app/courier/routes');
const { decodeToken } = require('./app/middleware/index')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(decodeToken());
global.__basedir = __dirname;

app.use('/api', productRoute)
app.use('/api', categoryRoute)
app.use('/api', tagRoute)
app.use('/api', deliveryAddressRoute)
app.use('/api', cartRoute)
app.use('/api', orderRoute)
app.use('/api', invoiceRoute)
app.use('/api', courierRoute)
app.use('/auth', authRoute)

//home
app.use('/', function (req, res) {
  res.render('index', {
    title: 'Eduwork API Services'
  })
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
