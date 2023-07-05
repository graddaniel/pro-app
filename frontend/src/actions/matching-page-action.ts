import ProfilesService from "../services/profiles-service"

const matchingPageAction = async ({ request }) => {
    const form = await request.formData();
    const ids = form.getAll('profileId[]');
    const accepts = form.getAll('accepted[]');

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const accepted = accepts[i] === 'true' ? true : false;

        try {
            await ProfilesService.swipeProfile(id, accepted);
        } catch (error) {
            return error;
        }
    }

    return null;
}

export default matchingPageAction;
