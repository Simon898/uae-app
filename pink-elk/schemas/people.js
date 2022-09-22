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
      name: "group",
      type: "string",
      title: "Group",
    },
    {
      name: "link",
      type: "string",
      title: "Webside link",
    },
    {
      title: "Social links",
      name: "links",
      type: "object",
      fields: [
        { name: "linkName", type: "string", title: "Link address" },
        { name: "linkShort", type: "string", title: "Shortcut visible" },
      ],
    },
    {
      title: "#Hashtag links",
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
      name: "research",
      title: "Research Interests",
      type: "simpleBlockContent",
    },
    {
      name: "selectPublic",
      title: "Selected Publicationss",
      type: "simpleBlockContent",
    },
    {
      name: "publications",
      title: "Publications",
      type: "simpleBlockContent",
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
  ],
};
