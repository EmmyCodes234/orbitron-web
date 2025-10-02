# Deployment Instructions for PANASA Website

## Deploying to Netlify

### Prerequisites
1. A Netlify account (free at [netlify.com](https://netlify.com))
2. Git repository (GitHub, GitLab, or Bitbucket) with the PANASA website code

### Option 1: Deploy with Git (Recommended)

1. **Push your code to a Git repository**
   - Create a new repository on GitHub, GitLab, or Bitbucket
   - Push your local code to the remote repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [your-repository-url]
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Log in to your Netlify account
   - Click "New site from Git"
   - Select your Git provider and repository
   - Netlify will automatically detect this is a Vite project

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables (if needed):
     - Add `GEMINI_API_KEY` if you're using the AI features

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - Your site will be available at a auto-generated URL (e.g., `random-words-12345.netlify.app`)

### Option 2: Deploy Manually via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   # Build the project first
   npm run build
   
   # Deploy to Netlify
   netlify deploy --prod
   ```

### Option 3: Deploy via Drag and Drop

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Sign in to your account
   - Drag and drop the `dist` folder to the deployment area on the Netlify dashboard

## Environment Variables

If you're using the Gemini API features, you'll need to set the `GEMINI_API_KEY` environment variable:

1. In Netlify dashboard, go to your site settings
2. Navigate to "Build & deploy" → "Environment"
3. Add a new variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your actual Gemini API key

## Custom Domain

To use a custom domain:

1. In Netlify dashboard, go to your site settings
2. Navigate to "Domain management"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Continuous Deployment

With Git-based deployment, Netlify will automatically rebuild and deploy your site whenever you push changes to your repository.

### Branch Deployments
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployments

## Troubleshooting

### Common Issues

1. **Build failures**
   - Check that all dependencies are in package.json
   - Ensure Node.js version is compatible (Netlify uses Node 18 by default)

2. **Routing issues**
   - The `_redirects` file in the public directory handles SPA routing
   - All routes redirect to index.html for React Router to handle

3. **Environment variables not working**
   - Ensure variables are added in Netlify dashboard
   - Check that your code correctly references the variables

### Checking Build Logs

1. In Netlify dashboard, go to your site
2. Click on "Deploys" tab
3. Select a specific deploy to view logs

## Performance Optimization

Netlify automatically:
- Serves assets over CDN
- Compresses files with gzip
- Sets appropriate cache headers

For additional optimization:
- Use Netlify's image CDN for dynamic image optimization
- Enable Netlify's form handling if you have contact forms
- Consider using Netlify Functions for serverless API endpoints

## Additional Netlify Features

1. **Form Handling**
   - Add `data-netlify="true"` to your form elements
   - Netlify will automatically handle form submissions

2. **Functions**
   - Create serverless functions in `netlify/functions` directory
   - Useful for API endpoints or server-side processing

3. **Split Testing**
   - Test different versions of your site with Netlify's A/B testing

4. **Analytics**
   - Enable Netlify Analytics for traffic insights without cookies

## Netlify.toml Configuration

The `netlify.toml` file in your project root contains the configuration for your Netlify deployment:

```toml
[build]
command = "npm run build"
publish = "dist"
functions = "netlify/functions"
```

This configuration:
- Sets the build command to `npm run build`
- Specifies the publish directory as `dist`
- Specifies the functions directory as `netlify/functions`

Note: SPA routing is handled by the `_redirects` file in the public directory, which automatically redirects all routes to index.html for React Router to handle.

This setup will give you a fast, reliable deployment of your PANASA website with automatic SSL, CDN distribution, and continuous deployment.