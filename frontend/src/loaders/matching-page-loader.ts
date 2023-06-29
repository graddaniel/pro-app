import ProfilesService from '../services/profiles-service';

const matchingPageLoader = async () => {
    console.log('New profiles');
    const profiles = await ProfilesService.getProfiles();

    if (!profiles) {
        return [];
    }

    return profiles;
}

export default matchingPageLoader;