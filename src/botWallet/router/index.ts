import {Express, Request, Response, Router} from "express";

interface RouterConf {
  path: string;
  router: Router;
  meta?: any;
}

const routerGroup: RouterConf[] = [
];

function registerRouteGroup(app: Express, routes: RouterConf[]) {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
}

// type QType = ((name: string) => any) & IRouterMatcher<this>

function initRoutes(app: Express) {
  // logger.info("Router initialization");

  app.get("/", async (req: Request, res: Response, next) => {
    // logger.info("This is an info message")
    // logger.warn("This is a warning message")
    // logger.error("This is an error message")
    try {
      res.send('')
    } catch (err) {
      next(err)
    }
  })

  registerRouteGroup(app, routerGroup);
}

export default initRoutes;
