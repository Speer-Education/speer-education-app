import { isDevelopment } from './environment';
import { analytics } from '../config/firebase';
import mixpanel from '../config/mixpanel';
import { logEvent as logEventToAnalytics } from 'firebase/analytics'
import * as amplitude from '@amplitude/analytics-browser';
import smartlookClient from 'smartlook-client';

const logEvent = (eventName: string, eventData: any = null) => {
    
    // Only log analytics if NOT in development mode (because analytics doesn't exist in development mode)
    if(isDevelopment() || !analytics) return;
    logEventToAnalytics(analytics, eventName, eventData);
    mixpanel.track(eventName, eventData);
    amplitude.track(eventName, eventData);
    smartlookClient.track(eventName, eventData);
}

const setUserProperties = (uid: string, userDetails: any) => {
    
    // Only log analytics if NOT in development mode (because analytics doesn't exist in development mode)
    if(isDevelopment()) return;
    //@ts-ignore
    if(analytics) analytics.setUserProperties(uid, userDetails);
    //@ts-ignore
    mixpanel.identify(uid);
    //@ts-ignore
    mixpanel.people.set(userDetails);

    //Amplitude
    const event = new amplitude.Identify();
    for (const key in userDetails) {
        event.set(key, userDetails[key]);
    }
    amplitude.identify(event, {
        'user_id': uid,
    });

    //Smartlook
    smartlookClient.identify(uid, userDetails);

}


export {
    logEvent,
    setUserProperties
}