/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig:{
    secret:"My Top Secret key"
  },
  publicRuntimeConfig: {
    apiUrl: 'https://localhost:7213/api'
  },

  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com']
  }
}

module.exports = nextConfig
