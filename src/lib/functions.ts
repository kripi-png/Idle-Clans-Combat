// stat is accuracy or defence value; level is the actual level
// e.g. player can have level 90 attack and 100 melee accuracy
export const calculateAugmentedStat = (stat: number, level: number) => {
	return Math.trunc(((stat + 64) * (level + 8)) / 10);
};

export const calculateHitChance = (
	attackerAccuracy: number,
	defenderDefence: number,
): number => {
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

	return (stat / 8 + level + 13 + (stat * level) / 64) / 10;
};
