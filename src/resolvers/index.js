const resolvers = {
  Query: {
    users: () => {
      return [
        {
          name: "Trung",
          username: "184",
        },
      ];
    },

    getAllRecipes: () => {
      return [
        {
          name: "Recipe 1",
          category: "category 1",
        },
        {
          name: "Recipe 2",
          category: "category 2",
        },
      ];
    },
  },
  Mutation: {
    addRecipe: async (parent, { input }, { RecipeModel }) => {
      const { name, category, description, instructions, username } = input;
      const addedRecipe = new RecipeModel({
        name,
        category,
        description,
        instructions,
        username,
      }).save();

      return addedRecipe;
    },
  },
};

module.exports = resolvers;
