import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const kanban = {
	columns: [
		{
			id: 1,
			label: '📫 Todo'
		},
		{
			id: 2,
			label: '✅ In Progress'
		},
		{
			id: 3,
			label: 'Done'
		}
	],
	cards: [
		{
			column: 1,
			id: 'a',
			title: 'Get groceries'
		},
		{
			column: 2,
			id: 'b',
			title: 'Walk the dog'
		}
	]
};

const validationSchema = z.object({
	title: z.string().min(5).max(50)
});

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, validationSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		// Note: validation can also be done here, but it's better to do it in the form. This is just an example.

		const newCard = {
			column: kanban.columns[0].id,
			id: Date.now().toString(),
			title: form.data.title
		};

		kanban.cards.push(newCard);

		return {
			// Note: You can return anything here, but it's best to return the form so the client can update the form state
			form
		};
	}
};

export const load: PageServerLoad = async () => {
	// Note: Validate the input
	const form = await superValidate(validationSchema);

	return {
		form,
		kanban
	};
};
