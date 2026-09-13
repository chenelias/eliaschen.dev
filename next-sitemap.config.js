const siteUrl = "https://www.eliaschen.dev";

module.exports = {
  siteUrl,
  // Component files living in pages/ are served as routes; keep them out of
  // the sitemap.
  exclude: [
    "/Footer",
    "/Header",
    "/PinnedRepos",
    "/FeaturedProjects",
    "/privacypolicy",
  ],
};
