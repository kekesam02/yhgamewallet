import {Express, Request, Response, Router} from "express";
import logger from "../logger";
import UserService from "../services/UserService";

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
  app.get("/", async (req: Request, res: Response, next) => {
    // logger.info("This is an info message")
    // logger.warn("This is a warning message")
    // logger.error("This is an error message")
    try {
      console.log('什么啊')
      let userService = new UserService()
      let result = await userService.getUserList()
      console.log('这是用户id', result[0])
      res.send(result)
    } catch (err) {
      console.log('什么啊', err)
      next(err)
    }
  })

  registerRouteGroup(app, routerGroup);
}

export default initRoutes;
