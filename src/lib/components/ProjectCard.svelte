<script lang="ts">
    export let project: any
</script>
  
<div>
  <h2 class="text-xl font-bold">
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

  <p class="text-sm">{project.description}</p>
</div>