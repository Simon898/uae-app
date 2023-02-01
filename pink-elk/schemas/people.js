export default {
  name: "people",
  type: "document",
  title: "People",

  fields: [
    {
      name: "name",
      type: "string",
      title: "Person name and titles",
    },
    {
      name: "position",
      title: "Position",
      type: "string",
    },
    {
      name: "objective",
      title: "Bio",
      type: "simpleBlockContent",
    },
    {
      name: "objective1",
      title: "Short Bio",
      type: "simpleBlockContent",
      validation: (Rule) =>
        Rule.max(120).warning(`A title shouldn't be more than 120 characters.`),
    },
    {
      title: 'Sorting',
      name: 'sort',
      type: 'string',
      options: {
        list: [
          "Faculty",
          "Students",
          "ResearchScientists",
          "AdminStaff",
          "UniversityAffiliate",
          "Alumni"
        ],
      }
    },
    {
      name: "group",
      type: "string",
      title: "Group",
    },
    {
      name: "link",
      type: "string",
      title: "Website link",
    },
    {
      name: "email",
      type: "string",
      title: "Email Address",
    },
    {
      title: "MBUZAI link",
      name: "links",
      type: "object",
      fields: [
        { name: "linkName", type: "string", title: "Link address" },
        { name: "linkShort", type: "string", title: "Shortcut visible" },
      ],
    },
    {
      title: "Personal link",
      name: "hashlinks",
      type: "object",
      fields: [
        { name: "linkName", type: "string", title: "Link address" },
        { name: "linkShort", type: "string", title: "Shortcut visible" },
      ],
    },
    {
      name: "picPerson",
      type: "image",
      title: "Photo",
    },
    {
      name: "picPersonIn",
      type: "image",
      title: "Photo Profile",
    },
    {
      name: "research",
      title: "Research Interests",
      type: "simpleBlockContent",
    },
    {
      name: "selectPublic",
      title: "Selected Publications",
      type: "simpleBlockContent",
    },
    {
      name: "google",
      title: "Google Scholar",
      type: "string",
    },
    {
      title: "Related URLs",
      name: "relLinks",
      type: "object",
      fields: [
        { name: "relLink", type: "string", title: "Link address" },
        { name: "relLinkName", type: "string", title: "Link name" },
      ],
    },
    {
      title: "Education Profile",
      name: "education",
      type: "simpleBlockContent",
    },
    {
      name: "rank",
      type: "string",
      title: "Webside position",
    },
    {
      name: "publications1",
      title: 'Publications',
      type: "array",
      of: [
        {type: 'block'}
      ]
    }
  ],
};
