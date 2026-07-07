# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-07-08

### Changed

- Updated the archive/zip file icon to a filled document-with-zipper design, replacing the previous abstract zip-strip icon.

## [1.0.0] - 2026-07-05

### Added

- Initial release of Neiki's File Manager.
- Web Component with Shadow DOM isolation for CSS-conflict-free embedding.
- Grid and list view modes, switchable via toolbar or the JavaScript API.
- Folder navigation with breadcrumbs and a flat, parent-referenced data model (`setData`, `getData`, `navigateTo`, `getPath`).
- Drag & drop upload from the desktop, plus a toolbar upload button; dropped/selected files are added to the model automatically (with live object-URL previews for images, audio and video) unless the host cancels the `upload` event.
- Drag & drop of items onto folders to move them, with cycle protection.
- File preview modal for images, video, audio and PDFs, with a metadata panel and download link, falling back to a generic "no preview" state for other types.
- Inline rename (F2, context menu, or double-click-adjacent action), new folder creation, delete (with confirmation), cut/copy/paste, and multi-select (click, Ctrl/Cmd+click, Shift+click, Ctrl/Cmd+A).
- Right-click context menu with actions contextual to the target (empty area, single item, or multi-selection).
- Search/filter within the current folder, and sorting by name, size, modified date or type, ascending or descending.
- Full keyboard support: arrow/Enter navigation, F2 rename, Delete, Ctrl/Cmd+A/C/X/V, Escape.
- Built-in translations for English, Czech, German, Spanish, French, Polish, Slovak and Ukrainian, selectable via the `lang` attribute or `setLang()`, extensible with `addTranslations()`.
- Light, dark and auto (`prefers-color-scheme`) themes.
- Cancelable events for every mutation (`upload`, `rename`, `delete`, `move`) plus `ready`, `navigate`, `select`, `open`, `contextmenu`, `create-folder` and `change`, so the component can be wired to a real backend.
- CSS variable customization with a consistent `--nfm-*` prefix.
- `minify.py` build script that embeds the component's CSS directly into `dist/neiki-file-manager.js` and `dist/neiki-file-manager.min.js`, so a single script tag is enough at runtime; standalone `dist/neiki-file-manager.css` and `.min.css` are also produced for reference.

[1.0.1]: https://github.com/neikiri/neiki-file-manager/releases/tag/1.0.1
[1.0.0]: https://github.com/neikiri/neiki-file-manager/releases/tag/1.0.0
