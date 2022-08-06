import { isDevelopment } from './environment';
import { analytics } from '../config/firebase';
import mixpanel from '../config/mixpanel';
import { logEvent as logEventToAnalytics } from 'firebase/analytics'

const logEvent = (eventName: string, eventData: any = null) => {
    
    // Only log analytics if NOT in development mode (because analytics doesn't exist in development mode)
    if(isDevelopment() || !analytics) return;
    logEventToAnalytics(analytics, eventName, eventData);
    mixpanel.track(eventName, eventData);
}

const setUserProperties = (uid: string, userDetails: any) => {
    
    // Only log analytics if NOT in development mode (because analytics doesn't exist in development mode)
    if(isDevelopment() || !analytics) return;
    //@ts-ignore
    analytics.setUserProperties(uid, userDetails);
    //@ts-ignore
    mixpanel.identify(uid);
    //@ts-ignore
    mixpanel.people.set(userDetails);
}


export {
    logEvent,
    setUserProperties
}