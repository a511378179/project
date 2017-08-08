var sf = require('fs');
var ncp = require("copy-paste");
var cheerio = require("cheerio"); 
var minify = require('html-minifier').minify;


var config={ss:[{collapsed:".collapsed-container", expanded:".expanded-container"},
                {collapsed:"$collapsed_conatiner", expanded:"$expanded_conatiner"},
                {collapsed:"$collapsed_conatiner.append('')", expanded:"$expanded_conatiner.append('')"}],
            pgx:[{expanded:".interactive-container"},
                 {expanded:"$expanded_conatiner"},
                 {expanded:"$expanded_conatiner.append('')"}]}

var type = '';
var preloadJs = '';
getHtmlCode();
function getHtmlCode(){
    sf.readFile('index.html',{flag:'r+',encoding:'utf8'},function(err,data){
        if(err) throw err;
        var $ = cheerio.load(data);
        var preloadJs_H = 'ad.preload(['
        var preloadJs_F = ']);'
        $('img').each(function(i,e){
            var _str = e.attribs.src = e.attribs.src.replace(/assets\//g,'');
            if(i!=0) _str = ',"'+_str+'"';
            else _str = '"'+_str+'"';
            preloadJs_H+=_str;
        })
        preloadJs = preloadJs_H+preloadJs_F;
        type = $('html').attr('class');
        var typeConfig = config[type];
        for(k in typeConfig[0]){
            var htmlCode = minify($.html(typeConfig[0][k]),{removeComments: true,collapseWhitespace: true,minifyJS:true, minifyCSS:true});
            typeConfig[1][k] = typeConfig[1][k] + ".append('"+ htmlCode +"')";
        }
        editJsCode();
    })
    
}
function editJsCode(){
    sf.readFile('app.js',{flag:'r+',encoding:'utf8'},function(err,data){
        if(err) throw err;
        var str = data+='';
        var typeConfig = config[type];
        for(k in typeConfig[1]){
            str = str.replace(typeConfig[2][k],typeConfig[1][k]);
        }
        str = str.replace('ad.preload();',preloadJs);        
        ncp.copy(str,function(){
            console.log('code copied');
        });
    })
}
