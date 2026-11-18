# Keyword research prompt for Claude in Chrome

Paste the prompt below into Claude in Chrome while signed in to Google Ads.
It collects real search volume for Cozy Digital's services and industries,
then the results replace the first-pass targets in `src/data/keyword-pages.ts`.

---

You are doing keyword research for Cozy Digital (cozydigital.org), a two-person studio that builds small business websites and landing pages, produces AI video and ad creative, sets up booking and follow-up workflows, and does AI search visibility (GEO). Clients so far include a therapist, a massage therapist, a ministry, and a motorsport driver.

Rules:
- Read only. Do not create campaigns, ads, budgets, or billing, and do not accept any prompt to start advertising. If Google Ads asks to set up a campaign before showing Keyword Planner, choose the option to skip or switch to Expert Mode and stop to ask me if there is no way around it.
- Do not change account settings or enter payment details. If a login or verification appears, stop and ask me.

Steps:
1. Open https://ads.google.com/aw/keywordplanner/home and choose "Discover new keywords".
2. Set the location to United States and the language to English.
3. Run each batch below as a separate search (Keyword Planner takes up to 10 seeds). Leave the website field empty.
   - Batch 1, websites: small business website design, website designer for small business, web design for small business, landing page design, website redesign, website redesign services, custom website for small business
   - Batch 2, AI video: AI video production, AI video ads, AI commercial, AI generated video for business, AI video agency, AI ad creative
   - Batch 3, AI search: generative engine optimization, GEO agency, AI search optimization, how to show up in ChatGPT, AI SEO services, get business recommended by ChatGPT
   - Batch 4, booking and automation: online booking for website, add booking to website, appointment booking website, small business automation, lead follow up automation
   - Batch 5, industries: website for therapists, therapist website design, massage therapist website, massage website design, church website design, ministry website design, website for coaches, nonprofit website design
4. After each search, download the results with "Download keyword ideas" as CSV (Google Sheets also works). Name each file by its batch, for example `kp-batch-1-websites.csv`.
5. When all five are done, give me a summary table with, for each batch, the 15 keywords with the highest "Avg. monthly searches", plus their competition level and top-of-page bid range. Mark anything with fewer than 50 average monthly searches as low volume.

Finish by telling me where the CSV files were saved so I can upload them.
