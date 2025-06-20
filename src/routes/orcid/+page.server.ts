import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	redirect(302, 'https://orcid.org/my-orcid?orcid=0009-0008-5679-3042');
};
