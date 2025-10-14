#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('Testing build script...');

try {
  // Test installing the dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Dependencies installed successfully!');
  
  // Test the build
  console.log('Testing build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build test completed successfully!');
} catch (error) {
  console.error('Test failed:', error.message);
  process.exit(1);
}