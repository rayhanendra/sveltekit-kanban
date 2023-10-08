<script>
	import { draggable, dropzone } from '$lib/dnd';
	export let data;
</script>

<div class="tw-p-4 tw-w-full tw-bg-blue-950 tw-text-white">Svelte Kanban</div>
<ul
	class="tw-list-none tw-m-0 tw-p-6 tw-flex tw-flex-col sm:tw-flex-row tw-gap-2 tw-w-full tw-max-w-screen-xl"
>
	{#each data.columns as column}
		{@const cards = data.cards.filter((card) => card.column === column.id)}
		<li
			use:dropzone={{
				on_dropzone(card_id) {
					const card = data.cards.find((card) => card.id === card_id);
					if (card) {
						card.column = column.id;
						data = data;
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
