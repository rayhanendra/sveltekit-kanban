<script lang="ts">
	const navigations = [
		{
			name: 'Home',
			path: '/'
		},
		{
			name: 'Form',
			path: '/form'
		}
	];
</script>

<nav class="p-4 w-full bg-slate-800 text-white flex justify-between">
	<div class="">SvelteKit Kanban</div>

	<div class="flex gap-3">
		{#each navigations as navigation}
			<a href={navigation.path} class="btn variant-soft">{navigation.name}</a>
		{/each}
	</div>
</nav>
