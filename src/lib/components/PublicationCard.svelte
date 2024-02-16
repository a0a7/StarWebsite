<script lang="ts">
    import AbstractCard from './AbstractCard.svelte';
    export let publication: any
</script>

<AbstractCard>
  <svelte:fragment slot="title">
    <a href={publication.link} target="_blank" class="text-white color-white linktext inline">
      {publication.name} 
      <img src={`img/logos/${publication.publisher}.svg`} alt={`${publication.publisher} Icon`} class="w-5 linkicon inline">
    </a>
  </svelte:fragment>
  <svelte:fragment slot="date">
    {(() => {
        return new Date(publication.date)
        .toLocaleString([], { month: "short", year: "numeric" });
    }
    )()}
  </svelte:fragment>
  <svelte:fragment slot="end">
  </svelte:fragment>
</AbstractCard>