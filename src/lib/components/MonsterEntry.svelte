<script lang="ts">
	import { userStats } from '$lib/userStats';
	export let monster: Monster;

	// stat is accuracy or defence value; level is the actual level
	// e.g. player can have level 90 attack and 100 melee accuracy
	const calculateAugmentedStat = (stat: number, level: number) => {
		console.log({stat, level});

		return Math.floor(((stat + 64) * (level + 8)) / 10);
	};

	// userStats.selectedAttackStyle
	const monsterAugmentedDefence = calculateAugmentedStat(
		monster.combat_stats.melee.defence,
		monster.skill_levels.defence
	);

	const userAttackStyle = $userStats.selectedAttackStyle
	const userAccuracy = $userStats[userAttackStyle].accuracy;
	const isMeleeUser = userAttackStyle === 'melee';
	const userAttackStyleLevel = $userStats.skills[isMeleeUser ? "attack" : userAttackStyle]

	const playerAugmentedAccuracy = calculateAugmentedStat(
		userAccuracy,
		userAttackStyleLevel
	);

	let playerHitChance = 0;
	if (playerAugmentedAccuracy < monsterAugmentedDefence) {
		playerHitChance = (playerAugmentedAccuracy - 1) / (2 * monsterAugmentedDefence)
	} else {
		playerHitChance = 1 - (monsterAugmentedDefence + 1) / (2 * playerAugmentedAccuracy)
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
	<td>{playerHitChance*100}</td>
	<td>monster chance</td>
</tr>
