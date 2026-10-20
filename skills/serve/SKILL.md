---
name: serve
description: Serve an existing standalone artifact over Tailscale. Use when the user invokes /serve or asks to "serve on Tailscale".
---

# Serve

If a standalone artifact exists in the current task, serve it on the host so devices on its Tailscale network can access it.

- Serve the artifact's directory with `http-server` or an available equivalent, bound to `0.0.0.0` on a free port.
- Reuse a suitable existing server, or start one in the background and leave it running.
- Verify the artifact loads. Return a clickable URL using the serving host's Tailscale IP or hostname, port, and artifact path, plus the local URL and file path.
- If no artifact exists, say so.
