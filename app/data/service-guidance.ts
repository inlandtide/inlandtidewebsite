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
  "custom-cabinetry-casework": {
    title: "Custom Cabinetry & Casework in St. Louis",
    description: "Custom cabinetry and casework designed for St. Louis homes, with CKC Woodworks shop capabilities. Discuss storage, materials and fit at a free consultation.",
    introduction: "We plan and build custom cabinetry and casework for St. Louis homes, from storage walls and home offices to cabinetry shaped around an unusual space. As the residential arm of CKC Woodworks, Moulding Saint Louis brings the equipment, skilled craftspeople and production capacity of a full commercial architectural millwork shop to your project.",
    questions: [
      { question: "What is the difference between custom cabinetry and casework?", answer: "Cabinetry usually describes cabinets with doors, drawers or shelves. Casework is a broader term for constructed storage units and fitted wood components. For your home, the useful starting point is how the space should function, what it needs to hold and how it should look alongside the surrounding trim." },
      { question: "Can cabinetry be made for an unusual room or opening?", answer: "Custom work can be planned around wall dimensions, ceiling height, existing openings and storage needs. We review access, outlets, clearances and the condition of the surrounding space before settling on a layout. Final measurements and material choices are part of the project planning." },
      { question: "How does the CKC Woodworks shop support residential cabinetry?", answer: "Moulding Saint Louis is the residential arm of CKC Woodworks. Our projects draw on the same commercial architectural millwork shop, equipment and experienced craftspeople. That capacity supports custom dimensions, coordinated components and wood details designed together for your home." },
      { question: "What should I send for a custom cabinetry consultation?", answer: "Send photos of the space, approximate dimensions, your location and examples of the style you like. Tell us what you want to store and whether the scope includes doors, drawers, shelving or adjacent trim. Materials, hardware, finishes, installation access and project complexity all affect the proposal." },
    ],
  },
  "custom-built-ins-shelving": {
    title: "Custom Built-ins & Shelving in St. Louis",
    description: "Custom built-ins, bookcases and shelving for St. Louis homes. Plan fitted storage for living rooms, offices and alcoves with a free consultation.",
    introduction: "Moulding Saint Louis designs and installs custom built-ins, bookcases and shelving for St. Louis homes. We plan the storage, proportions and trim together so a living room, home office or alcove feels considered. Our CKC Woodworks architectural millwork shop provides the manufacturing capability behind the custom work.",
    questions: [
      { question: "Can built-ins be fitted around a fireplace or into an alcove?", answer: "Yes, a layout can be considered around an existing fireplace, alcove, window or other room feature. Measurements, fireplace clearances, access and nearby outlets need review before the design is finalized. We coordinate the shelving and surrounding trim with those constraints." },
      { question: "Can a built-in combine open shelves and closed storage?", answer: "Open shelves, cabinets and drawers can be planned together around what you need to display or store. Shelf spacing, depth and material should suit the intended use. Tell us about books, electronics, display pieces or office supplies so the layout has a practical purpose." },
      { question: "How do you make built-ins work with existing trim?", answer: "We consider the room's baseboards, crown, casing, proportions and finish when planning the new work. A built-in does not need to copy every existing profile, but its transitions should feel deliberate. Discuss paint, stain and any changes to adjacent trim as part of the scope." },
      { question: "What affects a custom built-in estimate?", answer: "Overall dimensions, shelf count, doors and drawers, material, hardware, finish scope and installation conditions all influence an estimate. Photos, approximate dimensions and inspiration help us start a useful conversation. We offer free consultations without listing a one-size-fits-all project price." },
    ],
  },
  "luxury-decorative-moulding": {
    title: "Decorative Moulding & Custom Trim in St. Louis",
    description: "Decorative moulding and custom trim for St. Louis homes. Coordinate profiles, room proportions and existing woodwork with Moulding Saint Louis.",
    introduction: "We design and install decorative moulding and custom interior trim for St. Louis homes. From a single feature to a coordinated room, profiles and proportions are selected to complement the architecture, existing woodwork and way you use the space.",
    questions: [
      { question: "Can decorative moulding suit a modern home?", answer: "Yes. Simple profiles, restrained layouts and careful spacing can create definition in a modern interior. More layered profiles can suit traditional rooms. The right approach depends on the architecture and the amount of detail you want." },
      { question: "Can new moulding work with the trim already in my home?", answer: "We review the existing crown, casing, baseboards and other woodwork when planning new trim. The goal is to coordinate scale and transitions. Photos of adjacent rooms and close-ups of the existing profiles help us assess the options." },
      { question: "Where should I start when planning a decorative trim project?", answer: "Choose the rooms or walls you want to improve, then share photos and inspiration with our team. We can discuss wall panels, crown, casing and other details together. Material, preparation and finish scope should be agreed on before installation." },
    ],
  },
  "chair-rail-picture-rail": {
    title: "Chair Rail & Picture Rail Installation in St. Louis",
    description: "Chair rail and picture rail installation for St. Louis homes. Plan the height, profile and transitions alongside wall panels and existing trim.",
    introduction: "We plan and install chair rail and picture rail for St. Louis interiors. A chair rail can define the lower wall or complete a panel treatment, while a picture rail creates a detail higher on the wall. Placement and profile are considered alongside doors, windows and the room's other trim.",
    questions: [
      { question: "What is the difference between chair rail and picture rail?", answer: "Chair rail is usually installed along the lower portion of a wall, often as a border or part of wainscoting. Picture rail is typically higher and may be used with appropriate picture-hanging hardware. If hanging artwork is your goal, discuss the rail profile and intended loads before installation." },
      { question: "How is the rail height chosen?", answer: "Ceiling height, window sills, furniture and the proportions of any wall panels all inform placement. We plan the rail line and its transitions at doors and other openings together instead of relying on a standard height for every room." },
      { question: "Can a rail be installed with picture frame moulding?", answer: "Yes. Chair rail and rectangular wall panels can be designed as one coordinated treatment. The cap height, panel spacing and existing baseboards should work together. Share room photos and the style you have in mind for a consultation." },
    ],
  },
  "fireplace-mantels-surrounds": {
    title: "Custom Fireplace Mantels & Surrounds in St. Louis",
    description: "Custom wood fireplace mantels and surrounds for St. Louis homes. Plan proportions, trim and surrounding cabinetry with Moulding Saint Louis.",
    introduction: "Moulding Saint Louis plans and builds custom wood fireplace mantels and surrounds for St. Louis homes. We consider the fireplace, wall proportions, nearby trim and any built-in storage together, with required clearances guiding the design.",
    questions: [
      { question: "Can you update the wood surround around an existing fireplace?", answer: "An existing fireplace can be assessed for a new mantel or wood surround. We need to review the appliance type, available dimensions and required clearances before agreeing on a design. This is architectural woodwork; fireplace appliance repairs or fuel-system changes require the appropriate specialist." },
      { question: "Can a mantel be coordinated with built-ins?", answer: "Yes. Shelving, cabinetry and the mantel can be planned together so the wall has consistent proportions and trim details. Tell us about storage needs and any television or electronics, including cable access, when discussing the layout." },
      { question: "What information helps with a mantel estimate?", answer: "Send a full photo of the fireplace wall, approximate dimensions, inspiration and the fireplace make or model if available. Material, profile complexity, existing finishes and installation conditions affect the scope. Clearances should be confirmed before wood components are fabricated." },
    ],
  },
  "window-door-casing": {
    title: "Window & Door Casing Installation in St. Louis",
    description: "Custom window and door casing for St. Louis homes. Coordinate interior trim profiles, proportions and existing woodwork with Moulding Saint Louis.",
    introduction: "We design and install interior window and door casing for St. Louis homes. New casing can bring definition to an opening or help coordinate trim across several rooms. Profile, width and transitions are considered with the doors, windows, baseboards and crown already in place.",
    questions: [
      { question: "Can casing be replaced without replacing the window or door?", answer: "In many projects, the surrounding interior casing can be changed while the window or door remains. We review the condition of the opening, existing jambs and adjacent surfaces first. Repairs or adjustments outside the trim scope should be identified during planning." },
      { question: "Can new casing match existing woodwork?", answer: "We can discuss coordinating the new profile and proportions with existing trim. Exact matching depends on the profile, material and finish, so share close-up photos and dimensions. Our CKC Woodworks shop supports custom work where the project calls for it." },
      { question: "What affects a window and door casing estimate?", answer: "The number and size of openings, profile, material, existing conditions and finish scope affect the proposal. Include photos of representative openings and tell us whether you want one room or a broader trim update." },
    ],
  },
  "archways-entryways": {
    title: "Custom Archway & Entryway Trim in St. Louis",
    description: "Custom wood trim for archways and interior entryways in St. Louis. Plan casings, transitions and architectural details with Moulding Saint Louis.",
    introduction: "Moulding Saint Louis creates custom wood trim for archways and interior entryways in St. Louis homes. We shape the casing and surrounding details around the opening so the transition between rooms feels connected to the rest of the home's architecture.",
    questions: [
      { question: "Can you add wood trim to an existing archway?", answer: "An existing archway can be reviewed for a custom trim treatment. Shape, wall depth, nearby surfaces and the condition of the opening determine the fitting approach. Photos from both sides and approximate dimensions help us assess the scope." },
      { question: "Does archway trim involve structural changes?", answer: "This service focuses on architectural trim and wood details around openings. Widening an opening or changing a load-bearing wall is a separate scope that may require structural planning and other professionals. Tell us if your project includes those changes before we discuss the trim." },
      { question: "How can an entryway connect with adjacent rooms?", answer: "We consider the casing, baseboards, crown and sightlines in adjoining spaces. The entryway can repeat those details or introduce a deliberate feature that still works with them. Inspiration and photos of the surrounding rooms are useful during a consultation." },
    ],
  },
};
