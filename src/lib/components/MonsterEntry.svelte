<script lang="ts">
	import userStats, { calculateUserAugmentedAccuracy } from '$lib/userStats';
	export let monster: Monster;

	// stat is accuracy or defence value; level is the actual level
	// e.g. player can have level 90 attack and 100 melee accuracy
	const calculateAugmentedStat = (stat: number, level: number) => {
		return Math.floor(((stat + 64) * (level + 8)) / 10);
	};

	// userStats.selectedAttackStyle
	const monsterAugmentedDefence = calculateAugmentedStat(
		monster.combat_stats.melee.defence,
		monster.skill_levels.defence
	);

	$: playerAugmentedAccuracy = calculateUserAugmentedAccuracy($userStats);

	let playerHitChance = 0;
	$: {
		if (playerAugmentedAccuracy < monsterAugmentedDefence) {
			playerHitChance = (playerAugmentedAccuracy - 1) / (2 * monsterAugmentedDefence);
		} else {
			playerHitChance = 1 - (monsterAugmentedDefence + 1) / (2 * playerAugmentedAccuracy);
		}
	}
</script>

<tr>
	<td>{monster.name}</td>
	<td>{monster.combat_level}</td>
	<td>{monster.health}</td>
	<td>{monster.attack_interval}</td>
	<td>{monster.attack_style}</td>
	<td>{monster.attack_style_weakness}</td>
	--------
	<td>{(playerHitChance * 100).toFixed(1)}</td>
	<td>monster chance</td>
</tr>
