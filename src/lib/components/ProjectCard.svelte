<script lang="ts">
    import svelteTilt from 'vanilla-tilt-svelte';
    import AbstractCard from './AbstractCard.svelte';
    export let project: any
</script>

<AbstractCard>
  <svelte:fragment slot="title">
    <a href={`https://github.com/${project.github}`} target="_blank" class="text-white color-white linktext inline">
      {project.name} 
    </a>
    <a href={`https://github.com/${project.github}`} target="_blank" class="color-white inline">
      <img src="img/logos/github.svg" alt="Github Icon" class="w-5 linkicon inline">
    </a>
    {#if project.modrinth_url}
      <a href="{project.modrinth_url}" target="_blank" class="color-white">
        <img src="img/logos/modrinth.svg" alt="Modrinth Icon" class="w-5 linkicon inline">
      </a>
    {/if}
    {#if project.curseforge_url}
    <a href="{project.curseforge_url}" target="_blank" class="color-white w-8">
      <img src="img/logos/curseforge.svg" alt="Curseforge Icon" class="w-5 linkicon inline">
    </a>
    {/if}
    {#if project.url}
      <a href="{project.url}" target="_blank" class="color-white">
        <img src="img/logos/web.svg" alt="Web Icon" class="w-5 linkicon inline">
      </a>
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="date">
    {(() => {
      
      let startDate = new Date(project.start_date)
        .toLocaleString([], { month: "short", year: "numeric" }),
      endDate = new Date(project.end_date)
        .toLocaleString([], { month: "short", year: "numeric" });

      return startDate 
        + (startDate == endDate 
        ? ""
        : ` - ${endDate}`)}
    )()}
  </svelte:fragment>
  <svelte:fragment slot="end">
    <p class="text-sm text-fuchsia-50 pt-2 font-varela">{project.description}</p>
    <div slot="end" class="flex flex-row space-x-2 pt-2">
      {#each project.technologies as tag}
        <span class="pr-1 tooltip font-varela" data-text="{tag}">
          <img class="w-6 whiteicon"
            src="{`img/logos/${tag.toLowerCase().replace(/[ .]/g, '')}.svg`}"
            alt="{tag} icon"
          >
        </span>
      {/each}
    </div>
  </svelte:fragment>
</AbstractCard>