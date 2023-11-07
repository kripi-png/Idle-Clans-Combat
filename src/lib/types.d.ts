type IndexableObject = Record<string, string | Record>;
type MeleeStyles = 'crush' | 'pound' | 'stab' | 'slash';
type AttackStyles = 'melee' | 'archery' | 'magic';
type DamageTypes = MeleeStyles | 'archery' | 'magic';
type MeleeDamageTypes = 'crush' | 'pound' | 'stab' | 'slash';
type SkillNames =
	| 'attack'
	| 'strength'
	| 'defence'
	| 'health'
	| 'archery'
	| 'magic';
type StatNames = 'strength' | 'accuracy' | 'defence';

interface MonsterData extends IndexableObject {
	name: string;
	combat_level: number | null;
	health: number;
	attack_interval: number;
	attack_style: null | string;
	attack_style_weakness: null | string;
	respawn_interval?: number;
	skill_levels: {
		attack: number;
		strength: number;
		defence: number;
		magic: number;
		archery: number;
	};
	combat_stats: Record<AttackStyles, Record<StatNames, number>>;
}

interface Monster extends IndexableObject {
	id: number;
	name: string;
	combatLevel: number | null;
	health: number;
	playerHitPercent: number;
	monsterHitPercent: number;
	monsterMaxHit: number;
}

interface UserStats extends IndexableObject {
	selectedDamageType: DamageTypes;
	attackInterval: number;
	skills: Record<SkillNames, number>;
	// stats
	melee: Record<StatNames, number>;
	archery: Record<StatNames, number>;
	magic: Record<StatNames, number>;
}
