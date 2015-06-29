System.config({
  "baseURL": "/tic-tac-toe",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime",
      "es7.comprehensions"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.4.1",
    "angular-material": "github:angular/bower-material@0.10.0",
    "babel": "npm:babel-core@5.6.15",
    "babel-runtime": "npm:babel-runtime@5.6.15",
    "core-js": "npm:core-js@0.9.18",
    "css": "github:systemjs/plugin-css@0.1.13",
    "tic-tac-toe": "github:amitport/tic-tac-toe@master",
    "github:angular/bower-angular-animate@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-angular-aria@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.1"
    },
    "github:angular/bower-material@0.10.0": {
      "angular": "github:angular/bower-angular@1.4.1",
      "angular-animate": "github:angular/bower-angular-animate@1.4.1",
      "angular-aria": "github:angular/bower-angular-aria@1.4.1",
      "css": "github:systemjs/plugin-css@0.1.13"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.6.15": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

