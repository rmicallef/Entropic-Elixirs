import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import {userRouter} from './routes/userRouter';
import {answerRouter} from './routes/answerRouter';
import webpack from 'webpack'
import webpackConfig from './webpack.config'
import WebpackMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import path from 'path'

const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger('dev'));
app.use(express.static('public'));

const compiler = webpack(webpackConfig);
app.use(
    WebpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    })
);
app.use(WebpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use('/users', userRouter);

// app.get('/users', async (req, res) =>{
// const users = await User.findAll();
// const answers = await Answer.findAll();
//   res.json({ users, answers })
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(PORT, () => console.log(`up and running on port ${PORT}`));
