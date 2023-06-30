import ProfilesService from '../services/profiles-service';

const matchingPageLoader = async () => {
    return await ProfilesService.getProfiles();
}

export default matchingPageLoader;