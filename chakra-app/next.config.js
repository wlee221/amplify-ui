const path = require('path');

const withNextPluginPreval = require('next-plugin-preval/config')();
const withCompileNodeModules = require('@moxy/next-compile-node-modules')({
  include: [
    // Using `path.dirname` because `package.json#main` doesn't exist in some packages yet
    path.dirname(require.resolve('@aws-amplify/ui-core/package.json')),
    path.dirname(require.resolve('@aws-amplify/ui-react/package.json')),
    // path.dirname(require.resolve('@aws-amplify/ui-theme-base/package.json')),
    // path.dirname(require.resolve('amplify-docs/package.json')),
  ],
  test: /\.(js|ts)x?/,
});

module.exports = withNextPluginPreval(
  withCompileNodeModules({
    // ! This exists due to the TypeScript issues in amplify-docs
    typescript: {
      ignoreBuildErrors: true,
    },
  })
);
