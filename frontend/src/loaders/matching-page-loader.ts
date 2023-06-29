import ProfilesService from '../services/profiles-service';

const matchingPageLoader = async () => {
    const profiles = await ProfilesService.getProfiles();

    if (!profiles) {
        return [];
    }

    return profiles;
}

export default matchingPageLoader;