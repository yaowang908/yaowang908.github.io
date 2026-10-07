# Editable portfolio deployment

## Update the site without changing React

`public/portfolio.excalidraw` and `public/portfolio-mobile.excalidraw` are the content
and layout sources. Open both files in
Excalidraw or Local Excalidraw, edit text/shapes/links, then save or export back to
their respective paths. Keep shared text, links, and images in sync; layout and line
breaks can differ. Invoke `$maintain-portfolio-scenes` for this workflow. The build
runs `scripts/check-portfolio-scenes.mjs` and fails on shared-content drift, including
a partial update interrupted between the two files. Embedded images are included in the file. The editor's Save to
disk action can also export a new scene; replace the published file with it.
Review the result using `bun run dev`, then publish through the workflow below.
Saving a drawing alone does not deploy it. GitHub pins are a curated snapshot;
edit the scene when you want different projects. No GitHub token is required.

Below 768px the app selects the mobile scene on initial load. It fits the width
and starts at the top; visitors use Hand to pan vertically through the projects.
At 768px and above it fits the full desktop drawing. Resizing or rotating does not
swap scenes or discard visitor edits; reload selects again for the current width.

Visitors receive their own in-memory scene. There is no autosave, local-storage
restore, upload endpoint, or shared editing session. Refresh fetches the published
scene again. If the scene cannot be loaded, the page reports the failure with a
retry button rather than showing an empty editor.

## Image publishing

The app image is `ghcr.io/yaowang908/portfolio:latest`. A push to `main` runs the
tests and builds/pushes the image. Every image is also tagged with its commit SHA.
Make the GHCR package public after its first publication so the existing
credential-free Watchtower can pull it. The workflow uses `GITHUB_TOKEN`; no SSH
deploy secret is needed. A manual run on a feature branch publishes only its SHA
tag, so it cannot update the production `latest` tag.

The Docker image serves the built app on port 8080. The droplet only pulls images;
it does not need Bun, an app checkout, or a build step. Excalidraw fonts are served
from the image rather than a third-party font CDN.

## HomeLab integration

Add this service to `HomeLab/services/droplet/docker-compose.yml`:

```yaml
  portfolio:
    image: ghcr.io/yaowang908/portfolio:latest
    container_name: portfolio
    restart: unless-stopped
    networks:
      - web
    labels:
      - com.centurylinklabs.watchtower.enable=true
```

Append this block to `HomeLab/services/droplet/Caddyfile`:

```caddyfile
yaow.me, www.yaow.me {
        reverse_proxy portfolio:8080
}
```

Use the existing `web` network, Caddy TLS volumes, and Watchtower service unchanged.
The portfolio publishes no host ports. Preserve all existing sites. Once the image
is available, validate the Compose/Caddy configuration, start the new service, and
reload the outer Caddy configuration. Switch the apex and `www` DNS records from
the current hosting destination to the droplet only after testing the new origin.
Remove conflicting Cloudflare Pages custom-domain records as part of that cutover.
Neither live DNS nor HomeLab files are modified by building this app.

## Failures and rollback

A failed image build does not replace the published image. Watchtower's next
two-minute poll retries discovery of a new image. Image updates recreate the
portfolio container, so a brief interruption is possible; this is not a rolling
deployment. Visitor edits are disposable and require no locking or write retries.

To roll back, disable auto-update on the portfolio service by setting its
Watchtower label to `false`, pin its image to a known-good SHA tag, and recreate
that service. Keep the old hosting destination available until DNS cutover is
verified. Scene requests have `Cache-Control: no-store`; the app also fetches with
`cache: 'no-store'`. Each image packages its scene and app together.

## Local checks

```sh
bun install --frozen-lockfile
bun test
bun run typecheck
bun run build
docker build -t portfolio:test .
docker run --rm -p 8080:8080 portfolio:test
```

Open `http://localhost:8080`, edit a text label or draw a shape, and refresh. The
original scene must return. Select a project and open its Excalidraw link popup to
verify the repository URL. On a narrow screen use canvas pan and zoom; the scene
has a fixed drawing layout rather than rearranging author-owned elements.
