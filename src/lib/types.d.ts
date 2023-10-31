type Monster = {
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
	combat_stats: {
		melee: { strength: number; accuracy: number; defence: number };
		archery: { strength: number; accuracy: number; defence: number };
		magic: { strength: number; accuracy: number; defence: number };
	};
};
