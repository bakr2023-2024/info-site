const http = require('http')
const fs= require('fs')
const path = require('path')
const renderPage = async (fileName)=>{
  return new Promise((resolve,reject)=>{
    const page = path.join(__dirname,fileName)
    fs.readFile(page,'utf-8',(err,data)=>{
      if(err)reject(err)
      else resolve(data)
    })
  })
}
const server = http.createServer()
server.on('request',async (req,res)=>{
  const method = req.method
  const url = req.url
  if(method==='GET'){
    switch(url){
      case '/':
        const index = await renderPage('index.html')
        res.writeHead(200,{'Content-Type':'text/html'})
        return res.end(index)
      case '/about':
        const about = await renderPage('about.html')
        res.writeHead(200,{'Content-Type':'text/html'})
        return res.end(about)
      case '/contact-me':
        const contact = await renderPage('contact-me.html')
        res.writeHead(200,{'Content-Type':'text/html'})
        return res.end(contact)
      default:
        const page404 = await renderPage('404.html')
        res.writeHead(404,{'Content-Type':'text/html'})
        return res.end(page404)
    }
  }
  else{
    const page404 = await renderPage('404.html')
    res.writeHead(404,{'Content-Type':'text/html'})
    return res.end(page404)
  }
})
server.listen(8080)