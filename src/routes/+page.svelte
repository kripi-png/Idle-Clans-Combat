<script lang="ts">
	import type { ColumnDefinition } from 'tabulator-tables';
	import {
		calculateAugmentedStat,
		calculateMaxDamagePerHit,
	} from '$lib/functions';
	import MonsterTable from '$lib/components/MonsterTable.svelte';
	import UserStats from '$lib/components/UserStats.svelte';
	import monsterData from '$lib/monsters.json';

	import userStats, { getStatsForSelectedAttackStyle } from '$lib/userStats';

	// get attack style specific stats
	$: playerStats = getStatsForSelectedAttackStyle($userStats);
	$: playerMaxHit = calculateMaxDamagePerHit(
		playerStats.strength,
		playerStats.strengthLevel,
	);

	const percentageize = (value: number): string => {
		// convert decimal to string with %-character
		// e.g. 0.9 -> 90%
		return (value * 100).toFixed(1) + '%';
	};

	const stylizeAttackStyle = (value: string): string => {
		if (!value) return '-';
		return value;
	};

	const columns: ColumnDefinition[] = [
		{ title: 'Name', field: 'name' },
		{ title: 'Combat Level', field: 'combatLevel' },
		{
			title: 'Attack Style',
			field: 'monsterAttackStyle',
			mutator: stylizeAttackStyle,
		},
		{
			title: 'Weakness',
			field: 'monsterWeakness',
			mutator: stylizeAttackStyle,
		},
		{ title: 'Health', field: 'health' },
		{
			title: 'Player hit %',
			field: 'playerHitPercent',
			mutator: percentageize,
			sorter: 'number',
		},
		{
			title: 'Monster hit %',
			field: 'monsterHitPercent',
			mutator: percentageize,
			sorter: 'number',
		},
		{
			title: 'Monster max hit',
			field: 'monsterMaxHit',
			mutator: (value) => value.toFixed(1),
		},
	];
</script>

<UserStats />

<div>
	<p class="warning">
		NOTE: Do not blindly trust these values. They are probably not 100% accurate
		(as of yet), consider them something of approximation.
	</p>
	<!-- <p class="note">
		Green name indicates <b>two</b>-hit-kill (or better)
		on avg. Red name means possibility to get one-hit by the monster.
	</p> -->
	<h3>Player max hit: {playerMaxHit.toFixed(1)}</h3>
	<MonsterTable data={monsterData.monsters} {columns} />
</div>

<style>
	.warning {
		color: red;
	}
</style>
