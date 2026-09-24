import type { Service } from "./services";
type Presentation = {
  headline: string;
  copy: string;
  image: string;
  alt: string;
  label: string;
  benefit: string;
};
const presentations: Record<string, Presentation> = {
  "picture-frame-moulding": {
    headline: "Picture frame moulding. A room transformed.",
    copy: "Turn a plain wall into the room’s defining detail. We design and install custom wall moulding around your space, your style, and the way you want your home to feel.",
    image: "/images/gallery/picture-frame-moulding-12.jpg",
    alt: "Blue picture frame wall moulding with chair rail and crown, from a Moulding Saint Louis project",
    label: "From our project gallery",
    benefit: "A favorite room, with a whole new sense of character.",
  },
  "wainscoting-beadboard": {
    headline: "Wainscoting with lasting character.",
    copy: "Give your dining room, entryway, or hallway a beautifully finished feel. Thoughtful panel styles and proportions, designed around the details of your St. Louis home.",
    image: "/images/placeholders/wainscoting-beadboard.jpg",
    alt: "Wainscoting and wall panel design inspiration",
    label: "Design inspiration",
    benefit: "Texture, proportion, and a detail you will enjoy every day.",
  },
  "crown-moulding": {
    headline: "Crown moulding. The finishing touch.",
    copy: "Bring the room together with a beautifully considered ceiling line. We help you choose the right profile and scale, then fit each detail with care.",
    image: "/images/placeholders/crown-moulding.jpg",
    alt: "Crown moulding design inspiration in a finished room",
    label: "Design inspiration",
    benefit: "A room that feels complete, right up to the ceiling.",
  },
};
export function getPresentation(service: Service): Presentation {
  return (
    presentations[service.slug] ?? {
      headline: service.title + ", thoughtfully considered.",
      copy: service.hero,
      image: "/images/placeholders/" + service.slug + ".jpg",
      alt: service.title + " design inspiration",
      label: "Design inspiration",
      benefit: "Made to feel like it always belonged in your home.",
    }
  );
}
export const adServiceSlugs = [
  "picture-frame-moulding",
  "wainscoting-beadboard",
  "crown-moulding",
];
