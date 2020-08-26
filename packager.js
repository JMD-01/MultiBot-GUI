let packager = require('electron-packager');
/**
 * Things to note:
 * Windows:
 * Package as 32bit so it supports both 32bit and 64bit in Windows
 * Mac:
 * Only supports 64bit and remember to change icon from .ico to .icns
 * Linux:
 * No idea what kind of 32bit or 64bit systems there are, but ill be making it work for most recent versions of Ubuntu
 */
let options = {
    'arch': 'x64',
    'platform': 'win32',
    'dir': '.',
    'app-copyright': 'ProZed',
    'app-version': '1.5.0',
    'asar': false,
    'icon': `./img/MultiBot_Logo.ico`,
    'name': 'MultiBot 1.5 Lite',
    'ignore': ['./releases', './.git','./packager.js','./.vscode'],
    'out': './releases',
    'overwrite': true,
    'prune': true,
    'version': '1.5.0',
    'version-string':{
      'CompanyName': 'Charged Development',
      'FileDescription': 'MultiBot 1.4 Lite', 
      'OriginalFilename': 'MultiBot 1.4 Lite',
      'ProductName': 'MultiBot 1.4 Lite',
      'InternalName': 'MultiBot 1.4 Lite'
    }
};
packager(options, function done_callback(err, appPaths) {
    console.log(err);
    console.log(appPaths);
});