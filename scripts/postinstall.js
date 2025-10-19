#!/usr/bin/env node

import { execSync } from 'child_process';
import os from 'os';
import fs from 'fs';

console.log('Running postinstall script...');

// Detect platform
const platform = os.platform();
const arch = os.arch();

console.log(`Platform: ${platform}, Arch: ${arch}`);

try {
  // Handle Linux x64 specifically for Netlify
  if (platform === 'linux' && arch === 'x64') {
    console.log('Installing Linux x64 dependencies...');
    execSync('npm install @rollup/rollup-linux-x64-gnu @esbuild/linux-x64 --no-save', { stdio: 'inherit' });
  }
  
  // Handle other platforms if needed
  if (platform === 'darwin' && arch === 'x64') {
    console.log('Installing macOS x64 dependencies...');
    execSync('npm install @rollup/rollup-darwin-x64 @esbuild/darwin-x64 --no-save', { stdio: 'inherit' });
  }
  
  if (platform === 'darwin' && arch === 'arm64') {
    console.log('Installing macOS ARM64 dependencies...');
    execSync('npm install @rollup/rollup-darwin-arm64 @esbuild/darwin-arm64 --no-save', { stdio: 'inherit' });
  }
  
  if (platform === 'win32' && arch === 'x64') {
    console.log('Installing Windows x64 dependencies...');
    execSync('npm install @rollup/rollup-win32-x64-msvc @esbuild/win32-x64 --no-save', { stdio: 'inherit' });
  }
  
  console.log('Postinstall completed successfully!');
} catch (error) {
  console.warn('Postinstall script warning (not fatal):', error.message);
  console.log('Continuing with installation...');
}