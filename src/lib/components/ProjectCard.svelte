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
          <img class="w-6 whiteicon"
            src="{`img/logos/${tag.split(' ')[0].toLowerCase().replace(/[ .]/g, '')}.svg`}"
            alt="{tag} icon"
          >
        </span>
      {/each}
    </div>
  </svelte:fragment>
</AbstractCard>