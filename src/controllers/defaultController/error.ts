export const get404 = (req: any, res: any, next: any) => {
  return res.status(404).render("errorPage/404", {
    pageTitle: "Page Not Found",
    path: "errorPage/404",
  });
};
// isAuthenticated: req.session.isLoggedIn,

export const get500 = (req: any, res: any, next: any) => {
  return res.status(500).render("errorPage/500", {
    pageTitle: "Error!",
    path: "errorPage/500",
  });
};
