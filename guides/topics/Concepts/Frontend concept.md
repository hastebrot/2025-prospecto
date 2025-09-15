
### Directory structure

| Concept             | Description                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /src                |                                                                                                                                                                       |
| /src/components     |                                                                                                                                                                       |
| /src/routes/screens | collection table, collection list, item form, item table, summary area, details area with tabs                                                                        |
| /test/components    | form, table, list, toolbar with buttons, tablist, main nav, sub nav, menu with menu grid, overlay and popover, dialog and sidepanel, tiles, steps panel, status badge |

### Inspiration

* https://service.xpecto.com/help/xpectolive/xpectoLive.html (xpectoLive 5.30), "Apps", "Anlegerverwaltung", "App-Bereich (AV)", "Emissionen", "Zeichnungen"
	* Hauptliste
	* Filter
	* Ausgewählter Datensatz
	* Tags
	* Tabs
	* Aktionen
* https://help.acumatica.com/ (Acumatica 2025 R1), "UI Developer Guide"
	* "Defining a Data Entry Form", "Data Entry Form: General Information", "A data entry form"

---

#### Theme, tokens, and icons

| Concept        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **App theme**  | light, dark                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **App tokens** | font-sans, font-mono<br>font-normal (weight: 400), font-semibold (weight: 700)<br>text-sm, text-base, text-lg<br><br>    "--bg-base": "var(--color-white)",<br>    "--bg-layer": "var(--color-zinc-100)",<br>    "--bg-layer-active": "var(--color-zinc-200)",<br>    "--fg-base": "var(--color-zinc-900)",<br>    "--fg-subtle": "var(--color-zinc-500)",<br>    "--fg-muted": "var(--color-zinc-350)",<br>    "--border-base": "var(--color-zinc-200)",<br>    "--border-active": "var(--color-zinc-300)",<br>    "--fg-accent": "var(--color-blue-500)",<br>    "--bg-accent": "var(--color-blue-100)",<br>    "--border-accent": "var(--color-blue-200)",<br>    "--fg-highlight": "var(--color-amber-600)",<br>    "--bg-highlight": "var(--color-amber-200)",<br>    "--border-highlight": "var(--color-amber-400)", |
| **App icon**   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

#### Shell, navigation, layouts, and areas

| Concept               | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| **App shell**         |                                                              |
| <br>Navigation:       |                                                              |
| **Main navigation**   | Alternative: Primary nav.                                    |
| **Sub navigation**    | Alternative: Secondary nav.                                  |
| <br>Layout:           |                                                              |
| **Collection layout** | Alternative: Dataset layout. (German: Hauptliste)            |
| **Item layout**       | Alternative: Record layout. (German: Ausgewählter Datensatz) |
| <br>Area:             |                                                              |
| **Summary area**      |                                                              |
| **Details area**      |                                                              |

#### Toolbar

| Concept                   | Description                                |
| ------------------------- | ------------------------------------------ |
| **Toolbar**               | (German: Werkzeugleiste)                   |
| **Toolbar button**        | With background default, or status colors. |
| **Toolbar toggle button** |                                            |
| **Toolbar overlay**       | Sidemap-like sections.                     |

#### Fieldset and form

| Concept                  | Description                          |
| ------------------------ | ------------------------------------ |
| **Fieldset**             |                                      |
| **Fieldset title**       | When fieldset untitled, then hide.   |
| **Form label**           |                                      |
| **Form control**         |                                      |
| <br>Features:            |                                      |
| **Validation decorator** |                                      |
| **Lookup popover**       | Table, list, tree, filter facets.    |
| **Auto layout**          | Display: grid or column. Responsive. |
| **Enter key**            | Enter as tab key.                    |

#### Table

| Concept                  | Description                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- |
| **Table**                |                                                                               |
| **Table header**         |                                                                               |
| **Table body**           |                                                                               |
| **Table column**         |                                                                               |
| **Table row**            |                                                                               |
| **Table cell**           |                                                                               |
| <br>Features:            |                                                                               |
| **Selection**            |                                                                               |
| **Keyboard focus**       |                                                                               |
| **Input in cells**       |                                                                               |
| **Validation decorator** | Alternatives: Decorator, Indicator, Adornment, Wrapper, Marker, Icon, Status. |
| **Highlight decorator**  |                                                                               |

#### List and item

| Concept              | Description |
| -------------------- | ----------- |
| **List**             |             |
| **Item**             |             |
| **Item title**       |             |
| **Item description** |             |
| **Item label**       |             |
| <br>Features:        |             |
| **Selection**        |             |
| **Keyboard focus**   |             |

#### Badge

| Concept       | Description                               |
| ------------- | ----------------------------------------- |
| **Badge**     |                                           |
| <br>Features: |                                           |
| **Color**     | Background color with contrast color-mix. |

---

| Item                   | Description                                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <br>Panels:            |                                                                                                                                                             |
| **Application** panel  | Panel which contains **Navigation area**.                                                                                                                   |
| **Modules panel**      |                                                                                                                                                             |
| **Listing** panel      | Panel which contains **Filter area**, **Table** or **List**.                                                                                                |
| **Form** panel         | Panel which contains **Form title bar**, **Form toolbar**, **Summary area**, **Details area**.                                                              |
| <br>Overlays:          |                                                                                                                                                             |
| **Dialog** overlay     |                                                                                                                                                             |
| **Sidepanel** overlay  |                                                                                                                                                             |
| <br>Dialogs:           |                                                                                                                                                             |
| **Creation** dialog    | Dialog which contains **Create** button.                                                                                                                    |
| **Report** dialog      | Dialog which contains **Run report** button.                                                                                                                |
| **Processing** dialog  | Dialog which contains **Progress area**, **Process status** toggle button bar (*processed*, *errors*, *warnings*, *remaining*, *total*), **Results table**. |
| <br>Styles and tokens: |                                                                                                                                                             |
| **Font sizes**             | small, medium, large                                                                                                                                        |
| **Colors**                 | background, text, borders, accent, highlight                                                                                                                |

**Inbox:**

| Item                            | Description                                                                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Read-only fields**            | With underline border.                                                                                                                                                                                 |
| **Disabled fields**             | With gray background.                                                                                                                                                                                  |
| **Modified fields**             | With yellow background to indicate what will be changed on "OK" or "Cancel" button press ("Save" and "Revert to last save" buttons).<br><br>Highlight modified text inputs, checkboxes, tablist items. |
| **Collapsible summary area**    | In xpectoLive they always scroll down to increase the visible height of the details area table/form.                                                                                                   |
| **Badges in details area tabs** | With item count to indicate the tab has content. Hidden for 0 item counts.                                                                                                                             |
| **Multiline table headers**     |                                                                                                                                                                                                        |
| **Dialogs with steps panel**    |                                                                                                                                                                                                        |
| reference labels                | entity reference is hyperlink ID and name, e.g. "C0012 - Customer Name"                                                                                                                                |
| money labels                    | monetary values are amount and currency, e.g. "12,000.50 EUR"                                                                                                                                          |
| dashboard tiles                 | (German: Kacheln)                                                                                                                                                                                      |
| processing state tiles          |                                                                                                                                                                                                        |
| item with note and files        |                                                                                                                                                                                                        |

More:

| Item                   | Description                                                                                                                                                                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| modified fields        | with yellow background                                                                                                                                                                                                                                                  |
| read-only fields       | with underline                                                                                                                                                                                                                                                          |
| validation indicator   | for fields, tabs, table row, table cell                                                                                                                                                                                                                                 |
| combobox lookup        | popover table, popover list, popover tree, as field, as table cell, yellow search highlighting                                                                                                                                                                          |
| note and comments      |                                                                                                                                                                                                                                                                         |
| action options popover |                                                                                                                                                                                                                                                                         |
| toolbar actions        | action favorites                                                                                                                                                                                                                                                        |
| summary area           | - entity type, entity id + name<br>- toolbar, reload, filter, search, save, cancel, add<br>- action buttons (favorited) with enabled state, action dropdown, collapse summary area toggle button, card grid (responsive, colum spec), read-only fields, disabled fields |
| details area           | toolbar, table (checkbox select column, note column, files column), table row active, table cell active, cells with hyperlink (underline on hover), align left or right                                                                                                 |
| tile group component   | - dashboard tiles, last updated at<br>- process status tiles, toggle table row filter                                                                                                                                                                                   |
| notification           | - auto hide, process steps, finished time                                                                                                                                                                                                                               |
| tablist                | - tab with count badge                                                                                                                                                                                                                                                  |
| table header cells     | multi-line labels                                                                                                                                                                                                                                                       |
| column mapping         | - excel -> parquet/arrow, sqlite                                                                                                                                                                                                                                        |
| restate                | - test helper (integration test)<br>- zod serde (endpoint, request and response schema)                                                                                                                                                                                 |

Variants:

| Item               | Description                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| main navigation    | 1. as navigation tree<br>2. with popover menu                                                                         |
| listing filters    | 1. as filter panel with facets after click on toggle button <br>2. as filter bar with dropdown buttons                |
| listing navigation | 1. as list select<br>2. as popver list after click on entity type hyperlink<br>3. as action buttons group to navigate |
| create steps       | 1. as steps panel<br>2. as tabs                                                                                       |

| Item           | Description                   |
| -------------- | ----------------------------- |
| locale         | language and country          |
| format numbers | dot, comma, space, apostrophe |
| format money   |                               |
| format date    |                               |
| format time    |                               |
| format IBAN    |                               |
| format BIC     |                               |
| format BLZ     |                               |

### Terminology

| Term                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Information architecture (IA)** | How content is structured, organized, and labeled to support findability and usability. (German: Informationsarchitektur)<br><br>- *Organization systems*: How information is structured and grouped, often using hierarchies or other patterns.<br>- *Labelling systems*: The names and labels used to identify content, ensuring clear communication with users.<br>- *Navigation systems*: The methods users employ to move through content, such as menus, links, and other pathways.<br>- *Search systems*: The functionality that allows users to actively find information, often through a search bar |
| **User interface (UI)**           | The visual and functional design that allows a person to interact with a digital system or device, including elements like screen layouts, buttons, icons, and menus. (German: Benutzerschnittstelle)                                                                                                                                                                                                                                                                                                                                                                                                         |
| **User experience (UX)**          | How a user interacts with and experiences a product, system or service. It includes a person's perceptions of utility, ease of use, and efficiency. (German: Benutzererlebnis)                                                                                                                                                                                                                                                                                                                                                                                                                                |

---

| Term                      | Description                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mythical man-month (1975)** | Complex programming projects cannot be completely divided into separate tasks that can be carried out without communication between the contributors and without a complex network of relationships between tasks and contributors.<br><br>Adding more people to a late software project often makes it later, because communication overhead grows nonlinearly. |
| **No silver bullet (1986)**   | There’s no single technique, tool, or process that will dramatically improve software productivity or reliability in complex projects.<br><br>The argument relies on the distinction between accidental complexity and essential complexity.                                                                                                                     |
