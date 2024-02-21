<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import PublicationCard from "$lib/components/PublicationCard.svelte";
    import StatsCard from "$lib/components/StatsCard.svelte";

    import { parse } from 'yaml'
    import { onMount } from 'svelte';

    let projects: any
    let publications: any
    let statistics: any

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
    onMount(async () => {
        fetch('stats.yml')
            .then(response => response.text())
            .then(data => {
                statistics = parse(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });



    enum Pages {
        profile,
        projects
    }
    
    var currentPage: number = Pages.projects;
</script>

<svelte:head>
    <title>Alexander Weimer</title> 
    <meta name="description" content="Alexander Akira Weimer Developer Portfolio">
    <meta name="keywords" content="Weimer, Alexander, AlexanderAkiraWeimer">
    <meta name="author" content="Alexander Akira Weimer">
</svelte:head>

<main class="justify-between items-center l-0">
    <div class="flex flex-col h-[100vh] px-5 pt-4 w-full">
        <h1 class="transform scale-0">Alexander Akira Weimer</h1> <!-- SEO -->
        <span class="w-full text-center justify-center flex items-center md:text-center font-bold font-mastery text-fuchsia-50">

            <h2 class="text-5xl md:text-6xl inline ml-[32px] text-center w-[387px] md:w-[484px]">{Pages[currentPage]}</h2>
                <button type="button" 
                    on:click={() => {currentPage = (currentPage + 1) % (Object.keys(Pages).length / 2); console.log(currentPage)}}
                >
                    <img class="linkicon inline w-8 mt-4 cursor-pointer transform hover:transform {currentPage >= ((Object.keys(Pages).length / 2) - 1) ? 'transform rotate-180' : ''}" 
                        src="img/icons/arrow.svg" 
                        alt="Right-pointing carousel arrow"
                    />
                </button>
        </span>
        <div class="overflow-y-scroll overflow-x-visible px-5 my-8 mx-auto w-full md:w-fit inline-block flex-1 flex-col flex">
            {#if currentPage === Pages.profile}
                {#if statistics}
                    {#each Object.entries(statistics) as [key, stats]}
                        <StatsCard {stats} />
                    {/each}
                {/if}
            {:else if currentPage === Pages.projects}
                {#if projects}
                    {#each Object.entries(projects) as [key, project]}
                        <ProjectCard {project} />
                    {/each}
                {/if}
            {:else}
                <p class="text-2xl w-full text-center text-white font-bold font-varela">You're not supposed to see this. Reload the page and it should go away.</p>
            {/if}
        </div>
    </div>
</main>