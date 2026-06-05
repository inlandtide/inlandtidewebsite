export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait" | "square";
  sourceName: string;
};

export type GalleryCategory = {
  slug: string;
  title: string;
  description: string;
  images: GalleryImage[];
};

export const galleryCategories: GalleryCategory[] = [
  {
    "slug": "luxury-decorative-moulding",
    "title": "Luxury & Decorative Moulding",
    "description": "Layered wall treatments, refined panels, and elevated custom moulding details.",
    "images": [
      {
        "src": "/images/gallery/luxury-decorative-moulding-01.jpg",
        "alt": "Luxury & Decorative Moulding project photo 1 by Moulding Saint Louis",
        "width": 1650,
        "height": 2200,
        "orientation": "portrait",
        "sourceName": "Luxurydecorativemoulding1"
      },
      {
        "src": "/images/gallery/luxury-decorative-moulding-02.jpg",
        "alt": "Luxury & Decorative Moulding project photo 2 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "Luxurydecorativemoulding2.jpg"
      },
      {
        "src": "/images/gallery/luxury-decorative-moulding-03.jpg",
        "alt": "Luxury & Decorative Moulding project photo 3 by Moulding Saint Louis",
        "width": 1650,
        "height": 2200,
        "orientation": "portrait",
        "sourceName": "Luxurydecorativemoulding3.jpg"
      },
      {
        "src": "/images/gallery/luxury-decorative-moulding-04.jpg",
        "alt": "Luxury & Decorative Moulding project photo 4 by Moulding Saint Louis",
        "width": 1467,
        "height": 2200,
        "orientation": "portrait",
        "sourceName": "Luxurydecorativemoulding4.jpg"
      },
      {
        "src": "/images/gallery/luxury-decorative-moulding-05.jpg",
        "alt": "Luxury & Decorative Moulding project photo 5 by Moulding Saint Louis",
        "width": 1467,
        "height": 2200,
        "orientation": "portrait",
        "sourceName": "Luxurydecorativemoulding5.jpg"
      },
      {
        "src": "/images/gallery/luxury-decorative-moulding-06.jpg",
        "alt": "Luxury & Decorative Moulding project photo 6 by Moulding Saint Louis",
        "width": 1649,
        "height": 2200,
        "orientation": "portrait",
        "sourceName": "Luxurydecorativemoulding6.jpg"
      },
      {
        "src": "/images/gallery/luxury-decorative-moulding-07.jpg",
        "alt": "Luxury & Decorative Moulding project photo 7 by Moulding Saint Louis",
        "width": 1650,
        "height": 2200,
        "orientation": "portrait",
        "sourceName": "Luxurydecorativemoulding7.jpg"
      },
      {
        "src": "/images/gallery/luxury-decorative-moulding-08.jpg",
        "alt": "Luxury & Decorative Moulding project photo 8 by Moulding Saint Louis",
        "width": 1650,
        "height": 2200,
        "orientation": "portrait",
        "sourceName": "Luxurydecorativemoulding8.jpg"
      },
      {
        "src": "/images/gallery/luxury-decorative-moulding-09.jpg",
        "alt": "Luxury & Decorative Moulding project photo 9 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "Luxurydecorativemoulding9.jpg"
      },
      {
        "src": "/images/gallery/luxury-decorative-moulding-10.jpg",
        "alt": "Luxury & Decorative Moulding project photo 10 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "Luxurydecorativemoulding10.jpg"
      }
    ]
  },
  {
    "slug": "picture-frame-moulding",
    "title": "Picture Frame Moulding",
    "description": "Wall-frame layouts that bring scale, rhythm, and architectural polish to interior rooms.",
    "images": [
      {
        "src": "/images/gallery/picture-frame-moulding-01.jpg",
        "alt": "Picture Frame Moulding project photo 1 by Moulding Saint Louis",
        "width": 2200,
        "height": 1468,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding1.jpg"
      },
      {
        "src": "/images/gallery/picture-frame-moulding-02.jpg",
        "alt": "Picture Frame Moulding project photo 2 by Moulding Saint Louis",
        "width": 2200,
        "height": 2065,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding2.jpg"
      },
      {
        "src": "/images/gallery/picture-frame-moulding-03.jpg",
        "alt": "Picture Frame Moulding project photo 3 by Moulding Saint Louis",
        "width": 2200,
        "height": 1468,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding3.jpg"
      },
      {
        "src": "/images/gallery/picture-frame-moulding-04.jpg",
        "alt": "Picture Frame Moulding project photo 4 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding4.jpg"
      },
      {
        "src": "/images/gallery/picture-frame-moulding-05.jpg",
        "alt": "Picture Frame Moulding project photo 5 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding5.jpg"
      },
      {
        "src": "/images/gallery/picture-frame-moulding-06.jpg",
        "alt": "Picture Frame Moulding project photo 6 by Moulding Saint Louis",
        "width": 2200,
        "height": 1512,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding6.jpg"
      },
      {
        "src": "/images/gallery/picture-frame-moulding-07.jpg",
        "alt": "Picture Frame Moulding project photo 7 by Moulding Saint Louis",
        "width": 2200,
        "height": 1468,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding7.jpg"
      },
      {
        "src": "/images/gallery/picture-frame-moulding-08.jpg",
        "alt": "Picture Frame Moulding project photo 8 by Moulding Saint Louis",
        "width": 2200,
        "height": 1468,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding8.jpg"
      },
      {
        "src": "/images/gallery/picture-frame-moulding-09.jpg",
        "alt": "Picture Frame Moulding project photo 9 by Moulding Saint Louis",
        "width": 2200,
        "height": 1669,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding9.jpg"
      },
      {
        "src": "/images/gallery/picture-frame-moulding-10.jpg",
        "alt": "Picture Frame Moulding project photo 10 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding10.jpg"
      },
      {
        "src": "/images/gallery/picture-frame-moulding-11.jpg",
        "alt": "Picture Frame Moulding project photo 11 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "pictureframemoulding11.jpg"
      }
    ]
  },
  {
    "slug": "wainscoting-beadboard",
    "title": "Wainscoting & Beadboard",
    "description": "Durable lower-wall treatments, beadboard, and classic millwork profiles for finished spaces.",
    "images": [
      {
        "src": "/images/gallery/wainscoting-beadboard-01.jpg",
        "alt": "Wainscoting & Beadboard project photo 1 by Moulding Saint Louis",
        "width": 2200,
        "height": 1468,
        "orientation": "landscape",
        "sourceName": "wainscoting&beadboard1.jpg"
      },
      {
        "src": "/images/gallery/wainscoting-beadboard-02.jpg",
        "alt": "Wainscoting & Beadboard project photo 2 by Moulding Saint Louis",
        "width": 2200,
        "height": 1468,
        "orientation": "landscape",
        "sourceName": "wainscoting&beadboard2.jpg"
      },
      {
        "src": "/images/gallery/wainscoting-beadboard-03.jpg",
        "alt": "Wainscoting & Beadboard project photo 3 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "wainscoting&beadboard3.jpg"
      },
      {
        "src": "/images/gallery/wainscoting-beadboard-04.jpg",
        "alt": "Wainscoting & Beadboard project photo 4 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "wainscoting&beadboard4.jpg"
      }
    ]
  },
  {
    "slug": "window-door-casing",
    "title": "Window & Door Casings",
    "description": "Window and door trim packages that frame openings with proportion and crisp detail.",
    "images": [
      {
        "src": "/images/gallery/window-door-casing-01.jpg",
        "alt": "Window & Door Casings project photo 1 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "window&doorcasings1.jpg"
      },
      {
        "src": "/images/gallery/window-door-casing-02.jpg",
        "alt": "Window & Door Casings project photo 2 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "window&doorcasings2.jpg"
      },
      {
        "src": "/images/gallery/window-door-casing-03.jpg",
        "alt": "Window & Door Casings project photo 3 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "window&doorcasings3.jpg"
      },
      {
        "src": "/images/gallery/window-door-casing-04.jpg",
        "alt": "Window & Door Casings project photo 4 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "window&doorcasings4.jpg"
      }
    ]
  },
  {
    "slug": "fireplace-mantels-surrounds",
    "title": "Fireplace Mantels & Surrounds",
    "description": "Mantels, fireplace surrounds, and focal-point wood details for living spaces.",
    "images": [
      {
        "src": "/images/gallery/fireplace-mantels-surrounds-01.jpg",
        "alt": "Fireplace Mantels & Surrounds project photo 1 by Moulding Saint Louis",
        "width": 1935,
        "height": 2200,
        "orientation": "portrait",
        "sourceName": "Fireplacemantel1.jpg"
      },
      {
        "src": "/images/gallery/fireplace-mantels-surrounds-02.jpg",
        "alt": "Fireplace Mantels & Surrounds project photo 2 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "Fireplacemantel2.jpg"
      },
      {
        "src": "/images/gallery/fireplace-mantels-surrounds-03.jpg",
        "alt": "Fireplace Mantels & Surrounds project photo 3 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "Fireplacemantel3.jpg"
      },
      {
        "src": "/images/gallery/fireplace-mantels-surrounds-04.jpg",
        "alt": "Fireplace Mantels & Surrounds project photo 4 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "Fireplacemantel4.jpg"
      }
    ]
  },
  {
    "slug": "gazebos-pergolas",
    "title": "Gazebos & Pergolas",
    "description": "Outdoor wood structures, shade elements, and custom exterior carpentry moments.",
    "images": [
      {
        "src": "/images/gallery/gazebos-pergolas-01.jpg",
        "alt": "Gazebos & Pergolas project photo 1 by Moulding Saint Louis",
        "width": 2200,
        "height": 1468,
        "orientation": "landscape",
        "sourceName": "Gazebos&pergolas1.jpg"
      },
      {
        "src": "/images/gallery/gazebos-pergolas-02.jpg",
        "alt": "Gazebos & Pergolas project photo 2 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "Gazebos&pergolas2.jpg"
      },
      {
        "src": "/images/gallery/gazebos-pergolas-03.jpg",
        "alt": "Gazebos & Pergolas project photo 3 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "Gazebos&pergolas3.jpg"
      },
      {
        "src": "/images/gallery/gazebos-pergolas-04.jpg",
        "alt": "Gazebos & Pergolas project photo 4 by Moulding Saint Louis",
        "width": 1469,
        "height": 2200,
        "orientation": "portrait",
        "sourceName": "Gazebos&pergolas4.jpg"
      },
      {
        "src": "/images/gallery/gazebos-pergolas-05.jpg",
        "alt": "Gazebos & Pergolas project photo 5 by Moulding Saint Louis",
        "width": 2200,
        "height": 1469,
        "orientation": "landscape",
        "sourceName": "Gazebos&pergolas5.jpg"
      },
      {
        "src": "/images/gallery/gazebos-pergolas-06.jpg",
        "alt": "Gazebos & Pergolas project photo 6 by Moulding Saint Louis",
        "width": 2200,
        "height": 1520,
        "orientation": "landscape",
        "sourceName": "Gazebos&pergolas6.jpg"
      },
      {
        "src": "/images/gallery/gazebos-pergolas-07.jpg",
        "alt": "Gazebos & Pergolas project photo 7 by Moulding Saint Louis",
        "width": 2200,
        "height": 1467,
        "orientation": "landscape",
        "sourceName": "Gazebos&pergolas7.jpg"
      }
    ]
  }
];

export const galleryImageCount = galleryCategories.reduce((total, category) => total + category.images.length, 0);
