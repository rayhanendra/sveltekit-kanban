<script lang="ts">
	export let dialog: HTMLDialogElement;

	const handleClose = () => {
		dialog.close();
	};
</script>

<dialog
	bind:this={dialog}
	on:close
	class="tw-relative tw-w-full tw-max-w-[400px] tw-h-3/5 tw-bg-slate-800 tw-shadow-xl tw-rounded-md tw-px-1"
>
	<div class="tw-flex tw-items-center tw-justify-end">
		<button
			class="tw-m-2 tw-px-2 tw-bg-red-500 tw-text-white tw-rounded-md tw-text-xl
        "
			on:click={handleClose}
		>
			x
		</button>
	</div>
	<slot />
</dialog>
