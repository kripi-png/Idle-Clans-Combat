<!-- <script lang="ts">
	import userStats from '$lib/userStats';
	import {
		calculateAugmentedStat,
		calculateHitChance,
		calculateMaxDamagePerHit
	} from '$lib/functions';

	export let monsterData: MonsterData;
	export let playerAccuracyAugmented: number;
	export let playerDefenceAugmented: number;
	export let playerMaxHit: number;

	const monster: Monster = {
		...monsterData,
		maxHit: 0,
		hitChance: 0,
		chanceToGetHit: 0,
		averageDamagePerHit: 0
	};

	const skilllevels = monster.skill_levels;
	const combatStats = monster.combat_stats;
	const attackStyle = (monster.attack_style ?? 'melee') as AttackStyles;

	const accuracyForAttackStyle = combatStats[attackStyle].accuracy;
	const strengthForAttackStyle = combatStats[attackStyle].strength;
	// use defence against player's attack style
	const defenceAgainstPlayer = combatStats[$userStats.selectedAttackStyle].defence;

	const augmentedAccuracy = calculateAugmentedStat(
		accuracyForAttackStyle,
		monster.skill_levels.rigour
	);

	const augmentedDefence = calculateAugmentedStat(
		defenceAgainstPlayer,
		monster.skill_levels.defence
	);
	// skill of which level is used to calculate max hit (e.g. strength for melee)
	const skillForAttackStyle = attackStyle === 'melee' ? 'strength' : attackStyle;
	const skillLevelForAttackStyle = (monster.skill_levels as { [key: string]: number })[
		skillForAttackStyle
	];
	$: monster.maxHit = calculateMaxDamagePerHit(strengthForAttackStyle, skillLevelForAttackStyle);

	// it seems to value has to be set to a monster as otherwise it is tied to the row itself
	// which means it won't change when user searches for monster
	// so e.g. first row monster always has Turkey's hit chances and so on
	$: monster.hitChance = calculateHitChance(augmentedAccuracy, playerDefenceAugmented);
	// player's hit chance chance
	$: monster.chanceToGetHit = calculateHitChance(playerAccuracyAugmented, augmentedDefence);
	$: monster.averageDamagePerHit = (monster.maxHit / 2) * monster.hitChance;
	$: playerAverageDamagePerHit = (playerMaxHit / 2) * monster.chanceToGetHit;

	let isDetailed = false;
</script>

<tr
	on:click={() => {
		isDetailed = !isDetailed;
	}}
>
	<td
		class:green={playerAverageDamagePerHit >= monster.health / 2}
		class:red={monster.maxHit >= $userStats.skills.health}>{monster.name}</td
	>
	<td>{monster.combat_level}</td>
	<td>{monster.health}</td>
	--------
	<td>{(monster.chanceToGetHit * 100).toFixed(1)}</td>
	<td>{playerAverageDamagePerHit.toFixed(1)} ({playerMaxHit})</td>
	--------
	<td>{(monster.hitChance * 100).toFixed(1)}</td>
	<td>{monster.averageDamagePerHit.toFixed(1)} ({monster.maxHit.toFixed(1)})</td>
</tr>
{#if isDetailed}
	<ul>
		<li>Attack Interval: {monster.attack_interval}</li>
		<li>Attack Style: {monster.attack_style}</li>
		<li>Attack Style Weakness: {monster.attack_style_weakness}</li>
	</ul>
{/if}

<style>
	.green {
		color: green;
		font-weight: bold;
	}

	.red {
		color: red;
		font-weight: bold;
	}
</style> -->
