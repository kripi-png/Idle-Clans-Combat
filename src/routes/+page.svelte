<script lang="ts">
	import { calculateAugmentedStat, calculateMaxDamagePerHit } from '$lib/functions';
	import MonsterEntry from '$lib/components/MonsterEntry.svelte';
	import UserStats from '$lib/components/UserStats.svelte';
	import monsterData from '$lib/monsters.json';

	import userStats, { getStatsForSelectedAttackStyle } from '$lib/userStats';

	const monsters: MonsterData[] = monsterData.monsters;
	// get attack style specific stats
	$: playerStats = getStatsForSelectedAttackStyle($userStats);
	$: playerMaxHit = calculateMaxDamagePerHit(playerStats.strength, playerStats.strengthLevel);
</script>

<UserStats />

<div class="monsterTable">
	<p class="warning">
		NOTE: Do not blindly trust these values. They are probably not 100% accurate (as of yet),
		consider them something of approximation.
	</p>
	<p class="note">
		Click on a monster to display more details. Green name indicates <b>two</b>-hit-kill on avg. Red
		name means possibility to get one-hit by the monster.
	</p>
	<h3>Player max hit: {playerMaxHit.toFixed(1)}</h3>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Combat Level</th>
				<th>Health</th>
				--------
				<th>Player hit%</th>
				<th>Avg. dmg / hit (max hit)</th>
				--------
				<th>Monster hit%</th>
				<th>Avg. dmg / hit (max Hit)</th>
			</tr>
		</thead>
		<tbody>
			{#each monsters as monster}
				{@const playerAccuracyAugmented = calculateAugmentedStat(
					playerStats.accuracy,
					playerStats.attackLevel
				)}
				{@const playerDefenceAugmented = calculateAugmentedStat(
					$userStats[monster.attack_style ?? 'melee'].defence,
					playerStats.defenceLevel
				)}
				<MonsterEntry
					monsterData={monster}
					{playerAccuracyAugmented}
					{playerDefenceAugmented}
					{playerMaxHit}
				/>
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
