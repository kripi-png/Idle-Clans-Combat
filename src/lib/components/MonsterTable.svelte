<script lang="ts">
	import { TabulatorFull as Tabulator } from 'tabulator-tables';
	import type { ColumnDefinition } from 'tabulator-tables';
	import { onMount } from 'svelte';
	import {
		calculateHitChance,
		calculateMaxDamagePerHit,
		calculateAugmentedStat,
		calculateAverageDamagePerSecond,
	} from '$lib/functions';
	import userStats, { getStatsForSelectedAttackStyle } from '$lib/userStats';

	export let columns: ColumnDefinition[];
	export let data: MonsterData[];
	export let playerMaxHit: number;

	// some of player's stats can be calculated without information on specific monster's stats
	$: playerStats = getStatsForSelectedAttackStyle($userStats);
	$: playerAccuracyAugmented = calculateAugmentedStat(
		playerStats.accuracy,
		playerStats.attackLevel,
	);

	const calculateMonsterEntry = (
		monster: MonsterData,
		index: number,
	): Monster => {
		// default to melee
		const monsterAttackStyle = (monster.attack_style ??
			'melee') as AttackStyles;
		const monsterAttackSkill =
			monsterAttackStyle === 'melee' ? 'attack' : monsterAttackStyle;
		const monsterStrengthSkill =
			monsterAttackStyle === 'melee' ? 'strength' : monsterAttackStyle;

		// defence is dependant on monster
		const playerDefenceAugmented = calculateAugmentedStat(
			$userStats[monsterAttackStyle].defence,
			playerStats.defenceLevel,
		);

		const monsterAccuracyAugmented = calculateAugmentedStat(
			monster.combat_stats[monsterAttackStyle].accuracy,
			monster.skill_levels[monsterAttackSkill],
		);

		const monsterDefenceAugmented = calculateAugmentedStat(
			monster.combat_stats[playerStats.type as AttackStyles].defence,
			monster.skill_levels.defence,
		);

		const playerHitPercent = calculateHitChance(
			playerAccuracyAugmented,
			monsterDefenceAugmented,
			playerStats.damageType === monster.attack_style_weakness,
		);
		// monsters do not gain the buff from correct style
		const monsterHitPercent = calculateHitChance(
			monsterAccuracyAugmented,
			playerDefenceAugmented,
			false,
		);
		const [monsterMaxHit, _] = calculateMaxDamagePerHit(
			monster.combat_stats[monsterAttackStyle].strength,
			monster.skill_levels[monsterStrengthSkill],
		);

		const playerAverageDamagePerSecond = calculateAverageDamagePerSecond(
			playerMaxHit,
			playerHitPercent,
			playerStats.attackInterval,
		);

		// Monster
		return {
			id: index,
			name: monster.name,
			combatLevel: monster.combat_level,
			monsterAttackStyle: monsterAttackStyle,
			monsterWeakness: monster.attack_style_weakness,
			health: monster.health,
			playerHitPercent,
			monsterHitPercent,
			monsterMaxHit,
			playerAverageHit: (playerMaxHit / 2) * playerHitPercent,
			monsterAverageHit: (monsterMaxHit / 2) * monsterHitPercent,
			playerAverageDamagePerSecond,
		};
	};

	// Tabulator watches for events such as .splice on the data array
	// so empty the list and set new data using the method
	// if (playerStats) is used to make the process reactive to that value also
	let monsterData: Monster[] = [];
	$: if (playerStats)
		monsterData.splice(
			0,
			monsterData.length,
			...data.map(calculateMonsterEntry),
		);

	let tableComponent: HTMLDivElement;
	onMount(() => {
		new Tabulator(tableComponent, {
			reactiveData: true,
			data: monsterData,
			columns: columns,
		});
	});
</script>

<div bind:this={tableComponent} />

<svelte:head>
	<link
		href="https://unpkg.com/tabulator-tables@4.9.1/dist/css/tabulator.min.css"
		rel="stylesheet"
	/>
</svelte:head>
