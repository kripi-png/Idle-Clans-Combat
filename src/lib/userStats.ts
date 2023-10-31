import { writable } from 'svelte/store';

export const userStats = writable({
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
});
