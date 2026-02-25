import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation createCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id,
      title,
      description,
      iconName,
      iconColor,
      author {
        id,
        name,
        email
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($deleteCategoryId: String!) {
    deleteCategory(id: $deleteCategoryId)
  }
`

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($updateCategoryId: String!, $data: UpdateCategoryInput!) {
    updateCategory(id: $updateCategoryId, data: $data) {
      id,
      title,
      description,
      iconName,
      iconColor,
      author {
        name,
        email
      }
    }
  }
`