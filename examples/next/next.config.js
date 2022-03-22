const { withGlobalCss } = require('next-global-css');

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 'nonce-fakeNonce';
  child-src example.com;
  style-src 'self' example.com rsms.me fonts.googleapis.com fonts.gstatic.com;
  font-src 'self' rsms.me;
  img-src 'self' images.unsplash.com  
`;
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
];

module.exports = withGlobalCss()({
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  // async headers() {
  //   return [
  //     {
  //       // Apply these headers to all routes in your application.
  //       source: '/:path*',
  //       headers: securityHeaders,
  //     },
  //   ];
  // },
});
