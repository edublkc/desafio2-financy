import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: TransactionInput!, $categoryId: String!) {
    createTransaction(data: $data, categoryId: $categoryId) {
      id
      description
      amount
      date
      category {
        title
        description
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($deleteTransactionId: String!) {
    deleteTransaction(id: $deleteTransactionId)
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($updateTransactionId: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $updateTransactionId, data: $data) {
      id
      description
      date
      amount
    }
  }
`