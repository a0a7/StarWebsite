<script lang="ts">
    export let type: string | undefined = undefined
    export let project: any
</script>

<div class="relative inline-block">
    <a class="outlink-icon color-white {type === 'curseforge' ? 'w-8' : ''}"
       href="{(type === 'github' ? `https://github.com/${project.github}` : project[`${type === 'web' ? '' : type}_url`]) ?? '#'}"
       target="_blank"
    >
    <img src="img/logos/{type}.svg" 
         title="{type.charAt(0).toUpperCase() + type.slice(1)} Icon" 
         alt="{type.charAt(0).toUpperCase() + type.slice(1)} Icon" 
         class="{type === 'web' ? 'w-6' : 'w-5'} inline site-icon {type === 'curseforge' ? 'transform translate-y-[1px]' : ''}"
    >
    <svg class="absolute top-0 right-px w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#261e29" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </a>
</div>

<style>
    .site-icon {
        filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7492%) hue-rotate(267deg) brightness(99%) contrast(102%);
    }

    .outlink-icon {
        transition: transform 0.05s ease-in;
        position: relative;
        text-decoration: none;
    }

    .outlink-icon:hover {
        transform: scale(1.1);
        opacity: 0.8;
    }
</style>