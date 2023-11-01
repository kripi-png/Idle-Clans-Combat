import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const DEFAULT_STATS: UserStats = {
	selectedAttackStyle: 'melee',
	skills: {
		attack: 1,
		strength: 1,
		defence: 1,
		archery: 1,
		magic: 1
	},
	// stats
	melee: {
		strength: 0,
		accuracy: 0,
		defence: 0
	},
	archery: {
		strength: 0,
		accuracy: 0,
		defence: 0
	},
	magic: {
		strength: 0,
		accuracy: 0,
		defence: 0
	}
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

export const calculateUserAugmentedAccuracy = (stats: UserStats): number => {
	const isUsingMelee = stats.selectedAttackStyle === 'melee';
	const accuracyInSelectedAttackStyle = (stats as any)[stats.selectedAttackStyle].accuracy;
	const skillForSelectedAttackStyle = isUsingMelee ? 'attack' : stats.selectedAttackStyle;
	const skillLevelForSelectedAttackStyle = (stats.skills as any)[skillForSelectedAttackStyle];

	return Math.floor(
		((accuracyInSelectedAttackStyle + 64) * (skillLevelForSelectedAttackStyle + 8)) / 10
	);
};
