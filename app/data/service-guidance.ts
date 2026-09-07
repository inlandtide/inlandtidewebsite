type ServiceGuidance = {
  title: string;
  description: string;
  introduction: string;
  questions: Array<{ question: string; answer: string }>;
};

// Visible planning information, not project-specific prices or promises.
export const serviceGuidance: Record<string, ServiceGuidance> = {
  "picture-frame-moulding": {
    title: "Picture Frame Moulding Installation in St. Louis",
    description: "Custom picture frame moulding installation for St. Louis homes. Plan wall panels for dining rooms, stairways and bedrooms with Moulding Saint Louis.",
    introduction: "We design and install picture frame moulding for St. Louis homes, creating decorative wall panels around the proportions of each room. Also called picture frame molding, box moulding or panel moulding, this wall treatment adds definition without covering the entire wall in wood.",
    questions: [
      { question: "Is picture frame moulding the same as picture framing?", answer: "Here, picture frame moulding means decorative trim installed directly on an interior wall to form rectangular panels. It is an architectural wall treatment; framing a photograph or artwork is a different service." },
      { question: "How is the panel layout planned?", answer: "Wall dimensions, doors, windows, outlets and furniture placement all affect the layout. Panel widths and spacing can be adjusted for a dining room, headboard wall or stairway rather than repeating one standard panel size everywhere." },
      { question: "What affects the cost of picture frame moulding installation?", answer: "The number and size of walls, panel count, moulding profile, wall condition and finish scope all affect an estimate. Stairs and irregular walls may require additional layout and fitting. Send room photos, approximate dimensions and inspiration with your consultation request so we can discuss the scope." },
      { question: "Can picture frame moulding work with existing trim?", answer: "Yes. The layout can be planned around existing baseboards, crown and chair rail. Profile depth and panel spacing should complement the surrounding trim. Discuss paint, stain and any wall preparation as part of the project scope." },
    ],
  },
  "crown-moulding": {
    title: "Crown Moulding Installation in St. Louis",
    description: "Crown moulding installation in St. Louis, with profile guidance and careful fitting. Discuss ceiling height, existing trim and your project with our team.",
    introduction: "Moulding Saint Louis helps homeowners select and install crown moulding that fits the room. Whether you call it crown moulding or crown molding, the goal is a well-proportioned transition between the walls and ceiling, coordinated with the home's existing trim.",
    questions: [
      { question: "What size crown moulding works with my ceiling height?", answer: "Ceiling height is a starting point, but room size, existing casing and the profile's visual weight also matter. A simple profile and a layered crown can read very differently at the same height. Room photos and dimensions help us discuss an appropriate scale." },
      { question: "Can crown moulding be added to an existing room?", answer: "Yes. Planning starts with the wall and ceiling condition, corners, existing trim and any cabinets or other features that meet the ceiling. These details help determine the profile and installation approach." },
      { question: "What affects a crown moulding installation estimate?", answer: "The length of the runs, number of corners, ceiling height, material, profile complexity and finish scope all influence cost. Built-up crown and unusual ceiling transitions require more fitting than a simple room. Share photos and approximate room dimensions when requesting an estimate." },
      { question: "Should crown match the door and window casing?", answer: "It does not have to repeat the same profile, but its scale and style should work with the casing and baseboards. We can discuss crown as a single-room detail or as part of a coordinated trim update." },
    ],
  },
  "wainscoting-beadboard": {
    title: "Wainscoting & Beadboard Installation in St. Louis",
    description: "Custom wainscoting and beadboard installation for St. Louis homes. Explore panel styles, heights and layouts, then request a consultation for your rooms.",
    introduction: "We design and install wainscoting and beadboard for St. Louis dining rooms, hallways, stairways and other interior spaces. The panel style, height and cap details are planned together so the wall treatment works with the room's doors, windows and existing trim.",
    questions: [
      { question: "What is the difference between wainscoting and beadboard?", answer: "Wainscoting describes a treatment covering the lower part of an interior wall. Beadboard is one panel style, recognized by narrow vertical boards or grooves. Wainscoting can also use other panel layouts, depending on the character of the room." },
      { question: "How high should wainscoting be?", answer: "There is no single height that suits every room. Ceiling height, window sills, furniture and nearby trim should inform the cap line. A dining room and a stairway may need different approaches to keep the proportions balanced." },
      { question: "Can beadboard or wainscoting be used in a bathroom?", answer: "It can be considered for suitable areas, but moisture exposure, ventilation, material choice and finish need careful review. A decorative wall treatment is not a substitute for waterproofing. Tell us where you want the panels installed so we can discuss appropriate options." },
      { question: "What should I send for a wainscoting estimate?", answer: "Share photos of each wall, approximate dimensions, your location and examples of the panel style you like. Wall preparation, panel complexity, outlets, stairs and the painting or staining scope affect the estimate and should be discussed before installation." },
    ],
  },
};
