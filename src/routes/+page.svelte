<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import PublicationCard from "$lib/components/PublicationCard.svelte";
    import StatsCard from "$lib/components/StatsCard.svelte";

    import { parse } from 'yaml'
    import { onMount } from 'svelte';

    let projects: any
    let publications: any
    let statistics: any
    let list: HTMLElement;

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

    onMount(() => {
        list.addEventListener('scroll', () => {
            const scrollProgress = list.scrollTop / (list.scrollHeight - list.offsetHeight);
            const center = (list.scrollTop + Math.max(list.offsetHeight / 2.35, Math.min(list.offsetHeight / 1.04, list.offsetHeight * scrollProgress)) );
            for (let item of list.children) {
            const relativePos = center - ((item as HTMLElement).offsetTop + (item as HTMLElement).offsetHeight / 2);
            const minScale = Math.max(0.5, 1 - Math.abs(relativePos) / 3500);
            (item as HTMLElement).style.transform = `scale(${minScale})`;
            }
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
        <h1 class="transform scale-0">Alexander Weimer - Portfolio</h1> <!-- SEO -->
        <span class="w-full text-center justify-center flex items-center md:text-center font-bold font-mastery text-fuchsia-50">

            <h2 class="text-5xl md:text-6xl inline ml-[32px] text-center w-[387px] md:w-[484px]">{Pages[currentPage]}</h2>
                <!--<button type="button" 
                    on:click={() => {currentPage = (currentPage + 1) % (Object.keys(Pages).length / 2); console.log(currentPage)}}
                >
                    <img class="linkicon inline w-8 mt-4 cursor-pointer transform hover:transform {currentPage >= ((Object.keys(Pages).length / 2) - 1) ? 'transform rotate-180' : ''}" 
                        src="img/icons/arrow.svg" 
                        alt="Right-pointing carousel arrow"
                    />
                </button>-->
        </span>
        <div class="overflow-y-scroll overflow-x-show px-5 my-8 mx-auto w-full md:w-fit inline-block flex-1 flex-col flex" bind:this={list}>
            {#if currentPage === Pages.profile}
                    {#if statistics}
                        {#each Object.entries(statistics) as [key, stats]}
                        <div><StatsCard {stats} /></div>
                        {/each}
                    {/if}
            {:else if currentPage === Pages.projects}
                    {#if projects}
                        {#each Object.entries(projects) as [key, project]}
                            <div><ProjectCard {project} /></div>
                        {/each}
                    {/if}
            {:else}
                <p class="text-2xl w-full text-center text-white font-bold font-varela">You're not supposed to see this. Reload the page and it should go away.</p>
            {/if}
        </div>
    </div>
</main>