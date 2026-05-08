var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./src/database/config/database');

var indexRouter = require('./src/routes/index');
const adminRoutes = require('./src/routes/admin.routes');
const categoryRoutes = require('./src/routes/category.routes');
const subcategoryRoutes = require('./src/routes/subcategory.routes');
const planRoutes = require('./src/routes/plan.routes');
const contactRoutes = require('./src/routes/contact.routes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
// ✅ Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // React dev server origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use('/', indexRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/category', categoryRoutes);
app.use('/api/admin/subcategory', subcategoryRoutes);
app.use('/api/admin/plan', planRoutes);
app.use('/api/user/contact', contactRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
