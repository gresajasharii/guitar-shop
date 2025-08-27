import { gql } from "@apollo/client";

export const GET_MODELS = gql`
  query GetModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      price
    }
  }
`;

export const SEARCH_MODELS = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      image
      price
    }
  }
`;

export const GET_MODEL_DETAILS = gql`
  query GetModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;