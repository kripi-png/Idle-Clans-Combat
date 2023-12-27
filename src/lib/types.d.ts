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
	respawn_interval: number;
	skill_levels: {
		attack: number;
		strength: number;
		defence: number;
		magic: number;
		archery: number;
	};
	combat_stats: Record<AttackStyles, Record<StatNames, number>>;
}

interface UserStats extends IndexableObject {
	selectedDamageType: DamageTypes;
	attackInterval: number;
	skills: Record<SkillNames, number>;
	// stats
	melee: Record<StatNames, number>;
	archery: Record<StatNames, number>;
	magic: Record<StatNames, number>;
	potions: string[];
}

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
	potions: string[];
};

interface PlayerEquipmentItem extends IndexableObject {
	name: string;
	slot:
		| 'weapon'
		| 'helmet'
		| 'body'
		| 'legs'
		| 'gloves'
		| 'boots'
		| 'cape'
		| 'ring'
		| 'bracelet'
		| 'earrings'
		| 'amulet'
		| 'offhand'
		| 'consumable';
	requiredSkill: string;
	requiredSkillLevel: number;
	// stats
	attackInterval: null | number;
	melee: Record<StatNames, number>;
	archery: Record<StatNames, number>;
	magic: Record<StatNames, number>;
	specialEffect: null | number;
}

type WeaponType =
	| 'scimitar'
	| 'battle_axe'
	| 'longsword'
	| 'club'
	| 'spear'
	| 'heavy_hammer'
	| 'bow'
	| 'crossbow'
	| 'staff'
	| 'wand';

interface DefaultStats {
	type: WeaponType;
	one_handed: boolean;
	attack_interval: number;
	attack_style: WeaponStyle;
	melee_strength: number;
	melee_accuracy: number;
	archery_accuracy?: number;
	archery_strength?: number;
	magic_strength?: number;
	magic_accuracy?: number;
	magic_defence?: number;
}

interface WeaponVariation extends DefaultStats {
	name: string;
	attack_requirements: number;
}

interface WeaponObject {
	default: DefaultStats;
	[key: string]: WeaponVariation;
}

type Weapons = Record<WeaponType, WeaponObject>;
