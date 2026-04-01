export interface ProjectDetail {
  id: string;
  name: string;
  address: string;
  coords?: { lat: number; lng: number };
  status?: { stage: string; progress: number };
  possessionDate?: string;
  media?: { type: "image" | "video"; url: string }[];
  flats?: {
    type:string;
    unitsCount?: number;
    areas: { carpet: number; builtUp: number; superBuiltUp: number; plinthArea?: number };
    floors: string;
    facing: string[];
    balcony: string[];
    floorPlans: { label: string; url: string }[];
    basePricePerSqft?: number;
  }[];
  pricing?: {
    allInclusiveExample?: {
      maintenance: number;
      parking: number;
      club: number;
      gstPercent: number;
      registrationPercent: number;
    };
    banks?: string[];
    paymentSchedule?: { milestone: string; percent: number }[];
  };
  amenities?: string[];
  specs?: {
    flooring?: string;
    fittings?: string;
    kitchen?: string;
    smartHome?: string;
  };
  sustainability?: string[];
  developer?: { name: string; trackRecord: string };
  legal?: {
    rera?: string;
    approvals?: string;
    documents?: { label: string; url: string }[];
  };
  testimonials?: { name: string; text: string }[];
  awards?: string[];
  landmarks?: { type: string; name: string; distanceKm: number }[];
}
