// stat is accuracy or defence value; level is the actual level
// e.g. player can have level 90 attack and 100 melee accuracy
export const calculateAugmentedStat = (stat: number, level: number) => {
	return Math.trunc(((stat + 64) * (level + 8)) / 10);
};

export const calculateHitChance = (
	attackerAccuracy: number,
	defenderDefence: number,
	applyBoostFromAttackStyle: boolean,
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
	return hitChance;
};

export const calculateMaxDamagePerHit = (stat: number, level: number) => {
	// formula is from wiki (2.11.2023) https://wiki.idleclans.com/index.php/Combat
	// >>> Max Hit is calculated as (stat/8 + level + 13 + stat*level/64) / 10.
	// >>> So if a player has 96 melee strength and level 90 Strength;
	// >>> they will have a max hit of (96/8 + 90 + 13 + 96*90/64) / 10 = 25
	// max hit is also calculated before other bonuses such as potions and enchantments
	const maxHit = (stat / 8 + level + 13 + (stat * level) / 64) / 10;
	return [Math.trunc(maxHit), maxHit] as const;
};

export const calculateAverageDamagePerSecond = (
	maxHit: number,
	hitChance: number,
	interval: number,
): number => {
	const averageHit = (maxHit / 2) * hitChance;
	const averageDPS = (averageHit / interval) * 1000;
	return averageDPS;
};

export const applyDamageBonusFromEquipment = (
	playerBaseMaxHit: number,
	playerStats: MinifiedUserStats,
	monster: MonsterData,
): number => {
	const isUsingCorrectStyle =
		playerStats.damageType === monster.attack_style_weakness;
	const bonusFromEnemyWeakness = isUsingCorrectStyle ? 0.2 : 0;

	const playerMaxHit = playerBaseMaxHit * (1 + bonusFromEnemyWeakness);
	return Math.trunc(playerMaxHit);
};
