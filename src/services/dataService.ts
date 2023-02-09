const ALL_SPONSORS = [
  {
    id: 1,
    group: "Title Sponsor",
    sponsor: [
      {
        id: 1,
        name: "Ignite Tech",
        logoURL:
          "https://www.dnnsummit.org/Portals/0/adam/Content/hEfC-l1yjEOe5T1rCvLXog/Image/IgniteTech-Logo-with-tagline.png",
        website: "https://ignitetech.com",
      },
    ],
  },
  {
    id: 2,
    group: "Gold Sponsors",
    sponsor: [
      {
        id: 1,
        name: "10 Pound Gorilla",
        logoURL:
          "https://www.dnnsummit.org/Portals/0/Images/Summit2019/Sponsors/logo.10PoundGorilla.png",
        website: "https://10poundgorilla.com",
      },
      {
        id: 2,
        name: "DNN4Less",
        logoURL:
          "https://www.dnnsummit.org/Portals/0/Images/Summit2020/Sponsors/logo-dnn4less-tagline.png",
        website: "https://dnn4less.com",
      },
      {
        id: 3,
        name: "IowaComputerGurus",
        logoURL:
          "https://www.dnnsummit.org/Portals/0/Images/Summit2019/Sponsors/logo.icg.png",
        website: "https://iowacomputergurus.com",
      },
      {
        id: 4,
        name: "Moore Creative",
        logoURL:
          "https://www.dnnsummit.org/Portals/0/adam/Content/s9H9q00H1U2MbxWicoqaVQ/Image/mclogo_400.png.png",
        website: "https://moorecreative.com",
      },
      {
        id: 5,
        name: "nvisionative",
        logoURL:
          "https://www.dnnsummit.org/Portals/0/adam/Content/euWiJiscSE6Wf4AoFYI7pA/Image/nvisionative_logo_wide_black_no_tag.png",
        website: "https://nvisionative.com",
      },
      {
        id: 6,
        name: "Plant an App",
        logoURL:
          "https://www.dnnsummit.org/Portals/0/adam/Content/tC-zzwhOZkqBUYBQ-1aNvg/Image/plant-an-app-logo.png",
        website: "https://plantanapp.com",
      },
    ],
  },
];

export default {
  sponsor: {
    repo: ALL_SPONSORS,
    get: (id: number) => {
      return ALL_SPONSORS.find((s) => s.id === id);
    },
  },
};
