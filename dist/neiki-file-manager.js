/*!
 * Neiki's File Manager 1.0.0
 * A lightweight, dependency-free file manager Web Component.
 * https://github.com/neikiri/neiki-file-manager
 * MIT License
 */
(function () {
  'use strict';

  if (customElements.get('neiki-file-manager')) {
    return;
  }

  // -----------------------------------------------------------------------
  // Translations
  // -----------------------------------------------------------------------

  var TRANSLATIONS = {
    en: {
      toolbar: { newFolder: 'New folder', upload: 'Upload', search: 'Search', gridView: 'Grid view', listView: 'List view', sortName: 'Name', sortSize: 'Size', sortModified: 'Modified', sortType: 'Type', sortAsc: 'Ascending', sortDesc: 'Descending' },
      breadcrumb: { home: 'Home' },
      menu: { open: 'Open', preview: 'Preview', download: 'Download', rename: 'Rename', cut: 'Cut', copy: 'Copy', paste: 'Paste', delete: 'Delete', newFolder: 'New folder', upload: 'Upload files', selectAll: 'Select all', refresh: 'Refresh', properties: 'Properties' },
      status: { items: '{count} items', item: '1 item', selected: '{count} selected', empty: 'This folder is empty', dropHint: 'Drop files to upload' },
      preview: { close: 'Close', noPreview: 'No preview available', download: 'Download', size: 'Size', modified: 'Modified', type: 'Type' },
      confirm: { deleteOne: 'Delete "{name}"?', deleteMany: 'Delete {count} items?' },
      prompt: { newFolderName: 'New folder', renameTitle: 'Rename' },
      misc: { folder: 'Folder', file: 'File', unknownType: 'Unknown', back: 'Back' }
    },
    cs: {
      toolbar: { newFolder: 'Nová složka', upload: 'Nahrát', search: 'Hledat', gridView: 'Mřížka', listView: 'Seznam', sortName: 'Název', sortSize: 'Velikost', sortModified: 'Upraveno', sortType: 'Typ', sortAsc: 'Vzestupně', sortDesc: 'Sestupně' },
      breadcrumb: { home: 'Domů' },
      menu: { open: 'Otevřít', preview: 'Náhled', download: 'Stáhnout', rename: 'Přejmenovat', cut: 'Vyjmout', copy: 'Kopírovat', paste: 'Vložit', delete: 'Smazat', newFolder: 'Nová složka', upload: 'Nahrát soubory', selectAll: 'Vybrat vše', refresh: 'Obnovit', properties: 'Vlastnosti' },
      status: { items: '{count} položek', item: '1 položka', selected: 'Vybráno: {count}', empty: 'Tato složka je prázdná', dropHint: 'Přetáhněte soubory pro nahrání' },
      preview: { close: 'Zavřít', noPreview: 'Náhled není k dispozici', download: 'Stáhnout', size: 'Velikost', modified: 'Upraveno', type: 'Typ' },
      confirm: { deleteOne: 'Smazat „{name}“?', deleteMany: 'Smazat {count} položek?' },
      prompt: { newFolderName: 'Nová složka', renameTitle: 'Přejmenovat' },
      misc: { folder: 'Složka', file: 'Soubor', unknownType: 'Neznámý', back: 'Zpět' }
    },
    de: {
      toolbar: { newFolder: 'Neuer Ordner', upload: 'Hochladen', search: 'Suchen', gridView: 'Rasteransicht', listView: 'Listenansicht', sortName: 'Name', sortSize: 'Größe', sortModified: 'Geändert', sortType: 'Typ', sortAsc: 'Aufsteigend', sortDesc: 'Absteigend' },
      breadcrumb: { home: 'Start' },
      menu: { open: 'Öffnen', preview: 'Vorschau', download: 'Herunterladen', rename: 'Umbenennen', cut: 'Ausschneiden', copy: 'Kopieren', paste: 'Einfügen', delete: 'Löschen', newFolder: 'Neuer Ordner', upload: 'Dateien hochladen', selectAll: 'Alles auswählen', refresh: 'Aktualisieren', properties: 'Eigenschaften' },
      status: { items: '{count} Elemente', item: '1 Element', selected: '{count} ausgewählt', empty: 'Dieser Ordner ist leer', dropHint: 'Dateien zum Hochladen ablegen' },
      preview: { close: 'Schließen', noPreview: 'Keine Vorschau verfügbar', download: 'Herunterladen', size: 'Größe', modified: 'Geändert', type: 'Typ' },
      confirm: { deleteOne: '„{name}“ löschen?', deleteMany: '{count} Elemente löschen?' },
      prompt: { newFolderName: 'Neuer Ordner', renameTitle: 'Umbenennen' },
      misc: { folder: 'Ordner', file: 'Datei', unknownType: 'Unbekannt', back: 'Zurück' }
    },
    es: {
      toolbar: { newFolder: 'Nueva carpeta', upload: 'Subir', search: 'Buscar', gridView: 'Vista de cuadrícula', listView: 'Vista de lista', sortName: 'Nombre', sortSize: 'Tamaño', sortModified: 'Modificado', sortType: 'Tipo', sortAsc: 'Ascendente', sortDesc: 'Descendente' },
      breadcrumb: { home: 'Inicio' },
      menu: { open: 'Abrir', preview: 'Vista previa', download: 'Descargar', rename: 'Renombrar', cut: 'Cortar', copy: 'Copiar', paste: 'Pegar', delete: 'Eliminar', newFolder: 'Nueva carpeta', upload: 'Subir archivos', selectAll: 'Seleccionar todo', refresh: 'Actualizar', properties: 'Propiedades' },
      status: { items: '{count} elementos', item: '1 elemento', selected: '{count} seleccionados', empty: 'Esta carpeta está vacía', dropHint: 'Suelta archivos para subirlos' },
      preview: { close: 'Cerrar', noPreview: 'Vista previa no disponible', download: 'Descargar', size: 'Tamaño', modified: 'Modificado', type: 'Tipo' },
      confirm: { deleteOne: '¿Eliminar "{name}"?', deleteMany: '¿Eliminar {count} elementos?' },
      prompt: { newFolderName: 'Nueva carpeta', renameTitle: 'Renombrar' },
      misc: { folder: 'Carpeta', file: 'Archivo', unknownType: 'Desconocido', back: 'Atrás' }
    },
    fr: {
      toolbar: { newFolder: 'Nouveau dossier', upload: 'Téléverser', search: 'Rechercher', gridView: 'Vue en grille', listView: 'Vue en liste', sortName: 'Nom', sortSize: 'Taille', sortModified: 'Modifié', sortType: 'Type', sortAsc: 'Croissant', sortDesc: 'Décroissant' },
      breadcrumb: { home: 'Accueil' },
      menu: { open: 'Ouvrir', preview: 'Aperçu', download: 'Télécharger', rename: 'Renommer', cut: 'Couper', copy: 'Copier', paste: 'Coller', delete: 'Supprimer', newFolder: 'Nouveau dossier', upload: 'Téléverser des fichiers', selectAll: 'Tout sélectionner', refresh: 'Actualiser', properties: 'Propriétés' },
      status: { items: '{count} éléments', item: '1 élément', selected: '{count} sélectionné(s)', empty: 'Ce dossier est vide', dropHint: 'Déposez des fichiers pour les téléverser' },
      preview: { close: 'Fermer', noPreview: 'Aucun aperçu disponible', download: 'Télécharger', size: 'Taille', modified: 'Modifié', type: 'Type' },
      confirm: { deleteOne: 'Supprimer « {name} » ?', deleteMany: 'Supprimer {count} éléments ?' },
      prompt: { newFolderName: 'Nouveau dossier', renameTitle: 'Renommer' },
      misc: { folder: 'Dossier', file: 'Fichier', unknownType: 'Inconnu', back: 'Retour' }
    },
    pl: {
      toolbar: { newFolder: 'Nowy folder', upload: 'Prześlij', search: 'Szukaj', gridView: 'Widok siatki', listView: 'Widok listy', sortName: 'Nazwa', sortSize: 'Rozmiar', sortModified: 'Zmodyfikowano', sortType: 'Typ', sortAsc: 'Rosnąco', sortDesc: 'Malejąco' },
      breadcrumb: { home: 'Start' },
      menu: { open: 'Otwórz', preview: 'Podgląd', download: 'Pobierz', rename: 'Zmień nazwę', cut: 'Wytnij', copy: 'Kopiuj', paste: 'Wklej', delete: 'Usuń', newFolder: 'Nowy folder', upload: 'Prześlij pliki', selectAll: 'Zaznacz wszystko', refresh: 'Odśwież', properties: 'Właściwości' },
      status: { items: '{count} elementów', item: '1 element', selected: 'Zaznaczono: {count}', empty: 'Ten folder jest pusty', dropHint: 'Upuść pliki, aby je przesłać' },
      preview: { close: 'Zamknij', noPreview: 'Podgląd niedostępny', download: 'Pobierz', size: 'Rozmiar', modified: 'Zmodyfikowano', type: 'Typ' },
      confirm: { deleteOne: 'Usunąć „{name}”?', deleteMany: 'Usunąć {count} elementów?' },
      prompt: { newFolderName: 'Nowy folder', renameTitle: 'Zmień nazwę' },
      misc: { folder: 'Folder', file: 'Plik', unknownType: 'Nieznany', back: 'Wstecz' }
    },
    sk: {
      toolbar: { newFolder: 'Nový priečinok', upload: 'Nahrať', search: 'Hľadať', gridView: 'Mriežka', listView: 'Zoznam', sortName: 'Názov', sortSize: 'Veľkosť', sortModified: 'Upravené', sortType: 'Typ', sortAsc: 'Vzostupne', sortDesc: 'Zostupne' },
      breadcrumb: { home: 'Domov' },
      menu: { open: 'Otvoriť', preview: 'Náhľad', download: 'Stiahnuť', rename: 'Premenovať', cut: 'Vystrihnúť', copy: 'Kopírovať', paste: 'Vložiť', delete: 'Zmazať', newFolder: 'Nový priečinok', upload: 'Nahrať súbory', selectAll: 'Vybrať všetko', refresh: 'Obnoviť', properties: 'Vlastnosti' },
      status: { items: '{count} položiek', item: '1 položka', selected: 'Vybraných: {count}', empty: 'Tento priečinok je prázdny', dropHint: 'Súbory presuňte sem pre nahratie' },
      preview: { close: 'Zavrieť', noPreview: 'Náhľad nie je k dispozícii', download: 'Stiahnuť', size: 'Veľkosť', modified: 'Upravené', type: 'Typ' },
      confirm: { deleteOne: 'Zmazať „{name}“?', deleteMany: 'Zmazať {count} položiek?' },
      prompt: { newFolderName: 'Nový priečinok', renameTitle: 'Premenovať' },
      misc: { folder: 'Priečinok', file: 'Súbor', unknownType: 'Neznámy', back: 'Späť' }
    },
    uk: {
      toolbar: { newFolder: 'Нова папка', upload: 'Завантажити', search: 'Пошук', gridView: 'Сітка', listView: 'Список', sortName: 'Назва', sortSize: 'Розмір', sortModified: 'Змінено', sortType: 'Тип', sortAsc: 'За зростанням', sortDesc: 'За спаданням' },
      breadcrumb: { home: 'Головна' },
      menu: { open: 'Відкрити', preview: 'Перегляд', download: 'Завантажити', rename: 'Перейменувати', cut: 'Вирізати', copy: 'Копіювати', paste: 'Вставити', delete: 'Видалити', newFolder: 'Нова папка', upload: 'Завантажити файли', selectAll: 'Вибрати все', refresh: 'Оновити', properties: 'Властивості' },
      status: { items: '{count} елементів', item: '1 елемент', selected: 'Вибрано: {count}', empty: 'Ця папка порожня', dropHint: 'Перетягніть файли для завантаження' },
      preview: { close: 'Закрити', noPreview: 'Попередній перегляд недоступний', download: 'Завантажити', size: 'Розмір', modified: 'Змінено', type: 'Тип' },
      confirm: { deleteOne: 'Видалити «{name}»?', deleteMany: 'Видалити {count} елементів?' },
      prompt: { newFolderName: 'Нова папка', renameTitle: 'Перейменувати' },
      misc: { folder: 'Папка', file: 'Файл', unknownType: 'Невідомо', back: 'Назад' }
    }
  };

  var VALID_VIEWS = ['grid', 'list'];
  var VALID_THEMES = ['light', 'dark', 'auto'];
  var VALID_SELECTABLE = ['single', 'multiple', 'none'];
  var VALID_SORT_BY = ['name', 'size', 'modified', 'type'];

  var DEFAULT_CONFIG = {
    view: 'grid',
    theme: 'auto',
    lang: 'en',
    selectable: 'multiple',
    rootLabel: null,
    sortBy: 'name',
    sortDir: 'asc'
  };

  function oneOf(value, list, fallback) {
    return list.indexOf(value) !== -1 ? value : fallback;
  }

  function uid() {
    return 'nfm-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function extOf(name) {
    var match = /\.([a-z0-9]+)$/i.exec(name || '');
    return match ? match[1].toLowerCase() : '';
  }

  var EXT_GROUPS = {
    image: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'ico', 'avif'],
    video: ['mp4', 'webm', 'mov', 'avi', 'mkv', 'm4v'],
    audio: ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'],
    pdf: ['pdf'],
    archive: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
    code: ['js', 'ts', 'json', 'html', 'css', 'py', 'java', 'c', 'cpp', 'cs', 'go', 'rb', 'php', 'sh', 'yml', 'yaml', 'xml'],
    text: ['txt', 'md', 'log', 'csv'],
    doc: ['doc', 'docx', 'odt', 'rtf'],
    sheet: ['xls', 'xlsx', 'ods'],
    slide: ['ppt', 'pptx', 'odp']
  };

  function typeGroupOf(node) {
    if (node.type === 'folder') return 'folder';
    var ext = extOf(node.name);
    for (var group in EXT_GROUPS) {
      if (EXT_GROUPS[group].indexOf(ext) !== -1) return group;
    }
    return 'file';
  }

  function formatSize(bytes) {
    if (bytes == null || isNaN(bytes)) return '';
    if (bytes < 1024) return bytes + ' B';
    var units = ['KB', 'MB', 'GB', 'TB'];
    var value = bytes;
    var i = -1;
    do {
      value /= 1024;
      i++;
    } while (value >= 1024 && i < units.length - 1);
    return value.toFixed(value < 10 && i > 0 ? 1 : 0) + ' ' + units[i];
  }

  // -----------------------------------------------------------------------
  // Icons (inline SVG, no external dependency)
  // -----------------------------------------------------------------------

  var ICONS = {
    folder: '<svg viewBox="0 0 24 24"><path d="M10 4H2v16h20V6H12l-2-2Z"/></svg>',
    file: '<svg viewBox="0 0 24 24"><path d="M6 2h8l6 6v14H6V2Zm8 1.5V8h4.5L14 3.5Z"/></svg>',
    image: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4V4Zm2 2v9.59l3.3-3.3a1 1 0 0 1 1.4 0L14 15.6l1.3-1.3a1 1 0 0 1 1.4 0L19 16.6V6H6Zm2.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/></svg>',
    video: '<svg viewBox="0 0 24 24"><path d="M4 5h13v14H4V5Zm15 3.5 4-2.3v11.6l-4-2.3V8.5Z"/></svg>',
    audio: '<svg viewBox="0 0 24 24"><path d="M9 3v10.55A4 4 0 1 0 11 17V7h6V3H9Z"/></svg>',
    pdf: '<svg viewBox="0 0 24 24"><path d="M6 2h8l6 6v14H6V2Zm2 12v2h2.5a2 2 0 0 0 0-4H8v2Zm0-2V9h1.5a2 2 0 0 1 0 4H8Zm5 0h1.8L16 14h-1v2h-2v-6Z" fill="none" stroke="currentColor" stroke-width="0"/><path d="M6 2h8l6 6v14H6V2Zm8 1.5V8h4.5L14 3.5Z"/></svg>',
    archive: '<svg viewBox="0 0 24 24"><path d="M10 2h4v2h-2v2h2v2h-2v2h2v2h-2v2h2v8H8v-8h2v-2H8v-2h2V8H8V6h2V4H8V2h2Zm0 14v4h4v-4h-4Z"/></svg>',
    code: '<svg viewBox="0 0 24 24"><path d="m9.4 16.6-4-4.6 4-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L18.6 12l-4-4.6L16 6l6 6-6 6-1.4-1.4Z"/></svg>',
    text: '<svg viewBox="0 0 24 24"><path d="M6 2h8l6 6v14H6V2Zm2 10v2h8v-2H8Zm0 4v2h5v-2H8Z"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M6 2h8l6 6v14H6V2Zm2 10v2h8v-2H8Zm0 4v2h8v-2H8Z"/></svg>',
    sheet: '<svg viewBox="0 0 24 24"><path d="M6 2h8l6 6v14H6V2Zm2 10v6h8v-6H8Zm2 2h1.5v2H10v-2Zm3.5 0H15v2h-1.5v-2Z"/></svg>',
    slide: '<svg viewBox="0 0 24 24"><path d="M6 2h8l6 6v14H6V2Zm2 10v5h8v-5H8Z"/></svg>',
    upload: '<svg viewBox="0 0 24 24"><path d="M12 3 6.5 8.5 8 10l3-3v9h2V7l3 3 1.5-1.5L12 3ZM5 19v2h14v-2H5Z"/></svg>',
    grid: '<svg viewBox="0 0 24 24"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"/></svg>',
    list: '<svg viewBox="0 0 24 24"><path d="M4 5h2v2H4V5Zm4 0h12v2H8V5ZM4 11h2v2H4v-2Zm4 0h12v2H8v-2ZM4 17h2v2H4v-2Zm4 0h12v2H8v-2Z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><path d="M10 2a8 8 0 1 0 4.9 14.3l5.4 5.4 1.4-1.4-5.4-5.4A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"/></svg>',
    chevron: '<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 48 48"><path d="M0 0h48v48H0z" fill="none"></path><path fill="#3b82f6" fill-rule="evenodd" stroke="#3b82f6" stroke-linejoin="round" stroke-width="4" d="M44 40.836q-7.34-8.96-13.036-10.168t-10.846-.365V41L4 23.545L20.118 7v10.167q9.523.075 16.192 6.833q6.668 6.758 7.69 16.836Z" clip-rule="evenodd"></path></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6 18 18M18 6 6 18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    more: '<svg viewBox="0 0 24 24"><path d="M12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/></svg>'
  };

  function iconFor(node) {
    return ICONS[typeGroupOf(node)] || ICONS.file;
  }

  // -----------------------------------------------------------------------
  // Embedded CSS (replaced by minify.py at build time)
  // -----------------------------------------------------------------------

  var EMBEDDED_CSS = "/*!\n * Neiki's File Manager 1.0.0 \u2014 styles\n * MIT License\n */\n\n:host {\n  --nfm-radius: 12px;\n  --nfm-radius-sm: 8px;\n  --nfm-gap: 8px;\n  --nfm-font-size: 14px;\n  --nfm-transition: 150ms ease;\n  --nfm-height: 560px;\n\n  --nfm-bg: #ffffff;\n  --nfm-bg-subtle: #f6f7f9;\n  --nfm-bg-hover: #eef0f3;\n  --nfm-color: #1f2328;\n  --nfm-color-muted: #6b7280;\n  --nfm-border: rgba(0, 0, 0, 0.1);\n  --nfm-accent: #2563eb;\n  --nfm-accent-contrast: #ffffff;\n  --nfm-selected-bg: rgba(37, 99, 235, 0.14);\n  --nfm-selected-border: #2563eb;\n  --nfm-focus-ring: #2563eb;\n  --nfm-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);\n  --nfm-danger: #dc2626;\n\n  display: block;\n  font-family: system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif;\n  font-size: var(--nfm-font-size);\n  color: var(--nfm-color);\n  height: var(--nfm-height);\n}\n\n:host([hidden]) {\n  display: none !important;\n}\n\n:host([resolved-theme=\"dark\"]) {\n  --nfm-bg: #1a1d23;\n  --nfm-bg-subtle: #14171c;\n  --nfm-bg-hover: #262a32;\n  --nfm-color: #eef0f3;\n  --nfm-color-muted: #9aa1ac;\n  --nfm-border: rgba(255, 255, 255, 0.1);\n  --nfm-selected-bg: rgba(59, 130, 246, 0.22);\n  --nfm-selected-border: #3b82f6;\n  --nfm-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);\n}\n\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n[hidden] {\n  display: none !important;\n}\n\n.nfm-root {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--nfm-bg);\n  border: 1px solid var(--nfm-border);\n  border-radius: var(--nfm-radius);\n  overflow: hidden;\n}\n\n/* Toolbar */\n.nfm-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--nfm-gap);\n  padding: 10px 12px;\n  border-bottom: 1px solid var(--nfm-border);\n  background: var(--nfm-bg-subtle);\n  flex-wrap: wrap;\n}\n\n.nfm-breadcrumb {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n\n.nfm-crumb {\n  font: inherit;\n  color: var(--nfm-color-muted);\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 4px 6px;\n  border-radius: var(--nfm-radius-sm);\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.nfm-crumb:hover {\n  background: var(--nfm-bg-hover);\n  color: var(--nfm-color);\n}\n.nfm-crumb.is-current {\n  color: var(--nfm-color);\n  font-weight: 600;\n}\n.nfm-crumb-sep {\n  display: inline-flex;\n  width: 16px;\n  height: 16px;\n  color: var(--nfm-color-muted);\n  opacity: 0.6;\n}\n.nfm-crumb-sep svg { width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }\n\n.nfm-toolbar-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.nfm-search {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.nfm-search-icon {\n  position: absolute;\n  left: 8px;\n  width: 14px;\n  height: 14px;\n  color: var(--nfm-color-muted);\n  pointer-events: none;\n}\n.nfm-search-icon svg { width: 100%; height: 100%; fill: currentColor; }\n.nfm-search-input {\n  font: inherit;\n  font-size: 13px;\n  padding: 6px 10px 6px 28px;\n  border-radius: var(--nfm-radius-sm);\n  border: 1px solid var(--nfm-border);\n  background: var(--nfm-bg);\n  color: var(--nfm-color);\n  width: 150px;\n  transition: width var(--nfm-transition);\n}\n.nfm-search-input:focus {\n  outline: none;\n  border-color: var(--nfm-accent);\n  width: 200px;\n}\n\n.nfm-sort-select {\n  font: inherit;\n  font-size: 13px;\n  padding: 6px 8px;\n  border-radius: var(--nfm-radius-sm);\n  border: 1px solid var(--nfm-border);\n  background: var(--nfm-bg);\n  color: var(--nfm-color);\n  max-width: 170px;\n}\n\n.nfm-btn {\n  font: inherit;\n  font-size: 13px;\n  font-weight: 500;\n  padding: 6px 12px;\n  border-radius: var(--nfm-radius-sm);\n  border: 1px solid var(--nfm-border);\n  background: var(--nfm-bg);\n  color: var(--nfm-color);\n  cursor: pointer;\n  transition: background var(--nfm-transition), border-color var(--nfm-transition);\n  white-space: nowrap;\n}\n.nfm-btn:hover {\n  background: var(--nfm-bg-hover);\n}\n.nfm-btn:focus-visible {\n  outline: 2px solid var(--nfm-focus-ring);\n  outline-offset: 1px;\n}\n.nfm-new-folder-btn { color: var(--nfm-accent); border-color: color-mix(in srgb, var(--nfm-accent) 40%, transparent); }\n.nfm-upload-btn { background: var(--nfm-accent); border-color: var(--nfm-accent); color: var(--nfm-accent-contrast); }\n.nfm-upload-btn:hover { filter: brightness(1.08); }\n\n.nfm-view-toggle {\n  display: inline-flex;\n  border: 1px solid var(--nfm-border);\n  border-radius: var(--nfm-radius-sm);\n  overflow: hidden;\n}\n.nfm-view-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 30px;\n  padding: 0;\n  border: none;\n  background: var(--nfm-bg);\n  color: var(--nfm-color-muted);\n  cursor: pointer;\n}\n.nfm-view-btn svg { width: 16px; height: 16px; fill: currentColor; }\n.nfm-view-btn:hover { background: var(--nfm-bg-hover); }\n.nfm-view-btn.is-active { background: var(--nfm-selected-bg); color: var(--nfm-accent); }\n.nfm-view-btn:focus-visible { outline: 2px solid var(--nfm-focus-ring); outline-offset: -2px; }\n\n/* Body */\n.nfm-body {\n  position: relative;\n  flex: 1;\n  overflow: hidden;\n  display: flex;\n}\n\n.nfm-view {\n  flex: 1;\n  overflow: auto;\n  padding: 12px;\n  outline: none;\n  align-content: flex-start;\n}\n\n.nfm-view--grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));\n  gap: 6px;\n}\n\n.nfm-view--list {\n  display: flex;\n  flex-direction: column;\n}\n\n.nfm-empty {\n  grid-column: 1 / -1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  min-height: 160px;\n  color: var(--nfm-color-muted);\n  font-size: 13px;\n}\n.nfm-empty--inline {\n  height: auto;\n  min-height: 80px;\n  padding: 16px 0;\n}\n\n/* Grid item */\n.nfm-item {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 6px;\n  border-radius: var(--nfm-radius-sm);\n  cursor: default;\n  user-select: none;\n  border: 1px solid transparent;\n}\n.nfm-view--grid .nfm-item:hover { background: var(--nfm-bg-hover); }\n.nfm-view--grid .nfm-item.is-selected {\n  background: var(--nfm-selected-bg);\n  border-color: var(--nfm-selected-border);\n}\n.nfm-item.is-drop-target {\n  outline: 2px dashed var(--nfm-accent);\n  outline-offset: -2px;\n}\n\n/* \"Back\" (up one level) entry */\n.nfm-item--up {\n  cursor: pointer;\n}\n.nfm-item--up .nfm-item-name,\n.nfm-item--up .nfm-col-name {\n  color: #3b82f6;\n}\n/* Fixed brand blue, intentionally not tied to --nfm-accent: it reads well\n   on both the light and dark theme as-is, so it stays constant. */\n.nfm-back-icon {\n  width: 40px;\n  height: 40px;\n  display: inline-flex;\n}\n.nfm-back-icon svg {\n  width: 100%;\n  height: 100%;\n}\n.nfm-back-icon--inline {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n}\n\n.nfm-item-thumb {\n  width: 56px;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.nfm-icon {\n  width: 40px;\n  height: 40px;\n  color: var(--nfm-accent);\n  display: inline-flex;\n}\n.nfm-icon svg { width: 100%; height: 100%; fill: currentColor; }\n.nfm-thumb {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 6px;\n}\n.nfm-item-name {\n  font-size: 12px;\n  text-align: center;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 100%;\n}\n\n/* List row */\n.nfm-row {\n  display: grid;\n  grid-template-columns: 1fr 100px 160px;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 10px;\n  border-radius: var(--nfm-radius-sm);\n}\n.nfm-row--header {\n  color: var(--nfm-color-muted);\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  padding-top: 2px;\n  padding-bottom: 8px;\n  cursor: default;\n}\n.nfm-view--list .nfm-item:hover { background: var(--nfm-bg-hover); }\n.nfm-view--list .nfm-item.is-selected {\n  background: var(--nfm-selected-bg);\n  border-color: var(--nfm-selected-border);\n}\n.nfm-col-name {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.nfm-icon--inline {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n}\n.nfm-col-size, .nfm-col-modified {\n  font-size: 12px;\n  color: var(--nfm-color-muted);\n  white-space: nowrap;\n}\n\n.nfm-rename-input {\n  font: inherit;\n  font-size: 12px;\n  width: 100%;\n  padding: 2px 4px;\n  border-radius: 4px;\n  border: 1px solid var(--nfm-accent);\n  background: var(--nfm-bg);\n  color: var(--nfm-color);\n}\n.nfm-view--list .nfm-rename-input { font-size: 13px; }\n\n/* Statusbar */\n.nfm-statusbar {\n  padding: 6px 14px;\n  border-top: 1px solid var(--nfm-border);\n  background: var(--nfm-bg-subtle);\n  font-size: 12px;\n  color: var(--nfm-color-muted);\n}\n\n/* Dropzone overlay */\n.nfm-dropzone {\n  position: absolute;\n  inset: 0;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  background: color-mix(in srgb, var(--nfm-accent) 10%, transparent);\n  border: 2px dashed var(--nfm-accent);\n  border-radius: var(--nfm-radius-sm);\n  margin: 6px;\n  pointer-events: none;\n  z-index: 5;\n}\n.nfm-dropzone.is-active { display: flex; }\n.nfm-dropzone-inner {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  color: var(--nfm-accent);\n  font-weight: 600;\n  font-size: 13px;\n}\n.nfm-dropzone-inner svg { width: 36px; height: 36px; fill: currentColor; }\n\n/* Context menu */\n.nfm-menu {\n  position: absolute;\n  min-width: 170px;\n  background: var(--nfm-bg);\n  border: 1px solid var(--nfm-border);\n  border-radius: var(--nfm-radius-sm);\n  box-shadow: var(--nfm-shadow);\n  padding: 4px;\n  z-index: 20;\n  display: flex;\n  flex-direction: column;\n}\n.nfm-menu-item {\n  font: inherit;\n  font-size: 13px;\n  text-align: left;\n  padding: 7px 10px;\n  border: none;\n  background: transparent;\n  color: var(--nfm-color);\n  border-radius: 6px;\n  cursor: pointer;\n}\n.nfm-menu-item:hover, .nfm-menu-item:focus-visible {\n  background: var(--nfm-bg-hover);\n  outline: none;\n}\n\n/* Preview overlay */\n.nfm-preview-overlay {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 30;\n  padding: 24px;\n}\n.nfm-preview {\n  position: relative;\n  background: var(--nfm-bg);\n  border-radius: var(--nfm-radius);\n  box-shadow: var(--nfm-shadow);\n  max-width: 100%;\n  max-height: 100%;\n  width: 560px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.nfm-preview-close {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  border-radius: 50%;\n  background: var(--nfm-bg-hover);\n  color: var(--nfm-color);\n  cursor: pointer;\n  z-index: 1;\n}\n.nfm-preview-close svg { width: 14px; height: 14px; }\n.nfm-preview-body {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 220px;\n  max-height: 60vh;\n  background: var(--nfm-bg-subtle);\n  overflow: auto;\n}\n.nfm-preview-body img, .nfm-preview-body video {\n  max-width: 100%;\n  max-height: 60vh;\n  display: block;\n}\n.nfm-preview-body audio { width: 90%; }\n.nfm-preview-body iframe {\n  width: 100%;\n  height: 60vh;\n  border: none;\n}\n.nfm-preview-placeholder {\n  width: 72px;\n  height: 72px;\n  color: var(--nfm-color-muted);\n}\n.nfm-preview-placeholder svg { width: 100%; height: 100%; fill: currentColor; }\n.nfm-preview-body > p { color: var(--nfm-color-muted); font-size: 13px; margin-top: 8px; }\n.nfm-preview-meta {\n  padding: 16px 20px;\n}\n.nfm-preview-meta h3 {\n  margin: 0 0 10px;\n  font-size: 15px;\n  word-break: break-word;\n}\n.nfm-preview-meta dl {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 4px 12px;\n  margin: 0 0 12px;\n  font-size: 13px;\n}\n.nfm-preview-meta dt { color: var(--nfm-color-muted); }\n.nfm-preview-meta dd { margin: 0; }\n.nfm-preview-download {\n  display: inline-block;\n  text-decoration: none;\n}\n\n/* Focus visibility for items */\n.nfm-item:focus-visible {\n  outline: 2px solid var(--nfm-focus-ring);\n  outline-offset: -2px;\n}\n.nfm-view:focus-visible {\n  outline: none;\n}\n\n/* Reduced motion */\n@media (prefers-reduced-motion: reduce) {\n  .nfm-search-input, .nfm-btn, .nfm-item {\n    transition: none !important;\n  }\n}\n\n/* Mobile */\n@media (max-width: 560px) {\n  .nfm-toolbar { flex-direction: column; align-items: stretch; }\n  .nfm-toolbar-actions { justify-content: space-between; }\n  .nfm-search-input, .nfm-search-input:focus { width: 100%; }\n  .nfm-row { grid-template-columns: 1fr 70px; }\n  .nfm-col-modified { display: none; }\n  .nfm-view--grid { grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); }\n}\n";

  var sharedSheet = null;
  var sharedSheetFailed = false;

  function getSharedSheet(cssText) {
    if (sharedSheet || sharedSheetFailed) return sharedSheet;
    if (typeof CSSStyleSheet === 'undefined' || !('adoptedStyleSheets' in Document.prototype)) {
      sharedSheetFailed = true;
      return null;
    }
    try {
      sharedSheet = new CSSStyleSheet();
      sharedSheet.replaceSync(cssText);
    } catch (err) {
      sharedSheet = null;
      sharedSheetFailed = true;
    }
    return sharedSheet;
  }

  var TEMPLATE = document.createElement('template');
  TEMPLATE.innerHTML =
    '<div class="nfm-root" part="root">' +
      '<div class="nfm-toolbar" part="toolbar">' +
        '<nav class="nfm-breadcrumb" part="breadcrumb"></nav>' +
        '<div class="nfm-toolbar-actions">' +
          '<div class="nfm-search"><span class="nfm-search-icon">' + ICONS.search + '</span><input type="text" class="nfm-search-input" part="search"></div>' +
          '<select class="nfm-sort-select" part="sort-select"></select>' +
          '<button type="button" class="nfm-btn nfm-new-folder-btn" part="button"></button>' +
          '<button type="button" class="nfm-btn nfm-upload-btn" part="button"></button>' +
          '<input type="file" class="nfm-file-input" multiple hidden>' +
          '<div class="nfm-view-toggle" part="view-toggle">' +
            '<button type="button" class="nfm-view-btn" data-view="grid" title="">' + ICONS.grid + '</button>' +
            '<button type="button" class="nfm-view-btn" data-view="list" title="">' + ICONS.list + '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="nfm-body" part="body">' +
        '<div class="nfm-view" part="view" tabindex="0"></div>' +
        '<div class="nfm-dropzone" part="dropzone"><div class="nfm-dropzone-inner">' + ICONS.upload + '<span></span></div></div>' +
      '</div>' +
      '<div class="nfm-statusbar" part="statusbar"><span class="nfm-status-text"></span></div>' +
      '<div class="nfm-menu" part="menu" hidden></div>' +
      '<div class="nfm-preview-overlay" part="preview-overlay" hidden>' +
        '<div class="nfm-preview" part="preview">' +
          '<button type="button" class="nfm-preview-close" part="preview-close">' + ICONS.close + '</button>' +
          '<div class="nfm-preview-body"></div>' +
          '<div class="nfm-preview-meta"></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  class NeikiFileManager extends HTMLElement {
    constructor() {
      super();
      this._init();
    }
  }

  NeikiFileManager.observedAttributes = ['view', 'theme', 'lang', 'selectable', 'root-label'];

  NeikiFileManager.prototype._init = function () {
    this._config = Object.assign({}, DEFAULT_CONFIG);
    this._items = [];
    this._currentFolder = null;
    this._selection = [];
    this._clipboard = null;
    this._searchTerm = '';
    this._mediaQuery = null;
    this._objectUrls = [];
    this._ready = false;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
    this._injectStyles();

    var root = this.shadowRoot;
    this._root = root.querySelector('.nfm-root');
    this._breadcrumbEl = root.querySelector('.nfm-breadcrumb');
    this._searchInput = root.querySelector('.nfm-search-input');
    this._sortSelect = root.querySelector('.nfm-sort-select');
    this._newFolderBtn = root.querySelector('.nfm-new-folder-btn');
    this._uploadBtn = root.querySelector('.nfm-upload-btn');
    this._fileInput = root.querySelector('.nfm-file-input');
    this._viewToggle = root.querySelector('.nfm-view-toggle');
    this._viewEl = root.querySelector('.nfm-view');
    this._bodyEl = root.querySelector('.nfm-body');
    this._dropzone = root.querySelector('.nfm-dropzone');
    this._statusText = root.querySelector('.nfm-status-text');
    this._menuEl = root.querySelector('.nfm-menu');
    this._previewOverlay = root.querySelector('.nfm-preview-overlay');
    this._previewBody = root.querySelector('.nfm-preview-body');
    this._previewMeta = root.querySelector('.nfm-preview-meta');
    this._previewClose = root.querySelector('.nfm-preview-close');

    this._bindStaticEvents();
  };

  NeikiFileManager.prototype._injectStyles = function () {
    if (EMBEDDED_CSS) {
      var sheet = getSharedSheet(EMBEDDED_CSS);
      if (sheet) {
        this.shadowRoot.adoptedStyleSheets = [sheet];
        return;
      }
      var style = document.createElement('style');
      style.textContent = EMBEDDED_CSS;
      this.shadowRoot.insertBefore(style, this.shadowRoot.firstChild);
      return;
    }
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = this._resolveStylesheetUrl();
    this.shadowRoot.insertBefore(link, this.shadowRoot.firstChild);
  };

  NeikiFileManager.prototype._resolveStylesheetUrl = function () {
    var scriptEl = document.currentScript;
    if (!scriptEl) {
      var scripts = document.querySelectorAll('script[src]');
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (/neiki-file-manager(\.min)?\.js/.test(scripts[i].src)) {
          scriptEl = scripts[i];
          break;
        }
      }
    }
    var src = scriptEl ? scriptEl.src : '';
    if (/\.min\.js(\?.*)?$/.test(src)) return src.replace(/\.min\.js(\?.*)?$/, '.min.css$1');
    if (/\.js(\?.*)?$/.test(src)) return src.replace(/\.js(\?.*)?$/, '.css$1');
    return 'neiki-file-manager.css';
  };

  // ---------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype.connectedCallback = function () {
    this._readAttributesIntoConfig();
    this._render();
    if (!this._ready) {
      this._ready = true;
      this._emit('ready', { config: this.getConfig() });
    }
  };

  NeikiFileManager.prototype.disconnectedCallback = function () {
    if (this._mediaQuery) {
      this._mediaQuery.removeEventListener('change', this._onMediaChangeBound);
      this._mediaQuery = null;
    }
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('contextmenu', this._onDocContextMenu);
    this._revokeObjectUrls();
  };

  NeikiFileManager.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this._readAttributesIntoConfig();
    if (this.isConnected) this._render();
  };

  NeikiFileManager.prototype._readAttributesIntoConfig = function () {
    var cfg = this._config;
    cfg.view = oneOf(this.getAttribute('view'), VALID_VIEWS, cfg.view || DEFAULT_CONFIG.view);
    cfg.theme = oneOf(this.getAttribute('theme'), VALID_THEMES, cfg.theme || DEFAULT_CONFIG.theme);
    cfg.selectable = oneOf(this.getAttribute('selectable'), VALID_SELECTABLE, cfg.selectable || DEFAULT_CONFIG.selectable);
    cfg.rootLabel = this.getAttribute('root-label') || cfg.rootLabel;
    var lang = this.getAttribute('lang');
    if (lang) cfg.lang = lang;
  };

  // ---------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype._t = function (path, vars) {
    var lang = TRANSLATIONS[this._config.lang] ? this._config.lang : 'en';
    var dict = TRANSLATIONS[lang];
    var parts = path.split('.');
    var value = dict;
    for (var i = 0; i < parts.length; i++) {
      value = value && value[parts[i]];
    }
    if (value === undefined) {
      value = TRANSLATIONS.en;
      for (i = 0; i < parts.length; i++) value = value && value[parts[i]];
    }
    value = value || path;
    if (vars) {
      Object.keys(vars).forEach(function (key) {
        value = value.replace('{' + key + '}', vars[key]);
      });
    }
    return value;
  };

  NeikiFileManager.prototype.addTranslations = function (lang, dict) {
    if (!lang || !dict) return this;
    var existing = TRANSLATIONS[lang] || {};
    var merged = {};
    Object.keys(existing).concat(Object.keys(dict)).forEach(function (section) {
      merged[section] = Object.assign({}, existing[section], dict[section]);
    });
    TRANSLATIONS[lang] = merged;
    if (this.isConnected) this._render();
    return this;
  };

  NeikiFileManager.prototype.setLang = function (lang) {
    this._config.lang = lang;
    this.setAttribute('lang', lang);
    if (this.isConnected) this._render();
    return this;
  };

  // ---------------------------------------------------------------------
  // Static event bindings (bound once)
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype._bindStaticEvents = function () {
    var self = this;

    this._searchInput.addEventListener('input', function () {
      self._searchTerm = this.value;
      self._renderView();
      self._renderStatusbar();
    });

    this._sortSelect.addEventListener('change', function () {
      var value = this.value;
      var parts = value.split(':');
      self._config.sortBy = parts[0];
      self._config.sortDir = parts[1];
      self._renderView();
    });

    this._newFolderBtn.addEventListener('click', function () {
      self._promptNewFolder();
    });

    this._uploadBtn.addEventListener('click', function () {
      self._fileInput.click();
    });

    this._fileInput.addEventListener('change', function () {
      if (this.files && this.files.length) {
        self._handleIncomingFiles(this.files, self._currentFolder);
      }
      this.value = '';
    });

    this._viewToggle.addEventListener('click', function (event) {
      var btn = event.target.closest('.nfm-view-btn');
      if (!btn) return;
      self.setView(btn.getAttribute('data-view'));
    });

    this._viewEl.addEventListener('click', function (event) {
      if (event.target === self._viewEl) {
        self._clearSelection();
        self._closeMenu();
      }
    });

    this._viewEl.addEventListener('dblclick', function (event) {
      var itemEl = event.target.closest('.nfm-item');
      if (!itemEl) return;
      var node = self._findItem(itemEl.getAttribute('data-id'));
      if (node) self._openNode(node);
    });

    this._viewEl.addEventListener('contextmenu', function (event) {
      event.preventDefault();
      var itemEl = event.target.closest('.nfm-item');
      if (itemEl) {
        var node = self._findItem(itemEl.getAttribute('data-id'));
        if (node && self._selection.indexOf(node.id) === -1) {
          self._setSelection([node.id]);
        }
        self._openMenu(event.clientX, event.clientY, node);
      } else {
        self._openMenu(event.clientX, event.clientY, null);
      }
    });

    this._viewEl.addEventListener('keydown', function (event) {
      self._onKeydown(event);
    });

    this._previewClose.addEventListener('click', function () {
      self.closePreview();
    });

    this._previewOverlay.addEventListener('click', function (event) {
      if (event.target === self._previewOverlay) self.closePreview();
    });

    root_doc_events: {
      this._onDocClick = function (event) {
        var path = event.composedPath ? event.composedPath() : [];
        if (path.indexOf(self._menuEl) === -1) self._closeMenu();
      };
      // A right-click inside this instance is handled by the view's own
      // "contextmenu" listener above (same event, fires first since this
      // element is deeper in the bubble path) — closing here too would
      // immediately undo the menu it just opened. Only auto-close when the
      // right-click happened outside this component entirely.
      this._onDocContextMenu = function (event) {
        var path = event.composedPath ? event.composedPath() : [];
        if (path.indexOf(self) === -1) self._closeMenu();
      };
      document.addEventListener('click', this._onDocClick);
      document.addEventListener('contextmenu', this._onDocContextMenu);
    }

    // Drag & drop upload
    var dragCounter = 0;
    this._bodyEl.addEventListener('dragenter', function (event) {
      if (!self._hasFiles(event)) return;
      event.preventDefault();
      dragCounter++;
      self._dropzone.classList.add('is-active');
    });
    this._bodyEl.addEventListener('dragover', function (event) {
      if (!self._hasFiles(event)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    });
    this._bodyEl.addEventListener('dragleave', function () {
      dragCounter = Math.max(0, dragCounter - 1);
      if (dragCounter === 0) self._dropzone.classList.remove('is-active');
    });
    this._bodyEl.addEventListener('drop', function (event) {
      if (!self._hasFiles(event)) return;
      event.preventDefault();
      dragCounter = 0;
      self._dropzone.classList.remove('is-active');
      if (event.dataTransfer.files && event.dataTransfer.files.length) {
        self._handleIncomingFiles(event.dataTransfer.files, self._currentFolder);
      }
    });

    this._onMediaChangeBound = this._onMediaChange.bind(this);
  };

  NeikiFileManager.prototype._hasFiles = function (event) {
    var types = event.dataTransfer && event.dataTransfer.types;
    return !!(types && Array.prototype.indexOf.call(types, 'Files') !== -1);
  };

  NeikiFileManager.prototype._onKeydown = function (event) {
    var key = event.key;
    if (key === 'Escape') {
      this._closeMenu();
      this.closePreview();
      return;
    }
    if (key === 'Delete' || key === 'Backspace') {
      if (this._selection.length) {
        event.preventDefault();
        this._deleteItems(this._selection.slice());
      }
      return;
    }
    if (key === 'F2') {
      if (this._selection.length === 1) {
        event.preventDefault();
        this._startRename(this._findItem(this._selection[0]));
      }
      return;
    }
    if (key === 'Enter') {
      if (this._selection.length === 1) {
        this._openNode(this._findItem(this._selection[0]));
      }
      return;
    }
    if ((event.ctrlKey || event.metaKey) && key.toLowerCase() === 'a') {
      event.preventDefault();
      this._setSelection(this._visibleItems().map(function (n) { return n.id; }));
      return;
    }
    if ((event.ctrlKey || event.metaKey) && key.toLowerCase() === 'c') {
      this._clipboard = { mode: 'copy', ids: this._selection.slice() };
      return;
    }
    if ((event.ctrlKey || event.metaKey) && key.toLowerCase() === 'x') {
      this._clipboard = { mode: 'cut', ids: this._selection.slice() };
      return;
    }
    if ((event.ctrlKey || event.metaKey) && key.toLowerCase() === 'v') {
      this._pasteClipboard();
      return;
    }
  };

  NeikiFileManager.prototype._onMediaChange = function () {
    if (this._config.theme === 'auto') this._render();
  };

  NeikiFileManager.prototype._resolveTheme = function () {
    if (this._config.theme !== 'auto') return this._config.theme;
    if (!this._mediaQuery) {
      this._mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this._mediaQuery.addEventListener('change', this._onMediaChangeBound);
    }
    return this._mediaQuery.matches ? 'dark' : 'light';
  };

  // ---------------------------------------------------------------------
  // Data helpers
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype._findItem = function (id) {
    for (var i = 0; i < this._items.length; i++) {
      if (this._items[i].id === id) return this._items[i];
    }
    return null;
  };

  NeikiFileManager.prototype._childrenOf = function (parentId) {
    return this._items.filter(function (n) { return n.parent === parentId; });
  };

  NeikiFileManager.prototype._pathTo = function (id) {
    var path = [];
    var node = id ? this._findItem(id) : null;
    while (node) {
      path.unshift(node);
      node = node.parent ? this._findItem(node.parent) : null;
    }
    return path;
  };

  NeikiFileManager.prototype._visibleItems = function () {
    var self = this;
    var items = this._childrenOf(this._currentFolder);
    if (this._searchTerm) {
      var term = this._searchTerm.toLowerCase();
      items = items.filter(function (n) { return n.name.toLowerCase().indexOf(term) !== -1; });
    }
    var by = this._config.sortBy;
    var dir = this._config.sortDir === 'desc' ? -1 : 1;
    items = items.slice().sort(function (a, b) {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      var av, bv;
      if (by === 'size') { av = a.size || 0; bv = b.size || 0; }
      else if (by === 'modified') { av = a.modified || 0; bv = b.modified || 0; }
      else if (by === 'type') { av = typeGroupOf(a); bv = typeGroupOf(b); }
      else { av = a.name.toLowerCase(); bv = b.name.toLowerCase(); }
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
    return items;
  };

  NeikiFileManager.prototype._isDescendant = function (ancestorId, nodeId) {
    var node = this._findItem(nodeId);
    while (node && node.parent) {
      if (node.parent === ancestorId) return true;
      node = this._findItem(node.parent);
    }
    return false;
  };

  // ---------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype._render = function () {
    this.setAttribute('resolved-theme', this._resolveTheme());
    this._searchInput.placeholder = this._t('toolbar.search');
    this._newFolderBtn.textContent = this._t('toolbar.newFolder');
    this._uploadBtn.textContent = this._t('toolbar.upload');
    this._dropzone.querySelector('span').textContent = this._t('status.dropHint');

    var gridBtn = this._viewToggle.querySelector('[data-view="grid"]');
    var listBtn = this._viewToggle.querySelector('[data-view="list"]');
    gridBtn.title = this._t('toolbar.gridView');
    listBtn.title = this._t('toolbar.listView');
    gridBtn.classList.toggle('is-active', this._config.view === 'grid');
    listBtn.classList.toggle('is-active', this._config.view === 'list');
    gridBtn.setAttribute('aria-pressed', String(this._config.view === 'grid'));
    listBtn.setAttribute('aria-pressed', String(this._config.view === 'list'));

    this._renderSortSelect();
    this._renderBreadcrumb();
    this._renderView();
    this._renderStatusbar();
  };

  NeikiFileManager.prototype._renderSortSelect = function () {
    var self = this;
    var current = this._config.sortBy + ':' + this._config.sortDir;
    this._sortSelect.textContent = '';
    ['name', 'size', 'modified', 'type'].forEach(function (by) {
      ['asc', 'desc'].forEach(function (dir) {
        var opt = document.createElement('option');
        opt.value = by + ':' + dir;
        opt.textContent = self._t('toolbar.sort' + by.charAt(0).toUpperCase() + by.slice(1)) + ' – ' + self._t('toolbar.sort' + (dir === 'asc' ? 'Asc' : 'Desc'));
        self._sortSelect.appendChild(opt);
      });
    });
    this._sortSelect.value = current;
  };

  NeikiFileManager.prototype._renderBreadcrumb = function () {
    var self = this;
    var path = this._pathTo(this._currentFolder);
    this._breadcrumbEl.textContent = '';

    var homeBtn = document.createElement('button');
    homeBtn.type = 'button';
    homeBtn.className = 'nfm-crumb';
    homeBtn.textContent = this._config.rootLabel || this._t('breadcrumb.home');
    if (!this._currentFolder) homeBtn.classList.add('is-current');
    homeBtn.addEventListener('click', function () { self.navigateTo(null); });
    this._breadcrumbEl.appendChild(homeBtn);

    path.forEach(function (node, index) {
      var sep = document.createElement('span');
      sep.className = 'nfm-crumb-sep';
      sep.innerHTML = ICONS.chevron;
      self._breadcrumbEl.appendChild(sep);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nfm-crumb';
      btn.textContent = node.name;
      if (index === path.length - 1) btn.classList.add('is-current');
      btn.addEventListener('click', function () { self.navigateTo(node.id); });
      self._breadcrumbEl.appendChild(btn);
    });
  };

  NeikiFileManager.prototype._renderView = function () {
    var self = this;
    var items = this._visibleItems();
    var hasUp = this._currentFolder != null;
    this._viewEl.textContent = '';
    this._viewEl.classList.toggle('nfm-view--grid', this._config.view === 'grid');
    this._viewEl.classList.toggle('nfm-view--list', this._config.view === 'list');

    if (!items.length && !hasUp) {
      var empty = document.createElement('div');
      empty.className = 'nfm-empty';
      empty.textContent = this._t('status.empty');
      this._viewEl.appendChild(empty);
      return;
    }

    if (this._config.view === 'list') {
      var header = document.createElement('div');
      header.className = 'nfm-row nfm-row--header';
      header.innerHTML =
        '<span class="nfm-col-name">' + escapeHtml(this._t('toolbar.sortName')) + '</span>' +
        '<span class="nfm-col-size">' + escapeHtml(this._t('toolbar.sortSize')) + '</span>' +
        '<span class="nfm-col-modified">' + escapeHtml(this._t('toolbar.sortModified')) + '</span>';
      this._viewEl.appendChild(header);
    }

    if (hasUp) {
      this._viewEl.appendChild(this._buildUpItem());
    }

    if (!items.length) {
      var emptyInline = document.createElement('div');
      emptyInline.className = 'nfm-empty nfm-empty--inline';
      emptyInline.textContent = this._t('status.empty');
      this._viewEl.appendChild(emptyInline);
    }

    items.forEach(function (node) {
      var el = self._config.view === 'grid' ? self._buildGridItem(node) : self._buildListRow(node);
      self._bindItemEvents(el, node);
      self._viewEl.appendChild(el);
    });

    this._applySelectionClasses();
  };

  NeikiFileManager.prototype._buildUpItem = function () {
    var self = this;
    var current = this._findItem(this._currentFolder);
    var parentId = current ? current.parent : null;
    var label = this._t('misc.back');
    var el = document.createElement('div');

    if (this._config.view === 'grid') {
      el.className = 'nfm-item nfm-item--up';
      el.innerHTML =
        '<div class="nfm-item-thumb"><span class="nfm-back-icon">' + ICONS.back + '</span></div>' +
        '<div class="nfm-item-name">' + escapeHtml(label) + '</div>';
    } else {
      el.className = 'nfm-row nfm-item nfm-item--up';
      el.innerHTML =
        '<span class="nfm-col-name"><span class="nfm-back-icon nfm-back-icon--inline">' + ICONS.back + '</span>' + escapeHtml(label) + '</span>' +
        '<span class="nfm-col-size"></span><span class="nfm-col-modified"></span>';
    }

    el.title = label;
    el.setAttribute('aria-label', label);
    el.tabIndex = -1;

    el.addEventListener('click', function (event) {
      event.stopPropagation();
      self.navigateTo(parentId);
    });

    el.addEventListener('dragover', function (event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = self._hasFiles(event) ? 'copy' : 'move';
      el.classList.add('is-drop-target');
    });
    el.addEventListener('dragleave', function () {
      el.classList.remove('is-drop-target');
    });
    el.addEventListener('drop', function (event) {
      event.preventDefault();
      event.stopPropagation();
      el.classList.remove('is-drop-target');
      if (event.dataTransfer.files && event.dataTransfer.files.length) {
        self._handleIncomingFiles(event.dataTransfer.files, parentId);
        return;
      }
      try {
        var ids = JSON.parse(event.dataTransfer.getData('text/plain'));
        if (Array.isArray(ids)) self.moveItems(ids, parentId);
      } catch (err) { /* ignore malformed payloads */ }
    });

    return el;
  };

  NeikiFileManager.prototype._buildGridItem = function (node) {
    var el = document.createElement('div');
    el.className = 'nfm-item';
    el.setAttribute('data-id', node.id);
    el.setAttribute('draggable', 'true');
    el.tabIndex = -1;
    var thumb = node.type === 'file' && node.thumbnail
      ? '<img class="nfm-thumb" src="' + escapeHtml(node.thumbnail) + '" alt="">'
      : '<span class="nfm-icon">' + iconFor(node) + '</span>';
    el.innerHTML =
      '<div class="nfm-item-thumb">' + thumb + '</div>' +
      '<div class="nfm-item-name" title="' + escapeHtml(node.name) + '">' + escapeHtml(node.name) + '</div>';
    return el;
  };

  NeikiFileManager.prototype._buildListRow = function (node) {
    var el = document.createElement('div');
    el.className = 'nfm-row nfm-item';
    el.setAttribute('data-id', node.id);
    el.setAttribute('draggable', 'true');
    el.tabIndex = -1;
    var modified = node.modified ? new Intl.DateTimeFormat(this._config.lang, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(node.modified)) : '';
    el.innerHTML =
      '<span class="nfm-col-name"><span class="nfm-icon nfm-icon--inline">' + iconFor(node) + '</span>' + escapeHtml(node.name) + '</span>' +
      '<span class="nfm-col-size">' + (node.type === 'file' ? escapeHtml(formatSize(node.size)) : '') + '</span>' +
      '<span class="nfm-col-modified">' + escapeHtml(modified) + '</span>';
    return el;
  };

  NeikiFileManager.prototype._applySelectionClasses = function () {
    var self = this;
    this._viewEl.querySelectorAll('.nfm-item').forEach(function (el) {
      el.classList.toggle('is-selected', self._selection.indexOf(el.getAttribute('data-id')) !== -1);
    });
  };

  NeikiFileManager.prototype._renderStatusbar = function () {
    var count = this._visibleItems().length;
    var text = count === 1 ? this._t('status.item') : this._t('status.items', { count: count });
    if (this._selection.length) {
      text += ' · ' + this._t('status.selected', { count: this._selection.length });
    }
    this._statusText.textContent = text;
  };

  // ---------------------------------------------------------------------
  // Item interactions
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype._bindItemEvents = function (el, node) {
    var self = this;

    el.addEventListener('click', function (event) {
      event.stopPropagation();
      if (self._config.selectable === 'none') return;
      if (event.shiftKey && self._selection.length) {
        self._selectRange(node.id);
      } else if ((event.ctrlKey || event.metaKey) && self._config.selectable === 'multiple') {
        self._toggleSelection(node.id);
      } else {
        self._setSelection([node.id]);
      }
    });

    el.addEventListener('dragstart', function (event) {
      if (self._selection.indexOf(node.id) === -1) self._setSelection([node.id]);
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', JSON.stringify(self._selection));
    });

    if (node.type === 'folder') {
      el.addEventListener('dragover', function (event) {
        if (self._hasFiles(event)) {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
          el.classList.add('is-drop-target');
          return;
        }
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        el.classList.add('is-drop-target');
      });
      el.addEventListener('dragleave', function () {
        el.classList.remove('is-drop-target');
      });
      el.addEventListener('drop', function (event) {
        event.preventDefault();
        event.stopPropagation();
        el.classList.remove('is-drop-target');
        if (event.dataTransfer.files && event.dataTransfer.files.length) {
          self._handleIncomingFiles(event.dataTransfer.files, node.id);
          return;
        }
        try {
          var ids = JSON.parse(event.dataTransfer.getData('text/plain'));
          if (Array.isArray(ids)) self.moveItems(ids, node.id);
        } catch (err) { /* ignore malformed payloads */ }
      });
    }
  };

  NeikiFileManager.prototype._openNode = function (node) {
    if (!node) return;
    if (node.type === 'folder') {
      this.navigateTo(node.id);
    } else {
      this._emit('open', { item: this._publicNode(node) });
      this.openPreview(node.id);
    }
  };

  NeikiFileManager.prototype._setSelection = function (ids) {
    this._selection = ids.slice();
    this._applySelectionClasses();
    this._renderStatusbar();
    this._emit('select', { ids: this._selection.slice() });
  };

  NeikiFileManager.prototype._toggleSelection = function (id) {
    var idx = this._selection.indexOf(id);
    var next = this._selection.slice();
    if (idx === -1) next.push(id); else next.splice(idx, 1);
    this._setSelection(next);
  };

  NeikiFileManager.prototype._selectRange = function (id) {
    var items = this._visibleItems().map(function (n) { return n.id; });
    var last = this._selection[this._selection.length - 1];
    var from = items.indexOf(last);
    var to = items.indexOf(id);
    if (from === -1 || to === -1) { this._setSelection([id]); return; }
    var start = Math.min(from, to), end = Math.max(from, to);
    this._setSelection(items.slice(start, end + 1));
  };

  NeikiFileManager.prototype._clearSelection = function () {
    if (this._selection.length) this._setSelection([]);
  };

  // ---------------------------------------------------------------------
  // Context menu
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype._openMenu = function (x, y, node) {
    var self = this;
    var items = [];
    var hasSelection = this._selection.length > 0;
    var single = this._selection.length === 1 ? this._findItem(this._selection[0]) : null;

    if (node) {
      items.push({ label: this._t('menu.open'), action: function () { self._openNode(node); } });
      if (single && single.type === 'file') {
        items.push({ label: this._t('menu.preview'), action: function () { self.openPreview(single.id); } });
      }
      if (hasSelection) {
        items.push({ label: this._t('menu.download'), action: function () { self._downloadSelection(); } });
      }
      if (single) {
        items.push({ label: this._t('menu.rename'), action: function () { self._startRename(single); } });
      }
      items.push({ label: this._t('menu.cut'), action: function () { self._clipboard = { mode: 'cut', ids: self._selection.slice() }; } });
      items.push({ label: this._t('menu.copy'), action: function () { self._clipboard = { mode: 'copy', ids: self._selection.slice() }; } });
      items.push({ label: this._t('menu.delete'), action: function () { self._deleteItems(self._selection.slice()); } });
    } else {
      items.push({ label: this._t('menu.newFolder'), action: function () { self._promptNewFolder(); } });
      items.push({ label: this._t('menu.upload'), action: function () { self._fileInput.click(); } });
      if (this._clipboard) {
        items.push({ label: this._t('menu.paste'), action: function () { self._pasteClipboard(); } });
      }
      items.push({ label: this._t('menu.selectAll'), action: function () { self._setSelection(self._visibleItems().map(function (n) { return n.id; })); } });
      items.push({ label: this._t('menu.refresh'), action: function () { self.refresh(); } });
    }

    this._menuEl.textContent = '';
    items.forEach(function (item) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nfm-menu-item';
      btn.textContent = item.label;
      btn.addEventListener('click', function () {
        self._closeMenu();
        item.action();
      });
      self._menuEl.appendChild(btn);
    });

    this._menuEl.hidden = false;
    var rect = this._root.getBoundingClientRect();
    var menuRect = this._menuEl.getBoundingClientRect();
    var left = x - rect.left;
    var top = y - rect.top;
    if (left + menuRect.width > rect.width) left = Math.max(0, rect.width - menuRect.width);
    if (top + menuRect.height > rect.height) top = Math.max(0, rect.height - menuRect.height);
    this._menuEl.style.left = left + 'px';
    this._menuEl.style.top = top + 'px';

    this._emit('contextmenu', { item: node ? this._publicNode(node) : null });
  };

  NeikiFileManager.prototype._closeMenu = function () {
    this._menuEl.hidden = true;
  };

  // ---------------------------------------------------------------------
  // Rename
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype._startRename = function (node) {
    if (!node) return;
    var el = this._viewEl.querySelector('.nfm-item[data-id="' + node.id + '"]');
    if (!el) return;
    var nameEl = el.querySelector('.nfm-item-name, .nfm-col-name');
    if (!nameEl) return;
    var self = this;
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'nfm-rename-input';
    input.value = node.name;
    nameEl.textContent = '';
    nameEl.appendChild(input);
    input.focus();
    input.select();

    function commit() {
      var newName = input.value.trim();
      if (newName && newName !== node.name) self.renameItem(node.id, newName);
      else self._renderView();
    }

    input.addEventListener('blur', commit);
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') { event.preventDefault(); input.blur(); }
      if (event.key === 'Escape') { event.preventDefault(); self._renderView(); }
      event.stopPropagation();
    });
  };

  // ---------------------------------------------------------------------
  // New folder / delete / paste / move
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype._promptNewFolder = function () {
    var name = window.prompt(this._t('prompt.newFolderName'), this._t('prompt.newFolderName'));
    if (name && name.trim()) this.createFolder(name.trim(), this._currentFolder);
  };

  NeikiFileManager.prototype._deleteItems = function (ids) {
    var self = this;
    var names = ids.map(function (id) { var n = self._findItem(id); return n ? n.name : ''; }).filter(Boolean);
    var message = names.length === 1 ? this._t('confirm.deleteOne', { name: names[0] }) : this._t('confirm.deleteMany', { count: names.length });
    if (window.confirm(message)) this.removeItems(ids);
  };

  NeikiFileManager.prototype._pasteClipboard = function () {
    if (!this._clipboard) return;
    var self = this;
    var target = this._currentFolder;
    if (this._clipboard.mode === 'cut') {
      this.moveItems(this._clipboard.ids, target);
      this._clipboard = null;
    } else {
      this._clipboard.ids.forEach(function (id) {
        self._duplicateItem(id, target);
      });
    }
  };

  NeikiFileManager.prototype._duplicateItem = function (id, targetParent) {
    var node = this._findItem(id);
    if (!node) return;
    var copy = Object.assign({}, node, { id: uid(), parent: targetParent, name: node.name + ' (copy)', modified: Date.now() });
    this._items.push(copy);
    if (node.type === 'folder') {
      var self = this;
      this._childrenOf(node.id).forEach(function (child) {
        self._duplicateChild(child, copy.id);
      });
    }
    this._renderView();
    this._renderStatusbar();
    this._emit('change', { items: this.getData() });
  };

  NeikiFileManager.prototype._duplicateChild = function (node, targetParent) {
    var copy = Object.assign({}, node, { id: uid(), parent: targetParent });
    this._items.push(copy);
    if (node.type === 'folder') {
      var self = this;
      this._childrenOf(node.id).forEach(function (child) {
        self._duplicateChild(child, copy.id);
      });
    }
  };

  NeikiFileManager.prototype._downloadSelection = function () {
    var self = this;
    this._selection.forEach(function (id) {
      var node = self._findItem(id);
      if (node && node.type === 'file' && node.url) {
        var a = document.createElement('a');
        a.href = node.url;
        a.download = node.name;
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    });
  };

  // ---------------------------------------------------------------------
  // Upload handling
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype._handleIncomingFiles = function (fileList, parentId) {
    var files = Array.prototype.slice.call(fileList);
    var detail = { files: files, parentId: parentId };
    var evt = this._emit('upload', detail, { cancelable: true });
    if (!evt.defaultPrevented) {
      this.addFiles(files, parentId);
    }
  };

  NeikiFileManager.prototype._revokeObjectUrls = function () {
    this._objectUrls.forEach(function (url) { URL.revokeObjectURL(url); });
    this._objectUrls = [];
  };

  // ---------------------------------------------------------------------
  // Preview
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype.openPreview = function (id) {
    var node = this._findItem(id);
    if (!node || node.type !== 'file') return;
    var group = typeGroupOf(node);
    var body = this._previewBody;
    body.textContent = '';

    if (node.url && group === 'image') {
      var img = document.createElement('img');
      img.src = node.url;
      img.alt = node.name;
      body.appendChild(img);
    } else if (node.url && group === 'video') {
      var video = document.createElement('video');
      video.src = node.url;
      video.controls = true;
      body.appendChild(video);
    } else if (node.url && group === 'audio') {
      var audio = document.createElement('audio');
      audio.src = node.url;
      audio.controls = true;
      body.appendChild(audio);
    } else if (node.url && group === 'pdf') {
      var iframe = document.createElement('iframe');
      iframe.src = node.url;
      body.appendChild(iframe);
    } else {
      var placeholder = document.createElement('div');
      placeholder.className = 'nfm-preview-placeholder';
      placeholder.innerHTML = iconFor(node);
      body.appendChild(placeholder);
      var msg = document.createElement('p');
      msg.textContent = this._t('preview.noPreview');
      body.appendChild(msg);
    }

    var modified = node.modified ? new Intl.DateTimeFormat(this._config.lang, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(node.modified)) : '—';
    this._previewMeta.innerHTML =
      '<h3>' + escapeHtml(node.name) + '</h3>' +
      '<dl>' +
      '<dt>' + escapeHtml(this._t('preview.size')) + '</dt><dd>' + escapeHtml(formatSize(node.size) || '—') + '</dd>' +
      '<dt>' + escapeHtml(this._t('preview.modified')) + '</dt><dd>' + escapeHtml(modified) + '</dd>' +
      '<dt>' + escapeHtml(this._t('preview.type')) + '</dt><dd>' + escapeHtml(node.mime || extOf(node.name) || this._t('misc.unknownType')) + '</dd>' +
      '</dl>';

    if (node.url) {
      var dlBtn = document.createElement('a');
      dlBtn.className = 'nfm-btn nfm-preview-download';
      dlBtn.href = node.url;
      dlBtn.download = node.name;
      dlBtn.textContent = this._t('preview.download');
      this._previewMeta.appendChild(dlBtn);
    }

    this._previewOverlay.hidden = false;
    this._previewClose.setAttribute('aria-label', this._t('preview.close'));
  };

  NeikiFileManager.prototype.closePreview = function () {
    this._previewOverlay.hidden = true;
    this._previewBody.textContent = '';
  };

  // ---------------------------------------------------------------------
  // Emit
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype._emit = function (name, detail, opts) {
    var event = new CustomEvent('neiki-file-manager:' + name, {
      detail: detail,
      bubbles: true,
      composed: true,
      cancelable: !!(opts && opts.cancelable)
    });
    this.dispatchEvent(event);
    return event;
  };

  NeikiFileManager.prototype._publicNode = function (node) {
    return Object.assign({}, node);
  };

  // ---------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------

  NeikiFileManager.prototype.setConfig = function (config) {
    config = config || {};
    var cfg = this._config;
    if (config.view !== undefined) cfg.view = oneOf(config.view, VALID_VIEWS, cfg.view);
    if (config.theme !== undefined) cfg.theme = oneOf(config.theme, VALID_THEMES, cfg.theme);
    if (config.lang !== undefined) cfg.lang = config.lang;
    if (config.selectable !== undefined) cfg.selectable = oneOf(config.selectable, VALID_SELECTABLE, cfg.selectable);
    if (config.rootLabel !== undefined) cfg.rootLabel = config.rootLabel;
    if (config.sortBy !== undefined) cfg.sortBy = oneOf(config.sortBy, VALID_SORT_BY, cfg.sortBy);
    if (config.sortDir !== undefined) cfg.sortDir = config.sortDir === 'desc' ? 'desc' : 'asc';
    if (this.isConnected) this._render();
    return this;
  };

  NeikiFileManager.prototype.getConfig = function () {
    return Object.assign({}, this._config);
  };

  NeikiFileManager.prototype.setData = function (items) {
    this._revokeObjectUrls();
    this._items = (items || []).map(function (item) {
      return Object.assign({ id: item.id || uid(), parent: item.parent || null, modified: item.modified || Date.now() }, item);
    });
    this._currentFolder = null;
    this._selection = [];
    if (this.isConnected) this._render();
    this._emit('change', { items: this.getData() });
    return this;
  };

  NeikiFileManager.prototype.getData = function () {
    return this._items.map(this._publicNode, this);
  };

  NeikiFileManager.prototype.addItems = function (items) {
    var self = this;
    (items || []).forEach(function (item) {
      self._items.push(Object.assign({ id: item.id || uid(), parent: item.parent || null, modified: item.modified || Date.now() }, item));
    });
    if (this.isConnected) { this._renderView(); this._renderStatusbar(); }
    this._emit('change', { items: this.getData() });
    return this;
  };

  NeikiFileManager.prototype.addFiles = function (fileList, parentId) {
    var self = this;
    var files = Array.prototype.slice.call(fileList || []);
    var added = [];
    files.forEach(function (file) {
      var node = {
        id: uid(),
        name: file.name,
        type: 'file',
        size: file.size,
        mime: file.type,
        parent: parentId != null ? parentId : self._currentFolder,
        modified: file.lastModified || Date.now()
      };
      if (typeof file.type === 'string' && (/^image\/|^video\/|^audio\//.test(file.type)) && typeof URL !== 'undefined' && URL.createObjectURL) {
        node.url = URL.createObjectURL(file);
        node.thumbnail = /^image\//.test(file.type) ? node.url : undefined;
        self._objectUrls.push(node.url);
      }
      self._items.push(node);
      added.push(node);
    });
    if (this.isConnected) { this._renderView(); this._renderStatusbar(); }
    this._emit('change', { items: this.getData() });
    return added.map(this._publicNode, this);
  };

  NeikiFileManager.prototype.removeItems = function (ids) {
    var self = this;
    var evt = this._emit('delete', { ids: ids.slice() }, { cancelable: true });
    if (evt.defaultPrevented) return this;
    var toRemove = {};
    function markDescendants(id) {
      toRemove[id] = true;
      self._childrenOf(id).forEach(function (child) { markDescendants(child.id); });
    }
    ids.forEach(markDescendants);
    this._items = this._items.filter(function (n) { return !toRemove[n.id]; });
    this._selection = this._selection.filter(function (id) { return !toRemove[id]; });
    if (toRemove[this._currentFolder]) this._currentFolder = null;
    if (this.isConnected) this._render();
    this._emit('change', { items: this.getData() });
    return this;
  };

  NeikiFileManager.prototype.renameItem = function (id, newName) {
    var node = this._findItem(id);
    if (!node) return this;
    var evt = this._emit('rename', { id: id, oldName: node.name, newName: newName }, { cancelable: true });
    if (evt.defaultPrevented) return this;
    node.name = newName;
    node.modified = Date.now();
    if (this.isConnected) this._renderView();
    this._emit('change', { items: this.getData() });
    return this;
  };

  NeikiFileManager.prototype.createFolder = function (name, parentId) {
    var node = { id: uid(), name: name, type: 'folder', parent: parentId != null ? parentId : this._currentFolder, modified: Date.now() };
    this._items.push(node);
    this._emit('create-folder', { item: this._publicNode(node) });
    if (this.isConnected) { this._renderView(); this._renderStatusbar(); }
    this._emit('change', { items: this.getData() });
    return this._publicNode(node);
  };

  NeikiFileManager.prototype.moveItems = function (ids, targetParentId) {
    var self = this;
    ids = ids.filter(function (id) {
      return id !== targetParentId && !self._isDescendant(id, targetParentId) && self._findItem(id) && self._findItem(id).parent !== targetParentId;
    });
    if (!ids.length) return this;
    var evt = this._emit('move', { ids: ids.slice(), targetParentId: targetParentId }, { cancelable: true });
    if (evt.defaultPrevented) return this;
    ids.forEach(function (id) {
      var node = self._findItem(id);
      if (node) node.parent = targetParentId;
    });
    if (this.isConnected) this._render();
    this._emit('change', { items: this.getData() });
    return this;
  };

  NeikiFileManager.prototype.navigateTo = function (id) {
    this._currentFolder = id || null;
    this._searchTerm = '';
    this._searchInput.value = '';
    this._selection = [];
    if (this.isConnected) this._render();
    this._emit('navigate', { folderId: this._currentFolder });
    return this;
  };

  NeikiFileManager.prototype.getPath = function () {
    return this._pathTo(this._currentFolder).map(this._publicNode, this);
  };

  NeikiFileManager.prototype.getSelection = function () {
    return this._selection.slice();
  };

  NeikiFileManager.prototype.setSelection = function (ids) {
    this._setSelection(ids || []);
    return this;
  };

  NeikiFileManager.prototype.selectAll = function () {
    this._setSelection(this._visibleItems().map(function (n) { return n.id; }));
    return this;
  };

  NeikiFileManager.prototype.setView = function (view) {
    this._config.view = oneOf(view, VALID_VIEWS, this._config.view);
    this.setAttribute('view', this._config.view);
    if (this.isConnected) this._render();
    return this;
  };

  NeikiFileManager.prototype.getView = function () {
    return this._config.view;
  };

  NeikiFileManager.prototype.refresh = function () {
    if (this.isConnected) this._render();
    return this;
  };

  customElements.define('neiki-file-manager', NeikiFileManager);
})();
