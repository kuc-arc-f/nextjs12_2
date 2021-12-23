/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages/', 'components/', 'client/']
  },
  env: {
    COOKIE_KEY_USER_ID: "next21uid",
    CSRF_SECRET: "secret1234",
  },  
}
