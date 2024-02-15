<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import { parse } from 'yaml'
    import { onMount } from 'svelte';
    import { base } from '$app/paths';


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

<main class="justify-between items-left l-0">
    <div class="flex flex-col h-[100vh] px-8 pt-12 ">
        <span class="w-full text-center md:text-left  font-bold font-mastery text-fuchsia-50">
            <!--<span class="flex">
                <p class="pl-9 text-xl transform translate-y-5">hi</p>
                <p class="pl-16 text-xl transform translate-y-5">my name is</p>
            </span>-->
            <h2 class="pl-6 text-6xl">portfolio</h2>
        </span>
        <div class="overflow-y-scroll overflow-x-visible px-5 my-5 w-fit inline-block flex-1 blur-borders">
            {#if projects}
                {#each Object.entries(projects) as [key, project]}
                <ProjectCard {project} />
                {/each}
            {/if}
        </div>
    </div>
</main>