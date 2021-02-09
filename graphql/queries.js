/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCuisine = /* GraphQL */ `
  query GetCuisine($id: ID!) {
    getCuisine(id: $id) {
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
export const listCuisines = /* GraphQL */ `
  query ListCuisines(
    $filter: ModelCuisineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCuisines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cuisine_title
        cuisine_image_url
        cooking_ingredient
        cooking_method
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
