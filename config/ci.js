const path = require('path');
const fs = require('fs');

function getParamIndex(paramsArr) {
  let indexFind = -1;
  for (let param of paramsArr) {
    let index = process.argv.indexOf(param);
    if ((index > -1))
      indexFind = index;
  }
  return indexFind;
}

function getParamValue(index) {
  if ((index > -1)) {
    return process.argv[index + 1];
  }
  else {
    return '';
  }
}

function copyFile(source, target, cb) {
  console.log(source + ' to ' + target);

  let cbCalled = false;

  let rd = fs.createReadStream(source);
  rd.on('error', done);

  let wr = fs.createWriteStream(target);
  wr.on('error', done);
  wr.on('close', function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

function writeFile(fileName, file) {
  fs.writeFile(fileName, JSON.stringify(file, null, 2), function(err) {
    if (err) return console.log(err);
    console.log('writing to ' + fileName);
  });
  return fileName;
}

const logDivider = '____________________________';

let params = {
  instance: ['--instance', '-i'],
  apiUrl: ['--apiUrl', '-au'],
  env: ['--env', '-e', '-environment', '-enviroment'],
  help: ['--help', '-h']
};

let instance = getParamValue(getParamIndex(params.instance)),
    apiUrl = getParamValue(getParamIndex(params.apiUrl)),
    env = getParamValue(getParamIndex(params.env)),
    help = getParamIndex(params.help);

let instanceNotice = '',
    apiUrlNotice = '',
    apiCrmUrlNotice = '',
    envNotice = '';

let commonModule = 'common.json',
    serverModule = 'server.json';

//if apiUrl is EMPTY build it from instance name
if (help > -1) {
  console.log(help);
  let filename = path.basename(process.argv[1]);
  console.log(
      `example: node ${filename} [-i dev] [-au apiUrl] [-e production] [-h] `);
  console.log(logDivider);
  console.log(` --instance, -i: instance name without '-'`);
  console.log(` --apiUrl, -au: url to site API like https://api-example.com`);
  console.log(` --env, -e: production or development app environment`);
  console.log(` --help, -h: get some help information`);
  console.log(logDivider);
  console.log(
      `
      URLS rules:
        if apiUrl is EMPTY build it from instance name  
      
      ENV rules:
        if env is EMPTY it depends of instance name:
            if env EMPTY and instance EMPTY(default) env=production)
            if env is EMPTY and instance is NOT EMPTY env=development
     `);
  process.exit(0);
}

//if instance is empty - it is production
if (!instance) {
  instanceNotice = '(autogenerated empty)';
}
else {
  instance = '-' + instance;
}

//if apiUrl is EMPTY build it from instance name
if (!apiUrl) {
  apiUrlNotice = '(autogenerated)';
  apiUrl = `https://jsonplaceholder${instance}.typicode.com`;
}

//if env is EMPTY it depends of instance name
//if env EMPTY and instance EMPTY(default) env = production)
if ((!env) && (!instance)) {
  envNotice = '(autogenerated)';
  env = 'production';
} else if ((!env) && (instance)) {
  //if env is EMPTY and instance is NOT EMPTY env=development
  envNotice = '(autogenerated)';
  env = 'development';
}

console.log('Building config files...');
copyFile(path.resolve(__dirname, commonModule+'.dist'), path.resolve(__dirname, commonModule), () => {
  let commonCfg = require(path.resolve(__dirname, commonModule));
  commonCfg.apiUrl = apiUrl;
  commonCfg.env = env;

  writeFile(path.resolve(__dirname, commonModule), commonCfg);
});

copyFile(path.resolve(__dirname, serverModule + '.dist'), path.resolve(__dirname, serverModule), () => {
  let serverCfg = require(path.resolve(__dirname, serverModule));

  writeFile(path.resolve(__dirname, serverModule), serverCfg);
});

console.log(logDivider);
console.log(`Enviroment${envNotice}=${env}`);
console.log(`Site API Url${apiUrlNotice}=${apiUrl}`);
console.log(logDivider);

console.log(logDivider);
