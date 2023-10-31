<script lang="ts">
	import MonsterEntry from '$lib/components/MonsterEntry.svelte';
	import monsterData from '$lib/monsters.json';

	const monsters: Monster[] = monsterData.monsters;

	let searchQuery = '';
</script>

<label>
	Search
	<input type="text" bind:value={searchQuery} />
</label>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Combat Level</th>
			<th>Health</th>
			<th>Attack Interval</th>
			<th>Attack Style</th>
			<th>Attack Style Weakness</th>
		</tr>
	</thead>
	<tbody>
		{#each monsters.filter((monster) => monster.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase())) as monster}
			<MonsterEntry {monster} />
		{/each}
	</tbody>
</table>
