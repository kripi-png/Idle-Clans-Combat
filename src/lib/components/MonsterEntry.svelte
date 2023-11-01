<script lang="ts">
	import userStats, {
		calculateUserAugmentedAccuracy,
		calculateUserAugmentedDefence
	} from '$lib/userStats';
	export let monster: Monster;

	// stat is accuracy or defence value; level is the actual level
	// e.g. player can have level 90 attack and 100 melee accuracy
	const calculateAugmentedStat = (stat: number, level: number) => {
		return Math.floor(((stat + 64) * (level + 8)) / 10);
	};

	// userStats.selectedAttackStyle
	const monsterAugmentedDefence = calculateAugmentedStat(
		// use defence against player's attack style
		(monster.combat_stats as any)[$userStats.selectedAttackStyle].defence,
		monster.skill_levels.defence
	);
	const monsterAugmentedAccuracy = calculateAugmentedStat(
		(monster.combat_stats as any)[monster.attack_style ? monster.attack_style : "melee"].accuracy,
		monster.skill_levels.rigour
	);

	$: playerAugmentedAccuracy = calculateUserAugmentedAccuracy($userStats);
	$: playerAugmentedDefence = calculateUserAugmentedDefence(monster.attack_style, $userStats);

	let playerHitChance = 0;
	$: {
		if (playerAugmentedAccuracy < monsterAugmentedDefence) {
			playerHitChance = (playerAugmentedAccuracy - 1) / (2 * monsterAugmentedDefence);
		} else {
			playerHitChance = 1 - (monsterAugmentedDefence + 1) / (2 * playerAugmentedAccuracy);
		}
	}

	let monsterHitChance = 0;
	$: {
		if (monsterAugmentedAccuracy < playerAugmentedDefence) {
			monsterHitChance = (monsterAugmentedAccuracy - 1) / (2 * playerAugmentedDefence);
		} else {
			monsterHitChance = 1 - (playerAugmentedDefence + 1) / (2 * monsterAugmentedAccuracy);
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
	<td>{(monsterHitChance * 100).toFixed(1)}</td>
</tr>
