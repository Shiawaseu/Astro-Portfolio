[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShiawaseu%2FAstro-Portfolio&env=SPOTIFY_ENABLED,REDIS_PORT,REDIS_HOST,REDIS_PASSWORD,AUTHENTICATION_PASSWORD,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REDIRECT_URI&envDescription=Environment%20variables%20for%20setting%20up%20the%20Spotify%20integration%20%7C%20If%20you%20won't%20use%20the%20feature%2C%20set%20SPOTIFY_ENABLED%20to%20%22false%22%20and%20discard%20the%20rest%20of%20the%20variables&envLink=https%3A%2F%2Fgithub.com%2FShiawaseu%2FAstro-Portfolio%2Fblob%2Fmain%2F.env.example&project-name=portfolio&repository-name=portfolio&demo-title=Portfolio%20Showcase&demo-description=A%20sleek%2C%20professional%20and%20responsive%20open-source%20portfolio%20built%20with%20Astro%20with%20customizable%20features%20and%20content.)

# Astro Portfolio

A sleek, professional and responsive open-source portfolio built with Astro with customizable features and content.

| Feature               | Description                                                                                      |
|-----------------------|--------------------------------------------------------------------------------------------------|
| **Responsive Design 💡** | Optimized layout for various screen sizes. |
| **Easy Theming ⛅** | Easily switch between light and dark modes, with built-in versions of the two.      |
| **Optimized Performance ⚙️** | Built with Astro, focusing on fast load times and minimal resource usage.                      |
| **Project Showcase 📜**   | Dedicated sections for highlighting projects, complete with images, descriptions, and links.     |
| **Skills Badges ⚒️**      | Display your skills and technologies with customizable badges for quick visual reference.        |                     |
| **Spotify Integration 🎧**      | Displays the song currently playing on Spotify.        |                     |
| **SEO Optimized 🔰** | Built with SEO best practices to improve search engine rankings.                      |
| **Live Insights ⚡** | Using Vercel's provided tools, you can track visitor count & function speed for the portfolio.                      |

# Showcase
https://github.com/user-attachments/assets/a386cd13-83f5-44c6-910e-c09a470dfafe

## Astro Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run start`           | Runs `npm run dev` with the `--host` argument    |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


## Spotify Setup (One-time)

<details>
<summary>Click here to expand Spotify Setup Steps</summary>

### For every step here, insert all the information to your environment variables (check [here](/.env.example))

1 - Collect your Spotify Data
- https://developer.spotify.com/dashboard/create ![](/assets/spotify1.png) ![](/assets/spotify2.png)
  - Select "Web API" and make sure the redirect URI is your site (I.E: `https://mysite.com/api/spotify`) **You CAN provide a localhost and finish authentication in a development environment**
- Collect the **Client ID** & **Client Secret** ![](/assets/spotify3.png)

2 - Collect your Redis data (used for storing your access tokens along with refresh tokens)
- Create a new cache like so: ![](/assets/redis1.png)
  - Select `cache` & the rest is up to you

- Get your `host` / `port` / `password` from the dashboard: ![](/assets/redis2.png) ![](/assets/redis3.png)

3 - Authenticate your Spotify account
> At this point, you need your server running, whether it is locally or in production, make sure your redirect URI is matching in both the Spotify Dashboard & your environment variables.

- Navigate to `/api/spotify`
  - You will be prompted to log in to Spotify and then asked for permission to authorize the app you've created, accept.

- Once you have been redirected back, edit your URL as follows: ![](/assets/auth1.png) ![](/assets/auth2.png)
  - This extra step only exists to prevent unauthorized spotify linking to your portfolio
  - Once you have done that, you should be ready to go.

</details>

# License
This project is Licensed under the [Attribution-NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/deed.en)