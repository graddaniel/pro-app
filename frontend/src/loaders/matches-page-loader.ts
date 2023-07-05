import ProfilesService from '../services/profiles-service';

const matchesPageLoader = async () => {
    return await ProfilesService.getMatchesProfiles();
};

export default matchesPageLoader;