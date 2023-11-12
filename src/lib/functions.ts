// stat is accuracy or defence value; level is the actual level
// e.g. player can have level 90 attack and 100 melee accuracy
// result is also always truncated
export const calculateAugmentedStat = (stat: number, level: number) => {
	return Math.trunc(((stat + 64) * (level + 8)) / 10);
};

export const calculateHitChance = (
	attackerAccuracy: number,
	defenderDefence: number,
	applyBoostFromAttackStyle: boolean,
	playerStats?: MinifiedUserStats,
): number => {
	if (applyBoostFromAttackStyle) {
		// lower defence by 20% if attacker is using attack style the defender is weak to
		// for example, vampires are weak to slash, so if player is using scimitar (slash damage),
		// reduce the vampire's defence by 20%
		defenderDefence = defenderDefence * 0.8;
	}
	// hit chance is calculated differently depending on which value is higher
	let hitChance =
		attackerAccuracy < defenderDefence
			? (attackerAccuracy - 1) / (2 * defenderDefence)
			: 1 - (defenderDefence + 1) / (2 * attackerAccuracy);

	// apply bonuses
	if (playerStats) {
		const accuracyBonusFromPotions =
			calculateBonusesFromPotions(playerStats).accuracy;
		hitChance = hitChance * (1 + accuracyBonusFromPotions);
	}
	// cap out at 100%
	if (hitChance >= 1) return 1;
	return hitChance;
};

export const calculateMaxDamagePerHit = (stat: number, level: number) => {
	// formula is from wiki (2.11.2023) https://wiki.idleclans.com/index.php/Combat
	// >>> Max Hit is calculated as (stat/8 + level + 13 + stat*level/64) / 10.
	// >>> So if a player has 96 melee strength and level 90 Strength;
	// >>> they will have a max hit of (96/8 + 90 + 13 + 96*90/64) / 10 = 25
	// max hit is also calculated before other bonuses such as potions and enchantments
	return (stat / 8 + level + 13 + (stat * level) / 64) / 10;
};

export const calculateAverageDamagePerSecond = (
	maxHit: number,
	hitChance: number,
	interval: number,
	playerStats?: MinifiedUserStats,
): number => {
	if (playerStats && playerStats.potions.includes('POT_OF_SWIFTNESS')) {
		// 10% bonus if player is using swiftness
		interval = interval * 0.9;
	}
	const averageHit = (maxHit / 2) * hitChance;
	const averageDPS = (averageHit / interval) * 1000;
	return averageDPS;
};

export const calculateBonusesFromPotions = (
	playerStats: MinifiedUserStats,
): Record<string, number> => {
	const { isMelee, potions: activePotions } = playerStats;
	if (isMelee && activePotions.includes('POT_OF_PURE_POWER')) {
		return { damage: 0.2, accuracy: 0.2 };
	} else if (
		playerStats.damageType === 'archery' &&
		activePotions.includes('POT_OF_GREAT_SIGHT')
	) {
		return { damage: 0.1, accuracy: 0.1 };
	} else if (
		playerStats.damageType === 'magic' &&
		activePotions.includes('POT_OF_DARK_MAGIC')
	) {
		console.error('Potion of Dark Magic is not implemented yet.');
		return { damage: 0, accuracy: 0 };
	}

	return { damage: 0, accuracy: 0 };
};

export const applyDamageBonusFromEquipment = (
	playerBaseMaxHit: number,
	playerStats: MinifiedUserStats,
	monster: MonsterData,
): number => {
	const isUsingCorrectStyle =
		playerStats.damageType === monster.attack_style_weakness;
	const bonusFromEnemyWeakness = isUsingCorrectStyle ? 0.2 : 0;
	const bonusFromPotions = calculateBonusesFromPotions(playerStats).damage;

	return playerBaseMaxHit * (1 + bonusFromEnemyWeakness + bonusFromPotions);
};

export const calculateKillsPerHour = (
	averageDPS: number,
	activePotions: string[],
	monster: MonsterData,
	includeRespawnTime: boolean = true,
): number => {
	const isUsingResurrectionPotion = activePotions.includes(
		'POT_OF_RESURRECTION',
	);

	let respawnTime = monster.respawn_interval || 1500;
	// reduce timer by 40%
	if (isUsingResurrectionPotion) respawnTime = respawnTime * 0.6;

	let secondsPerKill = monster.health / averageDPS;
	if (includeRespawnTime) {
		secondsPerKill = secondsPerKill + respawnTime / 1000;
	}
	// return kills per hour
	return (60 / secondsPerKill) * 60;
};
