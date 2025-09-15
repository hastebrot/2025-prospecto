### Implementation guide

| Concept            | Description                                                                                                                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Screen reference   |                                                                                                                                                                                                                                                            |
| Bundle with schema |                                                                                                                                                                                                                                                            |
| Backend tests      |                                                                                                                                                                                                                                                            |
| Screens            | - collection with table and list, <br>- item with summary area and details area, <br>- create item and delete item in toolbar with dialogs, <br>- view and edit fields, <br>- show and change status (workflow) with dialog, <br>- lookup reference values |
| Components         |                                                                                                                                                                                                                                                            |
| Headless tests     |                                                                                                                                                                                                                                                            |

#### Shortcuts and caveats
| Concept                     | Description                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Bundles not isolated        | we use "JOIN" between bundle database tables                                                                                       |
| Frontend sends whole object | this speeds-up implementation                                                                                                      |
| Picklists reference keys    | Picklists directly keys into objects which will be displayed directly in UI. renaming picklists keys will not update the used keys |
| schema migration            |                                                                                                                                    |
| data consistency            |                                                                                                                                    |

### Notes

* A **vertical user story** is a slice of functionality that delivers end-to-end value to the user, covering all necessary layers of the system (user interface, business logic, data access) rather than focusing only on one technical component, https://en.wikipedia.org/wiki/Vertical_slice#Vertical_user_stories
	* Vertical slices, https://en.wikipedia.org/wiki/Vertical_slice
	* A vertical slice (VS) is a type of milestone, benchmark, or deadline, with emphasis on demonstrating progress across all components of a project.
	* The term _vertical slice_ refers to a cross-sectional slice through the layers that form the structure of the software code base.

- Symptoms of **bad user stories**, https://www.scruminc.com/wp-content/uploads/2015/06/User-Stories-2.0.pdf
	- Wasted Time
		• Excessive effort to figure out what is really meant by the story
		• Additional research needed before work can start/end
		• Time spent waiting for external dependencies to be cleared
	- Product Issues
		• Back-end infrastructure built with nothing to show customer
		• Building something only to discover it is not what the customer really wanted
		• Overly prescriptive stories don’t leave room for innovation by the team
	- Quality Problems
		• Insufficient Definition of Done results in poor product quality
		• Sub-components of product developed by different teams don’t integrate well
		• Over-built features due to lack of clear acceptance criteria cause code bloat and product liability

* user story readiness guidelines, https://www.scruminc.com/wp-content/uploads/2015/06/User-Stories-2.0.pdf
	* immediately actionable: can be delivered independently and free from external blockage?
	* negotiable: descriptive enough to support team debate and conversation?
	* valuable: delivers customer or business-visible benefit?
	* estimable: clear enough that the team can estimate?
	* sized to fit: small enough blocks to complete within iteration?
	* testable: clear acceptance criteria to know when it is "good enough"?

* backlog items
	* customer features: functionality that delivers direct value to end-users or customers.
	* infrastructure and architecture: technical enablers that support scalability, performance, maintainability, and system integrity.
	* research: time-boxed investigations or experiments to explore uncertainty, gain knowledge, or evaluate alternatives.
	* risk reduction: work aimed at mitigating potential failures, compliance issues, or technical risks early in development.
