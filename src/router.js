import dynamic from 'dva/dynamic';
import { Route, Router, Switch } from 'dva/router';
import { ErrorBoundary } from './components';

export default ({ app, history }) => {
  history.listen(() => window.scrollTo(0, 0));

  const App = dynamic({ app, component: () => import('./routes/App') });

  const Splash = dynamic({ app, component: () => import('./routes/Splash') });

  const Hola = dynamic({
    app,
    component: () => import('./routes/Hola'),
    models: () => [
      import('./models/hola'),
      import('./models/github'),
      import('./models/blog'),
      import('./models/projects'),
    ],
  });

  const Resume = dynamic({
    app,
    component: () => import('./routes/Resume'),
    models: () => [import('./models/resume')],
  });

  const Blog = dynamic({
    app,
    component: () => import('./routes/Blog'),
    models: () => [import('./models/blog')],
  });

  const Post = dynamic({
    app,
    component: () => import('./routes/Post'),
    models: () => [import('./models/posts')],
  });

  const Projects = dynamic({
    app,
    component: () => import('./routes/Projects'),
    models: () => [import('./models/projects')],
  });

  const InstantZine = dynamic({
    app,
    component: () => import('./routes/Projects/InstantZine'),
    models: () => [import('./models/instantZine')],
  });
  const InstantZinePost = dynamic({
    app,
    component: () => import('./routes/Projects/InstantZine/post'),
    models: () => [import('./models/instantZine')],
  });

  const Contact = dynamic({
    app,
    component: () => import('./routes/Contact'),
    models: () => [import('./models/mail'), import('./models/contact')],
  });

  const Qrcode = dynamic({
    app,
    component: () => import('./routes/Contact/Qrcode'),
  });

  const NotFound = dynamic({
    app,
    component: () => import('./routes/404'),
  });

  return (
    <Router history={history}>
      <ErrorBoundary>
        <App>
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route exact path="/hola" component={Hola} />
            <Route exact path="/resume" component={Resume} />
            <Route path="/blog/posts" component={Post} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/projects/instant-zine" component={InstantZine} />
            <Route path="/projects/instant-zine/post" component={InstantZinePost} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/contact/qrcode" component={Qrcode} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </ErrorBoundary>
    </Router>
  );
};
