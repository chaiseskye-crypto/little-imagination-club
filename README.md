# Little Imagination Club — launch starter

This is a small static website starter for the first public preview of Little Imagination Club.

## What works in this preview
- Responsive landing page
- Local drawing preview (the image is not uploaded)
- A simple sample story template that runs in the browser
- Browser print / Save as PDF

## What is not connected yet
- Live AI story generation
- Parent accounts, database, cloud saving, or book library
- Subscription checkout or recurring payments

Do not collect children's personal information or advertise this as a working paid subscription service until the full service, safety, privacy, billing and deletion flows have been built and tested.

## Free first deployment: GitHub + Vercel
1. Create/sign in to GitHub: https://github.com/
2. Create a repository named `little-imagination-club`. Set it to Public for this first preview; this starter contains no secrets.
3. Upload `index.html` and `README.md` to the repository using **Add file → Upload files**, then commit.
4. Create/sign in to Vercel: https://vercel.com/
5. Choose **Add New → Project**, connect GitHub, and import `little-imagination-club`.
6. If asked for a framework, choose **Other**. This is a static website: no build command is needed and `index.html` is in the repository root.
7. Click **Deploy** and wait for completion.
8. Open the `*.vercel.app` address Vercel gives you. Test the drawing preview, sample story and Print / Save PDF.

Official Vercel documentation: https://vercel.com/docs/deployments/overview

## Domain
Do not pay for a domain until the preview is published and the brand name is settled. These are suggestions to check, not confirmed available names:
- `littleimaginationclub.com`
- `littleimaginationclub.com.au`
- `littleimaginationclub.au`

Check availability, eligibility and trademark considerations before purchasing. Australian domain guidance: https://www.auda.org.au/au-domain-names/

## Production work before taking payments
1. Parent authentication and database ownership policies.
2. Private artwork storage, export and deletion.
3. Server-side AI story generation with safety and cost controls.
4. Persistent book editor and reliable PDF generation.
5. Hosted checkout, verified payment webhooks, cancellations and refunds.
6. Privacy policy, terms, child-safety review, backups and monitoring.

Never put AI API keys, database service-role keys or payment secrets in client-side JavaScript.
