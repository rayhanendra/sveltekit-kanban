import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

// const kanban = {
// columns: [
// 	{
// 		id: 1,
// 		label: '📫 Todo'
// 	},
// 	{
// 		id: 2,
// 		label: '✅ In Progress'
// 	},
// 	{
// 		id: 3,
// 		label: 'Done'
// 	}
// ],
// cards: [
// 	{
// 		column: 1,
// 		id: 'a',
// 		title: 'Get groceries'
// 	},
// 	{
// 		column: 2,
// 		id: 'b',
// 		title: 'Walk the dog'
// 	}
// ]
// };

type Kanban = {
	columns: {
		id: number;
		label: string;
	}[];
	cards: {
		id: number;
		column_id: number;
		title: string;
	}[];
};

const validationSchema = z.object({
	title: z.string().min(5).max(50)
});

export const actions: Actions = {
	create: async ({ request }) => {
		const form = await superValidate(request, validationSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		// Note: validation can also be done here, but it's better to do it in the form. This is just an example.

		const newCard = {
			column_id: 1,
			title: form.data.title
		};

		const { data: cards, error } = await supabase.from('kanban_cards').insert(newCard).select();

		if (error) {
			return fail(500, { error });
		}

		console.log('supabase cards', cards);

		return {
			// Note: You can return anything here, but it's best to return the form so the client can update the form state
			form
		};
	}
};

export const load: PageServerLoad = async () => {
	const { data: columns } = await supabase.from('kanban_columns').select();
	// console.log('supabase columns', columns);
	const { data: cards } = await supabase.from('kanban_cards').select();
	// console.log('supabase cards', cards);
	// Note: Validate the input
	const form = await superValidate(validationSchema);

	const kanban: Kanban = {
		columns: columns ?? [],
		cards: cards ?? []
	};

	return {
		form,
		kanban
	};
};
