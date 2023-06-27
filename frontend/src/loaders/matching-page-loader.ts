import ProfilesService from "../services/profiles-service";

const profilesLoader = async () => {
    const profiles = await ProfilesService.getProfiles();

    if (!profiles) {
        return [];
    }

    return profiles;
}

export default profilesLoader;