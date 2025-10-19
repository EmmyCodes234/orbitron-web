# Netlify Deployment Fix

## Issue
The Netlify deployment was failing because it was trying to run `npm run build:netlify` which was not defined in the package.json file.

## Solution
1. Added the `build:netlify` script to package.json that runs the same command as `build`
2. Updated netlify.toml to use the standard `npm run build` command

## Changes Made

### package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:netlify": "vite build",
    "preview": "vite preview",
    "supabase:deploy": "supabase functions deploy contact"
  }
}
```

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"
```

## Verification
- ✅ Package.json now includes the build:netlify script
- ✅ Netlify.toml uses the correct build command
- ✅ Both scripts run the same vite build command
- ✅ No more missing script errors

## Next Steps
The deployment should now complete successfully. If there are any further issues, they will be related to the actual build process rather than missing scripts.