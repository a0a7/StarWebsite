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

<main class="m-8 mt-12 justify-between items-left l-0">
    <span class="w-full text-center md:text-left  font-bold font-mastery text-fuchsia-50">
        <span class="flex">
            <p class="pl-9 text-xl transform translate-y-5">hi</p>
            <p class="pl-16 text-xl transform translate-y-5">my name is</p>
        </span>
        <h2 class="pl-6 text-6xl">alexander</h2>
    </span>
    <div class="overflow-y-scroll overflow-x-visible mt-1 px-5 max-h-[70vh] w-fit inline-block">
        {#if projects}
            {#each Object.entries(projects) as [key, project]}
            <ProjectCard {project} />
            {/each}
        {/if}
    </div>
</main>