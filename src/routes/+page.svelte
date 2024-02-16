<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import { parse } from 'yaml'
    import { onMount } from 'svelte';

    let projects: any
	onMount(async () => {
        fetch('projects.yml')
            .then(response => response.text())
            .then(data => {
                projects = parse(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
</script>

<svelte:head>
    <title>Alexander Weimer</title> 
    <meta name="description" content="Alexander Akira Weimer Developer Portfolio">
    <meta name="keywords" content="Weimer, Alexander, Alexander Akira Weimer">
    <meta name="author" content="Alexander Akira Weimer">
</svelte:head>

<main class="justify-between items-center l-0">
    <div class="flex flex-col h-[100vh] px-5 pt-8 w-full">
        <h1 class="transform scale-0">Alexander Akira Weimer</h1>
        <span class="w-full text-center justify-center flex items-center md:text-center font-bold font-mastery text-fuchsia-50">
            <img class="linkicon inline w-8 mr-10 mt-4 cursor-pointer transform rotate-180 hover:rotate-180" 
                src="img/icons/arrow.svg" 
                alt="Left-pointing carousel arrow"
            />
            <h2 class="text-5xl md:text-6xl inline">projects</h2>
            <img class="linkicon inline w-8 ml-10 mt-4 cursor-pointer" 
                src="img/icons/arrow.svg" 
                alt="Right-pointing carousel arrow"
            />
        </span>
        <div class="overflow-y-scroll overflow-x-visible px-5 my-5 mx-auto w-full md:w-fit inline-block flex-1 flex-col flex">
            {#if projects}
                {#each Object.entries(projects) as [key, project]}
                    <ProjectCard {project} />
                {/each}
            {/if}
        </div>
    </div>
</main>