import { analytics } from '../config/firebase';
import mixpanel from '../config/mixpanel';

const logEvent = (eventName, eventData) => {
    if(analytics) analytics.logEvent(eventName, eventData);
    mixpanel.track(eventName, eventData);
}

const setUserProperties = (uid, userDetails) => {
    if(analytics) analytics.setUserProperties(uid, userDetails);
    mixpanel.identify(uid);
    mixpanel.people.set(userDetails);
}


export {
    logEvent,
    setUserProperties
}