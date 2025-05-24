<script lang="ts">
	  import LinkIcon from './LinkIcon.svelte';
    import AbstractCard from './AbstractCard.svelte';
    export let project: any
</script>

<AbstractCard>
  <svelte:fragment slot="title">
    <a href={project.github ? `https://github.com/${project.github}` : project.web_url ?? '#'} target="_blank" class="text-white color-white inline">
      {project.name} 
    </a>
    {#if project.github}
      <LinkIcon type="github" project={project} />
    {/if}
    {#if project.modrinth_url}
      <LinkIcon type="modrinth" project={project} />
    {/if}
    {#if project.curseforge_url}
      <LinkIcon type="curseforge" project={project} />
    {/if}
    {#if project.firefox_url}
      <LinkIcon type="firefox" project={project} />
    {/if}
    {#if project.url}
      <LinkIcon type="web" project={project} />
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
          <img class="w-6 {tag!=="cloudflareworkers"?'whiteicon':''}"
            src="{`img/logos/${tag.split(' ')[0].toLowerCase().replace(/[ .]/g, '')}.svg`}"
            alt="{tag} icon"
          >
        </span>
      {/each}
    </div>
  </svelte:fragment>8
  <svelte:fragment slot="image">
    {#if project.image === "aes.png" || project.image === "motiongis.png"}
    <div class="relative h-full w-full mr-5 mt-1 z-0">
      <img
        alt={project.image.split('.')[0]}
        src={project.image}
        class="h-[90%] my-auto absoulte opacity-[25%] w-full object-contain z-0"
        style="filter: invert(78%) sepia(6%) saturate(700%) hue-rotate(251deg) brightness(81%) contrast(86%) blur(2px);
               mask-image: linear-gradient(to bottom right, transparent 21%, black 75%, black 100%); -webkit-mask-image: linear-gradient(to bottom right, transparent 21%, black 75%, black 100%);
        "
      >
    </div>
    {/if}
  </svelte:fragment>

</AbstractCard>