# Netlify Deployment Troubleshooting Guide

## Overview
This document provides solutions for common deployment issues encountered when deploying the PANASA website to Netlify.

## Common Build Errors and Solutions

### 1. "Build script returned non-zero exit code: 2"

#### Symptoms
- Build fails at the "building site" stage
- No specific error message in logs
- Deployment process stops abruptly

#### Solutions
1. **Check Environment Variables**
   - Ensure all required environment variables are set in Netlify:
     - `VITE_CHATBASE_API_KEY`
     - `VITE_CHATBASE_CHATBOT_ID`
     - `VITE_ELEVENLABS_API_KEY` (optional)

2. **Verify Build Command**
   - Confirm the build command in `netlify.toml` is correct:
     ```toml
     [build]
       command = "npm run build"
       publish = "dist"
     ```

3. **Clear Netlify Cache**
   - Trigger a new build with "Clear cache and deploy site" option
   - This forces Netlify to reinstall all dependencies

### 2. Rollup Dependency Issues

#### Symptoms
```
Error: Cannot find module @rollup/rollup-linux-x64-gnu
```

#### Solutions
1. **Update .npmrc Configuration**
   ```ini
   engine-strict=false
   legacy-peer-deps=true
   audit=false
   fund=false
   prefer-offline=true
   ```

2. **Add External Modules to Vite Config**
   ```javascript
   build: {
     rollupOptions: {
       external: ['node:child_process', 'node:stream', 'crypto']
     }
   }
   ```

3. **Use Specific Node.js Version**
   ```toml
   [build.environment]
     NODE_VERSION = "22"
   ```

### 3. Memory Issues During Build

#### Symptoms
- Build process hangs or crashes
- "JavaScript heap out of memory" errors

#### Solutions
1. **Increase Memory Allocation**
   ```toml
   [build.environment]
     NODE_OPTIONS = "--max_old_space_size=4096"
   ```

2. **Optimize Build Process**
   - Split large bundles using manualChunks in vite.config.ts
   - Remove unnecessary dependencies

### 4. Module Externalization Warnings

#### Symptoms
```
Module "node:child_process" has been externalized for browser compatibility
```

#### Solutions
1. **Configure Rollup Externalization**
   ```javascript
   build: {
     rollupOptions: {
       external: ['node:child_process', 'node:stream', 'crypto']
     }
   }
   ```

2. **These warnings are normal** for browser-compatible builds and don't affect functionality

## Environment Configuration

### Required Environment Variables
Set these variables in Netlify dashboard under Site settings > Build & deploy > Environment:

```
VITE_CHATBASE_API_KEY=your_chatbase_api_key
VITE_CHATBASE_CHATBOT_ID=your_chatbase_chatbot_id
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key (optional)
```

### Optional Environment Variables
```
NODE_VERSION=22
NODE_OPTIONS=--max_old_space_size=4096
```

## Build Optimization

### Vite Configuration
The `vite.config.ts` file includes optimizations for Netlify deployment:

1. **Manual Chunking**
   - Splits vendor libraries into separate bundles
   - Improves loading performance

2. **Dependency Optimization**
   - Pre-bundles frequently used dependencies
   - Reduces build time

3. **External Module Handling**
   - Properly externalizes Node.js modules for browser compatibility

### Package.json Scripts
Ensure these scripts are present in package.json:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Cache Management

### When to Clear Cache
Clear Netlify's build cache when:
- Updating major dependencies
- Experiencing persistent build failures
- Changing build configurations

### How to Clear Cache
1. Go to Netlify Dashboard
2. Select your site
3. Go to Deploys tab
4. Click "Trigger deploy" dropdown
5. Select "Clear cache and deploy site"

## Debugging Steps

### 1. Local Build Verification
Before deploying, verify the build works locally:
```bash
npm run build
npm run preview
```

### 2. Check Netlify Logs
- Review complete build logs in Netlify dashboard
- Look for specific error messages
- Check if all dependencies install correctly

### 3. Test with Minimal Configuration
Temporarily simplify the configuration to isolate issues:
- Remove custom vite.config.ts settings
- Use default Netlify build settings
- Gradually re-enable customizations

## Best Practices

### Dependency Management
1. Keep dependencies up to date
2. Use exact versions for critical dependencies
3. Regularly audit for security vulnerabilities

### Environment Variables
1. Never commit sensitive keys to the repository
2. Use Netlify's environment variable management
3. Prefix client-side variables with `VITE_`

### Build Performance
1. Use manual chunking for large applications
2. Optimize images and assets
3. Minimize the number of dependencies

## Emergency Solutions

### If Build Continues to Fail
1. **Fallback to Default Configuration**
   - Temporarily remove custom vite.config.ts
   - Use Netlify's default build settings
   - Reintroduce customizations gradually

2. **Use Alternative Hosting**
   - Consider Vercel or other hosting platforms
   - Compare build processes and requirements

3. **Contact Support**
   - Provide complete build logs
   - Include configuration files
   - Describe troubleshooting steps already taken

## Monitoring and Maintenance

### Regular Checks
1. Monitor build times and performance
2. Check for dependency updates
3. Review build logs for warnings

### Automated Solutions
1. Set up automated dependency updates
2. Implement CI/CD testing
3. Monitor site performance post-deployment

## Conclusion

Following these guidelines should resolve most Netlify deployment issues. The key is to:
1. Properly configure environment variables
2. Optimize build settings for the Netlify environment
3. Manage dependencies carefully
4. Use appropriate cache management strategies

If issues persist, the detailed logs in Netlify's dashboard will provide specific clues for further troubleshooting.