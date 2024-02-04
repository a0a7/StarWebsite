<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import { parse } from 'yaml'
    import { onMount } from 'svelte';
    
    let projects: any
	onMount(async () => {
        fetch('src/projects.yml')
            .then(response => response.text())
            .then(data => {
                console.log(data);
                projects = parse(data)
                console.log(projects)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
</script>

<main class="m-5 justify-between items-left ">
    <h2 class="text-2xl text-white/500 p-1">ALEXANDER</h2>
    <h2 class="text-2xl text-white/500 p-1">WEIMER</h2>
    <div class="items-left">

        {#if projects}
            {#each Object.entries(projects) as [key, project]}
            <ProjectCard {project} />
            {/each}
        {/if}
    </div>
</main>