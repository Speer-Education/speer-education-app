import mixpanel from 'mixpanel-browser';
import { isDevelopment } from '../utils/environment';

mixpanel.init('3cecd35fa631bb038e423f3a3cc4adc5', {debug: isDevelopment()}); 
mixpanel.track('Page Loaded');

export default mixpanel;
