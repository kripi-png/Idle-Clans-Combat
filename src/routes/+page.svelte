<script lang="ts">
	import MonsterEntry from '$lib/components/MonsterEntry.svelte';
	import UserStats from '$lib/components/UserStats.svelte';
	import monsterData from '$lib/monsters.json';

	import userStats, {
		calculateUserAugmentedAccuracy,
		calculateUserAugmentedDefence
	} from '$lib/userStats';

	const monsters: Monster[] = monsterData.monsters;

	let searchQuery = '';
</script>

<UserStats />

<div class="monsterTable">
	<label>
		Search
		<input type="text" bind:value={searchQuery} />
	</label>
	<br />
	<span class="warning"
		>NOTE: Do not blindly trust these values. They are probably not 100% accurate (as of yet),
		consider them something of approximation.</span
	>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Combat Level</th>
				<th>Health</th>
				<th>Attack Interval</th>
				<th>Attack Style</th>
				<th>Attack Style Weakness</th>
				--------
				<th>Player Hit Chance</th>
				<th>Monster Hit Chance</th>
			</tr>
		</thead>
		<tbody>
			{#each monsters.filter((monster) => monster.name
					.toLowerCase()
					.includes(searchQuery.toLowerCase())) as monster}
				{@const playerAccuracyAugmented = calculateUserAugmentedAccuracy($userStats)}
				{@const playerDefenceAugmented = calculateUserAugmentedDefence(
					monster.attack_style,
					$userStats
				)}
				<MonsterEntry {monster} {playerAccuracyAugmented} {playerDefenceAugmented} />
			{/each}
		</tbody>
	</table>
</div>

<style>
	.warning {
		color: red;
	}
	.monsterTable {
		margin-top: 2em;
	}
</style>
