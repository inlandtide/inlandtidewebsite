export type Service = {
  title: string;
  slug: string;
  summary: string;
  hero: string;
  details: string[];
  idealFor: string[];
  highlights: string[];
  cta: string;
};

export const services: Service[] = [
  {
    title: "Luxury & Decorative Moulding",
    slug: "luxury-decorative-moulding",
    summary:
      "Custom moulding profiles and decorative details that bring depth, proportion, and refinement to elevated interiors.",
    hero:
      "Luxury moulding gives a room architectural intention. We help St. Louis homeowners add tailored profiles, accent walls, and refined details that make interiors feel complete rather than simply decorated.",
    details: [
      "Decorative moulding can define a formal dining room, add structure to a hallway, frame a feature wall, or give a living space a more substantial custom-built presence.",
      "Our approach centers on proportion, clean layout, careful installation, and finishes that feel appropriate to the home. Quality wood products are our specialty, and similar or requested materials can be discussed when they fit the project goals.",
    ],
    idealFor: ["Formal living rooms", "Dining rooms", "Feature walls", "Entry halls", "Primary suites"],
    highlights: ["Custom layout planning", "Profile and scale guidance", "Premium painted or stained finishes"],
    cta: "Start a Custom Moulding Project",
  },
  {
    title: "Picture Frame Moulding",
    slug: "picture-frame-moulding",
    summary:
      "Elegant wall panel designs for dining rooms, entries, stairways, hallways, bedrooms, and formal living spaces.",
    hero:
      "Picture frame moulding creates rhythm, symmetry, and a quiet sense of luxury on otherwise plain walls.",
    details: [
      "This treatment is ideal when a room needs architectural interest without heavy cabinetry or major remodeling. Proper spacing, rail alignment, and panel proportions are what make the finished result feel custom.",
      "We can design stand-alone picture frame moulding or integrate it with crown moulding, chair rail, wainscoting, wallpaper, or painted two-tone wall finishes.",
    ],
    idealFor: ["Dining rooms", "Stairwells", "Hallways", "Offices", "Bedrooms"],
    highlights: ["Balanced panel layouts", "Room-specific proportions", "Pairs well with rail and crown details"],
    cta: "Plan Picture Frame Moulding",
  },
  {
    title: "Crown Moulding",
    slug: "crown-moulding",
    summary:
      "Carefully installed crown details that create a graceful transition between walls and ceilings.",
    hero:
      "Crown moulding softens the meeting point between wall and ceiling while adding a finished, elevated character to the room.",
    details: [
      "From restrained profiles to more dramatic built-up crown packages, crown moulding should be scaled to ceiling height, room style, and surrounding trim.",
      "We help homeowners choose profiles that complement the space and install them with attention to clean corners, consistent reveals, and a polished final finish.",
    ],
    idealFor: ["Main living spaces", "Dining rooms", "Primary bedrooms", "Home offices", "Whole-home trim upgrades"],
    highlights: ["Profile scale recommendations", "Single or layered crown details", "Coordinated trim packages"],
    cta: "Request a Crown Moulding Estimate",
  },
  {
    title: "Wainscoting & Beadboard",
    slug: "wainscoting-beadboard",
    summary:
      "Premium wall treatments that add texture, durability, rhythm, and architectural character.",
    hero:
      "Wainscoting and beadboard add depth, durability, and a tailored architectural rhythm to rooms that deserve more than flat drywall.",
    details: [
      "The best wall treatments feel built into the room. Height, spacing, cap details, panel width, and finish quality all shape whether the result feels custom and balanced.",
      "We create refined wainscoting and beadboard treatments for traditional, transitional, and custom interiors using quality wood products and appropriate material options when requested.",
    ],
    idealFor: ["Dining rooms", "Bathrooms", "Mudrooms", "Hallways", "Stairways"],
    highlights: ["Custom height and spacing", "Beadboard and panel concepts", "Durable, elegant wall protection"],
    cta: "Design Wainscoting",
  },
  {
    title: "Chair Rail & Picture Rail",
    slug: "chair-rail-picture-rail",
    summary:
      "Classic rail details that define proportions, protect walls, and support traditional or transitional design.",
    hero:
      "Chair rail and picture rail introduce proportion, function, and period-inspired character to walls that need definition.",
    details: [
      "Rail details can stand alone or become part of a complete wall treatment. They are especially useful for defining two-tone paint, supporting wallpaper concepts, or connecting picture frame moulding layouts.",
      "We help establish the right height, profile, and surrounding details so the rail feels intentional rather than added as an afterthought.",
    ],
    idealFor: ["Dining rooms", "Historic-inspired interiors", "Hallways", "Stairways", "Formal rooms"],
    highlights: ["Chair rail and picture rail guidance", "Wall protection and proportion", "Strong pairing with panel moulding"],
    cta: "Discuss Rail Details",
  },
  {
    title: "Fireplace Mantels & Surrounds",
    slug: "fireplace-mantels-surrounds",
    summary:
      "Custom fireplace features designed to become a natural focal point in the room.",
    hero:
      "A fireplace mantel or surround should feel like a focal point that belongs to the architecture of the home.",
    details: [
      "We design and install fireplace wood details that add weight, balance, and craftsmanship to the room, whether the goal is classic restraint or a more dramatic custom feature.",
      "Scale, trim coordination, finish selection, and the relationship to nearby built-ins or wall moulding are all considered during planning.",
    ],
    idealFor: ["Living rooms", "Family rooms", "Primary suites", "Sitting rooms", "Renovated fireplace walls"],
    highlights: ["Custom mantel concepts", "Surround and trim coordination", "Premium focal-point craftsmanship"],
    cta: "Create a Fireplace Feature",
  },
  {
    title: "Window & Door Casing",
    slug: "window-door-casing",
    summary:
      "Upgraded casing that gives windows, doors, and openings a more finished, substantial presence.",
    hero:
      "Window and door casing can quietly transform the feel of a home by giving openings a more substantial and finished presence.",
    details: [
      "Casing upgrades are a strong option for homeowners who want a more refined interior without changing the overall layout of the room.",
      "We coordinate casing profiles with baseboards, crown, wall treatments, and cased openings so the home feels cohesive rather than pieced together.",
    ],
    idealFor: ["Interior doors", "Windows", "Cased openings", "Hallways", "Whole-room trim upgrades"],
    highlights: ["Coordinated trim profiles", "Clean reveal lines", "Substantial finished openings"],
    cta: "Upgrade Interior Casing",
  },
  {
    title: "Archways & Entryways",
    slug: "archways-entryways",
    summary:
      "Architectural transitions that make movement between rooms feel intentional and refined.",
    hero:
      "Archways and entryways define how rooms connect, creating a sense of arrival and architectural flow.",
    details: [
      "Plain openings can be transformed with casing, panel returns, trim build-ups, and proportional details that make transitions feel intentional.",
      "We help refine entry halls, dining room openings, living room transitions, and other passages with wood details that complement the rest of the home.",
    ],
    idealFor: ["Entry halls", "Dining room openings", "Living room transitions", "Cased openings", "Hallway thresholds"],
    highlights: ["Refined room transitions", "Custom cased openings", "Coordinated architectural details"],
    cta: "Enhance an Entryway",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
