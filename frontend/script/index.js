import dashboard from "./views/dashboard.js";

const regexPath = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, index) => {
      return [key, values[index]];
    })
  );
};

// handling navigation without reload page helper
const navigator = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: dashboard },
    // { path: "/facebook", view: () => console.log("View is loaded") },
    // { path: "/tiktok", view: () => console.log("View is loaded") },
    // { path: "/telegram", view: () => console.log("View is loaded") },
  ];

  const matchRoutes = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(regexPath(route.path)),
    };
  });

  let match = matchRoutes.find((matchRoute) => matchRoute.result !== null);
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml();
  console.log(match);
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  // listent for navigation and handling reload
  document.body.addEventListener("click", (event) => {
    if (event.target.match("[data-link]")) {
      event.preventDefault();
      navigator(event.target.href);
    }
  });

  router();
});
