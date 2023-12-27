<script lang="ts">
	import userStats from '$lib/userStats';
	import WeaponSelection from './WeaponSelection.svelte';

	const styleNames = ['melee', 'archery', 'magic'];
	const styleStats: StatNames[] = ['strength', 'accuracy', 'defence'];
	const skillNames: SkillNames[] = [
		'attack',
		'strength',
		'defence',
		'health',
		'archery',
		'magic',
	];

	const potions = [
		'POT_OF_SWIFTNESS',
		'POT_OF_RESURRECTION',
		'POT_OF_PURE_POWER',
		'POT_OF_GREAT_SIGHT',
		// 'POT_OF_DARK_MAGIC',
		// 'POTION_OF_ANCIENT_KNOWLEDGE',
	];
</script>

User Stats
<div class="flexRow gap-2">
	<div class="flexRow gap-2">
		{#each styleNames as style}
			<div class="flexCol gap-1">
				<h2 class="capitalize">{style}</h2>
				{#each styleStats as stat}
					<label class="capitalize">
						{stat}
						<input type="number" bind:value={$userStats[style][stat]} />
					</label>
				{/each}
			</div>
		{/each}
	</div>

	<div class="flexCol gap-1">
		<h2>Skill Levels</h2>
		{#each skillNames as skill}
			<label class="capitalize">
				{skill}
				<input
					type="number"
					min="1"
					max="120"
					bind:value={$userStats.skills[skill]}
				/>
			</label>
		{/each}
	</div>

	<div class="flexCol gap-1">
		<h2>Potions</h2>
		{#each potions as potion}
			<label class="capitalize">
				{potion.split('_').join(' ').toLowerCase()}
				<input value={potion} type="checkbox" bind:group={$userStats.potions} />
			</label>
		{/each}
	</div>
</div>

<WeaponSelection />

<style>
	h2 {
		margin: 0;
		padding: 0;
	}

	label input {
		display: block;
	}

	.gap-1 {
		gap: 0.5em;
	}

	.gap-2 {
		gap: 1em;
	}

	.flexRow {
		display: flex;
		flex-direction: row;
	}

	.flexCol {
		display: flex;
		flex-direction: column;
	}

	.capitalize {
		text-transform: capitalize;
	}
</style>
