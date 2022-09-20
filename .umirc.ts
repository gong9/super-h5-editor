export default {
  npmClient: "pnpm",
  routes: [
    { exact: true, path: "/", component: "/welcome.tsx"  },
    {
      exact: true, path: "/", routes: [
        {
          exact: true,
          path: "/superH5/editor",
          component: "/editor/index.tsx"
        }
      ]
    },
    // {
    //   exact: true,
    //   path: "/user",
    //   component: "/user",
    //   wrappers: ["@/wrappers/auth"],
    // },
    // { exact: true, path: "/posts/:postId", component: "/posts/[postId]" },
    { path: "*", component: "404" },
  ],
  dva: {}
};
