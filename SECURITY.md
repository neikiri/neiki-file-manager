# Security Policy

## Supported Versions

Only the latest published release of Neiki's File Manager receives security fixes.

| Version | Supported |
| --- | --- |
| 1.x | ✅ |
| < 1.0 | ❌ |

## Reporting a Vulnerability

Please do not open a public GitHub issue for security vulnerabilities.

Instead, report it privately by emailing **neikiri@neikiri.dev** with:

- A description of the vulnerability and its potential impact
- Steps to reproduce it, including a minimal example if possible
- The affected version(s)

You should receive an initial response within **72 hours**. We will keep you updated as the issue is investigated and fixed, and will credit you in the release notes unless you prefer to stay anonymous.

## Scope

This policy covers the code in this repository (`src/`, `dist/`, `demo/`, `minify.py`). It does not cover:

- File content or metadata your own backend chooses to serve through the component (previews, downloads, thumbnails).
- Third-party CDNs or package registries used to distribute the built files.

## Security Design Notes

- The component renders inside a Shadow DOM, isolating its markup and styles from the host page.
- All dynamic text (file/folder names, search input, translations) is inserted via `textContent` or HTML-escaped before being placed in markup — user-supplied names cannot inject markup into the DOM.
- The component does not perform any network requests, uploads, or deletions on its own. Every mutating action (`upload`, `rename`, `delete`, `move`) first dispatches a cancelable event; if the host page does not call `preventDefault()`, the component only ever mutates its own in-memory model — it never talks to a server unless the host code wires that up explicitly.
- Object URLs created for local file previews (`URL.createObjectURL`) are tracked and revoked when the component is disconnected or its data is replaced, to avoid leaking memory.
- Downloads use `<a download>` on the URL supplied by the host application; the component does not fetch or proxy remote content itself.

See [README.md](README.md#security) for more details on the security model.
