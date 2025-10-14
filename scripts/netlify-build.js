#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('Running Netlify build script...');

try {
  // Install optional dependencies explicitly
  console.log('Installing optional dependencies...');
  execSync('npm install @rollup/rollup-linux-x64-gnu @esbuild/linux-x64 --no-save', { stdio: 'inherit' });
} catch (installError) {
  console.warn('Warning: Failed to install optional dependencies:', installError.message);
  console.log('Continuing with build process...');
}

try {
  // Run the build
  console.log('Running build...');
  execSync('vite build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (buildError) {
  console.error('Build failed:', buildError.message);
  
  // Try alternative build approach
  console.log('Trying alternative build approach...');
  try {
    execSync('CI=false vite build', { stdio: 'inherit' });
    console.log('Alternative build completed successfully!');
  } catch (altBuildError) {
    console.error('Alternative build also failed:', altBuildError.message);
    process.exit(1);
  }
}