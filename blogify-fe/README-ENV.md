# Environment Variables Setup

## Local Development

For local development, make sure your `.env` file in `blogify-fe/` contains:

```env
VITE_API_URL=http://localhost:3000
```

## Important Notes

1. **Restart Required**: After changing `.env` file, you MUST restart the Vite dev server:
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart it
   npm run dev
   ```

2. **Vite Cache**: If environment variables aren't updating, clear the cache:
   ```bash
   # Delete node_modules/.vite folder
   rm -rf node_modules/.vite
   # Or on Windows:
   Remove-Item -Recurse -Force node_modules\.vite
   
   # Then restart
   npm run dev
   ```

3. **Check Environment Variables**: To verify which URL is being used, check the browser console. You should see:
   ```
   [AddCommentForm] Using API URL: http://localhost:3000
   ```

4. **Production**: For production (Vercel), set `VITE_API_URL` in Vercel's environment variables to your production backend URL.

## Troubleshooting

If you're still seeing `https://blogify-t7nc.vercel.app`:
1. Stop the dev server completely
2. Delete `node_modules/.vite` folder
3. Restart with `npm run dev`
4. Check browser console for the API URL being used

