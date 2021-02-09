/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCuisine = /* GraphQL */ `
  mutation CreateCuisine(
    $input: CreateCuisineInput!
    $condition: ModelCuisineConditionInput
  ) {
    createCuisine(input: $input, condition: $condition) {
      id
      cuisine_title
      cuisine_image_url
      cooking_ingredient
      cooking_method
      createdAt
      updatedAt
    }
  }
`;
export const updateCuisine = /* GraphQL */ `
  mutation UpdateCuisine(
    $input: UpdateCuisineInput!
    $condition: ModelCuisineConditionInput
  ) {
    updateCuisine(input: $input, condition: $condition) {
      id
      cuisine_title
      cuisine_image_url
      cooking_ingredient
      cooking_method
      createdAt
      updatedAt
    }
  }
`;
export const deleteCuisine = /* GraphQL */ `
  mutation DeleteCuisine(
    $input: DeleteCuisineInput!
    $condition: ModelCuisineConditionInput
  ) {
    deleteCuisine(input: $input, condition: $condition) {
      id
      cuisine_title
      cuisine_image_url
      cooking_ingredient
      cooking_method
      createdAt
      updatedAt
    }
  }
`;
