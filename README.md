# Cozy Digital — Public Marketing Site

Public static marketing site for [Cozy Digital](https://www.cozydigital.org) — websites, content & lead systems.

## What's in this repo

This repo contains **only the public-facing marketing pages** of the Cozy Digital site. No sensitive data, no private routes, no API keys, no server-side logic, no database connections.

### Pages included
- `/` — Homepage (hero, capabilities, pricing, CTA)
- - `/services` — Services overview
  - - `/process` — How it works (audit, map, build, launch)
    - - `/pricing` — Package pricing
      - - `/about` — About Cozy Digital
        - - `/cozy-booking` — Booking page (links to Calendly)
          - - `/free-audit` — Free first-impression audit page
           
            - ## Tech Stack
           
            - - **Next.js 15** with static export (`output: 'export'`)
              - - **Tailwind CSS v4**
                - - **TypeScript**
                  - - **GitHub Actions** for CI/CD
                    - - **GitHub Pages** for hosting
                     
                      - ## Local Development
                     
                      - ```bash
                        npm install
                        npm run dev
                        ```

                        Open [http://localhost:3000](http://localhost:3000).

                        ## Deployment

                        This site auto-deploys to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`.

                        The workflow:
                        1. Installs dependencies
                        2. 2. Runs `next build` (outputs static files to `./out`)
                           3. 3. Uploads the `./out` directory as a Pages artifact
                              4. 4. Deploys to GitHub Pages
                                
                                 5. ## What's NOT in this repo
                                
                                 6. - No API keys or environment variables
                                    - - No database code (Prisma, SQLite, etc.)
                                      - - No private admin routes (`/command-center`, `/clients`, `/boss`, etc.)
                                        - - No server actions
                                          - - No email outreach scripts
                                            - - No lead tracking logic
                                              - - No watchdog/ecosystem configs
                                               
                                                - All private tools and client-facing systems remain in the private `cozyDigital` repo.
