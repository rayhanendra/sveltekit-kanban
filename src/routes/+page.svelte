<script lang="ts">
	import { draggable, dropzone } from '$lib/dnd';
	import { superForm } from 'sveltekit-superforms/client';
	import Dialog from '../components/atoms/Dialog.svelte';
	import type { PageData } from './$types';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { z } from 'zod';

	export let data: PageData;

	// Note: this is a watcher example, so it will run every time the data changes
	// $: data, console.log('yes');

	let dialog: HTMLDialogElement;

	const validationSchema = z.object({
		title: z.string().min(5, 'Title must be atleast 5 characters').max(50)
	});

	const { form, errors, enhance } = superForm(data.form, {
		resetForm: true,
		validators: validationSchema
	});

	const handleOnDropzone = async (cardId: any, columnId: any) => {
		try {
			await fetch('/api/update', {
				method: 'PUT',
				body: JSON.stringify({ cardId, columnId }),
				headers: {
					'content-type': 'application/json'
				}
			});
		} catch (e) {}
	};
</script>

<SuperDebug data={$form} />

<Dialog bind:dialog>
	<form method="POST" use:enhance action="?/create">
		<div class="tw-flex tw-flex-col">
			<label for="title">Title</label>
			<input
				type="text"
				id="title"
				name="title"
				bind:value={$form.title}
				aria-invalid={$errors.title ? 'true' : undefined}
			/>
			{#if $errors.title}<span class="tw-text-red-500">{$errors.title}</span>{/if}
		</div>
		<button type="submit">Submit</button>
	</form>
</Dialog>

<div class="tw-p-4 tw-w-full tw-bg-blue-950 tw-text-white">Svelte Kanban</div>
<div class="tw-p-6 tw-w-full tw-max-w-screen-xl">
	<div
		class="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-bg-slate-800 tw-text-white tw-px-2 tw-py-2 tw-float-right tw-rounded"
	>
		Add card

		<button
			class="tw-px-4 tw-py-2 tw-bg-slate-700 tw-text-white tw-rounded-md"
			on:click={() => dialog.showModal()}
		>
			+
		</button>
	</div>
</div>
<ul
	class="tw-list-none tw-m-0 tw-p-6 tw-flex tw-flex-col sm:tw-flex-row tw-gap-2 tw-w-full tw-max-w-screen-xl"
>
	{#each data.kanban.columns as column}
		{@const cards = data.kanban.cards.filter((card) => card.column_id === column.id)}
		<li
			use:dropzone={{
				on_dropzone(card_id) {
					const card = data.kanban.cards.find((card) => card.id == Number(card_id));
					if (card) {
						console.log('card', card);
						card.column_id = column.id;
						data = data;
						console.log('ini handle', handleOnDropzone);
						handleOnDropzone(card.id, column.id);
					}
				}
			}}
			class="tw-flex-1 tw-p-4 tw-bg-slate-800 tw-text-gray-100 tw-rounded"
		>
			<h2 class="tw-mb-4">{column.label}</h2>
			{#if cards.length > 0}
				<ul class="tw-flex tw-flex-col tw-gap-2">
					{#each cards as card}
						<li
							use:draggable={card.id}
							class="tw-flex-1 tw-p-4 tw-bg-slate-700 tw-text-gray-100 tw-rounded tw-border tw-border-slate-600"
						>
							{card.title}
						</li>
					{/each}
				</ul>
			{:else}
				<p>No cards</p>
			{/if}
		</li>
	{/each}
</ul>

<style>
	:global(.droppable) {
		outline: 0.1rem solid #4fd1c5;
		outline-offset: 0.25rem;
	}

	:global(.droppable) * {
		pointer-events: none;
	}
</style>
