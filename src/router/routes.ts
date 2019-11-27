const routes = [{
  path: '/',
  redirect: '/home'
}]

function addRoute(route: any) {
  routes.push(route)
}

export {
  routes,
  addRoute
}
