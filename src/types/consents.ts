export interface ConsentData {
  name: string;
  email: string;
  permissions: {
    receiveNewsletter: boolean;
    showTargetedAds: boolean;
    contributeToStatistics: boolean;
  };
}