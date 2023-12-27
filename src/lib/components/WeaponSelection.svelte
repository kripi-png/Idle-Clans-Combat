<script lang="ts">
	import WEAPON_DATA from '$lib/weapons.json';
	const weaponData = WEAPON_DATA as unknown as Weapons;
	import userStats from '$lib/userStats';

	const getInterval = (weaponName: string) => {
		const weaponEntry = weaponData[selectedWeaponType][weaponName];
		if (weaponEntry.hasOwnProperty('attack_interval'))
			return weaponEntry.attack_interval;

		return weaponData[selectedWeaponType].default.attack_interval;
	};

	const getDamageType = (weaponName: string) => {
		const weaponEntry = weaponData[selectedWeaponType][weaponName];
		if (weaponEntry.hasOwnProperty('attack_style'))
			return weaponEntry.attack_style;

		return weaponData[selectedWeaponType].default.attack_style;
	};

	const weaponTypes = <WeaponType[]>Object.keys(weaponData);
	let selectedWeaponType = <WeaponType>weaponTypes[0];
	// select second (index 1) to skip default
	$: selectedWeapon = Object.keys(weaponData[selectedWeaponType])[1];
	// reset attack interval on change of selectedWeaponType or selectedWeapon
	$: $userStats.attackInterval =
		selectedWeaponType && getInterval(selectedWeapon);
	$: $userStats.selectedDamageType =
		selectedWeaponType && getDamageType(selectedWeapon);
</script>

<div class="flexRow gap-2">
	<label class="capitalize">
		<span>Weapon type</span>
		<select bind:value={selectedWeaponType}>
			{#each weaponTypes as type}
				<option value={type}>{type.replace('_', ' ')}</option>
			{/each}
		</select>
	</label>

	<label class="capitalize">
		<span>Weapon rank</span>
		<select bind:value={selectedWeapon}>
			{#each Object.keys(weaponData[selectedWeaponType]).filter((r) => r !== 'default') as rank}
				<option value={rank}>{rank.replace('_', ' ')}</option>
			{/each}
		</select>
	</label>
</div>
<ul>
	<li>Selected weapon: {selectedWeaponType}</li>
	<li>Damage type: {$userStats.selectedDamageType}</li>
	<li>Attack interval: {$userStats.attackInterval}</li>
</ul>
<div>
	<label>
		Weapon's base attack speed in ms
		<input disabled type="number" bind:value={$userStats.attackInterval} />
	</label>
</div>
