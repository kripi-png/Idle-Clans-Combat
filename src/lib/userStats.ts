import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { calculateAugmentedStat } from './functions';

const DEFAULT_STATS: UserStats = {
	selectedDamageType: 'crush',
	attackInterval: 1000,
	skills: {
		attack: 1,
		strength: 1,
		defence: 1,
		health: 1,
		archery: 1,
		magic: 1,
	},
	// stats
	melee: {
		strength: 0,
		accuracy: 0,
		defence: 0,
	},
	archery: {
		strength: 0,
		accuracy: 0,
		defence: 0,
	},
	magic: {
		strength: 0,
		accuracy: 0,
		defence: 0,
	},
};

let initialValue = DEFAULT_STATS;
if (browser) {
	const localStorageData = window.localStorage.getItem('userStats');
	try {
		if (localStorageData) {
			initialValue = JSON.parse(localStorageData);
		}
	} catch (error) {
		console.log('error while parsing stats from localStorage', error);
		initialValue = DEFAULT_STATS;
	}
}

const userStats = writable<UserStats>(initialValue);
userStats.subscribe((storeValue) => {
	if (browser) {
		window.localStorage.setItem('userStats', JSON.stringify(storeValue));
	}
});

export default userStats;

type MinifiedUserStats = {
	type: AttackStyles;
	damageType: DamageTypes;
	attackInterval: number;
	isMelee: boolean;
	attackLevel: number;
	strengthLevel: number;
	defenceLevel: number;
	accuracy: number;
	strength: number;
	defence: number;
};

export const getStatsForSelectedAttackStyle = (
	allStats: UserStats,
): MinifiedUserStats => {
	const damageType = allStats.selectedDamageType;
	const isMelee = damageType !== 'archery' && damageType !== 'magic';
	const type = isMelee ? 'melee' : (damageType as AttackStyles); // melee / archery / magic
	const attackSkill = isMelee ? 'attack' : (type as SkillNames); // attack / archery / magic
	const strenghtSkill = isMelee ? 'strength' : (type as SkillNames); // strength / archery / magic
	const defenceSkill = 'defence' as SkillNames;

	const attackInterval = allStats.attackInterval;

	return {
		type,
		damageType,
		attackInterval,
		isMelee,
		attackLevel: allStats.skills[attackSkill],
		strengthLevel: allStats.skills[strenghtSkill],
		defenceLevel: allStats.skills[defenceSkill],
		accuracy: allStats[type].accuracy,
		strength: allStats[type].strength,
		defence: allStats[type].defence,
	};
};
