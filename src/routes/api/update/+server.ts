import { supabase } from '$lib/supabaseClient';
import { json, text } from '@sveltejs/kit';

export async function PUT({ request }) {
	const { cardId, columnId } = await request.json();
	const { data, error } = await supabase
		.from('kanban_cards')
		.update({
			column_id: columnId
		})
		.eq('id', cardId)
		.select();

	if (error) {
		return json({ error }, { status: 500 });
	}

	return json({ data }, { status: 200 });
}

/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}
