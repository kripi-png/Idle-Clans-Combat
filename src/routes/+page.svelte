<script lang="ts">
	import { calculateAugmentedStat, calculateMaxDamagePerHit } from '$lib/functions';
	import MonsterEntry from '$lib/components/MonsterEntry.svelte';
	import UserStats from '$lib/components/UserStats.svelte';
	import monsterData from '$lib/monsters.json';

	import userStats, { getStatsForSelectedAttackStyle } from '$lib/userStats';

	const monsters: Monster[] = monsterData.monsters;
	// get attack style specific stats
	$: playerStats = getStatsForSelectedAttackStyle($userStats);
	$: playerMaxHit = calculateMaxDamagePerHit(playerStats.strength, playerStats.strengthLevel);

	let searchQuery = '';
</script>

<UserStats />

<div class="monsterTable">
	<label>
		Search
		<input type="text" bind:value={searchQuery} />
	</label>
	<p class="warning">
		NOTE: Do not blindly trust these values. They are probably not 100% accurate (as of yet),
		consider them something of approximation.
	</p>
	<p class="note">Click on a monster to display more details</p>
	<h3>Player max hit: {playerMaxHit.toFixed(1)}</h3>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Combat Level</th>
				<th>Health</th>
				--------
				<th>Player Hit Chance</th>
				<th>Player Max Hit</th>
				--------
				<th>Monster Hit Chance</th>
				<th>Monster Max Hit</th>
			</tr>
		</thead>
		<tbody>
			{#each monsters.filter((monster) => monster.name
					.toLowerCase()
					.includes(searchQuery.toLowerCase())) as monster}
				{@const playerAccuracyAugmented = calculateAugmentedStat(
					playerStats.accuracy,
					playerStats.attackLevel
				)}
				{@const playerDefenceAugmented = calculateAugmentedStat(
					$userStats[monster.attack_style ?? 'melee'].defence,
					playerStats.defenceLevel
				)}
				<MonsterEntry {monster} {playerAccuracyAugmented} {playerDefenceAugmented} {playerMaxHit} />
			{/each}
		</tbody>
	</table>
</div>

<style>
	.warning {
		color: red;
	}
	.note {
		color: blue;
	}
	.monsterTable {
		margin-top: 2em;
	}
</style>
