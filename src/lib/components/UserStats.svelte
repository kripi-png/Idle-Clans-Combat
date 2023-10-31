<script lang="ts">
	import { userStats } from '$lib/userStats';
</script>

<div class="userStats">
	<div class="statList">
		User Stats
		<div class="attackStyleStats">
			<h2>Melee</h2>
			<label>
				Strength
				<br />
				<input type="number" bind:value={$userStats.melee.strength} />
			</label>
			<label>
				Accuracy
				<br />
				<input type="number" bind:value={$userStats.melee.accuracy} />
			</label>
			<label>
				Defence
				<br />
				<input type="number" bind:value={$userStats.melee.defence} />
			</label>
		</div>
		<div class="attackStyleStats">
			<h2>Archery</h2>
			<label>
				Strength
				<br />
				<input type="number" bind:value={$userStats.archery.strength} />
			</label>
			<label>
				Accuracy
				<br />
				<input type="number" bind:value={$userStats.archery.accuracy} />
			</label>
			<label>
				Defence
				<br />
				<input type="number" bind:value={$userStats.archery.defence} />
			</label>
		</div>
		<div class="attackStyleStats">
			<h2>Magic</h2>
			<label>
				Strength
				<br />
				<input type="number" bind:value={$userStats.magic.strength} />
			</label>
			<label>
				Accuracy
				<br />
				<input type="number" bind:value={$userStats.magic.accuracy} />
			</label>
			<label>
				Defence
				<br />
				<input type="number" bind:value={$userStats.magic.defence} />
			</label>
		</div>
	</div>

	<div class="skillLevels">
		<h2>Skill Levels</h2>
		<label>
			Attack
			<br>
			<input type="number" bind:value={$userStats.skills.attack} />
		</label>
		<label>
			Strength
			<br>
			<input type="number" bind:value={$userStats.skills.strength} />
		</label>
		<label>
			Defence
			<br>
			<input type="number" bind:value={$userStats.skills.defence} />
		</label>
		<label>
			Archery
			<br>
			<input type="number" bind:value={$userStats.skills.archery} />
		</label>
		<label>
			Magic
			<br>
			<input type="number" bind:value={$userStats.skills.magic} />
		</label>
	</div>
</div>

<style>
	h2 {
		margin: 0;
		padding: 0;
	}
	.userStats {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}
	.statList {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}
	.attackStyleStats {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
	.skillLevels {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
