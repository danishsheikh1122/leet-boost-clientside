module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com;
              style-src 'self' 'unsafe-inline';
              connect-src 'self' https://*.firebaseio.com https://apis.google.com;
              frame-src https://accounts.google.com;
            `.replace(/\s{2,}/g, " ").trim(), // This removes extra whitespace
          },
        ],
      },
    ];
  },
};
