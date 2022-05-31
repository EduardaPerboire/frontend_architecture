const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    publicPath: 'http://localhost:5000/',
    uniqueName: 'shell',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({

        remotes: {
            access: "http://localhost:3000/remoteEntry.js",
            payment: "http://localhost:4000/remoteEntry.js",

        },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material/icon": { singleton: true, strictVersion: true, requiredVersion:'auto' }, 
          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
