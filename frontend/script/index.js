import dashboard from "./views/dashboard.js";

// handling navigation without reload page helper
const navigator = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: dashboard },
    { path: "/facebook", view: () => console.log("View is loaded") },
    { path: "/tiktok", view: () => console.log("View is loaded") },
    { path: "/telegram", view: () => console.log("View is loaded") },
  ];

  const matchRoutes = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = matchRoutes.find((matchRoute) => matchRoute.isMatch);
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();

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
