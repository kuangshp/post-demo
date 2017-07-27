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