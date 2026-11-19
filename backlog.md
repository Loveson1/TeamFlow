project
Pass 2

how do we make project and task assigned only appear to assigned users

Add a custom message, z.string().min(1, "Name is required"), because zod’s default message is unfriendly.
Replace the hardcoded “Adeola Omomowo” assignee with the real assignee picker, and decide what assignedTo should be. Your schema allows a string or an array, but your context expects string[], so I’d make the schema z.array(z.string()) and default it to [].
Clear and focus the Name field when the modal opens (autoFocus on the name input is a quick option).

modal popup that says project added

Pass 3

Add role="dialog", aria-modal="true", and aria-labelledby pointing at the title.
Close on Escape, trap focus inside the modal, and return focus to the Create Project button when it closes.
Give the X button aria-label="Close".

delete

Pass 2: confirm before deleting (a small “Are you sure?” modal), and an error boundary so a render error shows a message instead of a blank page.
Pass 3: after a delete, move focus somewhere sensible, like the next card or the search box.

Backlog items for later: pass 2 can show “Unassigned” when assignees is empty and a “+2” circle when there are many, and pass 3 should replace title with an aria-label, since a hover tooltip doesn’t help keyboard or screen reader users.


max lenght of text for project cards so they always have the same shape and dont grow bigger than others

page not found UI for user experience with link back to home 

pass 2
sidebar logo on top and sidebar active state marker