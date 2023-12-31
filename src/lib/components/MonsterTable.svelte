<script lang="ts">
	import { TabulatorFull as Tabulator } from 'tabulator-tables';
	import type { ColumnDefinition } from 'tabulator-tables';
	import { onMount } from 'svelte';
	import {
		calculateHitChance,
		calculateMaxDamagePerHit,
		calculateAugmentedStat,
		calculateAverageDamagePerSecond,
		applyDamageBonusFromEquipment,
		calculateKillsPerHour,
	} from '$lib/functions';
	import userStats, { getStatsForSelectedAttackStyle } from '$lib/userStats';

	export let columns: ColumnDefinition[];
	export let data: MonsterData[];
	export let playerBaseMaxHit: number;

	// some of player's stats can be calculated without information on specific monster's stats
	$: playerStats = getStatsForSelectedAttackStyle($userStats);
	$: playerAccuracyAugmented = calculateAugmentedStat(
		playerStats.accuracy,
		playerStats.attackLevel,
	);

	const calculateMonsterEntry = (monster: MonsterData, index: number) => {
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
			playerStats,
		);
		// monsters do not gain the buff from correct style
		const monsterHitPercent = calculateHitChance(
			monsterAccuracyAugmented,
			playerDefenceAugmented,
			false,
		);
		const monsterMaxHit = calculateMaxDamagePerHit(
			monster.combat_stats[monsterAttackStyle].strength,
			monster.skill_levels[monsterStrengthSkill],
		);

		const playerAverageDamagePerSecond = calculateAverageDamagePerSecond(
			playerBaseMaxHit,
			playerHitPercent,
			playerStats.attackInterval,
			playerStats,
		);

		const playerMaxHit = applyDamageBonusFromEquipment(
			playerBaseMaxHit,
			playerStats,
			monster,
		);

		const averageKillsPerHour = calculateKillsPerHour(
			playerAverageDamagePerSecond,
			playerStats.potions,
			monster,
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
			averageKillsPerHour,
		};
	};

	// Tabulator watches for events such as .splice on the data array
	// so empty the list and set new data using the method
	// if (playerStats) is used to make the process reactive to that value also
	let monsterData: Record<string, any>[] = [];
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
