  const http = require('http');
  const fs =require('fs');
  var requests= require('requests');

  const replaceVal=(tempVal,orgVal)=>{
                   let temperature=tempVal.replace("{%tempval%}", orgVal.main.temp);
                   temperature=temperature.replace("{%tempmin%}", orgVal.main.temp_min);
                   temperature=temperature.replace("{%tempmax%}", orgVal.main.temp_max);
                   temperature=temperature.replace("{%location%}", orgVal.name);
                   temperature=temperature.replace("{%country%}", orgVal.sys.country);
                   temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
                   return temperature;
}


const homeFile = fs.readFileSync("index.html","utf-8"); 



const server  = http.createServer((req, res) =>{ 
    if (req.url="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=allahabad&units=metric&appid=7c83c219930d33bd06c0fefeb2da8fe0")
     
        .on("data",(chunk) =>{
                const objdata = JSON.parse(chunk);
                const arrData = [objdata];
                const realTimeData=arrData.map((val) => replaceVal(homeFile,val) ).join("");
                res.write(realTimeData);
             })
            .on("end", (err) => {
                if(err) return console.log("Connection closed due to errors", err);
                res.end()
            });
    }
});
const port =process.env.PORT || 80;

server.listen(port, () => {
  console.log(`Server running on port ${{port}`);
});
