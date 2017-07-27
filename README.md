### 一、通过`CROS`跨域
>客户端不需要处理,只是服务器端需要添加一个头部

* 1、服务器端设置`Access-Control-Allow-Origin`

    ```javascript
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    ```
    
* 2、详细代码见01(01-CORS)

### 二、使用`JSONP`处理跨域的问题
>`jsonp`实质就是利用回调函数的处理方式,需要服务端配合开发

* 代码见(02-jsonp)

### 三、使用`iframe`实现跨域

### 四、使用`http-proxy-middleware`中间件代理
* 1、利用`node`定义服务层

    ```javascript
    var express = require('express');
    var app = express();
    var responsePort = 3001; // 请求页面跑在3001端口
    // 定义一个返回数据的
    app.get('/api', (req, res) => {
        res.json({
            'info': 'success',
            'code': 200,
            'data': {
                'names': ['张三', '李四', '王五']
            }
        })
    });
    app.listen(responsePort, function() {
        console.log('Responser is listening on port ' + responsePort);
    });
    ```
    
* 2、定义中间件代理到服务层数据

    ```javascript
    var express = require('express');
    var proxy = require('http-proxy-middleware');
    
    var requestPort = 3000; // 请求页面跑在3000端口   
    var app = express();
    
    app.use(express.static(__dirname));
    
    // 请求这个'api'接口就会代代理到`http://localhost:3001/`服务下
    app.use('/api', proxy({ target: 'http://localhost:3001/', changeOrigin: true }));
    // changeOrigin设置为true，本地会虚拟一个服务端接收你的请求并代你发送该请求  
    // http://localhost:3000/api   -->   http://localhost:3001/api
    
    app.listen(requestPort, function() {
        console.log('Requester is listening on port ' + requestPort);
    });
    ```
    
* 3、前端页面

    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>Proxy跨域</title>
    </head>
    
    <body>
        <h2 style="text-align: center;">通过http-proxy-middleware插件设置代理</h2>
        <button>点击跨域</button>
        <p>hello world!</p>
    
        <script>
            var btn = document.getElementsByTagName('button')[0];
            var text = document.getElementsByTagName('p')[0];
            btn.addEventListener('click', function() {
                var xhr = new XMLHttpRequest();
                var url = '/api'; // 向http://localhost:3000/api发出请求，获取数据
                xhr.open('GET', url);
                xhr.send(null);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // 如果请求成功
                        //text.innerHTML = xhr.response;
                        console.log(xhr.response)
                    }
                }
            })
        </script>
    </body>
    
    </html>
    ```
    
* 4、代码见07

### 五、直接使用`node`模块,代码见08
### 六、使用`WebSocket`跨域

