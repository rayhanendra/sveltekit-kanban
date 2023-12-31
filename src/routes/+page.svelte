<script lang="ts">
	import { draggable, dropzone } from '$lib/dnd';
	import { superForm } from 'sveltekit-superforms/client';
	import Dialog from '../components/atoms/Dialog.svelte';
	import type { PageData } from './$types';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { z } from 'zod';
	import NavigationBar from '../components/atoms/NavigationBar.svelte';

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

<NavigationBar />
<div class="p-6 w-full max-w-screen-xl">
	<div
		class="flex items-center justify-between gap-3 bg-slate-800 text-white px-2 py-2 float-right rounded"
	>
		Add card

		<button
			class="px-4 py-2 bg-slate-700 text-white rounded-md"
			on:click={() => dialog.showModal()}
		>
			+
		</button>
	</div>
</div>
<ul class="list-none m-0 p-6 flex flex-col sm:flex-row gap-2 w-full max-w-screen-xl">
	{#each data.kanban.columns as column}
		{@const cards = data.kanban.cards.filter((card) => card.column_id === column.id)}
		<li
			use:dropzone={{
				on_dropzone(card_id) {
					const card = data.kanban.cards.find((card) => card.id == Number(card_id));
					if (card) {
						// console.log('card', card);
						card.column_id = column.id;
						data = data;
						handleOnDropzone(card.id, column.id);
					}
				}
			}}
			class="flex-1 p-4 bg-slate-800 text-gray-100 rounded"
		>
			<h2 class="mb-4">{column.label}</h2>
			{#if cards.length > 0}
				<ul class="flex flex-col gap-2">
					{#each cards as card}
						<li
							use:draggable={card.id}
							class="flex-1 p-4 bg-slate-700 text-gray-100 rounded border border-slate-600"
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
<Dialog bind:dialog>
	<form method="POST" use:enhance action="?/create">
		<div class="flex flex-col p-3">
			<label for="title" class="label">
				<span>Title</span>
				<input
					type="text"
					id="title"
					name="title"
					bind:value={$form.title}
					aria-invalid={$errors.title ? 'true' : undefined}
					class="input"
				/>
				{#if $errors.title}<span class="input-helper">{$errors.title}</span>{/if}
			</label>
		</div>
		<div class="p-3">
			<button type="submit" class="btn variant-ghost-primary text-primary-400 w-full">Submit</button
			>
		</div>
	</form>
</Dialog>
<div class="p-5">
	<SuperDebug data={$form} />
</div>

<style>
	:global(.droppable) {
		outline: 0.1rem solid #4fd1c5;
		outline-offset: 0.25rem;
	}

	:global(.droppable) * {
		pointer-events: none;
	}

	.label {
		height: 90px;
		width: 100%;
		color: white;
	}
	.input {
		border-radius: 8px;
		padding-left: 20px;
		padding-right: 20px;
		height: 50%;
		width: 100%;
	}
	.input-helper {
		font-size: 14px;
		@apply text-error-600;
	}
</style>
