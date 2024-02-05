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

<main class="m-10 justify-between items-left l-0">
    <span class="w-full text-center md:text-left text-6xl font-bold font-mastery text-fuchsia-50">
        <h2 class="">alexander</h2>
        <h2 class="pl-6">weimer</h2>
    </span>
    <div class="items-left overflow-y-scroll">
        {#if projects}
            {#each Object.entries(projects) as [key, project]}
            <ProjectCard {project} />
            {/each}
        {/if}
    </div>
</main>