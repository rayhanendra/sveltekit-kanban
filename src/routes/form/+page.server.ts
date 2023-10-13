import type { PageServerLoad } from '../$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { momSchema } from '$lib/schemas';
import { supabase } from '$lib/supabaseClient';

export const load = (async () => {
	const form = await superValidate(momSchema);
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, momSchema);

		if (!form.valid) return fail(400, { form });

		const file = formData.get('avatar');

		if (file instanceof File) {
			const { error } = await supabase.storage.from('images/mom').upload(file.name, file, {
				cacheControl: '3600',
				upsert: false
			});

			if (error) {
				return fail(500, { error, form });
			}
		}

		const payload = {
			dateOfRegistry: form.data.dateOfRegistry,
			firstName: form.data.firstName,
			lastName: form.data.lastName,
			age: form.data.age,
			phoneNumber: form.data.phoneNumber,
			email: form.data.email,
			area: form.data.area,
			occupation: form.data.occupation,
			pregnant: form.data.pregnant
		};

		const { error } = await supabase.from('moms').insert([payload]).select();

		if (error) {
			return fail(500, { error, form });
		}

		message(form, 'Mom Created!');

		return { form };
	}
};
