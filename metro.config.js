const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// ADD THIS PART: This forces Metro to look at your node_modules 
// explicitly, which fixes the "could not be found" error.
config.watchFolders = [
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;