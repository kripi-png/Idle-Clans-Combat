<script lang="ts">
	import userStats from '$lib/userStats';
	import { calculateAugmentedStat, calculateHitChance } from '$lib/functions';

	export let monster: Monster;
	export let playerAccuracyAugmented: number;
	export let playerDefenceAugmented: number;

	const combatStats = monster.combat_stats as { [key: string]: { [key: string]: number } };
	const attackStyle = monster.attack_style === null ? 'melee' : monster.attack_style;
	const accuracyForAttackStyle = combatStats[attackStyle].accuracy;
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

	// it seems to value has to be set to a monster as otherwise it is tied to the row itself
	// which means it won't change when user searches for monster
	// so e.g. first row monster always has Turkey's hit chances and so on
	$: monster.hitChance = calculateHitChance(augmentedAccuracy, playerDefenceAugmented);
	$: monster.chanceToGetHit = calculateHitChance(playerAccuracyAugmented, augmentedDefence);
</script>

<tr>
	<td>{monster.name}</td>
	<td>{monster.combat_level}</td>
	<td>{monster.health}</td>
	<td>{monster.attack_interval}</td>
	<td>{monster.attack_style}</td>
	<td>{monster.attack_style_weakness}</td>
	--------
	<td>{((monster.chanceToGetHit || 0) * 100).toFixed(1)}</td>
	<td>{((monster.hitChance || 0) * 100).toFixed(1)}</td>
</tr>
