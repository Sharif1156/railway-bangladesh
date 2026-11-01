# Railway Bangladesh

An independent, open-source rail companion concept inspired by the public features of train tracking apps. The responsive web app can also be installed as a progressive web app on supported devices.

## Run locally

Serve this directory with any static web server, for example:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. HTTPS (or localhost) is required for service workers and installation. The app has no build step or paid dependencies.

## What works

- Search the included sample trains by name, number, or station; browse stations and sample routes.
- Station boards: see which sample trains stop at a station and where they go next.
- English and বাংলা interface (toggle in the header).
- Save trains on your device using local storage.
- Opt-in live reports from riders (optional, needs Supabase; see below).
- Responsive interface and basic offline caching after the first visit.

## Live reports (optional)

Riders can tap **"I'm on this train"** to share a rounded position about every 30 seconds. Privacy design:

- No accounts, no names. Positions are rounded to about 11 m.
- Each report expires after 10 minutes. Sharing stops when the panel is closed.
- The public database rules allow inserting reports but **not reading** them. The only read path is `train_status()`, which returns counts and averages.

Setup:

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase SQL Editor, paste and run `supabase/schema.sql`.
3. In the project settings, copy the **Project URL** and the **anon public** key into `config.js`.
4. Push the site. Live reports stay hidden in any copy where `config.js` is empty.

Supabase's client is loaded from jsDelivr at version 2.45.0. Check that version before you go live and update it as needed.

Reports can be abused by anyone with the public key. Watch the table, add rate limits (for example, a Supabase Edge Function or a row-count check) before a wider launch, and delete old rows regularly.

## Important limitations

The included routes and stations are illustrative, may be incomplete or outdated, and are **not official schedules**. There are no official train timetables or ticketing. Live reports depend on riders choosing to share, so they can be missing, delayed, or wrong. Verify travel information with [Bangladesh Railway](https://eticket.railway.gov.bd/). It is not affiliated with or endorsed by Bangladesh Railway or the app that inspired it.

A production service would need a licensed or verified data source, stronger abuse protection, a published privacy policy, and a deployment review.

## License

MIT. See [LICENSE](LICENSE).
