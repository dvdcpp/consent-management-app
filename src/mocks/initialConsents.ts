import { ConsentData } from "@/types/consents";

export const initialConsents: ConsentData[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    permissions: {
      receiveNewsletter: true,
      showTargetedAds: false,
      contributeToStatistics: true,
    },
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    permissions: {
      receiveNewsletter: false,
      showTargetedAds: true,
      contributeToStatistics: true,
    },
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    permissions: {
      receiveNewsletter: true,
      showTargetedAds: true,
      contributeToStatistics: false,
    },
  },
];
