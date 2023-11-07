<script lang="ts">
	import userStats from '$lib/userStats';

	const damageTypes: DamageTypes[] = [
		'crush',
		'pound',
		'stab',
		'slash',
		'archery',
		'magic',
	];
	const styleNames = ['melee', 'archery', 'magic'];
	const styleStats: StatNames[] = ['strength', 'accuracy', 'defence'];
	const skillNames: SkillNames[] = [
		'attack',
		'strength',
		'defence',
		'health',
		'archery',
		"magic",
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
</div>

<div class="flexRow gap-2" role="radiogroup">
	{#each damageTypes as type}
		<label class="capitalize">
			{type}
			<input
				type="radio"
				value={type}
				bind:group={$userStats.selectedDamageType}
			/>
		</label>
	{/each}
</div>

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
