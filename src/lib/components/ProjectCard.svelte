<script lang="ts">
	import { parse } from 'yaml';
    import svelteTilt from 'vanilla-tilt-svelte';
    export let project: any
</script>
  
<div 
  class="bg-glassomorphism md:w-[25rem] w-full p-4 my-5" 
  use:svelteTilt={{
    max: 15,
    perspective: 1500,
    scale: 1.05,
    speed: 500,
    glare: true,
    "max-glare": 0.3,
    "glare-prerender": false,
    gyroscope: true,
  }}
>
  <h2 class="text-xl text-bold text-fuchsia-50 font-varela">
    {project.name} 
    <a href={`https://github.com/${project.github}`} target="_blank" class="color-white inline">
      <img src="img/logos/github.svg" class="w-5 linkicon inline">
    </a>
    {#if project.curseforge_url}
      <a href="{project.curseforge_url}" target="_blank" class="color-white w-8">
        <img src="img/logos/curseforge.svg" class="w-5 linkicon inline">
      </a>
    {/if}
    {#if project.modrinth_url}
      <a href="{project.modrinth_url}" target="_blank" class="color-white">
        <img src="img/logos/modrinth.svg" class="w-5 linkicon inline">
      </a>
    {/if}
    {#if project.url}
      <a href="{project.url}" target="_blank" class="color-white">[Web]</a>
    {/if}
  </h2>
  <p class="text-sm text-fuchsia-50 font-varela opacity-85">
    {(() => {
      let startDate = new Date(project.start_date);
      let endDate = new Date(project.end_date);

      return `${startDate.toLocaleString([], {
        month: "short",
        year: "numeric"
      })} - ${endDate.toLocaleString([], {
        month: "short",
        year: "numeric"
      })}`}
    )()}
  </p>
  <p class="text-sm text-fuchsia-50 pt-2 font-varela">{project.description}</p>
  <div class="flex flex-row space-x-2 pt-2">
    {#each project.technologies as tag}
      <span class="pr-1 tooltip font-varela" data-text="{tag}">
        <img class="w-6 whiteicon"
          src="{`img/logos/${tag.toLowerCase().replace(/[ .]/g, '')}.svg`}"
          alt="{tag} icon"
        >
      </span>
    {/each}
  </div>
</div>