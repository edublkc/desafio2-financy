import { gql } from "@apollo/client"

export const LIST_TRANSACTIONS_DASHBOARD = gql`
  query ListTransactions {
    listTransactions {
      id
      description
      amount
      date
      categoryId
      category {
        title
        iconColor
        iconName
      }
    }
  }
`