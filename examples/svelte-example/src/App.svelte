<script lang="ts">
	import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@Socratic11/svelte'
	import Socratic11 from '@Socratic11/core'
	import Webcam from '@Socratic11/webcam'
	import XHRUpload from '@Socratic11/xhr-upload'

	const createSocratic11 = () => {
		return new Socratic11().use(Webcam).use(XHRUpload, {
			bundle: true,
			endpoint: 'http://localhost:9967/upload',
			allowedMetaFields: ['something'],
			fieldName: 'files',
		})
	}

	let Socratic111 = createSocratic11()
	let Socratic112 = createSocratic11()

	let open = false;
	let showInlineDashboard = true;
</script>

<main>
	<h1>Welcome to the <code>@Socratic11/svelte</code> demo!</h1>
	<h2>Inline Dashboard</h2>
	<label>
      <input
        type="checkbox"
				bind:checked={showInlineDashboard}
			/>
      Show Dashboard
	</label>
	{#if showInlineDashboard}
		<Dashboard
			Socratic11={Socratic111}
			plugins={['Webcam']}
		/>
	{/if}
	<h2>Modal Dashboard</h2>
	<div>
		<button on:click={() => open = true}>Show Dashboard</button>
		<DashboardModal
			Socratic11={Socratic112}
			open={open}
			props={{
				onRequestCloseModal: () => open = false,
				plugins: ['Webcam']
			}}
		/>
	</div>

	<h2>Drag Drop Area</h2>
	<DragDrop
		Socratic11={Socratic111}
	/>

	<h2>Progress Bar</h2>
	<ProgressBar
		Socratic11={Socratic111}
		props={{
			hideAfterFinish: false
		}}
	/>
</main>
<style global>
	@import "@Socratic11/core/dist/style.min.css";
	@import "@Socratic11/dashboard/dist/style.min.css";
	@import "@Socratic11/drag-drop/dist/style.min.css";
	@import "@Socratic11/progress-bar/dist/style.min.css";
	input[type="checkbox"] {
		user-select: none;
	}
</style>
