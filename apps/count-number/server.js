const express = require('express')
const next = require('next')
const {createProxyMiddleware} = require('http-proxy-middleware')
const open = require('open')
const nextConfig = require('./next.config')
const cors = require('cors')

const currentDevDomain = 'http://localhost:30002'

const devProxy = {
  '/get-count': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure: false,
  },
}

const hostname = 'localhost'
const dev = process.env.NODE_ENV !== 'production'
const port = 3002
const app = next({
  dev,
  hostname,
  port,
})
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // Add CORS middleware
    server.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }))

    if (dev && devProxy) {
      Object.keys(devProxy).forEach(function (context) {
        server.use(createProxyMiddleware(context, devProxy[context]))
      })
    }

    // Add direct endpoint for SSR requests
    server.get('/get-count', async (req, res) => {
      try {
        const axios = require('axios');
        const response = await axios.get('http://localhost:3000/get-count');
        res.json(response.data);
      } catch (error) {
        console.error('Error proxying request:', error);
        res.status(500).json({ code: 500, message: 'Internal Server Error' });
      }
    });

    server.all('*', (req, res) => {
      handle(req, res)
    })

    server.listen(port, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on http://localhost:${port}`)
    })
    // 打开浏览器
    open(`http://localhost:${port}/${nextConfig.env.BASEROOT}`)
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log('发生错误，无法启动服务器')
    console.log(err)
  })
