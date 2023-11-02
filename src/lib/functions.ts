// stat is accuracy or defence value; level is the actual level
// e.g. player can have level 90 attack and 100 melee accuracy
export const calculateAugmentedStat = (stat: number, level: number) => {
	return Math.floor(((stat + 64) * (level + 8)) / 10);
};

export const calculateHitChance = (attackerAccuracy: number, defenderDefence: number): number => {
	// hit chance is calculated differently depending on which value is higher
	let hitChance =
		attackerAccuracy < defenderDefence
			? (attackerAccuracy - 1) / (2 * defenderDefence)
			: 1 - (defenderDefence + 1) / (2 * attackerAccuracy);
	return hitChance;
};
