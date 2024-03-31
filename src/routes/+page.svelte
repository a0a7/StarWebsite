<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import PublicationCard from "$lib/components/PublicationCard.svelte";
    import StatsCard from "$lib/components/StatsCard.svelte";

    import { parse } from 'yaml'
    import { onMount, onDestroy } from 'svelte';

    let projects: any;
    let publications: any;
    let loaded: boolean = false;
    let statistics: any;
    let list: HTMLElement;
    let observer: MutationObserver;

    function lerp(start: number, end: number, t: number) {
        console.log(start * (1 - t) + end * t)
        return start * (1 - t) + end * t;
    }
       
    const resizeAfterScroll = () => {
        const scrollProgress = (list.scrollTop / (list.scrollHeight - list.offsetHeight)) ?? 0;
        const center = (list.scrollTop + (lerp((list.offsetHeight / 5), (list.offsetHeight / 1.02), scrollProgress)) );
        for (let item of list.children) {
            const relativePos = center - ((item as HTMLElement).offsetTop + (item as HTMLElement).offsetHeight / 2);
            const scale = Math.max(0.5, 1 - Math.abs(relativePos) / 5000);
            (item as HTMLElement).style.transform = `scale(${scale})`;
            (item as HTMLElement).style.marginTop = `-${(item as HTMLElement).offsetHeight * (1 - scale)}px`; 
        }
    };

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
        list.addEventListener('scroll', resizeAfterScroll);
        observer = new MutationObserver((mutationsList) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    resizeAfterScroll();
                    loaded = true;
                    observer.disconnect();
                }
            }
        });
        observer.observe(list, { childList: true });
    });

    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
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
    <meta name="copyright" content="Alexander Weimer" />
    <meta property="og:site_name" content="Alexander Akira Weimer Developer Portfolio" />
    <meta property="og:type" content="profile" />
    <meta property="og:image" content="Alexander" />
    <meta property="og:profile:first_name" content="Alexander" />
    <meta property="og:profile:last_name" content="Weimer" />
    <meta property="og:profile:username" content="syslev" />
    <meta property="og:profile:gender" content="male" />

    <meta property="fb:admins" content="268094773018996" />
</svelte:head>

<main class="justify-between items-center l-0">
    <div class="flex flex-col h-[100vh] pt-4 w-full">
        <h1 class="transform scale-0">Alexander Weimer - Portfolio</h1> <!-- SEO -->
        <span class="w-full text-center justify-center flex items-center md:text-center font-bold font-mastery text-fuchsia-50">

            <!--<h2 class="text-[2.5rem] md:text-6xl inline md:ml-[16px] text-center w-[387px] md:w-[484px]">links</h2>-->
        </span>
        <span class="w-full text-center justify-center flex items-center md:text-center font-bold font-mastery text-fuchsia-50">

            <h2 class="text-[2.5rem] md:text-6xl inline md:ml-[16px] text-center w-[387px] md:w-[484px]">{Pages[currentPage]}</h2>
                <!--<button type="button" 
                    on:click={() => {currentPage = (currentPage + 1) % (Object.keys(Pages).length / 2); console.log(currentPage)}}
                >
                    <img class="linkicon inline w-8 mt-4 cursor-pointer transform hover:transform {currentPage >= ((Object.keys(Pages).length / 2) - 1) ? 'transform rotate-180' : ''}" 
                        src="img/icons/arrow.svg" 
                        alt="Right-pointing carousel arrow"
                    />
                </button>-->
        </span>
        <div class="list inline-block flex-1 flex-col flex w-full overflow-y-scroll my-4 md:my-8">
            <div class="overflow-y-scroll overflow-x-show px-5 mx-auto w-full md:w-fit inline-block flex-1 flex-col flex pb-10 {loaded == true ? '' : 'invisible'}" bind:this={list}>
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
    </div>
</main>

<style>
.list {
    position: relative;
}

.list::before,
.list::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 30px; /* Adjust this value to change the size of the blur */
    z-index: 1;
}

.list::before {
    top: 0;
    background: linear-gradient(to bottom, rgb(9,0,13), rgba(255,255,255,0));
}

.list::after {
    bottom: 0;
    background: linear-gradient(to top, rgb(9,0,13), rgba(255,255,255,0));
}
</style>