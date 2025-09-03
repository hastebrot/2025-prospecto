User interface elements are categorized using Atomic Design methodology, which takes cues from chemistry. We loosely follow this methodology as a guiding principle, but not in a strict way.
### Screens (Pages)

| Screen                      | Description                                 |
| --------------------------- | ------------------------------------------- |
| <br>Product module:         |                                             |
| **[[PRO1000 products]]**    | The investment products. (German: Produkte) |
| **[[PRO2000 tariffs]]**     | The variants of a product. (German: Tarife) |
| **[[PRO3000 contracts]]**   | (German: Verträge)                          |
| **[[PRO4000 customers]]**   | (German: Kunden)                            |
| PRO5000 partners            | (German: Vertriebspartner)                  |
| PRO6000 assets              | (German: Anlagen)                           |
| <br>Contact module:         |                                             |
| CON1000 persons             | (German: Personen)                          |
| CON2000 companies           | (German: Firmen, Unternehmen)               |
| CON3000 tickets             | (German: Tickets, Vorgänge)                 |
| <br>Finance module:         |                                             |
| FIN1000 transaction records | (German: Geschäftsvorfälle)                 |
| FIN2000 journal entries     | (German: Verbuchungen)                      |
| <br>Document module:        |                                             |
| DOC1000 documents           | (German: Dokumente)                         |
| <br>Settings module:        |                                             |
| SET1000 reference lists     | (German: Nachschlagelisten)                 |
### Organisms (Pagelets)

| Organism              | Description                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Application** panel | Panel which contains **Navigation area**.                                                                                                                   |
| **Listing** panel     | Panel which contains **Filter area**, **Table** or **List**.                                                                                                |
| **Form** panel        | Panel which contains **Form title bar**, **Form toolbar**, **Summary area**, **Details area**.                                                              |
| **Dialog** overlay    |                                                                                                                                                             |
| **Sidepanel** overlay |                                                                                                                                                             |
| **Creation** dialog   | Dialog which contains **Create** button.                                                                                                                    |
| **Report** dialog     | Dialog which contains **Run report** button.                                                                                                                |
| **Processing** dialog | Dialog which contains **Progress area**, **Process status** toggle button bar (*processed*, *errors*, *warnings*, *remaining*, *total*), **Results table**. |
### Molecules (Components)

| Molecule            | Description                                 |
| ------------------- | ------------------------------------------- |
| **Tablist** element |                                             |
| **Card** element    | Elements which contains title and fieldset. |

---
* assign booking
	* person data
	* contract data
	* booking suggestion
