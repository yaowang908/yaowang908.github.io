# Excalidraw portfolio handover

Status: work in progress on `codex/excalidraw-portfolio`. Do not treat this branch
as ready for production or merge without reviewing the remaining work.

## Implemented

- The homepage loads an editable Excalidraw scene. Visitor changes remain in
  memory and reset on refresh; there is no persistence or upload endpoint.
- Author content lives in `public/portfolio.excalidraw` and
  `public/portfolio-mobile.excalidraw`. Below 768px the mobile scene loads;
  otherwise the desktop scene loads. Selection happens once per page load so
  resizing does not discard edits.
- Dark mode, Hand tool, and hidden controls are defaults. The top-right button
  reads “Edit canvas” and “Hide tools.” Desktop fits the full drawing; mobile
  fits width, starts at the header, and supports vertical panning.
- Copy describes a full stack engineer building reusable agent skills and
  validation flows that support development without disrupting it.
- Projects mirror a curated snapshot of GitHub pins: solo-macos, sudoku-helper,
  and local-excalidraw. Update both scenes together when changing content.
- Desktop header GitHub link is aligned to the right. Mobile footer contact
  link occupies a separate row to avoid overlapping its description.

## Authoring and maintenance

Edit the two native scene files, preserving corresponding content element IDs.
Geometry and line wrapping may differ. The build's parity check rejects different
copy, links, or image assets. Native line geometry needs both dimensions and
`points` updated. Avoid confusing the earlier separate concept drawing with the
published source files.

A personal `$maintain-portfolio-scenes` skill was installed outside this repo.
Another agent may not have it; `deploy/README.md` and the parity checker provide
the portable workflow. Excalidraw fonts are copied locally during dev/build.
`public/excalidraw-assets` is generated; `dist` is tracked by this repository and
must be regenerated rather than edited directly.

## Verification and preview

Run `bun test`, `bun run typecheck`, and `bun run build`. The latest checks passed
all 19 tests and the production build. Desktop and mobile layouts, Hand panning,
and control toggling were checked in the browser. Excalidraw produces large chunk
warnings. Full-repository lint has two pre-existing explicit-any errors in
`src/routes/projects.tsx`; those were left untouched.

The local preview at `http://127.0.0.1:18080/` serves built `dist` through Caddy.
Rebuild to update it. Its process and temporary Caddy configuration are local
session resources and may need recreating in a new session. `bun run dev` is
available for source development.

## Deployment prepared, not performed

`Dockerfile`, `deploy/Caddyfile`, and `.github/workflows/publish-image.yml` prepare
an image served by Caddy on port 8080. Main publishes a GHCR `latest` tag and a
commit SHA tag; manual feature-branch publishing uses only the SHA tag.

Follow `deploy/README.md` for integrating with the HomeLab droplet's existing
Caddy, web network, and Watchtower. HomeLab configuration, DNS, and the live site
have not been changed. Watchtower can remain unchanged; add the portfolio service
with its enable label and a Caddy route. Container replacement may briefly
interrupt service. Docker image validation is still pending because the local
Docker daemon was unavailable during implementation.

## Next agent

1. Review this unfinished branch with the owner and identify remaining product
   changes; no complete acceptance checklist was specified.
2. Verify fresh desktop and phone loads, links, visitor editing, refresh reset,
   and author updates to both scenes.
3. Build/run the Docker image and verify scene cache headers, static assets,
   missing scene errors, and SPA routes.
4. Review deployment configuration before publishing an image. Production
   migration still requires HomeLab integration and a tested DNS cutover.

Do not deploy or merge merely because this handover exists.
