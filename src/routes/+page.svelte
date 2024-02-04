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

<main
class="max-w-6xl mx-auto mt-3
w-[calc(100vw-2rem)] justify-between items-left pixel-corners"
>
<h2 class="text-2xl text-white/500 p-1">ALEXANDER</h2>
<h2 class="text-2xl text-white/500 p-1">WEIMER</h2>
<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto items-left">

    {#if projects}
        {#each Object.entries(projects) as [key, project]}
           <ProjectCard {project} />
        {/each}
    {/if}
</div>
</main>