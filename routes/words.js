var debug   = require('debug')('http');
var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var http    = require('http');
var walk    = require('walk');
var _       = require('lodash');

var files   = [];


var PATH_TO_IMAGES  = './public/images/gallery';
var PATH_TO_DB      = './json-static/';

var wordsJSON = require('.' + PATH_TO_DB + "words.json");

var pathToImages = './public/images/gallery/';
//way relative to file: __dirname + '/path/to/file'

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})

/* GET words listing. */
router.get('/', function(req, res) {

    debug('//////////////////////// routes/words.js :: GET words ///////////////////////');

    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify(wordsJSON));
    //res.setHeader('Cache-Control', 'public, max-age=31557600'); // one year
    next();
});

router.post('/save', function(req, res) {
  
  debug('//////////////////////// routes/words.js ::  POST :: save ///////////////////////');
  debug(req.params);

  res.send('Results saved');

});


router.get('/list', function(req, res) {
  
  debug('//////////////////////// routes/words.js :: GET : list saved images ///////////////////////');
    

   // Walker options
    var walker  = walk.walk(PATH_TO_IMAGES, { followLinks: false });

    debug('File retrieval from: ', PATH_TO_IMAGES);

    walker.on('file', function(root, stat, next) {
        // Add this file to the list of files
        if(stat.name != '.DS_Store' && stat != null){
          files.push({"name"    : stat.name,
                    "created" : stat.ctime});
          
        }
        next();
    });

  walker.on('end', function() {
        res.send(_.uniq(files));
    });

});

router.get('/remove', function(req, res) {
  
    debug('//////////////////////// routes/words.js :: DELETE :: remove file///////////////////////');
      
    debug(JSON.stringify(req.query));
  
    var fullFilePath = PATH_TO_IMAGES + '/' + req.query.file;

    fs.unlink(fullFilePath, function (err) {
      
      if (err) {
        //throw err;
        debug('failed to remove file', err);
        res.send(500);
      } else {
        debug('successfully deleted ' + fullFilePath);
        res.send(200);
      }

    });

});

router.get('/readdb', function(req, res) {
  
    debug('//////////////////////// routes/words.js :: GET : JSON list of saved images///////////////////////');
      
    //console.info(req.query);
    if(req.query.file && _.isString(req.query.file)){

      var fileName = req.query.file;

      var imagesByCategories = require('.' + PATH_TO_DB + fileName + ".json");

      res.setHeader('Content-Type', 'application/json');

      res.send(JSON.stringify(imagesByCategories));
      next();
    }
    
});


router.post('/writedb', function(req, res) {
  
    debug('//////////////////////// routes/words.js :: POST : save list of categorised images ///////////////////////');
   

    var path = PATH_TO_DB + 'images.json';

    debug(JSON.stringify(req.body.data), path);

    buffer = new Buffer(JSON.stringify(req.body.data));

    fs.open(path, 'w', function(err, fd) {
        if (err) {
            
            debug('error opening file', err); 
            res.send(500);

        } else {
            fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                if (err) {
                  debug('error writing file', err); 
                  res.send(500);
                }
                fs.close(fd, function() {
                    debug('file written', path);
                    res.send(200);
                })
            });
        }
    });

});



function download(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      debug('//////////////////////// routes/words.js :: Saving file in download///////////////////////');
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};




router.get('/download', function(req, res) {

  debug('////////////////////////  routes/words.js :: POST :: download ///////////////////////');
  
  var destination = pathToImages + req.query.id + ".jpg";
  var fileurl     = "http://media.oboobs.ru/noise_preview/"+req.query.id+".jpg";

  debug(fileurl, destination);

  var test = function(){
    debug('download callback function');
    res.send('Results saved');
  }
  
  download(fileurl, destination, test);


});

router.post('/authorise', function(req, res) {
  console.log(req.params);
  res.send('authorised!');
});

router.post('/clear', function(req, res) {
  console.log(req.params);
  res.send('Results cleared');
});

router.get('/edit', function(req, res) {
  res.sendStatus(403);
});

module.exports = router;