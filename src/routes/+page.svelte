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

<svelte:head>
    <title>Alexander Weimer</title> 
</svelte:head>

<main class="justify-between items-left l-0">
    <div class="flex flex-col h-[100vh] px-5 pt-8 ">
        <span class="w-full text-center md:text-left font-bold font-mastery text-fuchsia-50">
            <h2 class="pl-6 text-6xl">projects</h2>
        </span>
        <div class="overflow-y-scroll overflow-x-visible px-5 my-5 w-fit inline-block flex-1">
            {#if projects}
                {#each Object.entries(projects) as [key, project]}
                    <ProjectCard {project} />
                {/each}
            {/if}
        </div>
    </div>
</main>