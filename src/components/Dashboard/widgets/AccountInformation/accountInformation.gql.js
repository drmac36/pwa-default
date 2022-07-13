import { gql } from '@apollo/client';
export const GET_CUSTOMER_INFORMATION = gql`
    query {
        customer {
            firstname
            lastname
            suffix
            email
            addresses {
                firstname
                lastname
                street
                city
                region {
                    region_code
                    region
                }
                postcode
                country_code
                telephone
            }
            orders(pageSize: 3) {
                items {
                    id
                    order_date
                    total {
                        grand_total {
                            value
                            currency
                        }
                    }
                    status
                }
            }
        }
    }
`;

export default {
    getCustomerInformationQuery: GET_CUSTOMER_INFORMATION
};
