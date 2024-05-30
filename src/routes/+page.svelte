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
    <meta name="description" content="Alexander Akira Weimer">
    <meta name="keywords" content="Weimer, Alexander, AlexanderAkiraWeimer">
    <meta name="author" content="Alexander Akira Weimer">
    <meta name="copyright" content="Alexander Akira Weimer" />
    <meta property="og:site_name" content="Alexander Akira Weimer" />
    <meta property="og:type" content="profile" />
    <meta property="og:profile:first_name" content="Alexander" />
    <meta property="og:profile:last_name" content="Weimer" />
    <meta property="og:profile:username" content="syslev" />
    <meta property="og:profile:gender" content="male" />
    <meta property="og:image" content="/img/pfp.png" /> 
    <meta property="fb:admins" content="268094773018996" />
</svelte:head>

<main class="justify-between items-center l-0">
    <div class="flex flex-col h-[100vh] pt-2 md:pt-4 w-full">
        <h1 class="transform scale-0">Alexander Weimer - Portfolio</h1> <!-- SEO -->
        <span class="w-full text-center justify-center flex items-center md:text-center font-bold font-mastery text-fuchsia-50 pb-4 md:pb-8">
            <a class="mr-6 tooltip-social" data-text="@syslev" href="https://github.com/syslev" target="_blank" rel="noopener noreferrer">
                <svg width="44px" height="44px" class="linkicon inline cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
            </a>
            <a class="tooltip-discord" data-text="@syslev" href="https://discord.com/users/366213124765777933" target="_blank" rel="noopener noreferrer">
                <svg width="53px" height="53px" class="linkicon inline cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg>
            </a>
            <a class="ml-6 tooltip-social" data-text="@syslev" href="https://t.me/syslev" target="_blank" rel="noopener noreferrer">
                <svg width="44px" height="44px" class="linkicon inline cursor-pointer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="10 10 45 45">
                    <path d="M32,10c12.15,0,22,9.85,22,22s-9.85,22-22,22s-22-9.85-22-22S19.85,10,32,10z M39.589,40.968	c0.404-1.241,2.301-13.615,2.534-16.054c0.071-0.738-0.163-1.229-0.619-1.449c-0.553-0.265-1.371-0.133-2.322,0.21	c-1.303,0.47-17.958,7.541-18.92,7.951c-0.912,0.388-1.775,0.81-1.775,1.423c0,0.431,0.256,0.673,0.96,0.924	c0.732,0.261,2.577,0.82,3.668,1.121c1.05,0.29,2.243,0.038,2.913-0.378c0.709-0.441,8.901-5.921,9.488-6.402	c0.587-0.48,1.056,0.135,0.576,0.616c-0.48,0.48-6.102,5.937-6.844,6.693c-0.901,0.917-0.262,1.868,0.343,2.249	c0.689,0.435,5.649,3.761,6.396,4.295c0.747,0.534,1.504,0.776,2.198,0.776C38.879,42.942,39.244,42.028,39.589,40.968z"></path>
                </svg>
            </a>
        </span>
        <span class="pr-1 mx-auto w-full text-center justify-center flex items-center md:text-center font-bold font-mastery text-fuchsia-50">
            <!--<svg class="mt-4 h-8 md:h-12" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 278 160" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0">
                <path class="white" fill="white" stroke="white" d="M211.643 54.7138l-14.3145 -13.4661c-16.957,-16.3591 -29.6255,-27.1822 -38.054,-32.5686 -8.429,-5.3364 -17.0076,-8.0297 -25.6858,-8.0297 -12.3688,0 -23.2913,4.1895 -32.7677,12.5184 -9.5259,8.3295 -14.2638,17.8053 -14.2638,28.5287 0,7.83 2.2938,14.364 6.9322,19.7504 4.6383,5.3364 10.2746,8.0297 16.9075,8.0297 8.4791,0 16.6083,-4.5388 24.3887,-13.6158 -2.2443,0.3988 -3.9897,0.5985 -5.2368,0.5985 -7.9796,0 -14.9123,-2.4441 -20.7477,-7.3817 -5.8353,-4.8875 -8.7777,-10.7729 -8.7777,-17.6056 0,-4.289 1.5457,-7.9301 4.6878,-11.0221 3.0926,-3.0425 6.7331,-4.5889 10.9226,-4.5889 11.1222,0 30.1245,13.8656 57.0068,41.6456l11.8203 12.1196c-9.1271,6.2341 -21.745,11.6707 -37.7548,16.3591 -16.0599,4.6383 -30.1245,6.9823 -42.2942,6.9823 -21.0469,0 -38.6525,-6.4339 -52.7672,-19.3016 -14.1148,-12.8176 -21.1966,-28.8274 -21.1966,-48.0293 0,-4.3892 0.5485,-8.5286 1.5958,-12.4188 -20.6481,3.6905 -30.9722,12.7681 -30.9722,27.1815 0,18.4038 9.5259,34.3641 28.5782,47.8303 19.0524,13.5156 41.496,20.2487 67.4305,20.2487 14.6136,0 34.5631,-4.9871 59.8001,-14.9124l-10.5237 10.2246c-10.7229,10.4236 -21.9447,19.1519 -33.6154,26.1842 -11.7207,7.0323 -20.8979,10.5232 -27.631,10.5232 -5.486,0 -10.0743,-1.5958 -13.8149,-4.7379 -3.7406,-3.1922 -5.6362,-7.0324 -5.6362,-11.6207 0,-1.0974 0.1496,-2.5436 0.4489,-4.3891 -13.4662,5.0371 -20.1993,11.5711 -20.1993,19.5507 0,5.5861 2.7934,10.324 8.429,14.2143 5.5862,3.8902 12.4188,5.8353 20.4985,5.8353 18.6035,0 45.9346,-17.6556 81.9941,-52.9169l10.2245 -10.0749c7.5307,-7.381 15.7105,-14.2143 24.5878,-20.4484 16.5588,16.9576 33.1671,25.4361 49.925,25.4361 10.0248,0 18.4533,-2.6932 25.1864,-8.1298 6.7831,-5.3864 10.1744,-12.0695 10.1744,-19.9495 0,-7.7804 -3.2417,-14.3144 -9.7256,-19.5012 -6.4833,-5.2368 -14.563,-7.8305 -24.2886,-7.8305 -9.8257,0 -20.2493,2.943 -31.2714,8.7783zm7.4311 6.8828c8.6782,-3.2423 15.8602,-4.8381 21.4958,-4.8381 6.9328,0 12.1196,1.0474 15.5609,3.1421 3.4414,2.0948 5.1874,5.2369 5.1874,9.4263 0,2.9424 -1.0474,5.1373 -3.0926,6.5835 -2.0447,1.4462 -5.1367,2.1943 -9.3262,2.1943 -8.9775,0 -18.9027,-5.486 -29.8253,-16.5081z"/>
            </svg>-->
            <h2 class="text-[2.5rem] md:text-6xl inline mx-7 text-center "> projects </h2>
            <!--<svg class="scale-x-[-1] mt-4 h-8 md:h-12" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 278 160" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0">
                <path class="white" fill="white" stroke="white" d="M211.643 54.7138l-14.3145 -13.4661c-16.957,-16.3591 -29.6255,-27.1822 -38.054,-32.5686 -8.429,-5.3364 -17.0076,-8.0297 -25.6858,-8.0297 -12.3688,0 -23.2913,4.1895 -32.7677,12.5184 -9.5259,8.3295 -14.2638,17.8053 -14.2638,28.5287 0,7.83 2.2938,14.364 6.9322,19.7504 4.6383,5.3364 10.2746,8.0297 16.9075,8.0297 8.4791,0 16.6083,-4.5388 24.3887,-13.6158 -2.2443,0.3988 -3.9897,0.5985 -5.2368,0.5985 -7.9796,0 -14.9123,-2.4441 -20.7477,-7.3817 -5.8353,-4.8875 -8.7777,-10.7729 -8.7777,-17.6056 0,-4.289 1.5457,-7.9301 4.6878,-11.0221 3.0926,-3.0425 6.7331,-4.5889 10.9226,-4.5889 11.1222,0 30.1245,13.8656 57.0068,41.6456l11.8203 12.1196c-9.1271,6.2341 -21.745,11.6707 -37.7548,16.3591 -16.0599,4.6383 -30.1245,6.9823 -42.2942,6.9823 -21.0469,0 -38.6525,-6.4339 -52.7672,-19.3016 -14.1148,-12.8176 -21.1966,-28.8274 -21.1966,-48.0293 0,-4.3892 0.5485,-8.5286 1.5958,-12.4188 -20.6481,3.6905 -30.9722,12.7681 -30.9722,27.1815 0,18.4038 9.5259,34.3641 28.5782,47.8303 19.0524,13.5156 41.496,20.2487 67.4305,20.2487 14.6136,0 34.5631,-4.9871 59.8001,-14.9124l-10.5237 10.2246c-10.7229,10.4236 -21.9447,19.1519 -33.6154,26.1842 -11.7207,7.0323 -20.8979,10.5232 -27.631,10.5232 -5.486,0 -10.0743,-1.5958 -13.8149,-4.7379 -3.7406,-3.1922 -5.6362,-7.0324 -5.6362,-11.6207 0,-1.0974 0.1496,-2.5436 0.4489,-4.3891 -13.4662,5.0371 -20.1993,11.5711 -20.1993,19.5507 0,5.5861 2.7934,10.324 8.429,14.2143 5.5862,3.8902 12.4188,5.8353 20.4985,5.8353 18.6035,0 45.9346,-17.6556 81.9941,-52.9169l10.2245 -10.0749c7.5307,-7.381 15.7105,-14.2143 24.5878,-20.4484 16.5588,16.9576 33.1671,25.4361 49.925,25.4361 10.0248,0 18.4533,-2.6932 25.1864,-8.1298 6.7831,-5.3864 10.1744,-12.0695 10.1744,-19.9495 0,-7.7804 -3.2417,-14.3144 -9.7256,-19.5012 -6.4833,-5.2368 -14.563,-7.8305 -24.2886,-7.8305 -9.8257,0 -20.2493,2.943 -31.2714,8.7783zm7.4311 6.8828c8.6782,-3.2423 15.8602,-4.8381 21.4958,-4.8381 6.9328,0 12.1196,1.0474 15.5609,3.1421 3.4414,2.0948 5.1874,5.2369 5.1874,9.4263 0,2.9424 -1.0474,5.1373 -3.0926,6.5835 -2.0447,1.4462 -5.1367,2.1943 -9.3262,2.1943 -8.9775,0 -18.9027,-5.486 -29.8253,-16.5081z"/>
            </svg>
                <button type="button" 
                    on:click={() => {currentPage = (currentPage + 1) % (Object.keys(Pages).length / 2); console.log(currentPage)}}
                >
                    <img class="linkicon inline w-8 mt-4 cursor-pointer transform hover:transform {currentPage >= ((Object.keys(Pages).length / 2) - 1) ? 'transform rotate-180' : ''}" 
                        src="img/icons/arrow.svg" 
                        alt="Right-pointing carousel arrow"
                    />
                </button>-->
        </span>
        <div class="list inline-block flex-1 md:flex-2 flex-col flex w-full overflow-y-scroll my-4 md:my-8">
            <div class="overflow-y-scroll overflow-x-show px-5 mx-auto w-full md:w-fit inline-block flex-1 flex-col flex md:grid md:gap-x-5 md:justify-stretch md:grid-cols-2 pb-10 {loaded == true ? '' : 'invisible'}" bind:this={list}>
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