/** @type {import('next').NextConfig} */
module.exports = {
  redirects: () => {
    return [
      {
        source: "/mn",
        destination: "/",
        permanent: true,
      },
      {
        source: "/mn/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
  transpilePackages: ["ui", "utils"],
};
