<script lang="ts">
	// Component-level comments
	// TODO: Describe the component.

	// Import statements
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { momSchema } from '$lib/schemas';
	import NavigationBar from '../../components/atoms/NavigationBar.svelte';

	// Libraries
	// Components
	// Types
	// Stores
	// Transitions

	// Props
	export let data: PageData;

	const { form, message, enhance, errors, validate } = superForm(data.form, {
		resetForm: true,
		validators: momSchema
		// Note: attempt to validate manually especially for the avatar aka file but it is not working yet
		// validators: {
		// 	dateOfRegistry: (value) => (value.length < 1 ? 'Date of Registry is required' : null),
		// 	firstName: (value) => (value.length < 1 ? 'First Name is required' : null),
		// 	lastName: (value) => (value.length < 1 ? 'Last Name is required' : null),
		// 	age: (value) => (value.toString().length < 1 ? 'Age is required' : null),
		// 	phoneNumber: (value) => (value.toString.length < 1 ? 'Phone Number is required' : null),
		// 	email: (value) => (value.length < 1 ? 'Email is required' : null),
		// 	area: (value) => (value.length < 1 ? 'Area is required' : null),
		// 	occupation: (value) => (value == null ? 'Occupation is required' : null),
		// 	pregnant: (value) => (value == null ? 'Pregnant is required' : null),
		// 	avatar: (value) => (value == null ? 'Avatar is required' : null)
		// },
	});

	// Classes and Interfaces
	// TODO: Define Classes and Interfaces.

	// Local variables
	let file: FileList;
	let image: HTMLImageElement;
	let showImage: boolean = false;

	// Reactive declarations
	// TODO: Define other reactive variables.

	// Helper Functions
	const onChangeHandler = (e: Event): void => {
		const target = e.target as HTMLInputElement;
		if (!target.files) return;
		const selectedFile = target.files[0];

		if (selectedFile) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', (e) => {
				image.setAttribute('src', reader.result as string);
			});
			reader.readAsDataURL(selectedFile);

			// Note: attempt to validate manually especially for the avatar aka file but it is not working yet
			// form.update(($form) => {
			// 	$form.avatar = true;
			// 	return $form;
			// });
			// validate('avatar', {
			// 	value: true
			// });

			return;
		}
		showImage = false;
	};

	// Lifecycle functions
	onMount(() => {
		// TODO: Add logic for when the component is mounted.
	});

	// Subscriptions
</script>

<!-- JSX/HTML markup -->

{#if $message}
	<div class="fixed top-0 left-0 w-full p-4 z-10">
		<aside class="alert variant-ghost-primary" transition:fade|local={{ duration: 200 }}>
			<div class="alert-message flex items-center justify-between w-full">
				<h3 class="h3">
					{$message}
				</h3>
				<button class="btn variant-filled-surface !m-0" on:click={() => ($message = null)}>
					Dismiss
				</button>
			</div>
		</aside>
	</div>
{/if}

<NavigationBar />
<div class="card-container">
	<div class="card">
		<header class="card-header">Mom Information</header>
		<hr class="mt-8" />
		<div class="card-content p-4">
			<form class="form" method="POST" enctype="multipart/form-data" use:enhance action="?/create">
				<label class="label">
					<span>Date of Registry * </span>
					<input
						class="input"
						type="date"
						name="dateOfRegistry"
						bind:value={$form.dateOfRegistry}
					/>
					<span class="input-helper"
						>{#if $errors.dateOfRegistry}
							{$errors.dateOfRegistry}
						{/if}</span
					>
				</label>
				<div class="grid sm:grid-cols-2 gap-4">
					<label class="label">
						<span>First Name</span>
						<input class="input" type="text" name="firstName" bind:value={$form.firstName} />
						<span class="input-helper"
							>{#if $errors.firstName}
								{$errors.firstName}
							{/if}</span
						>
					</label>
					<label class="label">
						<span>Last Name</span>
						<input class="input" type="text" name="lastName" bind:value={$form.lastName} />
						<span class="input-helper"
							>{#if $errors.lastName}
								{$errors.lastName}
							{/if}</span
						>
					</label>
					<label class="label">
						<span>Age (years) *</span>
						<input class="input" type="number" name="age" bind:value={$form.age} />
						<span class="input-helper"
							>{#if $errors.age}
								{$errors.age}
							{/if}</span
						>
					</label>
					<label class="label">
						<span>Phone Number</span>
						<input class="input" type="number" name="phoneNumber" bind:value={$form.phoneNumber} />
						<span class="input-helper"
							>{#if $errors.phoneNumber}
								{$errors.phoneNumber}
							{/if}</span
						>
					</label>
					<label class="label">
						<span>Email</span>
						<input class="input" type="email" name="email" bind:value={$form.email} />
						<span class="input-helper"
							>{#if $errors.email}
								{$errors.email}
							{/if}</span
						>
					</label>
					<label class="label">
						<span>Area</span>
						<input class="input" type="text" name="area" bind:value={$form.area} />
						<span class="input-helper"
							>{#if $errors.area}
								{$errors.area}
							{/if}</span
						>
					</label>
					<label class="label">
						<span>Occupation</span>
						<select class="input" name="occupation" bind:value={$form.occupation}>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</select>
						<span class="input-helper"
							>{#if $errors.occupation}
								{$errors.occupation}
							{/if}</span
						>
					</label>
				</div>
				<label class="label">
					<span>Pregnant?</span>
					<select class="input" name="pregnant" bind:value={$form.pregnant}>
						<option value={true}>Is pregnant</option>
						<option value={false}>Is not pregnant</option>
					</select>
					<span class="input-helper"
						>{#if $errors.pregnant}
							{$errors.pregnant}
						{/if}</span
					>
				</label>
				<div>
					<div class="mb-1">Avatar</div>

					{#if showImage}
						<img
							bind:this={image}
							src=""
							alt="Preview"
							class="h-auto max-w-full rounded-lg mb-4 mt-2"
						/>
					{/if}

					<FileDropzone on:change={onChangeHandler} name="avatar" bind:file />
					<!-- <span class="input-helper"
						>{#if $errors.avatar}
							{$errors.avatar}
						{/if}</span
					> -->
				</div>
				<button type="submit" class="btn variant-filled">Submit</button>
				<!-- <button type="submit" class="btn variant-filled" disabled={image == null}>Submit</button> -->
			</form>
		</div>
	</div>
</div>

<div class="p-4">
	<SuperDebug data={$form} />
</div>

<!-- SCSS/Styles -->
<style lang="css" scoped>
	.card-container {
		margin-top: 3%;
		margin-bottom: 5%;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.card {
		height: fit-content;
		padding: 16px;
		width: 100%;
		max-width: 600px;

		border-radius: 10px;
	}
	.card-header {
		height: 5%;
		font-size: 30px;
		text-align: center;
		color: white;
	}
	.card-content {
		height: 95%;
	}
	.form {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.label {
		height: 90px;
		width: 100%;
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

	.btn {
		margin-top: 3%;
		/* height: 50px; */
		/* width: 20%; */
	}
</style>
