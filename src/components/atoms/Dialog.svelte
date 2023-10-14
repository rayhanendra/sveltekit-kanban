<script lang="ts">
	export let dialog: HTMLDialogElement;

	const handleClose = () => {
		dialog.close();
	};
</script>

<dialog
	bind:this={dialog}
	on:close
	class="relative w-full max-w-[400px] h-3/5 bg-slate-800 shadow-xl rounded-md px-1"
>
	<div class="flex items-center justify-end p-3">
		<button
			class="btn-icon btn-icon-sm variant-filled-error
        "
			on:click={handleClose}
		>
			x
		</button>
	</div>
	<slot />
</dialog>
