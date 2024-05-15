const SPECIFIC_QUERY_DATA = [
  {
    query: {
      $prefix: ["name", "basic wall"],
    },
    fields: ["objectid", "name", "externalId", "properties.*.type*"],
    pagination: {
      offset: 0,
      limit: 1000,
    },
    payload: "text",
  },
  {
    query: {
      $prefix: ["name", "window"],
    },
    fields: ["objectid", "name", "externalId", "properties.*.type*"],
    pagination: {
      offset: 0,
      limit: 1000,
    },
    payload: "text",
  },
  {
    query: {
      $prefix: ["name", "Door"],
    },
    fields: ["objectid", "name", "externalId", "properties.*.type*"],
    pagination: {
      offset: 0,
      limit: 1000,
    },
    payload: "text",
  },
  {
    query: {
      $prefix: ["name", "floor"],
    },
    fields: ["objectid", "name", "externalId", "properties.*.type*"],
    pagination: {
      offset: 0,
      limit: 1000,
    },
    payload: "text",
  },
  {
    query: {
      $prefix: ["name", "ceiling"],
    },
    fields: ["objectid", "name", "externalId", "properties.*.type*"],
    pagination: {
      offset: 0,
      limit: 1000,
    },
    payload: "text",
  },
  {
    query: {
      $prefix: ["name", "railing"],
    },
    fields: ["objectid", "name", "externalId", "properties.*.type*"],
    pagination: {
      offset: 0,
      limit: 1000,
    },
    payload: "text",
  },
  {
    query: {
      $prefix: ["name", "compound ce"],
    },
    fields: ["objectid", "name", "externalId", "properties.*.type*"],
    pagination: {
      offset: 0,
      limit: 1000,
    },
    payload: "text",
  } ,
  {
    query: {
      $prefix: ["name", "basic roof"],
    },
    fields: ["objectid", "name", "externalId", "properties.*.type*"],
    pagination: {
      offset: 0,
      limit: 1000,
    },
    payload: "text",
  } ,
  {
    query: {
      $prefix: ["name", "stairs"],
    },
    fields: ["objectid", "name", "externalId", "properties.*.type*"],
    pagination: {
      offset: 0,
      limit: 1000,
    },
    payload: "text",
  } 
  ,
  {
    query: {
      $prefix: ["name", "stringer"],
    },
    fields: ["objectid", "name", "externalId", "properties.*.type*"],
    pagination: {
      offset: 0,
      limit: 1000,
    },
    payload: "text",
  } 

];
const COMMON_IDENTIFIERS = [
  "floor",
  "basic wall",
  "door",
  "window",
  "rail",
  "ceil",
  "roof",
  "stairs", 
  "stringer",
  
  
];
const NAME_MAPPING: { [key: string]: string } = {
  floor: "Floor",
  "basic wall": "Basic Wall",
  door: "Door",
  window: "Window",
  rail: "Railing",
  ceil: "Ceiling",
  roof:"Roof",
  stairs:"Stairs",
  stringer:"Stringer",
  railing:"railing",
  };

const COST_MAPPING: { [key: string]: number } = {
  "basic wall": 700,
  window: 400,
  door: 300,
  floor: 500,
  ceiling: 200,
  railing: 80,
  roof:1000,
  stairs:10,
  stringer:15,
  
  
};

export {SPECIFIC_QUERY_DATA , COMMON_IDENTIFIERS , NAME_MAPPING , COST_MAPPING}


