export interface parayan {
  _id: string;
  _createdAt: string;
  title: string;
  vakta: Array[];
  comments: Comment[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  referenceList: Array[];
  media: [{
    asset: {
      _type: reference;
    };
  }];
  gallery: [{
    asset: {
      _type: reference;
    };
  }];
  slug: {
    current: string;
  };
  body: [object];
}

export interface vakta {
  _id: string;
  name: string;
  image: string;
  slug: {
    current: string;
  };
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  parayan: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
