# Hosteling

This is the third draw of Hosteling app, website version. A platform connecting volunteers with hostels worldwide.

## Running the code

```bash
# Install dependencies
npm i

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This app is deployed to [hostelingapp.com](https://hostelingapp.com) via GitHub Pages.

For detailed deployment information and troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment Fix Summary

If the website works locally but not on your custom domain:
1. ✅ Relative asset paths configured in `vite.config.ts` with `base: './'`
2. ✅ CNAME file in `public/` directory
3. ✅ `.nojekyll` file in `public/` directory (disables Jekyll processing, fixes MIME type issues)
4. ✅ SPA routing support via 404.html
5. ✅ Clean .gitignore to avoid committing build artifacts
