import { Injectable } from '@angular/core';
declare let ga;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsProvider {

  setTracker(tracker) {
    if (!localStorage.getItem('ga:clientId')) {
      localStorage.setItem('ga:clientId', tracker.get('clientId'));
    }
  }

  startTrackerWithId(id) {
    ga('create', {
      storage: 'none',
      trackingId: id,
      clientId: localStorage.getItem('ga:clientId'),
    });
    ga('set', 'checkProtocolTask', null);
    ga('set', 'transportUrl', 'https://www.google-analytics.com/collect');
    ga(this.setTracker);
  }

  trackView(pageUrl: string, screenName: string) {
    ga('set', {
      page: pageUrl,
      title: screenName,
    });
    ga('send', 'pageview');
  }

  trackEvent(category: string, action: string, label?: string, value?: string) {
    ga('send', 'event', {
      eventCategory: category,
      eventLabel: label,
      eventAction: action,
      eventValue: value,
    });
  }
}
