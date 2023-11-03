type IndexableObject = Record<string, string | Record>;
type AttackStyles = 'melee' | 'archery' | 'magic';
type skillNames = 'attack' | 'strength' | 'defence' | 'archery' | 'magic';
type statNames = 'strength' | 'accuracy' | 'defence';

interface Monster extends IndexableObject {
	name: string;
	combat_level: number | null;
	health: number;
	attack_interval: number;
	attack_style: null | string;
	attack_style_weakness: null | string;
	skill_levels: {
		rigour: number;
		strength: number;
		defence: number;
		magic: number;
		archery: number;
	};
	combat_stats: Record<AttackStyles, Record<statNames, number>>;
	// values that depend on user stats and are calculated during runtime
	hitChance?: number;
	chanceToGetHit?: number;
	maxHit?: number;
	maxDamageTaken?: number;
}

interface UserStats extends IndexableObject {
	selectedAttackStyle: AttackStyles;
	skills: Record<skillNames, number>;
	// stats
	melee: Record<statNames, number>;
	archery: Record<statNames, number>;
	magic: Record<statNames, number>;
}
