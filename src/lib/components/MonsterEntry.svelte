<script lang="ts">
	import { userStats } from '$lib/userStats';
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

	$: playerAttackStyle = $userStats.selectedAttackStyle;
	$: isUserUsingMelee = playerAttackStyle === 'melee';
	$: playerAccuracy = $userStats[playerAttackStyle]?.accuracy;
	$: playerSkillLevel = $userStats.skills[isUserUsingMelee ? 'attack' : playerAttackStyle];
	//
	$: playerAugmentedAccuracy = calculateAugmentedStat(playerAccuracy, playerSkillLevel);
	//
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
	<td>{playerHitChance * 100}</td>
	<td>monster chance</td>
</tr>
