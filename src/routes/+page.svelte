<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import PublicationCard from "$lib/components/PublicationCard.svelte";
    import StatsCard from "$lib/components/StatsCard.svelte";
    import { parse } from 'yaml'
    import { onMount, onDestroy, afterUpdate } from 'svelte';

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
        // Defer initial resize to ensure DOM is rendered
        setTimeout(() => resizeAfterScroll(), 1);

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

        // Re-run when tab becomes visible
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                resizeAfterScroll();
                console.debug('Page is visible');
            }
        });
    });
    afterUpdate(() => {
        if (list && ((currentPage === Pages.projects && projects) || (currentPage === Pages.profile && statistics))) {
            resizeAfterScroll();
        }
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
    <meta name="description" content="Mm">
    <meta name="keywords" content="a0a7, a0ax, lev">
    <meta name="author" content="a0a7">
    <meta name="copyright" content="a0a7" />
    <meta property="og:site_name" content="a0a7" />
    <meta property="og:type" content="profile" />
    <meta property="og:profile:first_name" content="a0a7" />
    <meta property="og:profile:username" content="a0a7" />
    <!--<meta property="og:image" content="/img/pfp.png" /> -->
    <meta property="fb:admins" content="268094773018996" />
    <meta name="theme-color" content="#09000d"/>
</svelte:head>

<main class="justify-between items-center l-0">
    <div class="flex flex-col h-[100vh] pt-2 md:pt-4 w-full">
        <h1 class="transform scale-0">a0a7 Portfolio</h1> <!-- SEO -->
        <!-- <span class="w-full text-center justify-center flex items-center md:text-center font-bold font-mastery text-fuchsia-50 pb-4 md:pb-8">
            <a class="mr-6 tooltip-social" data-text="@a0a7" href="https://github.com/a0a7" target="_blank" rel="noopener noreferrer">
                <svg width="44px" height="44px" class="linkicon inline cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
            </a>
            <a class="tooltip-discord" data-text="@a0a7" href="https://discord.com/users/366213124765777933" target="_blank" rel="noopener noreferrer">
                <svg width="53px" height="53px" class="linkicon inline cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg>
            </a>
            <a class="ml-6 tooltip-social" data-text="@awa0a7" href="https://t.me/awa0a7" target="_blank" rel="noopener noreferrer">
                <svg width="44px" height="44px" class="linkicon inline cursor-poipnter" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="10 10 45 45">
                    <path d="M32,10c12.15,0,22,9.85,22,22s-9.85,22-22,22s-22-9.85-22-22S19.85,10,32,10z M39.589,40.968	c0.404-1.241,2.301-13.615,2.534-16.054c0.071-0.738-0.163-1.229-0.619-1.449c-0.553-0.265-1.371-0.133-2.322,0.21	c-1.303,0.47-17.958,7.541-18.92,7.951c-0.912,0.388-1.775,0.81-1.775,1.423c0,0.431,0.256,0.673,0.96,0.924	c0.732,0.261,2.577,0.82,3.668,1.121c1.05,0.29,2.243,0.038,2.913-0.378c0.709-0.441,8.901-5.921,9.488-6.402	c0.587-0.48,1.056,0.135,0.576,0.616c-0.48,0.48-6.102,5.937-6.844,6.693c-0.901,0.917-0.262,1.868,0.343,2.249	c0.689,0.435,5.649,3.761,6.396,4.295c0.747,0.534,1.504,0.776,2.198,0.776C38.879,42.942,39.244,42.028,39.589,40.968z"></path>
                </svg>
            </a>
        </span>-->
            <button
                type="button"
                class="fixed top-6 right-8 z-50 flex items-center gap-2 px-3 py-2 rounded-sm  text-fuchsia-50 text-lg font-bold font-varela transition-all duration-200 group select-none cursor-pointer bg-transparent border-none"
                on:click={() => window.open(`https://blog.${window.location.hostname.replace(/^www\./, '')}`, '_blank')}
                aria-label="Open archive blog in new tab"
            >
                <span class="transition-opacity duration-200 group-hover:opacity-80">archive</span>
                <svg
                    class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="4.5"
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
        <div class="overflow-x-hidden pr-1 mx-auto w-full text-center justify-center flex flex-col items-center md:text-center font-bold font-varela text-fuchsia-50 ">
            <button
                type="button"
                class="hover:opacity-80 cursor-pointer select-all bg-transparent border-none p-0 m-0 font-inherit text-inherit"
                on:click={() => {
                    navigator.clipboard.writeText('aw@a0.ax');
                }}
                title="click to copy"
                aria-label="Copy email address to clipboard"
            >
                a0a7 &lt; aw@a0.ax &gt;
            </button>
            <div class="text-fuchsia-50">———</div>
            <a class="hover:opacity-80" href="openpgp4fpr:422c4cc0cebb122f9efe3b55e9443ee1e32b173a" target="_blank" rel="noopener noreferrer">
                <span>
                    OpenPGP:&nbsp;422C&nbsp;4CC0&nbsp;CEBB&nbsp;122F&nbsp;9EFE<br>3B55&nbsp;E944&nbsp;3EE1&nbsp;E32B&nbsp;173A
                </span>
            </a>
            <div class="text-fuchsia-50">———</div>
            <div class="text-fuchsia-50">
                <a class="linkicon !filter-none text-fuchsia-50" href="https://www.github.com/a0a7" target="_blank" rel="noopener noreferrer">
                    <span class="w-5 h-5 inline text-fuchsia-50">
                        <svg class="inline cursor-pointer w-5 h-5 text-fuchsia-50 color-fuchsia-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false" style="user-select: none; display: inline-block; fill:  color: white; flex-shrink: 0;" color="rgb(253 244 255)" fill="rgb(253 244 255)"><g color="white" ><path d="M216,104v8a56.06,56.06,0,0,1-48.44,55.47A39.8,39.8,0,0,1,176,192v40a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V216H72a40,40,0,0,1-40-40A24,24,0,0,0,8,152a8,8,0,0,1,0-16,40,40,0,0,1,40,40,24,24,0,0,0,24,24H96v-8a39.8,39.8,0,0,1,8.44-24.53A56.06,56.06,0,0,1,56,112v-8a58.14,58.14,0,0,1,7.69-28.32A59.78,59.78,0,0,1,69.07,28,8,8,0,0,1,76,24a59.75,59.75,0,0,1,48,24h24a59.75,59.75,0,0,1,48-24,8,8,0,0,1,6.93,4,59.74,59.74,0,0,1,5.37,47.68A58,58,0,0,1,216,104Z"></path></g></svg>
                    </span>
                    <span class="text-fuchsia-50">
                        @a0a7
                    </span>
                </a>
                <span class="text-fuchsia-50">&nbsp; | &nbsp;</span>
                <a class="linkicon !filter-none text-fuchsia-50" href="https://t.me/awa0a7" target="_blank" rel="noopener noreferrer">
                    <span class="w-5 h-5 inline text-fuchsia-50">
                        <svg width="1.25rem" height="1.25rem" class="inline cursor-pointer text-fuchsia-50 color-fuchsia-50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;" viewBox="0 0 27 27" color="rgb(253 244 255)" fill="rgb(253 244 255)"><path id="telegram-1" d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"/></svg>
                    </span>
                    <span class="text-fuchsia-50">
                        @awa0a7
                    </span>
                </a>
                <span class="text-fuchsia-50">&nbsp; | &nbsp;</span>
                <a class="linkicon !filter-none text-fuchsia-50" href="https://discord.com/users/366213124765777933" target="_blank" rel="noopener noreferrer">
                    <span class="w-5 h-5 inline text-fuchsia-50">
                        <svg  class="w-5 h-5 !filter-none inline cursor-pointer text-fuchsia-50 color-fuchsia-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" color="rgb(253 244 255)" fill="rgb(253 244 255)"><path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg>
                    </span>
                    <span class="text-fuchsia-50">
                        @a0a7
                    </span>
                </a>
            </div>
        </div>
        <span class="pr-1 mx-auto w-full text-center justify-center flex items-center md:text-center font-bold font-mastery text-fuchsia-50">
            <!--<svg class="mt-4 h-8 md:h-12" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 278 160" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0">
                <path class="white" fill="white" stroke="white" d="M211.643 54.7138l-14.3145 -13.4661c-16.957,-16.3591 -29.6255,-27.1822 -38.054,-32.5686 -8.429,-5.3364 -17.0076,-8.0297 -25.6858,-8.0297 -12.3688,0 -23.2913,4.1895 -32.7677,12.5184 -9.5259,8.3295 -14.2638,17.8053 -14.2638,28.5287 0,7.83 2.2938,14.364 6.9322,19.7504 4.6383,5.3364 10.2746,8.0297 16.9075,8.0297 8.4791,0 16.6083,-4.5388 24.3887,-13.6158 -2.2443,0.3988 -3.9897,0.5985 -5.2368,0.5985 -7.9796,0 -14.9123,-2.4441 -20.7477,-7.3817 -5.8353,-4.8875 -8.7777,-10.7729 -8.7777,-17.6056 0,-4.289 1.5457,-7.9301 4.6878,-11.0221 3.0926,-3.0425 6.7331,-4.5889 10.9226,-4.5889 11.1222,0 30.1245,13.8656 57.0068,41.6456l11.8203 12.1196c-9.1271,6.2341 -21.745,11.6707 -37.7548,16.3591 -16.0599,4.6383 -30.1245,6.9823 -42.2942,6.9823 -21.0469,0 -38.6525,-6.4339 -52.7672,-19.3016 -14.1148,-12.8176 -21.1966,-28.8274 -21.1966,-48.0293 0,-4.3892 0.5485,-8.5286 1.5958,-12.4188 -20.6481,3.6905 -30.9722,12.7681 -30.9722,27.1815 0,18.4038 9.5259,34.3641 28.5782,47.8303 19.0524,13.5156 41.496,20.2487 67.4305,20.2487 14.6136,0 34.5631,-4.9871 59.8001,-14.9124l-10.5237 10.2246c-10.7229,10.4236 -21.9447,19.1519 -33.6154,26.1842 -11.7207,7.0323 -20.8979,10.5232 -27.631,10.5232 -5.486,0 -10.0743,-1.5958 -13.8149,-4.7379 -3.7406,-3.1922 -5.6362,-7.0324 -5.6362,-11.6207 0,-1.0974 0.1496,-2.5436 0.4489,-4.3891 -13.4662,5.0371 -20.1993,11.5711 -20.1993,19.5507 0,5.5861 2.7934,10.324 8.429,14.2143 5.5862,3.8902 12.4188,5.8353 20.4985,5.8353 18.6035,0 45.9346,-17.6556 81.9941,-52.9169l10.2245 -10.0749c7.5307,-7.381 15.7105,-14.2143 24.5878,-20.4484 16.5588,16.9576 33.1671,25.4361 49.925,25.4361 10.0248,0 18.4533,-2.6932 25.1864,-8.1298 6.7831,-5.3864 10.1744,-12.0695 10.1744,-19.9495 0,-7.7804 -3.2417,-14.3144 -9.7256,-19.5012 -6.4833,-5.2368 -14.563,-7.8305 -24.2886,-7.8305 -9.8257,0 -20.2493,2.943 -31.2714,8.7783zm7.4311 6.8828c8.6782,-3.2423 15.8602,-4.8381 21.4958,-4.8381 6.9328,0 12.1196,1.0474 15.5609,3.1421 3.4414,2.0948 5.1874,5.2369 5.1874,9.4263 0,2.9424 -1.0474,5.1373 -3.0926,6.5835 -2.0447,1.4462 -5.1367,2.1943 -9.3262,2.1943 -8.9775,0 -18.9027,-5.486 -29.8253,-16.5081z"/>
            </svg>-->
            <!--<h2 class="text-[1.25rem] md:text-5xl inline mx-7 text-center ">projects</h2>-->
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
            <div class="list overflow-x-hidden inline-block flex-1 md:flex-2 flex-col flex w-full overflow-y-hidden my-4 md:mb-8 md:mt-4">
                <h2 class="-my-[16px] py-2 z-10 text-shadow overflow-x-hidden overflow-y-visible text-[2rem] md:text-[2.5rem]  text-center font-mastery text-fuchsia-50">projects</h2>
                <div class=" overflow-y-scroll overflow-x-show px-5 mx-auto w-full md:w-fit inline-block flex-1 flex-col flex md:grid md:gap-x-5 md:justify-stretch md:grid-cols-2 pb-10 {loaded == true ? '' : 'invisible'}" bind:this={list}>
                {#if currentPage === Pages.profile}
                        {#if statistics}
                            {#each Object.entries(statistics) as [key, stats]}
                            <div><StatsCard {stats} /></div>
                            {/each}
                        {/if}
                {:else if currentPage === Pages.projects}
                        {#if projects}
                            {#each Object.entries(projects) as [key, project], index (key)}
                            <div class:md:col-span-2={index === Object.entries(projects).length - 1 && Object.entries(projects).length % 2 !== 0} class:mx-auto={index === Object.entries(projects).length - 1 && Object.entries(projects).length % 2 !== 0}>
                                    <ProjectCard {project} />
                            </div>
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
    translate: 0 40px;
    top: 30;
    background: linear-gradient(to bottom, rgb(9,0,13), rgba(255,255,255,0));
}

@media (max-width: 768px) {
    .list::before {
        translate: 0 31px;
    }
}

.list::after {
    bottom: 0;
 
    background: linear-gradient(to top, rgb(9,0,13), rgba(255,255,255,0));
}

.text-shadow {
    text-shadow: 0px 4px 1px #09000d, 0px 6px 1px #09000d, 0px 8px 4px #09000d, 4px 4px 1px #09000d, -4px 4px 1px #09000d 
}
</style>
