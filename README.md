# One-Time Video Call — Render

## Deploy
Create a Render **Web Service** from this repository.

- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`

After deployment, open:

`https://YOUR-SERVICE.onrender.com/api/new-invite`

The response contains a unique invitation URL. Send that URL to your friend.

## Important
The invitation is consumed when the `/invite/<token>` URL is opened. Reopening the same URL returns "Invitation already used".

This implementation stores used tokens in server memory. A Render service restart/redeploy clears that memory, so this is suitable for a school project/demo but is not a permanent production-grade one-time-link system. A persistent database/Redis store would be needed for that.
