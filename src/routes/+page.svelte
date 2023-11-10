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
	$: playerBaseMaxHit = calculateMaxDamagePerHit(
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

	const addIconIfMatching = (value: string): string => {
		// return playerStats.damageType
		if (value === playerStats.damageType) return value + '✔️';
		return value;
	};

	const addHealthIcon = (value: number | string): string => {
		return value + '❤️';
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
			mutator: (value) => addIconIfMatching(stylizeAttackStyle(value)),
		},
		{
			title: 'Health',
			field: 'health',
			mutator: addHealthIcon,
			sorter: 'number',
		},
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
			mutator: (value) => addHealthIcon(Math.trunc(value)),
			sorter: 'number',
		},
		{
			title: 'Monster avg. hit',
			field: 'monsterAverageHit',
			mutator: (value) => addHealthIcon(value?.toFixed(1)),
			sorter: 'number',
		},
		{
			title: 'Player avg. hit',
			field: 'playerAverageHit',
			mutator: (value) => addHealthIcon(value?.toFixed(1)),
			sorter: 'number',
		},
		{
			title: 'Player avg. DPS',
			field: 'playerAverageDamagePerSecond',
			mutator: (value) => addHealthIcon(value?.toFixed(1)),
			sorter: 'number',
		},
	];
</script>

<UserStats />

<div>
	<p class="warning">
		NOTE: Do not blindly trust these values. They are probably not 100% accurate
		(as of yet), consider them something of approximation.
	</p>
	<h3>
		Player max hit: {addHealthIcon(Math.trunc(playerGeneralMaxHit))}
		(exact value: {playerGeneralMaxHit.toFixed(2)})
	</h3>
	<MonsterTable data={monsterData.monsters} {columns} {playerBaseMaxHit} />
</div>

<style>
	.warning {
		color: red;
	}
</style>
