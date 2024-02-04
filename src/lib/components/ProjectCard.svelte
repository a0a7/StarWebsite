<script lang="ts">
    import svelteTilt from 'vanilla-tilt-svelte';
    export let project: any
</script>
  
<div 
  class="bg-glassomorphism w-[25rem] p-4 my-5" 
  use:svelteTilt={{
    max: 15,
    perspective: 1000,
    scale: 1,
    speed: 100,
    glare: true,
    "max-glare": 0.3,
    "glare-prerender": false,
    gyroscope: true,
  }}
>
  <h2 class="text-xl font-bold text-fuchsia-50">
    {project.name} 
    <a href={`https://github.com${project.github}`} target="_blank" class="text-blue-500 hover:underline">[Github]</a>
    {#if project.curseforge_url}
      <a href="{project.curseforge_url}" target="_blank" class="text-blue-500 hover:underline">[CurseForge]</a>
    {/if}
    {#if project.modrinth_url}
      <a href="{project.modrinth_url}" target="_blank" class="text-blue-500 hover:underline">[Modrinth]</a>
    {/if}
    {#if project.url}
      <a href="{project.url}" target="_blank" class="text-blue-500 hover:underline">[Web]</a>
    {/if}
  </h2>
  <p class="text-sm text-fuchsia-50">{project.description}</p>
  <div class="flex flex-row space-x-2">
    {#each project.technologies as tag}
      <span class="px-1"><img class="w-10" src="{`img/logos/${tag.toLowerCase().replace(/[ .]/g, '')}.svg`}" alt="{`${tag} icon`}"></span>
    {/each}
  </div>
</div>