| original estimate | estimate | actual effort | remaining effort |
| ----------------- | -------- | ------------- | ---------------- |
| 8h                | -        | -             | -                |

**acceptance criteria:**
- we have a folder structure with screen reference markdown files

**technical details:**
* screen references are inspired by the Acumatica (a cloud-based ERP business management system by a Seattle-based software company) product documentation, https://help.acumatica.com/. the documentation contains a "reference" section with "form reference" which contains specific descriptions of all user interface elements and parts of the form
* the documentation makes extensive use of reference numbers, two-column description tables, along with bold text and italic text for emphasis, and hyperlinks for navigation
* in the Acumatica documentation the root index document is called "getting started", the chapter index document is called "general information" (which in Microsoft documentation is called "overview")
* we can use this obsidian snippet for CSS styles for full-width tables in reading and source view
```css
/* 2025-prospecto/.obsidian/snippets/table.css */

.markdown-reading-view table,
.markdown-source-view.mod-cm6 .cm-table-widget :is(table, .table-wrapper) {
    width: 100%;
}

.markdown-reading-view table tr > td:not(:last-child),
.markdown-source-view.mod-cm6 .cm-table-widget :is(table, .table-wrapper) tr > td:not(:last-child) div {
  text-wrap: nowrap;
}

.markdown-reading-view table tr > td:last-child,
.markdown-source-view.mod-cm6 .cm-table-widget :is(table, .table-wrapper) tr > td:last-child {
    width: 100%;
}
```
