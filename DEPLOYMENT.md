# Deployment Guide for Custom Domain

## Issue: Website Works Locally but Not on Custom Domain

### Problem Description
The website built with Vite works perfectly when running locally (`npm run dev`) or when the build folder is served locally, but doesn't work when deployed to the custom domain `hostelingapp.com` via GitHub Pages.

### Root Causes

1. **Absolute Asset Paths**: By default, Vite generates absolute paths starting with `/` (e.g., `/assets/index.js`). This works fine when the site is at the root of a domain, but can cause issues in some deployment scenarios.

2. **Missing CNAME File**: The CNAME file that tells GitHub Pages about your custom domain needs to be in the build output, not just in the GitHub Action.

3. **SPA Routing on GitHub Pages**: Single Page Applications (SPAs) need special handling on GitHub Pages because the server returns 404 for client-side routes.

### Solutions Implemented

#### 1. Relative Asset Paths (`vite.config.ts`)
```typescript
export default defineConfig({
  base: './',  // This generates relative paths like ./assets/index.js
  // ... rest of config
});
```

**Why this fixes it**: Relative paths (`./assets/`) work regardless of where the app is deployed, whereas absolute paths (`/assets/`) require the app to be at the domain root.

#### 2. CNAME File in Source (`public/CNAME`)
Created a `public/CNAME` file containing:
```
hostelingapp.com
```

**Why this fixes it**: Vite automatically copies everything in the `public/` directory to the build output. This ensures the CNAME file is always present in deployments, not just when the GitHub Action adds it.

#### 3. Disable Jekyll Processing (`public/.nojekyll`)
Created an empty `public/.nojekyll` file.

**Why this fixes it**: GitHub Pages uses Jekyll by default to process static sites. Jekyll can cause issues with:
- Files/directories starting with underscores (like `_app` or `_next`)
- Certain asset types being served with incorrect MIME types
- Module scripts failing with "application/octet-stream" MIME type errors

The `.nojekyll` file disables Jekyll processing, ensuring all built assets are served correctly with proper MIME types.

#### 4. SPA Routing Support
Added two components for client-side routing:

**`public/404.html`**: Redirects any 404 errors to the main app with the path encoded as a query parameter.

**`index.html`**: Contains a script that decodes the query parameter and restores the correct URL.

**Why this fixes it**: GitHub Pages returns a real 404 for client-side routes (like `/how-it-works`). The 404.html trick redirects these to index.html which can handle the routing client-side.

#### 5. .gitignore for Clean Repository
Created `.gitignore` to exclude:
- `node_modules/` - Dependencies
- `build/` - Build output (except for the initial build)
- `.vite/` - Vite cache
- `package-lock.json` - Lock file (varies by platform)
- Various logs and OS-specific files

**Why this matters**: Keeps the repository clean and prevents conflicts from platform-specific files.

### Verification Steps

After deploying the fixes, verify:

1. **Build succeeds**: `npm run build` completes without errors
2. **Relative paths**: Check `build/index.html` contains `./assets/` not `/assets/`
3. **CNAME present**: `build/CNAME` exists and contains your domain
4. **404.html present**: `build/404.html` exists
5. **.nojekyll present**: `build/.nojekyll` exists (disables Jekyll)
6. **Local preview works**: Test the built files locally with a static server

### Deployment Workflow

The GitHub Action (`.github/workflows/deploy.yml`) handles deployment:
1. Checks out the code
2. Installs dependencies
3. Builds the project (which now includes all necessary files)
4. Deploys the `build/` directory to GitHub Pages

### Testing Locally

To test the production build locally:
```bash
# Build the project
npm run build

# Serve the build directory
npx serve build

# Or with Python
cd build && python3 -m http.server 8080
```

Visit http://localhost:8080 and test:
- Homepage loads correctly
- Assets (CSS, JS) load without errors
- Navigation works (if you have client-side routing)
- Images from external sources load

### Common Issues and Solutions

**Issue**: Module script MIME type error - "Expected a JavaScript module script but the server responded with a MIME type of 'application/octet-stream'"
- **Check**: `.nojekyll` file exists in build output (`build/.nojekyll`)
- **Check**: The error references `main.tsx` - this means the source `index.html` is being served instead of the built one
- **Solution**: The `.nojekyll` file disables Jekyll processing which can interfere with proper MIME types

**Issue**: Assets still show as 404
- **Check**: Ensure `base: './'` is in `vite.config.ts`
- **Check**: Clear build cache: `rm -rf build && npm run build`

**Issue**: Custom domain not working
- **Check**: CNAME file exists in build output
- **Check**: DNS settings point to GitHub Pages
- **Check**: Custom domain is set in GitHub repository settings

**Issue**: Client-side routes return 404
- **Check**: 404.html exists in build output
- **Check**: index.html contains the SPA redirect script

**Issue**: CSS not loading
- **Check**: Asset paths in build/index.html are relative (./assets/)
- **Check**: Browser console for specific errors

### Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [SPA GitHub Pages](https://github.com/rafgraph/spa-github-pages) - The technique used for client-side routing
