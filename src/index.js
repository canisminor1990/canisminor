import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import router from './router';
import './style/index.scss';

// Initialize
const app = dva({
  history: createHistory(),
  onError(e) {
    console.log(e.message);
  },
});

// Plugins
app.use(createLoading());

// Router
app.router(router);

// Start
app.start('#root');
