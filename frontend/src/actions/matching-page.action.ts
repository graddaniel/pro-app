import ProfilesService from "../services/profiles-service"

const matchingPageAction = async () => {
    const profiles = await ProfilesService.getProfiles();
    if (!profiles) {
        return [];
    }

    return profiles;
}

export default matchingPageAction;
