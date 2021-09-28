import { isDevelopment } from './environment';
import { analytics } from '../config/firebase';
import mixpanel from '../config/mixpanel';

const logEvent = (eventName, eventData) => {
    
    // Only log analytics if NOT in development mode (because analytics doesn't exist in development mode)
    if(isDevelopment() || !analytics) return;
    analytics.logEvent(eventName, eventData);
    mixpanel.track(eventName, eventData);
}

const setUserProperties = (uid, userDetails) => {
    
    // Only log analytics if NOT in development mode (because analytics doesn't exist in development mode)
    if(isDevelopment() || !analytics) return;
    analytics.setUserProperties(uid, userDetails);
    mixpanel.identify(uid);
    mixpanel.people.set(userDetails);
}


export {
    logEvent,
    setUserProperties
}